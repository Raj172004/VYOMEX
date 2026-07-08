import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must contain at least 2 characters")
      .max(50),

    lastName: z
      .string()
      .min(2, "Last name must contain at least 2 characters")
      .max(50),

    email: z
      .string()
      .email("Invalid email address")
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;