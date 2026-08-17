import { Request, Response, NextFunction } from "express";

import authService from "../services/Auth.service";

import { writeAudit } from "../../audit/helpers/Audit.helper";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.register(req.body);

      await writeAudit({
        req,
        action: "CREATE",
        entity: "User",
        entityId: user._id.toString(),
        description: `User "${user.email}" registered`,
        metadata: {
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        },
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
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
      const result = await authService.login(req.body);

      await writeAudit({
        req,
        action: "LOGIN",
        entity: "User",
        entityId: result.user._id.toString(),
        description: `User "${result.user.email}" logged in`,
        metadata: {
          userId: result.user._id.toString(),
          email: result.user.email,
          role: result.user.role,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
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
      await authService.forgotPassword(req.body);

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
      await authService.resetPassword(req.body);

      await writeAudit({
        req,
        action: "PASSWORD_CHANGE",
        entity: "User",
        description: "User password reset completed",
        metadata: {
          source: "password-reset",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
