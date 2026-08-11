import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

export interface ProjectClient {
  _id: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;

  /*
   * When creating/updating a project this is a Client MongoDB ID.
   * When returned from the API it may be populated as a Client object.
   */
  client?: string | ProjectClient;

  status?:
    | "planning"
    | "active"
    | "completed"
    | "on-hold";

  priority?:
    | "low"
    | "medium"
    | "high"
    | "critical";

  budget?: number;
  startDate?: string;
  endDate?: string;
  createdBy?: string;
  assignedTo?: string[];
  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export type CreateProjectPayload = {
  title: string;
  description?: string;
  client: string;
  status?:
    | "planning"
    | "active"
    | "completed"
    | "on-hold";
  priority?:
    | "low"
    | "medium"
    | "high"
    | "critical";
  budget?: number;
  startDate: string;
  endDate: string;
  assignedTo?: string[];
};

export type UpdateProjectPayload =
  Partial<CreateProjectPayload>;

export const ProjectService = {
  create(data: CreateProjectPayload) {
    return api.post<ApiResponse<Project>>(
      API_ENDPOINTS.projects.base,
      data
    );
  },

  getAll() {
    return api.get<ApiListResponse<Project>>(
      API_ENDPOINTS.projects.base
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Project>>(
      API_ENDPOINTS.projects.byId(id)
    );
  },

  update(
    id: string,
    data: UpdateProjectPayload
  ) {
    return api.put<ApiResponse<Project>>(
      API_ENDPOINTS.projects.byId(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<DeleteResponse>(
      API_ENDPOINTS.projects.byId(id)
    );
  },
};
