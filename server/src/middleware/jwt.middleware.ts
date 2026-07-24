import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
  id?: string;
  _id?: string;
  email?: string;
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
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    const userId = decoded._id ?? decoded.id;

    if (!userId) {
      throw new ApiError(401, "Invalid token payload");
    }

    req.user = {
      _id: new Types.ObjectId(userId),
      email: decoded.email ?? "",
      role: decoded.role,
    };

    next();
  } catch (error) {
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
 */
export const authenticate = verifyJWT;