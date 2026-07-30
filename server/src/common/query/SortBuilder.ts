export class SortBuilder {
  static build(
    field = "createdAt",
    order: "asc" | "desc" = "desc"
  ) {
    return {
      [field]: order === "asc" ? 1 : -1,
    };
  }
}