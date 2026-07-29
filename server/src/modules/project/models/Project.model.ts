import {
  Schema,
  model,
  Document,
  Types,
} from "mongoose";

export interface IProject extends Document {
  title: string;

  description: string;

  client: Types.ObjectId;

  status:
    | "planning"
    | "active"
    | "completed"
    | "on-hold";

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";

  budget: number;

  startDate: Date;

  endDate: Date;

  createdBy: Types.ObjectId;

  assignedTo: Types.ObjectId[];

  createdAt: Date;

  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "planning",
        "active",
        "completed",
        "on-hold",
      ],
      default: "planning",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
      ],
      default: "medium",
    },

    budget: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IProject>(
  "Project",
  ProjectSchema
);