import { Types } from "mongoose";

import { BaseRepository } from "../../../common/database/BaseRepository";
import { QueryBuilder } from "../../../common/query/QueryBuilder";
import { SearchBuilder } from "../../../common/query/SearchBuilder";
import { FilterBuilder } from "../../../common/query/FilterBuilder";

import {
  Invoice,
  InvoiceDocument,
} from "../models/Invoice.model";

import { CreateInvoiceDto } from "../dto/CreateInvoice.dto";
import { UpdateInvoiceDto } from "../dto/UpdateInvoice.dto";
import { InvoiceQueryDto } from "../dto/InvoiceQuery.dto";

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

  async searchInvoices(
    query: InvoiceQueryDto
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      client,
      project,
      status,
      invoiceNumber,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const pagination = QueryBuilder.build({
      page,
      limit,
      sortBy,
      order,
    });

    const searchFilter = SearchBuilder.build(
      search,
      ["invoiceNumber"]
    );

    const filters = FilterBuilder.build({
      client,
      project,
      status,
      invoiceNumber,
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
      [
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
      ]
    );
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