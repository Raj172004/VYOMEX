import {
  BaseDataProvider,
} from "../BaseDataProvider";

import {
  DataMode,
} from "../../DataProvider";

export interface DemoUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class DemoUserProvider
  extends BaseDataProvider {

  readonly mode: DataMode = "demo";

  private readonly users: DemoUser[] = [
    {
      _id: "demo-user-001",
      firstName: "Rajesh",
      lastName: "Admin",
      email: "admin@vyomex.demo",
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
      role: "employee",
      isActive: true,
      createdAt: "2026-01-10T00:00:00.000Z",
      updatedAt: "2026-01-10T00:00:00.000Z",
    },
  ];

  getAllUsers(): DemoUser[] {
    return [...this.users];
  }

  getUserById(
    id: string
  ): DemoUser | null {
    return (
      this.users.find(
        (user) => user._id === id
      ) ?? null
    );
  }
}

export default new DemoUserProvider();
