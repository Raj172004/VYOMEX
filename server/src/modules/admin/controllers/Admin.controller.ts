import {
  Request,
  Response,
  NextFunction,
} from "express";

import adminService from "../services/Admin.service";

class AdminController {
  async dashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats =
        await adminService.getDashboard();

      return res.status(200).json({
        success: true,
        message:
          "Dashboard fetched successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();