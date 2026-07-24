import { ApiError } from "../../../utils/ApiError";
import { CreateClientDto } from "../dto/CreateClient.dto";
import { UpdateClientDto } from "../dto/UpdateClient.dto";
import clientRepository from "../repositories/Client.repository";

class ClientService {
  async createClient(
    data: CreateClientDto,
    userId: string
  ) {
    const existing = await clientRepository.findAll();

    const emailExists = existing.find(
      (client) => client.email === data.email
    );

    if (emailExists) {
      throw new ApiError(400, "Client email already exists");
    }

    return clientRepository.create({
      ...data,
      createdBy: userId as any,
    });
  }

  async getClients() {
    return clientRepository.findAll();
  }

  async getClientById(id: string) {
    const client = await clientRepository.findById(id);

    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return client;
  }

  async updateClient(
    id: string,
    data: UpdateClientDto
  ) {
    const client = await clientRepository.update(id, data);

    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return client;
  }

  async deleteClient(id: string) {
    const client = await clientRepository.delete(id);

    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return;
  }
}

export default new ClientService();