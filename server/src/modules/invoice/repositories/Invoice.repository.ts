import { Types } from "mongoose";

import { BaseRepository } from "../../../common/database/BaseRepository";

import {
  Invoice,
  InvoiceDocument,
} from "../models/Invoice.model";

import { CreateInvoiceDto } from "../dto/CreateInvoice.dto";
import { UpdateInvoiceDto } from "../dto/UpdateInvoice.dto";

class InvoiceRepository extends BaseRepository<InvoiceDocument> {
  constructor() {
    super(Invoice);
  }

  async createInvoice(
  data: CreateInvoiceDto,
  createdBy: Types.ObjectId
) {
  return this.create({
    invoiceNumber: data.invoiceNumber,

    client: new Types.ObjectId(data.client),

    project: data.project
      ? new Types.ObjectId(data.project)
      : undefined,

    issueDate: data.issueDate,

    dueDate: data.dueDate,

    items: data.items,

    subtotal: data.subtotal,

    tax: data.tax,

    discount: data.discount,

    total: data.total,

    status: data.status,

    createdBy,
  } as Partial<InvoiceDocument>);
}

  async getAllInvoices() {
    return this.findAll({
      populate: [
        {
          path: "client",
        },
        {
          path: "project",
        },
        {
          path: "createdBy",
          select: "-password",
        },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }

  async getInvoiceById(id: string) {
    return this.findById(id, {
      populate: [
        {
          path: "client",
        },
        {
          path: "project",
        },
        {
          path: "createdBy",
          select: "-password",
        },
      ],
    });
  }

  async updateInvoice(
    id: string,
    data: UpdateInvoiceDto
  ) {
    const updateData: Record<string, unknown> = {
      ...data,
    };

    if (data.client) {
      updateData.client = new Types.ObjectId(
        data.client
      );
    }

    if (data.project) {
      updateData.project = new Types.ObjectId(
        data.project
      );
    }

    return this.update(
      id,
      updateData as Partial<InvoiceDocument>
    );
  }

  async deleteInvoice(id: string) {
    return this.delete(id);
  }

  async findByInvoiceNumber(
    invoiceNumber: string
  ) {
    return this.findOne({
      invoiceNumber,
    });
  }

  async findByClient(clientId: string) {
    return this.findAll({
      filter: {
        client: new Types.ObjectId(clientId),
      },
      populate: [
        {
          path: "client",
        },
        {
          path: "project",
        },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }
}

export default new InvoiceRepository();