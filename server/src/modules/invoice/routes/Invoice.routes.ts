import { Router } from "express";

import { invoiceController } from "../controllers/Invoice.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  invoiceController.createInvoice.bind(invoiceController)
);

router.get(
  "/",
  authenticate,
  invoiceController.getInvoices.bind(invoiceController)
);

router.get(
  "/:id",
  authenticate,
  invoiceController.getInvoiceById.bind(invoiceController)
);

router.put(
  "/:id",
  authenticate,
  invoiceController.updateInvoice.bind(invoiceController)
);

router.delete(
  "/:id",
  authenticate,
  invoiceController.deleteInvoice.bind(invoiceController)
);

export default router;