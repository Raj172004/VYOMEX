import notificationRepository from "../repositories/Notification.repository";

import { CreateNotificationDto } from "../dto/CreateNotification.dto";
import { UpdateNotificationDto } from "../dto/UpdateNotification.dto";

import { ApiError } from "../../../utils/ApiError";

class NotificationService {
  async create(data: CreateNotificationDto) {
    return notificationRepository.create(data);
  }

  async findAll() {
    return notificationRepository.findAll();
  }

  async findById(id: string) {
    const notification =
      await notificationRepository.findById(id);

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
    data: UpdateNotificationDto
  ) {
    const notification =
      await notificationRepository.update(
        id,
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

  async markAsRead(id: string) {
    const notification =
      await notificationRepository.markAsRead(
        id
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    return notification;
  }

  async markAllAsRead(
    userId: string
  ) {
    return notificationRepository.markAllAsRead(
      userId
    );
  }

  async countUnread(
    userId: string
  ) {
    return notificationRepository.countUnread(
      userId
    );
  }

  async delete(id: string) {
    const notification =
      await notificationRepository.delete(id);

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