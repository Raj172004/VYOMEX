import {
  Schema,
  model,
  Document,
  Types,
} from "mongoose";

export interface ITask extends Document {
  title: string;

  description: string;

  status:
    | "todo"
    | "in-progress"
    | "review"
    | "done";

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";

  estimatedHours: number;

  dueDate: Date;

  project: Types.ObjectId;

  assignedTo: Types.ObjectId;

  createdBy: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
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

    status: {
      type: String,
      enum: [
        "todo",
        "in-progress",
        "review",
        "done",
      ],
      default: "todo",
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

    estimatedHours: {
      type: Number,
      default: 0,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export default model<ITask>(
  "Task",
  TaskSchema
);