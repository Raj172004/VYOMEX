import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

export const verifyJWT = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        401,
        "Authentication required"
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    req.user = {
      _id: decoded._id as any,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    next(
      new ApiError(
        401,
        "Invalid or expired token"
      )
    );
  }
};

/**
 * Backward compatibility
 * Existing routes can continue using `authenticate`
 */
export const authenticate = verifyJWT;