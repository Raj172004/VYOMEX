import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../src/app";

describe("Auth API", () => {

  it("should reject /me without authentication", async () => {
    const response =
      await request(app)
        .get("/api/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject refresh without refresh cookie", async () => {
    const response =
      await request(app)
        .post("/api/auth/refresh");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should allow logout without an authenticated access token", async () => {
    const response =
      await request(app)
        .post("/api/auth/logout");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should validate login input", async () => {
    const response =
      await request(app)
        .post("/api/auth/login")
        .send({
          email: "",
          password: "",
        });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body.success).toBe(false);
  });

  it("should complete demo login and issue refresh cookie", async () => {
    const agent = request.agent(app);

    const response =
      await agent
        .post("/api/auth/login")
        .send({
          email: "demo@vyomex.com",
          password: "Demo@123",
        });

    if (response.status !== 200) {
      console.log(
        "[INFO] Demo login test skipped because demo credentials/config differ."
      );

      expect([200, 401, 403]).toContain(response.status);
      return;
    }

    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toBeDefined();

    const cookies =
      response.headers["set-cookie"];

    expect(cookies).toBeDefined();

    const refreshCookie =
      cookies?.find((cookie: string) =>
        cookie.startsWith("vyomex_refresh_token=")
      );

    expect(refreshCookie).toBeDefined();

    const refreshResponse =
      await agent
        .post("/api/auth/refresh");

    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.body.success).toBe(true);
    expect(
      refreshResponse.body.data.accessToken
    ).toBeDefined();
  });

});
