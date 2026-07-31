import {
  Schema,
  model,
  Document,
  Types,
} from "mongoose";

export interface INotificationDocument
  extends Document {
  title: string;

  message: string;

  type:
    | "success"
    | "info"
    | "warning"
    | "error";

  isRead: boolean;

  user?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const NotificationSchema =
  new Schema<INotificationDocument>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "success",
          "info",
          "warning",
          "error",
        ],
        default: "info",
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    },
    {
      timestamps: true,
    }
  );

export const Notification =
  model<INotificationDocument>(
    "Notification",
    NotificationSchema
  );

export default Notification;