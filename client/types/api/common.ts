export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: PaginationMeta;
  message?: string;
}

export interface IdEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}