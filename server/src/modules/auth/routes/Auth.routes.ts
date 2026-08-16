import { Router } from "express";

import authController from "../controllers/Auth.controller";
import { getProfile } from "../controllers/Profile.controller";

import { authenticate } from "../../../middleware/jwt.middleware";
import { validate } from "../../../middleware/validate.middleware";

import {
  authRateLimiter,
} from "../../../middleware/rate-limiters/auth.rate-limiter";

import {
  loginRateLimiter,
} from "../../../middleware/rate-limiters/login.rate-limiter";

import {
  passwordResetRateLimiter,
} from "../../../middleware/rate-limiters/password-reset.rate-limiter";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/Auth.validator";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  "/forgot-password",
  passwordResetRateLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController)
);

router.post(
  "/reset-password",
  passwordResetRateLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController)
);

router.get(
  "/me",
  authenticate,
  getProfile
);

export default router;
