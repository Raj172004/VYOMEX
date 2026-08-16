import { Router } from "express";

import adminRoutes from "../modules/admin/routes/Admin.routes";
import authRoutes from "../modules/auth/routes/Auth.routes";
import clientRoutes from "../modules/client/routes/Client.routes";
import dashboardRoutes from "../modules/dashboard/routes/Dashboard.routes";
import invoiceRoutes from "../modules/invoice/routes/Invoice.routes";
import notificationRoutes from "../modules/notification/routes/Notification.routes";
import projectRoutes from "../modules/project/routes/Project.routes";
import taskRoutes from "../modules/task/routes/Task.routes";
import uploadRoutes from "../modules/upload/routes/Upload.routes";
import userRoutes from "../modules/user/routes/User.routes";
import auditRoutes from "../modules/audit/routes/Audit.routes";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/notifications", notificationRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/uploads", uploadRoutes);
router.use("/users", userRoutes);
router.use("/audits", auditRoutes);

export default router;
