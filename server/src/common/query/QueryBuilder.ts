export interface QueryBuilderOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export class QueryBuilder {
  static build(options: QueryBuilderOptions) {
    const page = Math.max(1, Number(options.page) || 1);

    const limit = Math.max(1, Number(options.limit) || 10);

    const skip = (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {
      [options.sortBy || "createdAt"]:
        options.order === "asc" ? 1 : -1,
    };

    return {
      page,
      limit,
      skip,
      sort,
    };
  }
}