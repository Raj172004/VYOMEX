import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  estimatedHours?: number;
  dueDate?: string;
  project?: string;
  assignedTo?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export type CreateTaskPayload = Omit<
  Task,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

export const TaskService = {
  create(data: CreateTaskPayload) {
    return api.post<ApiResponse<Task>>(
      API_ENDPOINTS.tasks.base,
      data
    );
  },

  getAll() {
    return api.get<ApiListResponse<Task>>(
      API_ENDPOINTS.tasks.base
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Task>>(
      API_ENDPOINTS.tasks.byId(id)
    );
  },

  update(id: string, data: UpdateTaskPayload) {
    return api.put<ApiResponse<Task>>(
      API_ENDPOINTS.tasks.byId(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<DeleteResponse>(
      API_ENDPOINTS.tasks.byId(id)
    );
  },
};