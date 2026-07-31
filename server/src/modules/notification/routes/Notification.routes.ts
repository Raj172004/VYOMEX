import { Router } from "express";

import notificationController from "../controllers/Notification.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  notificationController.create.bind(notificationController)
);

router.get(
  "/",
  authenticate,
  notificationController.findAll.bind(notificationController)
);

router.get(
  "/:id",
  authenticate,
  notificationController.findById.bind(notificationController)
);

router.get(
  "/user/:userId",
  authenticate,
  notificationController.findByUser.bind(notificationController)
);

router.patch(
  "/:id",
  authenticate,
  notificationController.update.bind(notificationController)
);

router.patch(
  "/:id/read",
  authenticate,
  notificationController.markAsRead.bind(notificationController)
);

router.patch(
  "/user/:userId/read-all",
  authenticate,
  notificationController.markAllAsRead.bind(notificationController)
);

router.get(
  "/user/:userId/unread-count",
  authenticate,
  notificationController.countUnread.bind(notificationController)
);

router.delete(
  "/:id",
  authenticate,
  notificationController.delete.bind(notificationController)
);

export default router;