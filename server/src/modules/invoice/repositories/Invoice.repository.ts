import { Types } from "mongoose";

import { Invoice } from "../models/Invoice.model";
import { CreateInvoiceDto } from "../dto/CreateInvoice.dto";
import { UpdateInvoiceDto } from "../dto/UpdateInvoice.dto";

export class InvoiceRepository {
  async create(
    data: CreateInvoiceDto,
    createdBy: Types.ObjectId
  ) {
    return Invoice.create({
      ...data,
      createdBy,
    });
  }

  async findAll() {
    return Invoice.find()
      .populate("client")
      .populate("project")
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return Invoice.findById(id)
      .populate("client")
      .populate("project")
      .populate("createdBy", "-password");
  }

  async update(
    id: string,
    data: UpdateInvoiceDto
  ) {
    return Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("client")
      .populate("project")
      .populate("createdBy", "-password");
  }

  async delete(id: string) {
    return Invoice.findByIdAndDelete(id);
  }
}

export const invoiceRepository = new InvoiceRepository();