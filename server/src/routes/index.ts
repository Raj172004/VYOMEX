import { Router } from "express";

import authRoutes from "../modules/auth/routes/Auth.routes";
import adminRoutes from "../modules/admin/routes/Admin.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

export default router;