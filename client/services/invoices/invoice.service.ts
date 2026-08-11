import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import {
  ApiListResponse,
  ApiResponse,
  DeleteResponse,
} from "@/types/api/common";

export interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  client: string;
  project?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  status?: "draft" | "sent" | "paid" | "overdue";
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export type CreateInvoicePayload = Omit<
  Invoice,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateInvoicePayload =
  Partial<CreateInvoicePayload>;

export const InvoiceService = {
  create(data: CreateInvoicePayload) {
    return api.post<ApiResponse<Invoice>>(
      API_ENDPOINTS.invoices.base,
      data
    );
  },

  getAll(params?: Record<string, string | number>) {
    return api.get<ApiListResponse<Invoice>>(
      API_ENDPOINTS.invoices.base,
      { params }
    );
  },

  getById(id: string) {
    return api.get<ApiResponse<Invoice>>(
      API_ENDPOINTS.invoices.byId(id)
    );
  },

  update(id: string, data: UpdateInvoicePayload) {
    return api.put<ApiResponse<Invoice>>(
      API_ENDPOINTS.invoices.byId(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<DeleteResponse>(
      API_ENDPOINTS.invoices.byId(id)
    );
  },
};