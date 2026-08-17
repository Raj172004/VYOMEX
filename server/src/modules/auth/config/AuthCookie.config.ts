import { CookieOptions } from "express";

import { env } from "../../../config/env";

export const REFRESH_TOKEN_COOKIE =
  "vyomex_refresh_token";

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite:
    env.NODE_ENV === "production"
      ? "strict"
      : "lax",
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearRefreshTokenCookieOptions:
  CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite:
      env.NODE_ENV === "production"
        ? "strict"
        : "lax",
    path: "/api/auth",
  };
