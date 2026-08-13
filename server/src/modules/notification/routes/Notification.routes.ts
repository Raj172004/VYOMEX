import { Router } from "express";

import notificationController from "../controllers/Notification.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

import {
  validateCreateNotification,
  validateUpdateNotification,
  validateNotificationId,
  validateNotificationUserId,
} from "../validators/Notification.validator";

const router = Router();

router.post(
  "/",
  authenticate,
  validateCreateNotification,
  notificationController.create.bind(
    notificationController
  )
);

router.get(
  "/",
  authenticate,
  notificationController.findAll.bind(
    notificationController
  )
);

/**
 * IMPORTANT:
 * Static routes must come before "/:id".
 */
router.patch(
  "/read-all",
  authenticate,
  notificationController.markAllAsRead.bind(
    notificationController
  )
);

router.get(
  "/user/:userId",
  authenticate,
  validateNotificationUserId,
  notificationController.findByUser.bind(
    notificationController
  )
);

router.get(
  "/user/:userId/unread-count",
  authenticate,
  validateNotificationUserId,
  notificationController.countUnread.bind(
    notificationController
  )
);

router.get(
  "/:id",
  authenticate,
  validateNotificationId,
  notificationController.findById.bind(
    notificationController
  )
);

router.patch(
  "/:id/read",
  authenticate,
  validateNotificationId,
  notificationController.markAsRead.bind(
    notificationController
  )
);

router.patch(
  "/:id",
  authenticate,
  validateNotificationId,
  validateUpdateNotification,
  notificationController.update.bind(
    notificationController
  )
);

router.delete(
  "/:id",
  authenticate,
  validateNotificationId,
  notificationController.delete.bind(
    notificationController
  )
);

export default router;
