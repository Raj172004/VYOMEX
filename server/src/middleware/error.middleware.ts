import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("========== ERROR ==========");
  console.error(error);
  console.error("===========================");

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}