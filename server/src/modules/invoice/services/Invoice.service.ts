import { Types } from "mongoose";

import { CreateInvoiceDto } from "../dto/CreateInvoice.dto";
import { UpdateInvoiceDto } from "../dto/UpdateInvoice.dto";
import { InvoiceQueryDto } from "../dto/InvoiceQuery.dto";

import invoiceRepository from "../repositories/Invoice.repository";

export class InvoiceService {
  async createInvoice(
    data: CreateInvoiceDto,
    createdBy: Types.ObjectId
  ) {
    return invoiceRepository.createInvoice(
      data,
      createdBy
    );
  }

  async getInvoices() {
    return invoiceRepository.getAllInvoices();
  }

  async searchInvoices(
    query: InvoiceQueryDto
  ) {
    return invoiceRepository.searchInvoices(query);
  }

  async getInvoiceById(id: string) {
    return invoiceRepository.getInvoiceById(id);
  }

  async updateInvoice(
    id: string,
    data: UpdateInvoiceDto
  ) {
    return invoiceRepository.updateInvoice(
      id,
      data
    );
  }

  async deleteInvoice(id: string) {
    return invoiceRepository.deleteInvoice(id);
  }
}

export const invoiceService = new InvoiceService();