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
      const ownerId =
        req.user!._id.toString();

      const dashboard =
        await dashboardService.getOverview(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const analytics =
        await dashboardService.getProjectAnalytics(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const analytics =
        await dashboardService.getInvoiceAnalytics(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const revenue =
        await dashboardService.getRevenueAnalytics(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const activity =
        await dashboardService.getRecentActivity(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const deadlines =
        await dashboardService.getDeadlines(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const clients =
        await dashboardService.getTopClients(
          ownerId
        );

      return res.status(200).json({
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
      const ownerId =
        req.user!._id.toString();

      const analytics =
        await dashboardService.getTaskAnalytics(
          ownerId
        );

      return res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();
