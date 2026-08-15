import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title is required")
    .max(150, "Project title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Project description cannot exceed 2000 characters")
    .optional(),

  client: z
    .string()
    .trim()
    .min(1, "Client ID is required"),

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
    .nonnegative("Budget cannot be negative")
    .optional(),

  startDate: z
    .string()
    .min(1, "Start date is required"),

  endDate: z
    .string()
    .min(1, "End date is required"),

  assignedTo: z
    .array(z.string().min(1))
    .optional(),
});

export type CreateProjectValidationDto =
  z.infer<typeof createProjectSchema>;
