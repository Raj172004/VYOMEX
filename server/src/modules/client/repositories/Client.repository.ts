import Client from "../models/Client.model";
import {
  CreateClientDto,
  UpdateClientDto,
} from "../dto/Client.dto";

class ClientRepository {
  async create(
    ownerId: string,
    data: CreateClientDto
  ) {
    return Client.create({
      ...data,
      owner: ownerId,
    });
  }

  async findAll(ownerId: string) {
    return Client.find({
      owner: ownerId,
    }).sort({
      createdAt: -1,
    });
  }

  async findById(
    id: string,
    ownerId: string
  ) {
    return Client.findOne({
      _id: id,
      owner: ownerId,
    });
  }

  async update(
    id: string,
    ownerId: string,
    data: UpdateClientDto
  ) {
    return Client.findOneAndUpdate(
      {
        _id: id,
        owner: ownerId,
      },
      data,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
  }

  async delete(
    id: string,
    ownerId: string
  ) {
    return Client.findOneAndDelete({
      _id: id,
      owner: ownerId,
    });
  }

  async count(
    ownerId: string,
    status?: string
  ) {
    const query: Record<string, unknown> = {
      owner: ownerId,
    };

    if (status) {
      query.status = status;
    }

    return Client.countDocuments(query);
  }
}

export default new ClientRepository();

