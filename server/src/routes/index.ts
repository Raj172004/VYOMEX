import { Router } from "express";

import authRoutes from "../modules/auth/routes/Auth.routes";
import adminRoutes from "../modules/admin/routes/Admin.routes";
import projectRoutes from "../modules/project/routes/Project.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/projects", projectRoutes);

export default router;