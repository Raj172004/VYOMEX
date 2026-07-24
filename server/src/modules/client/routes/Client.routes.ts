import { Router } from "express";

import { verifyJWT } from "../../../middleware/jwt.middleware";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/Client.controller";

const router = Router();

router.post("/", verifyJWT, create);

router.get("/", verifyJWT, getAll);

router.get("/:id", verifyJWT, getById);

router.put("/:id", verifyJWT, update);

router.delete("/:id", verifyJWT, remove);

export default router;