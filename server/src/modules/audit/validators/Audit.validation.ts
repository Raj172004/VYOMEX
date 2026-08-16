import { z } from "zod";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export const auditIdParamsSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(objectIdRegex, "Invalid audit ID"),
});

export const auditQuerySchema = z.object({
  actor: z
    .string()
    .trim()
    .regex(objectIdRegex, "Invalid actor ID")
    .optional(),

  action: z
    .enum([
      "CREATE",
      "UPDATE",
      "DELETE",
      "LOGIN",
      "LOGOUT",
      "PASSWORD_CHANGE",
      "STATUS_CHANGE",
      "UPLOAD",
      "DOWNLOAD",
    ])
    .optional(),

  entity: z
    .string()
    .trim()
    .max(100, "Entity cannot exceed 100 characters")
    .optional(),

  entityId: z
    .string()
    .trim()
    .regex(objectIdRegex, "Invalid entity ID")
    .optional(),
});
