import {
  Document,
  Model,
  PopulateOptions,
  UpdateQuery,
} from "mongoose";

export interface FindOptions {
  filter?: Record<string, any>;

  populate?:
    | string
    | string[]
    | PopulateOptions
    | PopulateOptions[];

  sort?: Record<string, 1 | -1>;

  select?: string;

  page?: number;

  limit?: number;

  skip?: number;
}

export class BaseRepository<T extends Document> {
  constructor(
    protected readonly model: Model<T>
  ) {}

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async findAll(options?: FindOptions) {
    let query: any = this.model.find(
      options?.filter ?? {}
    );

    if (options?.populate) {
      query = query.populate(
        options.populate
      );
    }

    if (options?.sort) {
      query = query.sort(options.sort);
    }

    if (options?.select) {
      query = query.select(
        options.select
      );
    }

    if (options?.skip !== undefined) {
      query = query.skip(options.skip);
    }

    if (options?.limit !== undefined) {
      query = query.limit(
        options.limit
      );
    }

    return query.exec();
  }

  async findById(
    id: string,
    options?: Omit<
      FindOptions,
      "filter"
    >
  ) {
    let query: any =
      this.model.findById(id);

    if (options?.populate) {
      query = query.populate(
        options.populate
      );
    }

    if (options?.select) {
      query = query.select(
        options.select
      );
    }

    return query.exec();
  }

  async findOne(
    filter: Record<string, any>
  ) {
    return this.model
      .findOne(filter)
      .exec();
  }

  async update(
    id: string,
    data: UpdateQuery<T>
  ) {
    return this.model
      .findByIdAndUpdate(
        id,
        data,
        {
          returnDocument: "after",
          runValidators: true,
        }
      )
      .exec();
  }

  async delete(id: string) {
    return this.model
      .findByIdAndDelete(id)
      .exec();
  }

  async exists(
    filter: Record<string, any>
  ) {
    return this.model.exists(filter);
  }

  async count(
    filter: Record<string, any> = {}
  ) {
    return this.model
      .countDocuments(filter)
      .exec();
  }

  async paginate(
    filter: Record<string, any>,
    page = 1,
    limit = 10,
    sort: Record<string, 1 | -1> = {
      createdAt: -1,
    },
    populate?:
      | string
      | string[]
      | PopulateOptions
      | PopulateOptions[]
  ) {
    const normalizedPage = Math.max(
      1,
      Math.floor(
        Number(page) || 1
      )
    );

    const normalizedLimit = Math.min(
      100,
      Math.max(
        1,
        Math.floor(
          Number(limit) || 10
        )
      )
    );

    const skip =
      (normalizedPage - 1) *
      normalizedLimit;

    let query: any =
      this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(normalizedLimit);

    if (populate) {
      query = query.populate(
        populate
      );
    }

    const [data, total] =
      await Promise.all([
        query.exec(),
        this.model.countDocuments(
          filter
        ),
      ]);

    const totalPages =
      total === 0
        ? 0
        : Math.ceil(
            total / normalizedLimit
          );

    return {
      data,
      total,
      page: normalizedPage,
      limit: normalizedLimit,
      totalPages,
      hasNextPage:
        normalizedPage <
        totalPages,
      hasPreviousPage:
        normalizedPage > 1 &&
        total > 0,
    };
  }
}
