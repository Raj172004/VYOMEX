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

import mailService from "../../../services/Mail.service";

class AuthService {
  async register(data: RegisterDto) {
    const existingUser =
      await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 12);

    const user = await authRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    const userObject = user.toObject();

    const { password, ...safeUser } = userObject;

    return safeUser;
  }

  async login(data: LoginDto) {
    const user =
      await authRepository.findByEmail(data.email);

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const passwordMatch =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!passwordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const userObject = user.toObject();

    const { password, ...safeUser } = userObject;

    return {
      user: safeUser,
      accessToken,
    };
  }

  async forgotPassword(
    data: ForgotPasswordDto
  ) {
    const user =
      await authRepository.findByEmail(
        data.email
      );

    /*
     * Always return the same public result
     * whether the account exists or not.
     */
    if (!user) {
      return;
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const expiresAt =
      new Date(
        Date.now() + 15 * 60 * 1000
      );

    await authRepository.setPasswordResetToken(
      data.email,
      resetToken,
      expiresAt
    );

    await mailService.sendPasswordResetEmail(
      data.email,
      resetToken
    );
  }

  async resetPassword(
    data: ResetPasswordDto
  ) {
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
      await bcrypt.hash(data.password, 12);

    await authRepository.updatePasswordAndClearResetToken(
      user._id.toString(),
      hashedPassword
    );
  }
}

export default new AuthService();
