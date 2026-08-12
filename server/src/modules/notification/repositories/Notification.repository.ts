import Notification from "../models/Notification.model";

import {
  CreateNotificationDto,
} from "../dto/CreateNotification.dto";

import {
  UpdateNotificationDto,
} from "../dto/UpdateNotification.dto";

class NotificationRepository {
  async create(
    data: CreateNotificationDto
  ) {
    return Notification.create(data);
  }

  async findAll() {
    return Notification.find()
      .populate("user")
      .sort({
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return Notification.findById(id).populate(
      "user"
    );
  }

  async findByIdForUser(
    id: string,
    userId: string
  ) {
    return Notification.findOne({
      _id: id,
      user: userId,
    }).populate("user");
  }

  async findByUser(userId: string) {
    return Notification.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  }

  async update(
    id: string,
    data: UpdateNotificationDto
  ) {
    return Notification.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateForUser(
    id: string,
    userId: string,
    data: UpdateNotificationDto
  ) {
    return Notification.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async markAsRead(id: string) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  }

  async markAsReadForUser(
    id: string,
    userId: string
  ) {
    return Notification.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  }

  async markAllAsRead(userId: string) {
    return Notification.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );
  }

  async delete(id: string) {
    return Notification.findByIdAndDelete(
      id
    );
  }

  async deleteForUser(
    id: string,
    userId: string
  ) {
    return Notification.findOneAndDelete({
      _id: id,
      user: userId,
    });
  }

  async countUnread(userId: string) {
    return Notification.countDocuments({
      user: userId,
      isRead: false,
    });
  }
}

export default new NotificationRepository();
