import { Request, Response, NextFunction } from "express";

import notificationService from "../services/Notification.service";

class NotificationController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await notificationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notifications =
        await notificationService.findAll();

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await notificationService.findById(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notifications =
        await notificationService.findByUser(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await notificationService.update(
          String(req.params.id),
          req.body
        );

      return res.status(200).json({
        success: true,
        message: "Notification updated successfully",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await notificationService.markAsRead(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await notificationService.markAllAsRead(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message:
          "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  }

  async countUnread(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const count =
        await notificationService.countUnread(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: {
          unread: count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await notificationService.delete(
       String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message:
          "Notification deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();