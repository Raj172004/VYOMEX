import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";

import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

export type ClientStatus = "active" | "inactive";

export interface Client {
  _id: string;

  firstName: string;
  lastName: string;

  company: string;
  email: string;

  phone?: string;
  website?: string;

  industry?: string;
  address?: string;
  city?: string;
  country?: string;

  status: ClientStatus;
  notes?: string;

  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientPayload {
  firstName: string;
  lastName: string;

  company: string;
  email: string;

  phone?: string;
  website?: string;

  industry?: string;
  address?: string;
  city?: string;
  country?: string;

  status?: ClientStatus;
  notes?: string;
}

export type UpdateClientPayload =
  Partial<CreateClientPayload>;

export const ClientService = {
  create(data: CreateClientPayload) {
    return api.post<ApiResponse<Client>>(
      API_ENDPOINTS.clients.base,
      data
    );
  },

  getAll() {
    return api.get<ApiListResponse<Client>>(
      API_ENDPOINTS.clients.base
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Client>>(
      API_ENDPOINTS.clients.byId(id)
    );
  },

  update(
    id: string,
    data: UpdateClientPayload
  ) {
    return api.put<ApiResponse<Client>>(
      API_ENDPOINTS.clients.byId(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<DeleteResponse>(
      API_ENDPOINTS.clients.byId(id)
    );
  },
};