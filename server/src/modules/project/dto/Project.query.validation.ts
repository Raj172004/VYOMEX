import { z } from "zod";

export const projectQuerySchema = z.object({
  page: z
    .string()
    .regex(
      /^[1-9]\d*$/,
      "Page must be a positive number"
    )
    .transform(Number)
    .optional(),

  limit: z
    .string()
    .regex(
      /^[1-9]\d*$/,
      "Limit must be a positive number"
    )
    .refine(
      (value) => Number(value) <= 100,
      "Limit cannot exceed 100"
    )
    .transform(Number)
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

  client: z
    .string()
    .regex(
      /^[a-fA-F0-9]{24}$/,
      "Invalid client ID"
    )
    .optional(),

  search: z
    .string()
    .trim()
    .min(
      1,
      "Search query cannot be empty"
    )
    .max(
      150,
      "Search query cannot exceed 150 characters"
    )
    .optional(),

  sortBy: z
    .enum([
      "createdAt",
      "updatedAt",
      "title",
      "budget",
      "startDate",
      "endDate",
    ])
    .optional(),

  sortOrder: z
    .enum(["asc", "desc"])
    .optional(),
});

export type ProjectQueryValidationDto =
  z.infer<typeof projectQuerySchema>;
