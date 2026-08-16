import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodSchema } from "zod";

import { ApiError } from "../../../utils/ApiError";

export const validateAuditQuery =
  (schema: ZodSchema) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      throw new ApiError(
        400,
        result.error.issues
          .map((issue) => issue.message)
          .join(", ")
      );
    }

    next();
  };

export const validateAuditParams =
  (schema: ZodSchema) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      throw new ApiError(
        400,
        result.error.issues
          .map((issue) => issue.message)
          .join(", ")
      );
    }

    next();
  };
