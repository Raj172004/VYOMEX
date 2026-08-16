import { Router } from "express";

import taskController from "../controllers/Task.controller";

import { authenticate } from "../../../middleware/jwt.middleware";

import {
  createTaskSchema,
} from "../validators/CreateTask.validation";

import {
  updateTaskSchema,
} from "../validators/UpdateTask.validation";

import {
  validateTaskBody,
} from "../middlewares/Task.validation.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validateTaskBody(createTaskSchema),
  taskController.create
);

router.get(
  "/",
  taskController.getAll
);

router.get(
  "/:id",
  taskController.getById
);

router.put(
  "/:id",
  validateTaskBody(updateTaskSchema),
  taskController.update
);

router.patch(
  "/:id",
  validateTaskBody(updateTaskSchema),
  taskController.update
);

router.delete(
  "/:id",
  taskController.delete
);

export default router;
