import { Types } from "mongoose";

import Client from "../models/Client.model";

interface ClientAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface ClientInput {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  address?: ClientAddress;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  status?: "active" | "inactive" | "lead";
  notes?: string;
}

class ClientService {
  async createClient(
    data: ClientInput,
    userId: string
  ) {
    const {
      city,
      state,
      country,
      postalCode,
      address,
      ...clientData
    } = data;

    const clientAddress: ClientAddress = {
      ...(address ?? {}),
      ...(city ? { city } : {}),
      ...(state ? { state } : {}),
      ...(country ? { country } : {}),
      ...(postalCode ? { postalCode } : {}),
    };

    return Client.create({
      ...clientData,
      owner: new Types.ObjectId(userId),
      address: clientAddress,
    });
  }

  async getClients(
    userId: string,
    search = ""
  ) {
    const owner =
      new Types.ObjectId(userId);

    const normalizedSearch =
      search.trim();

    const filter: Record<string, unknown> = {
      owner,
    };

    if (normalizedSearch) {
      filter.$or = [
        {
          firstName: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          company: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          email: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          "address.city": {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          "address.state": {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
        {
          "address.country": {
            $regex: normalizedSearch,
            $options: "i",
          },
        },
      ];
    }

    return Client.find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  async getClientById(
    id: string,
    userId: string
  ) {
    return Client.findOne({
      _id: id,
      owner: new Types.ObjectId(userId),
    }).exec();
  }

  async updateClient(
    id: string,
    userId: string,
    data: Partial<ClientInput>
  ) {
    const {
      city,
      state,
      country,
      postalCode,
      address,
      ...clientData
    } = data;

    const updateData: Record<string, unknown> = {
      ...clientData,
    };

    if (
      address !== undefined ||
      city !== undefined ||
      state !== undefined ||
      country !== undefined ||
      postalCode !== undefined
    ) {
      updateData.address = {
        ...(address ?? {}),
        ...(city !== undefined
          ? { city }
          : {}),
        ...(state !== undefined
          ? { state }
          : {}),
        ...(country !== undefined
          ? { country }
          : {}),
        ...(postalCode !== undefined
          ? { postalCode }
          : {}),
      };
    }

    return Client.findOneAndUpdate(
      {
        _id: id,
        owner: new Types.ObjectId(userId),
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();
  }

  async deleteClient(
    id: string,
    userId: string
  ) {
    return Client.findOneAndDelete({
      _id: id,
      owner: new Types.ObjectId(userId),
    }).exec();
  }
}

export default new ClientService();
