import {
  Request,
  Response,
  NextFunction,
} from "express";

import notificationService from "../services/Notification.service";

class NotificationController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await notificationService.create({
          ...req.body,
          user: req.user!._id.toString(),
        });

      return res.status(201).json({
        success: true,
        message:
          "Notification created successfully",
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
        await notificationService.findAll(
          req.user!._id.toString()
        );

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
          String(req.params.id),
          req.user!._id.toString()
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
      const authenticatedUserId =
        req.user!._id.toString();

      if (
        authenticatedUserId !==
        String(req.params.userId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to access another user's notifications",
        });
      }

      const notifications =
        await notificationService.findByUser(
          authenticatedUserId
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
          req.user!._id.toString(),
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Notification updated successfully",
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
          String(req.params.id),
          req.user!._id.toString()
        );

      return res.status(200).json({
        success: true,
        message:
          "Notification marked as read",
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
      const authenticatedUserId =
        req.user!._id.toString();

      await notificationService.markAllAsRead(
        authenticatedUserId
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
      const authenticatedUserId =
        req.user!._id.toString();

      if (
        authenticatedUserId !==
        String(req.params.userId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to access another user's notifications",
        });
      }

      const count =
        await notificationService.countUnread(
          authenticatedUserId
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
        String(req.params.id),
        req.user!._id.toString()
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



