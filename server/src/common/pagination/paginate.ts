export class Pagination {
  static calculate(
    page = 1,
    limit = 10
  ) {
    page = Math.max(1, page);

    limit = Math.max(1, limit);

    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }
}