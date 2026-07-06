import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain at least 3 characters."),

  email: z
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters."),
});

export type RegisterSchema = z.infer<
  typeof registerSchema
>;