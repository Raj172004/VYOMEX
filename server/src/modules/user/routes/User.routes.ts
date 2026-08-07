import { Router } from "express";

import { verifyJWT } from "../../../middleware/jwt.middleware";

import {
  getAll,
  getById,
  update,
  remove,
} from "../controllers/User.controller";

const router = Router();

router.get(
  "/",
  verifyJWT,
  getAll
);

router.get(
  "/:id",
  verifyJWT,
  getById
);

router.put(
  "/:id",
  verifyJWT,
  update
);

router.delete(
  "/:id",
  verifyJWT,
  remove
);

export default router;