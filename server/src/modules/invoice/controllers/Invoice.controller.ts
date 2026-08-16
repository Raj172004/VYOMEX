import {
  Request,
  Response,
  NextFunction,
} from "express";

import { invoiceService } from "../services/Invoice.service";

import { writeAudit } from "../../audit/helpers/Audit.helper";

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

      await writeAudit({
        req,
        action: "CREATE",
        entity: "Invoice",
        entityId: invoice._id.toString(),
        description: `Invoice "${invoice.invoiceNumber}" created`,
        metadata: {
          invoiceId: invoice._id.toString(),
          invoiceNumber: invoice.invoiceNumber,
          client: invoice.client?.toString(),
          project: invoice.project?.toString(),
          total: invoice.total,
          status: invoice.status,
        },
      });

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

      if (!invoice) {
        return res.status(404).json({
          success: false,
          message: "Invoice not found.",
        });
      }

      const action =
        req.body.status !== undefined
          ? "STATUS_CHANGE"
          : "UPDATE";

      await writeAudit({
        req,
        action,
        entity: "Invoice",
        entityId: invoice._id.toString(),
        description:
          action === "STATUS_CHANGE"
            ? `Invoice "${invoice.invoiceNumber}" status changed to "${invoice.status}"`
            : `Invoice "${invoice.invoiceNumber}" updated`,
        metadata: {
          invoiceId: invoice._id.toString(),
          invoiceNumber: invoice.invoiceNumber,
          changes: req.body,
          status: invoice.status,
          total: invoice.total,
        },
      });

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
      const invoiceId =
        req.params.id as string;

      const invoice =
        await invoiceService.getInvoiceById(
          invoiceId
        );

      if (!invoice) {
        return res.status(404).json({
          success: false,
          message: "Invoice not found.",
        });
      }

      await invoiceService.deleteInvoice(
        invoiceId
      );

      await writeAudit({
        req,
        action: "DELETE",
        entity: "Invoice",
        entityId: invoiceId,
        description: `Invoice "${invoice.invoiceNumber}" deleted`,
        metadata: {
          invoiceId,
          invoiceNumber:
            invoice.invoiceNumber,
        },
      });

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
