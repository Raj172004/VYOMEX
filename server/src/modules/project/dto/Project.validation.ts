import { z } from "zod";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title is required")
    .max(
      150,
      "Project title cannot exceed 150 characters"
    ),

  description: z
    .string()
    .trim()
    .max(
      2000,
      "Project description cannot exceed 2000 characters"
    )
    .optional(),

  client: z
    .string()
    .trim()
    .regex(
      objectIdRegex,
      "Invalid client ID"
    ),

  status: z
    .enum([
      "planning",
      "active",
      "completed",
      "on-hold",
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

  budget: z
    .number()
    .finite("Budget must be a valid number")
    .nonnegative("Budget cannot be negative")
    .optional(),

  startDate: z
    .string()
    .trim()
    .regex(
      dateRegex,
      "Start date must use YYYY-MM-DD format"
    ),

  endDate: z
    .string()
    .trim()
    .regex(
      dateRegex,
      "End date must use YYYY-MM-DD format"
    ),

  assignedTo: z
    .array(
      z
        .string()
        .trim()
        .regex(
          objectIdRegex,
          "Invalid assigned user ID"
        )
    )
    .optional(),
});
