import { Router } from "express";

import { verifyJWT } from "../../../middleware/jwt.middleware";
import { adminOnly } from "../../../middleware/permissions/admin.middleware";
import { ownerOrAdmin } from "../../../middleware/permissions/owner-or-admin.middleware";

import {
  getAll,
  getById,
  update,
  remove,
} from "../controllers/User.controller";

const router = Router();

/**
 * User listing is administrative.
 */
router.get(
  "/",
  verifyJWT,
  adminOnly,
  getAll
);

/**
 * Users can access their own profile.
 * Admins can access any profile.
 */
router.get(
  "/:id",
  verifyJWT,
  ownerOrAdmin,
  getById
);

/**
 * Users can update their own profile.
 * Admins can update any profile.
 *
 * Field-level restrictions are enforced
 * inside the service layer.
 */
router.put(
  "/:id",
  verifyJWT,
  ownerOrAdmin,
  update
);

/**
 * Account deletion is administrative.
 */
router.delete(
  "/:id",
  verifyJWT,
  adminOnly,
  remove
);

export default router;
