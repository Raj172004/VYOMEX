import { Router } from "express";

import authController from "../controllers/Auth.controller";
import { getProfile } from "../controllers/Profile.controller";

import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.post(
  "/register",
  authController.register.bind(authController)
);

router.post(
  "/login",
  authController.login.bind(authController)
);

router.get(
  "/me",
  authenticate,
  getProfile
);

export default router;