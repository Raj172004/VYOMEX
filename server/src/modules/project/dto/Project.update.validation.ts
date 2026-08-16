import { z } from "zod";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const updateProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      1,
      "Project title cannot be empty"
    )
    .max(
      150,
      "Project title cannot exceed 150 characters"
    )
    .optional(),

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
    )
    .optional(),

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
    )
    .optional(),

  endDate: z
    .string()
    .trim()
    .regex(
      dateRegex,
      "End date must use YYYY-MM-DD format"
    )
    .optional(),

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
