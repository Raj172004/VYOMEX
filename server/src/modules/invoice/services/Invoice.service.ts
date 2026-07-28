import { Types } from "mongoose";

import { CreateInvoiceDto } from "../dto/CreateInvoice.dto";
import { UpdateInvoiceDto } from "../dto/UpdateInvoice.dto";
import { invoiceRepository } from "../repositories/Invoice.repository";

export class InvoiceService {
  async createInvoice(
    data: CreateInvoiceDto,
    createdBy: Types.ObjectId
  ) {
    return invoiceRepository.create(data, createdBy);
  }

  async getInvoices() {
    return invoiceRepository.findAll();
  }

  async getInvoiceById(id: string) {
    return invoiceRepository.findById(id);
  }

  async updateInvoice(
    id: string,
    data: UpdateInvoiceDto
  ) {
    return invoiceRepository.update(id, data);
  }

  async deleteInvoice(id: string) {
    return invoiceRepository.delete(id);
  }
}

export const invoiceService = new InvoiceService();