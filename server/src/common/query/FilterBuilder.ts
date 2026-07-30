export class FilterBuilder {
  static build(
    filters: Record<string, unknown>
  ) {
    const query: Record<string, unknown> = {};

    Object.entries(filters).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          query[key] = value;
        }
      }
    );

    return query;
  }
}