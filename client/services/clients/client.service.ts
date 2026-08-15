import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

import {
  Client,
  ClientStatus,
  ClientAddress,
  CreateClientPayload,
  UpdateClientPayload,
} from "@/types/client";

export type {
  Client,
  ClientStatus,
  ClientAddress,
  CreateClientPayload,
  UpdateClientPayload,
};

export type CreateClientInput = CreateClientPayload;

export const ClientService = {
  getAll(search?: string) {
    return api.get<ApiListResponse<Client>>(
      API_ENDPOINTS.clients.base,
      {
        params: search?.trim()
          ? { search: search.trim() }
          : undefined,
      }
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Client>>(
      API_ENDPOINTS.clients.byId(id)
    );
  },

  create(data: CreateClientPayload) {
    return api.post<ApiResponse<Client>>(
      API_ENDPOINTS.clients.base,
      data
    );
  },

  update(
    id: string,
    data: UpdateClientPayload
  ) {
    return api.patch<ApiResponse<Client>>(
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
