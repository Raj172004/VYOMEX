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
          new: true,
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
    sort: Record<
      string,
      1 | -1
    > = {
      createdAt: -1,
    },
    populate?:
      | string
      | string[]
      | PopulateOptions
      | PopulateOptions[]
  ) {
    const skip =
      (page - 1) * limit;

    let query: any =
      this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

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

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
      hasNextPage:
        page * limit < total,
      hasPreviousPage:
        page > 1,
    };
  }
}