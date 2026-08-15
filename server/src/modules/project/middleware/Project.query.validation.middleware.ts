import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodSchema } from "zod";

import { ApiError } from "../../../utils/ApiError";

export const validateProjectQuery =
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

    Object.assign(req.query, result.data);

    next();
  };
