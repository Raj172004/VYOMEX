import {
  Request,
  Response,
  NextFunction,
} from "express";

import { invoiceService } from "../services/Invoice.service";

export class InvoiceController {
  async createInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createdBy = req.user!._id;

      const invoice =
        await invoiceService.createInvoice(
          req.body,
          createdBy
        );

      return res.status(201).json({
        success: true,
        message: "Invoice created successfully.",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInvoices(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const hasQuery =
        Object.keys(req.query).length > 0;

      const invoices = hasQuery
        ? await invoiceService.searchInvoices(
            req.query as any
          )
        : await invoiceService.getInvoices();

      return res.status(200).json({
        success: true,
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const invoice =
        await invoiceService.getInvoiceById(
          req.params.id as string
        );

      return res.status(200).json({
        success: true,
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const invoice =
        await invoiceService.updateInvoice(
          req.params.id as string,
          req.body
        );

      return res.status(200).json({
        success: true,
        message: "Invoice updated successfully.",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await invoiceService.deleteInvoice(
        req.params.id as string
      );

      return res.status(200).json({
        success: true,
        message: "Invoice deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const invoiceController =
  new InvoiceController();