import { z } from "zod";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(150, "Task title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(
      2000,
      "Task description cannot exceed 2000 characters"
    )
    .optional(),

  status: z
    .enum([
      "todo",
      "in-progress",
      "review",
      "done",
    ])
    .optional(),

  priority: z
    .enum([
      "low",
      "medium",
      "high",
      "critical",
    ])
    .optional(),

  estimatedHours: z
    .number()
    .finite("Estimated hours must be a valid number")
    .nonnegative("Estimated hours cannot be negative")
    .max(
      100000,
      "Estimated hours value is too large"
    )
    .optional(),

  dueDate: z.coerce.date({
    error: "Due date must be a valid date",
  }),

  project: z
    .string()
    .trim()
    .regex(
      objectIdRegex,
      "Invalid project ID"
    ),

  assignedTo: z
    .string()
    .trim()
    .regex(
      objectIdRegex,
      "Invalid assigned user ID"
    ),
});
