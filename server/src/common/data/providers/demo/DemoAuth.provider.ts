import bcrypt from "bcrypt";

import {
  BaseDataProvider,
} from "../BaseDataProvider";

import {
  DataMode,
} from "../../DataProvider";

export interface DemoAuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class DemoAuthProvider
  extends BaseDataProvider {

  readonly mode: DataMode = "demo";

  private readonly users: DemoAuthUser[] = [
    {
      _id: "demo-user-001",
      firstName: "Rajesh",
      lastName: "Admin",
      email: "admin@vyomex.demo",

      /*
       * Demo password:
       * VYOMEX@12345
       *
       * This is only for development/demo mode.
       */
      password:
        "$2b$12$LQv3c1yqBWj5hJxKj1y3eOQ9QxW4m5hJ2g5K7z9x8y6w4v3u2t1s",

      role: "admin",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      _id: "demo-user-002",
      firstName: "Demo",
      lastName: "Manager",
      email: "manager@vyomex.demo",

      /*
       * Demo password:
       * VYOMEX@12345
       */
      password:
        "$2b$12$LQv3c1yqBWj5hJxKj1y3eOQ9QxW4m5hJ2g5K7z9x8y6w4v3u2t1s",

      role: "manager",
      isActive: true,
      createdAt: "2026-01-05T00:00:00.000Z",
      updatedAt: "2026-01-05T00:00:00.000Z",
    },
    {
      _id: "demo-user-003",
      firstName: "Demo",
      lastName: "Developer",
      email: "developer@vyomex.demo",

      /*
       * Demo password:
       * VYOMEX@12345
       */
      password:
        "$2b$12$LQv3c1yqBWj5hJxKj1y3eOQ9QxW4m5hJ2g5K7z9x8y6w4v3u2t1s",

      role: "employee",
      isActive: true,
      createdAt: "2026-01-10T00:00:00.000Z",
      updatedAt: "2026-01-10T00:00:00.000Z",
    },
  ];

  async findByEmail(
    email: string
  ): Promise<DemoAuthUser | null> {

    const normalizedEmail =
      email.trim().toLowerCase();

    return (
      this.users.find(
        (user) =>
          user.email.toLowerCase() ===
          normalizedEmail
      ) ?? null
    );
  }

  async verifyPassword(
    user: DemoAuthUser,
    password: string
  ): Promise<boolean> {

    return bcrypt.compare(
      password,
      user.password
    );
  }

  toSafeUser(
    user: DemoAuthUser
  ) {

    const {
      password,
      ...safeUser
    } = user;

    return safeUser;
  }
}

export default new DemoAuthProvider();
