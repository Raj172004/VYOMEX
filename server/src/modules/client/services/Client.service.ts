import { ApiError } from "../../../utils/ApiError";

import { CreateClientDto } from "../dto/CreateClient.dto";
import { UpdateClientDto } from "../dto/UpdateClient.dto";
import { ClientQueryDto } from "../dto/ClientQuery.dto";

import clientRepository from "../repositories/Client.repository";
import notificationService from "../../notification/services/Notification.service";

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

    const client =
      await clientRepository.create({
        ...data,
        createdBy: userId as any,
      });

    console.log("\n========================================");
    console.log("✅ CLIENT CREATED");
    console.log("Client ID:", client._id);
    console.log("Company:", client.company);
    console.log("User ID:", userId);
    console.log("========================================");

    const notification =
      await notificationService.create({
        title: "New Client",
        message: `Client "${client.company}" has been created successfully.`,
        type: "success",
        isRead: false,
        user: userId,
      });

    console.log("\n========================================");
    console.log("✅ NOTIFICATION CREATED");
    console.log(notification);
    console.log("========================================\n");

    return client;
  }

  async getClients() {
    return clientRepository.getAllClients();
  }

  async searchClients(
    query: ClientQueryDto
  ) {
    return clientRepository.searchClients(query);
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
      await clientRepository.updateClient(
        id,
        data
      );

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