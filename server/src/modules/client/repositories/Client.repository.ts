import { BaseRepository } from "../../../common/database/BaseRepository";

import ClientModel, {
  IClient,
} from "../models/Client.model";

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
}

export default new ClientRepository();