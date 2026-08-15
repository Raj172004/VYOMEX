const ALLOWED_SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "title",
  "budget",
  "startDate",
  "endDate",
] as const;

type AllowedSortField =
  (typeof ALLOWED_SORT_FIELDS)[number];

export interface QueryBuilderOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export class QueryBuilder {
  static build(
    options: QueryBuilderOptions
  ) {
    const page = Math.max(
      1,
      Number(options.page) || 1
    );

    const requestedLimit =
      Number(options.limit) || 10;

    const limit = Math.min(
      100,
      Math.max(1, requestedLimit)
    );

    const sortBy =
      this.isAllowedSortField(
        options.sortBy
      )
        ? options.sortBy
        : "createdAt";

    const order =
      options.order === "asc"
        ? "asc"
        : "desc";

    const skip =
      (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {
      [sortBy]:
        order === "asc" ? 1 : -1,
    };

    return {
      page,
      limit,
      skip,
      sort,
    };
  }

  private static isAllowedSortField(
    value: string | undefined
  ): value is AllowedSortField {
    return (
      value !== undefined &&
      ALLOWED_SORT_FIELDS.includes(
        value as AllowedSortField
      )
    );
  }
}
