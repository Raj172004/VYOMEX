import { BaseRepository } from "../../../common/database/BaseRepository";
import { QueryBuilder } from "../../../common/query/QueryBuilder";
import { SearchBuilder } from "../../../common/query/SearchBuilder";
import { FilterBuilder } from "../../../common/query/FilterBuilder";

import ClientModel, {
  IClient,
} from "../models/Client.model";

import { ClientQueryDto } from "../dto/ClientQuery.dto";

class ClientRepository extends BaseRepository<IClient> {
  constructor() {
    super(ClientModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findByCompany(company: string) {
    return this.findOne({ company });
  }

  async getAllClients() {
    return this.findAll({
      populate: "createdBy",
      sort: {
        createdAt: -1,
      },
    });
  }

  async getClientById(id: string) {
    return this.findById(id, {
      populate: "createdBy",
    });
  }

  async updateClient(
    id: string,
    data: Partial<IClient>
  ) {
    return this.update(id, data);
  }

  async deleteClient(id: string) {
    return this.delete(id);
  }

  async searchClients(
    query: ClientQueryDto
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      company,
      email,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const pagination = QueryBuilder.build({
      page,
      limit,
      sortBy,
      order,
    });

    const searchFilter = SearchBuilder.build(search, [
      "name",
      "company",
      "email",
    ]);

    const filters = FilterBuilder.build({
      company,
      email,
    });

    const filter: Record<string, unknown> = {
      ...searchFilter,
      ...filters,
    };

    return this.paginate(
      filter,
      pagination.page,
      pagination.limit,
      pagination.sort,
      "createdBy"
    );
  }
}

export default new ClientRepository();