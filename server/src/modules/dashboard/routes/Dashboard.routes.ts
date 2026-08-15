import { Router } from "express";

import { verifyJWT } from "../../../middleware/jwt.middleware";

import dashboardController from "../controllers/Dashboard.controller";

const router = Router();

/**
 * All dashboard endpoints require authentication.
 *
 * verifyJWT populates:
 * req.user = {
 *   _id,
 *   email,
 *   role
 * }
 */
router.use(verifyJWT);

router.get(
  "/overview",
  dashboardController.getOverview
);

router.get(
  "/projects",
  dashboardController.getProjects
);

router.get(
  "/tasks",
  dashboardController.getTasks
);

router.get(
  "/invoices",
  dashboardController.getInvoices
);

router.get(
  "/revenue",
  dashboardController.getRevenue
);

router.get(
  "/activity",
  dashboardController.getActivity
);

router.get(
  "/deadlines",
  dashboardController.getDeadlines
);

router.get(
  "/top-clients",
  dashboardController.getTopClients
);

export default router;
