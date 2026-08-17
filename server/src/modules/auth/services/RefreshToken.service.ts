import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { ApiError } from "../../../utils/ApiError";

export interface RefreshTokenPayload {
  id: string;
  email: string;
  role: string;
  type: "refresh";
}

export function createRefreshToken(
  payload: Omit<RefreshTokenPayload, "type">
): string {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      ...payload,
      type: "refresh",
    },
    env.JWT_REFRESH_SECRET,
    options
  );
}

export function verifyRefreshToken(
  token: string
): RefreshTokenPayload {
  try {
    const decoded = jwt.verify(
      token,
      env.JWT_REFRESH_SECRET
    ) as RefreshTokenPayload;

    if (
      decoded.type !== "refresh" ||
      !decoded.id ||
      !decoded.email ||
      !decoded.role
    ) {
      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    return decoded;
  } catch {
    throw new ApiError(
      401,
      "Invalid or expired refresh token"
    );
  }
}
