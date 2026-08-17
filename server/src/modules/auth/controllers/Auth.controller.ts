import { Request, Response, NextFunction } from "express";

import authService from "../services/Auth.service";

import {
  createRefreshToken,
  verifyRefreshToken,
} from "../services/RefreshToken.service";

import {
  REFRESH_TOKEN_COOKIE,
  refreshTokenCookieOptions,
  clearRefreshTokenCookieOptions,
} from "../config/AuthCookie.config";

import { writeAudit } from "../../audit/helpers/Audit.helper";

import { env } from "../../../config/env";

class AuthController {

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user =
        await authService.register(
          req.body
        );

      await writeAudit({
        req,
        action: "CREATE",
        entity: "User",
        entityId: user._id.toString(),
        description:
          `User "${user.email}" registered`,
        metadata: {
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        },
      });

      return res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await authService.login(
          req.body
        );

      res.cookie(
        REFRESH_TOKEN_COOKIE,
        result.refreshToken,
        refreshTokenCookieOptions
      );

      await writeAudit({
        req,
        action: "LOGIN",
        entity: "User",
        entityId:
          result.user._id.toString(),
        description:
          `User "${result.user.email}" logged in`,
        metadata: {
          userId:
            result.user._id.toString(),
          email: result.user.email,
          role: result.user.role,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          accessToken:
            result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken =
        req.cookies?.[
          REFRESH_TOKEN_COOKIE
        ];

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message:
            "Refresh token required",
        });
      }

      const payload =
        verifyRefreshToken(
          refreshToken
        );

      const newAccessToken =
        authService.createAccessTokenFromRefresh(
          payload
        );

      const newRefreshToken =
        createRefreshToken({
          id: payload.id,
          email: payload.email,
          role: payload.role,
        });

      res.cookie(
        REFRESH_TOKEN_COOKIE,
        newRefreshToken,
        refreshTokenCookieOptions
      );

      return res.status(200).json({
        success: true,
        message:
          "Token refreshed successfully",
        data: {
          accessToken:
            newAccessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.clearCookie(
        REFRESH_TOKEN_COOKIE,
        clearRefreshTokenCookieOptions
      );

      await writeAudit({
        req,
        action: "LOGOUT",
        entity: "User",
        description:
          "User logged out",
        metadata: {
          source: "refresh-token",
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await authService.forgotPassword(
        req.body
      );

      return res.status(200).json({
        success: true,
        message:
          "If an account exists with that email, a password reset link has been sent.",
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await authService.resetPassword(
        req.body
      );

      await writeAudit({
        req,
        action: "PASSWORD_CHANGE",
        entity: "User",
        description:
          "User password reset completed",
        metadata: {
          source: "password-reset",
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
