import { Router } from "express";

import adminController from "../controllers/Admin.controller";

import { verifyJWT } from "../../../middleware/jwt.middleware";

import { adminOnly } from "../../../middleware/permissions/admin.middleware";

const router = Router();

router.get(
  "/dashboard",
  verifyJWT,
  adminOnly,
  adminController.dashboard
);

export default router;