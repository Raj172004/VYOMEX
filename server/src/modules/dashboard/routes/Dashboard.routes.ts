import { Router } from "express";

import dashboardController from "../controllers/Dashboard.controller";

const router = Router();

router.get("/overview", dashboardController.getOverview);

router.get("/projects", dashboardController.getProjects);

router.get("/tasks", dashboardController.getTasks);

router.get("/invoices", dashboardController.getInvoices);

router.get("/revenue", dashboardController.getRevenue);

router.get("/activity", dashboardController.getActivity);

router.get("/deadlines", dashboardController.getDeadlines);

router.get("/top-clients", dashboardController.getTopClients);

export default router;