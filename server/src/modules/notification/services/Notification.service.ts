import notificationRepository from "../repositories/Notification.repository";

import { CreateNotificationDto } from "../dto/CreateNotification.dto";
import { UpdateNotificationDto } from "../dto/UpdateNotification.dto";

import { ApiError } from "../../../utils/ApiError";
import { emitToUser } from "../../../socket/socket";

class NotificationService {
  async create(data: CreateNotificationDto) {
    const notification =
      await notificationRepository.create(data);

    if (data.user) {
      emitToUser(
        data.user,
        "notification:new",
        notification
      );
    }

    return notification;
  }

  async findAll(userId: string) {
    return notificationRepository.findByUser(userId);
  }

  async findById(
    id: string,
    userId: string
  ) {
    const notification =
      await notificationRepository.findByIdForUser(
        id,
        userId
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    return notification;
  }

  async findByUser(userId: string) {
    return notificationRepository.findByUser(
      userId
    );
  }

  async update(
    id: string,
    userId: string,
    data: UpdateNotificationDto
  ) {
    const notification =
      await notificationRepository.updateForUser(
        id,
        userId,
        data
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    return notification;
  }

  async markAsRead(
    id: string,
    userId: string
  ) {
    const notification =
      await notificationRepository.markAsReadForUser(
        id,
        userId
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    return notification;
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(
      userId
    );
  }

  async countUnread(userId: string) {
    return notificationRepository.countUnread(
      userId
    );
  }

  async delete(
    id: string,
    userId: string
  ) {
    const notification =
      await notificationRepository.deleteForUser(
        id,
        userId
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    return notification;
  }
}

export default new NotificationService();
