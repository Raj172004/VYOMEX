import { z } from "zod";

export const projectIdParamsSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(
      /^[a-fA-F0-9]{24}$/,
      "Invalid project ID"
    ),
});

export type ProjectIdParamsDto =
  z.infer<typeof projectIdParamsSchema>;
