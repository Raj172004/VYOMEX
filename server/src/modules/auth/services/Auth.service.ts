import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import authRepository from "../repositories/Auth.repository";

import { RegisterDto } from "../dto/Register.dto";
import { LoginDto } from "../dto/Login.dto";
import { ForgotPasswordDto } from "../dto/ForgotPassword.dto";
import { ResetPasswordDto } from "../dto/ResetPassword.dto";

import { ApiError } from "../../../utils/ApiError";
import { env } from "../../../config/env";

import mailService from "../../../services/mailer/Mailer.service";

import {
  getPasswordResetExpiry,
} from "../../../utils/password-reset";

import {
  isDemoMode,
} from "../../../common/data/DataMode";

import demoAuthProvider from "../../../common/data/providers/demo/DemoAuth.provider";

import {
  createRefreshToken,
} from "./RefreshToken.service";

interface AuthTokenUser {
  _id: string;
  email: string;
  role: string;
}

class AuthService {

  private createAccessToken(
    user: AuthTokenUser
  ): string {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn:
          env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      }
    );
  }

  createAccessTokenFromRefresh(
    payload: {
      id: string;
      email: string;
      role: string;
    }
  ): string {
    return this.createAccessToken({
      _id: payload.id,
      email: payload.email,
      role: payload.role,
    });
  }
  private createRefreshTokenForUser(
    user: AuthTokenUser
  ): string {
    return createRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  }

  async register(data: RegisterDto) {

    if (isDemoMode()) {
      throw new ApiError(
        400,
        "Registration is disabled in demo mode"
      );
    }

    const existingUser =
      await authRepository.findByEmail(
        data.email
      );

    if (existingUser) {
      throw new ApiError(
        409,
        "Email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        12
      );

    const user =
      await authRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      });

    const userObject =
      user.toObject();

    const {
      password,
      ...safeUser
    } = userObject;

    return safeUser;
  }

  async login(data: LoginDto) {

    /*
     * DEMO MODE
     *
     * Authentication uses the in-memory
     * DemoAuthProvider.
     *
     * No MongoDB user is required.
     */
    if (isDemoMode()) {

      const user =
        await demoAuthProvider.findByEmail(
          data.email
        );

      if (!user) {
        throw new ApiError(
          401,
          "Invalid credentials"
        );
      }

      const passwordMatch =
        await demoAuthProvider.verifyPassword(
          user,
          data.password
        );

      if (!passwordMatch) {
        throw new ApiError(
          401,
          "Invalid credentials"
        );
      }

      if (!user.isActive) {
        throw new ApiError(
          403,
          "Account is inactive"
        );
      }

      const tokenUser: AuthTokenUser = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };

      const accessToken =
        this.createAccessToken(
          tokenUser
        );

      const refreshToken =
        this.createRefreshTokenForUser(
          tokenUser
        );

      return {
        user:
          demoAuthProvider.toSafeUser(
            user
          ),
        accessToken,
        refreshToken,
      };
    }

    /*
     * PRODUCTION MODE
     *
     * Authentication uses MongoDB.
     */
    const user =
      await authRepository.findByEmail(
        data.email
      );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!passwordMatch) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    if (!user.isActive) {
      throw new ApiError(
        403,
        "Account is inactive"
      );
    }

    const tokenUser: AuthTokenUser = {
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken =
      this.createAccessToken(
        tokenUser
      );

    const refreshToken =
      this.createRefreshTokenForUser(
        tokenUser
      );

    const userObject =
      user.toObject();

    const {
      password,
      ...safeUser
    } = userObject;

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(
    data: ForgotPasswordDto
  ) {

    if (isDemoMode()) {

      console.log("");
      console.log(
        "========== DEMO PASSWORD RESET =========="
      );
      console.log(
        `[DEMO] Password reset requested for: ${data.email}`
      );
      console.log(
        "[DEMO] Real email delivery is disabled."
      );
      console.log(
        "[DEMO] Use demo authentication while development continues."
      );
      console.log(
        "=========================================="
      );
      console.log("");

      return;
    }

    const user =
      await authRepository.findByEmail(
        data.email
      );

    if (!user) {
      return;
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const expiresAt =
      getPasswordResetExpiry(
        env.PASSWORD_RESET_EXPIRES_IN
      );

    await authRepository.setPasswordResetToken(
      user._id.toString(),
      resetToken,
      expiresAt
    );

    const resetUrl =
      `${env.CLIENT_URL}/reset-password?token=${encodeURIComponent(
        resetToken
      )}`;

    if (env.NODE_ENV !== "production") {

      console.log("");
      console.log(
        "========== DEV PASSWORD RESET =========="
      );

      console.log(
        `[DEV] Password reset token: ${resetToken}`
      );

      console.log(
        `[DEV] Password reset URL: ${resetUrl}`
      );

      console.log(
        `[DEV] Password reset expires: ${expiresAt.toISOString()}`
      );

      console.log(
        "========================================="
      );

      console.log("");
    }

    if (
      env.MAIL_HOST &&
      env.MAIL_USER &&
      env.MAIL_PASSWORD &&
      env.MAIL_FROM
    ) {

      await mailService.sendPasswordResetEmail(
        data.email,
        resetUrl
      );

    } else if (
      env.NODE_ENV === "production"
    ) {

      throw new ApiError(
        500,
        "Mail service is not configured"
      );
    }
  }

  async resetPassword(
    data: ResetPasswordDto
  ) {

    if (isDemoMode()) {
      throw new ApiError(
        400,
        "Password reset is disabled in demo mode"
      );
    }

    const user =
      await authRepository.findByPasswordResetToken(
        data.token
      );

    if (!user) {
      throw new ApiError(
        400,
        "Invalid or expired password reset token"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        12
      );

    await authRepository.updatePasswordAndClearResetToken(
      user._id.toString(),
      hashedPassword
    );
  }
}

export default new AuthService();


