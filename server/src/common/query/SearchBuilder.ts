export class SearchBuilder {
  private static escapeRegex(value: string) {
    return value.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
  }

  static build(
    search: string | undefined,
    fields: string[]
  ) {
    if (!search) {
      return {};
    }

    const escapedSearch =
      this.escapeRegex(search.trim());

    if (!escapedSearch) {
      return {};
    }

    return {
      $or: fields.map((field) => ({
        [field]: {
          $regex: escapedSearch,
          $options: "i",
        },
      })),
    };
  }
}
