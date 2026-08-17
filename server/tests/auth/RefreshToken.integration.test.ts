import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../src/app";
import { env } from "../../src/config/env";

describe("Auth Refresh Token Security", () => {

  it("should reject refresh when cookie is missing", async () => {
    const response = await request(app)
      .post("/api/auth/refresh");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject an invalid refresh token cookie", async () => {
    const response = await request(app)
      .post("/api/auth/refresh")
      .set(
        "Cookie",
        "vyomex_refresh_token=invalid-refresh-token"
      );

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject an access token used as refresh token", async () => {
    const accessToken = jwt.sign(
      {
        id: "test-user",
        email: "test@example.com",
        role: "admin",
      },
      env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const response = await request(app)
      .post("/api/auth/refresh")
      .set(
        "Cookie",
        `vyomex_refresh_token=${accessToken}`
      );

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

});
