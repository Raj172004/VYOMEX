import mongoose, { Document, Schema } from "mongoose";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "PASSWORD_CHANGE"
  | "STATUS_CHANGE"
  | "UPLOAD"
  | "DOWNLOAD";

export interface IAudit extends Document {
  actor?: mongoose.Types.ObjectId;
  action: AuditAction;
  entity: string;
  entityId?: mongoose.Types.ObjectId;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const auditSchema = new Schema<IAudit>(
  {
    actor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "PASSWORD_CHANGE",
        "STATUS_CHANGE",
        "UPLOAD",
        "DOWNLOAD",
      ],
      required: true,
      index: true,
    },

    entity: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    ipAddress: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    userAgent: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

auditSchema.index({ createdAt: -1 });
auditSchema.index({ actor: 1, createdAt: -1 });
auditSchema.index({ entity: 1, entityId: 1, createdAt: -1 });

export const Audit = mongoose.model<IAudit>(
  "Audit",
  auditSchema
);

export default Audit;
