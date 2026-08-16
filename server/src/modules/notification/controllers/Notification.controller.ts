import {
  Request,
  Response,
  NextFunction,
} from "express";

import notificationService from "../services/Notification.service";
import { CreateNotificationDto } from "../dto/CreateNotification.dto";
import { UpdateNotificationDto } from "../dto/UpdateNotification.dto";

import { writeAudit } from "../../audit/helpers/Audit.helper";

class NotificationController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createData =
        new CreateNotificationDto({
          title: req.body.title,
          message: req.body.message,
          type: req.body.type ?? "info",
          user: req.user!._id.toString(),
        });

      const notification =
        await notificationService.create(createData);

      await writeAudit({
        req,
        action: "CREATE",
        entity: "Notification",
        entityId: notification._id.toString(),
        description: `Notification "${notification.title}" created`,
        metadata: {
          notificationId:
            notification._id.toString(),
          title: notification.title,
          type: notification.type,
          user: notification.user?.toString(),
        },
      });

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
      const updateData =
        new UpdateNotificationDto({
          ...(req.body.title !== undefined && {
            title: req.body.title,
          }),
          ...(req.body.message !== undefined && {
            message: req.body.message,
          }),
          ...(req.body.type !== undefined && {
            type: req.body.type,
          }),
          ...(req.body.isRead !== undefined && {
            isRead: req.body.isRead,
          }),
        });

      const notification =
        await notificationService.update(
          String(req.params.id),
          req.user!._id.toString(),
          updateData
        );

      const action =
        req.body.isRead !== undefined
          ? "STATUS_CHANGE"
          : "UPDATE";

      await writeAudit({
        req,
        action,
        entity: "Notification",
        entityId: notification._id.toString(),
        description:
          action === "STATUS_CHANGE"
            ? `Notification "${notification.title}" read status changed to "${notification.isRead}"`
            : `Notification "${notification.title}" updated`,
        metadata: {
          notificationId:
            notification._id.toString(),
          title: notification.title,
          type: notification.type,
          isRead: notification.isRead,
          changes: req.body,
        },
      });

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
          String(req.params.id),
          req.user!._id.toString()
        );

      await writeAudit({
        req,
        action: "STATUS_CHANGE",
        entity: "Notification",
        entityId: notification._id.toString(),
        description:
          `Notification "${notification.title}" marked as read`,
        metadata: {
          notificationId:
            notification._id.toString(),
          title: notification.title,
          isRead: notification.isRead,
        },
      });

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
      const authenticatedUserId =
        req.user!._id.toString();

      await notificationService.markAllAsRead(
        authenticatedUserId
      );

      await writeAudit({
        req,
        action: "STATUS_CHANGE",
        entity: "Notification",
        description:
          "All notifications marked as read",
        metadata: {
          userId: authenticatedUserId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "All notifications marked as read",
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
      const notification =
        await notificationService.delete(
          String(req.params.id),
          req.user!._id.toString()
        );

      await writeAudit({
        req,
        action: "DELETE",
        entity: "Notification",
        entityId: notification._id.toString(),
        description:
          `Notification "${notification.title}" deleted`,
        metadata: {
          notificationId:
            notification._id.toString(),
          title: notification.title,
          type: notification.type,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
