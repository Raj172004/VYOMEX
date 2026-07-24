import { Router } from "express";

import authRoutes from "../modules/auth/routes/Auth.routes";
import adminRoutes from "../modules/admin/routes/Admin.routes";
import projectRoutes from "../modules/project/routes/Project.routes";
import taskRoutes from "../modules/task/routes/Task.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

export default router;