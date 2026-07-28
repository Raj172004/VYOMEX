import { Document, model, Schema, Types } from "mongoose";

export enum InvoiceStatus {
  DRAFT = "draft",
  SENT = "sent",
  PAID = "paid",
  OVERDUE = "overdue",
}

export interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceDocument extends Document {
  invoiceNumber: string;

  client: Types.ObjectId;

  project?: Types.ObjectId;

  issueDate: Date;

  dueDate: Date;

  items: InvoiceItem[];

  subtotal: number;

  discount: number;

  tax: number;

  total: number;

  status: InvoiceStatus;

  createdBy: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const InvoiceItemSchema = new Schema<InvoiceItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const InvoiceSchema = new Schema<InvoiceDocument>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },

    issueDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    items: {
      type: [InvoiceItemSchema],
      required: true,
      default: [],
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      default: InvoiceStatus.DRAFT,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice = model<InvoiceDocument>(
  "Invoice",
  InvoiceSchema
);