import { Router } from "express";

import authRoutes from "../modules/auth/routes/Auth.routes";
import adminRoutes from "../modules/admin/routes/Admin.routes";
import clientRoutes from "../modules/client/routes/Client.routes";
import projectRoutes from "../modules/project/routes/Project.routes";
import taskRoutes from "../modules/task/routes/Task.routes";
import invoiceRoutes from "../modules/invoice/routes/Invoice.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/clients", clientRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/invoices", invoiceRoutes);

export default router;