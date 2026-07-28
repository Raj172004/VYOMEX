import { InvoiceStatus } from "../models/Invoice.model";

export interface CreateInvoiceItemDto {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CreateInvoiceDto {
  invoiceNumber: string;

  client: string;

  project?: string;

  issueDate: Date;

  dueDate: Date;

  items: CreateInvoiceItemDto[];

  subtotal: number;

  discount?: number;

  tax?: number;

  total: number;

  status?: InvoiceStatus;
}