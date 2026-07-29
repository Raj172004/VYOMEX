export interface QueryOptions {
  page?: number;

  limit?: number;

  search?: string;

  sortBy?: string;

  order?: "asc" | "desc";
}