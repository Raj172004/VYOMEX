import { z } from "zod";

export const updateProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title cannot be empty")
    .max(150, "Project title cannot exceed 150 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, "Project description cannot exceed 2000 characters")
    .optional(),

  client: z
    .string()
    .trim()
    .min(1, "Client ID cannot be empty")
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
    .nonnegative("Budget cannot be negative")
    .optional(),

  startDate: z
    .string()
    .min(1, "Start date cannot be empty")
    .optional(),

  endDate: z
    .string()
    .min(1, "End date cannot be empty")
    .optional(),

  assignedTo: z
    .array(z.string().min(1))
    .optional(),
});

export type UpdateProjectValidationDto =
  z.infer<typeof updateProjectSchema>;
