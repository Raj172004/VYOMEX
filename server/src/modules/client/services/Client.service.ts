import { ApiError } from "../../../utils/ApiError";

import { CreateClientDto } from "../dto/CreateClient.dto";
import { UpdateClientDto } from "../dto/UpdateClient.dto";

import clientRepository from "../repositories/Client.repository";

class ClientService {
  async createClient(
    data: CreateClientDto,
    userId: string
  ) {
    const existingClient =
      await clientRepository.findByEmail(data.email);

    if (existingClient) {
      throw new ApiError(
        400,
        "Client email already exists"
      );
    }

    return clientRepository.create({
      ...data,
      createdBy: userId as any,
    });
  }

  async getClients() {
    return clientRepository.getAllClients();
  }

  async getClientById(id: string) {
    const client =
      await clientRepository.getClientById(id);

    if (!client) {
      throw new ApiError(
        404,
        "Client not found"
      );
    }

    return client;
  }

  async updateClient(
    id: string,
    data: UpdateClientDto
  ) {
    const client =
      await clientRepository.updateClient(id, data);

    if (!client) {
      throw new ApiError(
        404,
        "Client not found"
      );
    }

    return client;
  }

  async deleteClient(id: string) {
    const client =
      await clientRepository.deleteClient(id);

    if (!client) {
      throw new ApiError(
        404,
        "Client not found"
      );
    }

    return {
      message: "Client deleted successfully",
    };
  }
}

export default new ClientService();