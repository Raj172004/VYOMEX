import { Router } from "express";

import projectController from "../controllers/Project.controller";

import { authenticate } from "../../../middleware/jwt.middleware";

import {
  createProjectSchema,
} from "../dto/Project.validation";

import {
  updateProjectSchema,
} from "../dto/Project.update.validation";

import {
  projectIdParamsSchema,
} from "../dto/Project.params.validation";

import {
  projectQuerySchema,
} from "../dto/Project.query.validation";

import {
  validateProjectBody,
} from "../middleware/Project.validation.middleware";

import {
  validateProjectUpdateBody,
} from "../middleware/Project.update.validation.middleware";

import {
  validateProjectParams,
} from "../middleware/Project.params.validation.middleware";

import {
  validateProjectQuery,
} from "../middleware/Project.query.validation.middleware";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  validateProjectQuery(projectQuerySchema),
  projectController.getAll.bind(projectController)
);

router.get(
  "/:id",
  validateProjectParams(projectIdParamsSchema),
  projectController.getById.bind(projectController)
);

router.post(
  "/",
  validateProjectBody(createProjectSchema),
  projectController.create.bind(projectController)
);

router.put(
  "/:id",
  validateProjectParams(projectIdParamsSchema),
  validateProjectUpdateBody(updateProjectSchema),
  projectController.update.bind(projectController)
);

router.patch(
  "/:id",
  validateProjectParams(projectIdParamsSchema),
  validateProjectUpdateBody(updateProjectSchema),
  projectController.update.bind(projectController)
);

router.delete(
  "/:id",
  validateProjectParams(projectIdParamsSchema),
  projectController.delete.bind(projectController)
);

export default router;
