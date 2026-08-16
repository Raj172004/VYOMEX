import { Router } from "express";

import auditController from "../controllers/Audit.controller";

import { authenticate } from "../../../middleware/jwt.middleware";
import { adminOnly } from "../../../middleware/permissions/admin.middleware";

import {
  auditIdParamsSchema,
  auditQuerySchema,
} from "../validators/Audit.validation";

import {
  validateAuditParams,
  validateAuditQuery,
} from "../middlewares/Audit.validation.middleware";

const router = Router();

router.use(
  authenticate,
  adminOnly
);

router.get(
  "/",
  validateAuditQuery(auditQuerySchema),
  auditController.getAll.bind(auditController)
);

router.get(
  "/:id",
  validateAuditParams(auditIdParamsSchema),
  auditController.getById.bind(auditController)
);

export default router;
