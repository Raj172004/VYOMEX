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
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    let query: any = this.model.find(options?.filter ?? {});

    if (options?.populate) {
      query = query.populate(options.populate);
    }

    if (options?.sort) {
      query = query.sort(options.sort);
    }

    if (options?.select) {
      query = query.select(options.select);
    }

    return query.exec();
  }

  async findById(
    id: string,
    options?: Omit<FindOptions, "filter">
  ): Promise<T | null> {
    let query: any = this.model.findById(id);

    if (options?.populate) {
      query = query.populate(options.populate);
    }

    if (options?.select) {
      query = query.select(options.select);
    }

    return query.exec();
  }

  async findOne(
    filter: Record<string, any>
  ): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async update(
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async exists(
    filter: Record<string, any>
  ): Promise<boolean> {
    const result = await this.model.exists(filter);
    return result !== null;
  }

  async count(
    filter: Record<string, any> = {}
  ): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}