import {
  NextFunction,
  Request,
  Response,
} from "express";

import dashboardService from "../services/Dashboard.service";

class DashboardController {
  async getOverview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dashboard =
        await dashboardService.getOverview();

      res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const analytics =
        await dashboardService.getProjectAnalytics();

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
  async getInvoices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const analytics =
      await dashboardService.getInvoiceAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
}

async getRevenue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const revenue =
      await dashboardService.getRevenueAnalytics();

    res.status(200).json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    next(error);
  }
}

async getActivity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const activity =
      await dashboardService.getRecentActivity();

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error);
  }
}

async getDeadlines(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deadlines =
      await dashboardService.getDeadlines();

    res.status(200).json({
      success: true,
      data: deadlines,
    });
  } catch (error) {
    next(error);
  }
}

async getTopClients(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const clients =
      await dashboardService.getTopClients();

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
}

  async getTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const analytics =
        await dashboardService.getTaskAnalytics();

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();