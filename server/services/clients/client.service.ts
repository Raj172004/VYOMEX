import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";

export interface Client {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientResponse {
  success: boolean;
  data: Client;
  message?: string;
}

export interface ClientListResponse {
  success: boolean;
  data: Client[];
}

export const ClientService = {
  getAll(search = "") {
    const query = search.trim();

    return api.get<ClientListResponse>(
      query
        ? `${API_ENDPOINTS.clients.base}?search=${encodeURIComponent(query)}`
        : API_ENDPOINTS.clients.base
    );
  },

  getById(id: string) {
    return api.get<ClientResponse>(
      API_ENDPOINTS.clients.byId(id)
    );
  },

  create(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    website?: string;
    status?: string;
    notes?: string;
  }) {
    return api.post<ClientResponse>(
      API_ENDPOINTS.clients.base,
      data
    );
  },

  update(
    id: string,
    data: Partial<Client>
  ) {
    return api.patch<ClientResponse>(
      API_ENDPOINTS.clients.byId(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<ClientResponse>(
      API_ENDPOINTS.clients.byId(id)
    );
  },
};