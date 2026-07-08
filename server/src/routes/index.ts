import { Router } from "express";

import authRoutes from "../modules/auth/routes/Auth.routes";

const router = Router();

router.use("/auth", authRoutes);

export default router;