import { Router } from "express";

import projectController from "../controllers/Project.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  projectController.create
);

router.get(
  "/",
  authenticate,
  projectController.getAll
);

router.get(
  "/:id",
  authenticate,
  projectController.getById
);

router.put(
  "/:id",
  authenticate,
  projectController.update
);

router.delete(
  "/:id",
  authenticate,
  projectController.delete
);

export default router;