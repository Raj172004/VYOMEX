import { Schema, model, Document, Types } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  status: "active" | "inactive" | "lead";
  notes?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 180,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 40,
    },

    website: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    industry: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "lead"],
      default: "lead",
      index: true,
    },

    notes: {
      type: String,
      maxlength: 5000,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.index({
  owner: 1,
  email: 1,
});

clientSchema.index({
  owner: 1,
  status: 1,
});

clientSchema.index({
  owner: 1,
  createdAt: -1,
});

export default model<IClient>("Client", clientSchema);
