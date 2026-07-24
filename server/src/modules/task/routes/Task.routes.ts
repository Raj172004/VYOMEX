import { Router } from "express";

import taskController from "../controllers/Task.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  taskController.create
);

router.get(
  "/",
  authenticate,
  taskController.getAll
);

router.get(
  "/:id",
  authenticate,
  taskController.getById
);

router.put(
  "/:id",
  authenticate,
  taskController.update
);

router.delete(
  "/:id",
  authenticate,
  taskController.delete
);

export default router;