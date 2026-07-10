import { Request, Response } from "express";

class AdminController {
  dashboard(
    req: Request,
    res: Response
  ) {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
      data: {
        totalUsers: 125,
        totalProjects: 48,
        totalRevenue: 152000,
      },
    });
  }
}

export default new AdminController();