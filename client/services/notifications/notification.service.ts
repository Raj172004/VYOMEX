import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const NotificationService = {
  create(data: {
    title: string;
    message: string;
    type?: Notification["type"];
    user?: string;
  }) {
    return api.post<ApiResponse<Notification>>(
      API_ENDPOINTS.notifications.base,
      data
    );
  },

  getAll() {
    return api.get<ApiListResponse<Notification>>(
      API_ENDPOINTS.notifications.base
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Notification>>(
      API_ENDPOINTS.notifications.byId(id)
    );
  },

  getByUser(userId: string) {
    return api.get<ApiListResponse<Notification>>(
      API_ENDPOINTS.notifications.byUser(userId)
    );
  },

  markAsRead(id: string) {
    return api.patch<ApiResponse<Notification>>(
      API_ENDPOINTS.notifications.markAsRead(id)
    );
  },

  markAllAsRead() {
    return api.patch<ApiResponse<null>>(
      API_ENDPOINTS.notifications.markAllAsRead()
    );
  },

  getUnreadCount(userId: string) {
    return api.get<ApiResponse<{ unread: number }>>(
      API_ENDPOINTS.notifications.unreadCount(userId)
    );
  },

  delete(id: string) {
    return api.delete<DeleteResponse>(
      API_ENDPOINTS.notifications.byId(id)
    );
  },
};
