export class SearchBuilder {
  static build(
    search: string | undefined,
    fields: string[]
  ) {
    if (!search) {
      return {};
    }

    return {
      $or: fields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    };
  }
}