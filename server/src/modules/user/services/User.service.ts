import { ApiError } from "../../../utils/ApiError";

import userRepository from "../repositories/User.repository";

import { IUser } from "../models/User.model";

import {
  isDemoMode,
} from "../../../common/data/DataMode";

import demoUserProvider from "../../../common/data/providers/demo/DemoUser.provider";

interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  isVerified?: boolean;
  isActive?: boolean;
  role?: "user" | "admin";
}

class UserService {
  async getAllUsers() {
    if (isDemoMode()) {
      return demoUserProvider.getAllUsers();
    }

    return userRepository.getAllUsers();
  }

  async getUserById(id: string) {
    if (isDemoMode()) {
      const user =
        demoUserProvider.getUserById(id);

      if (!user) {
        throw new ApiError(
          404,
          "User not found"
        );
      }

      return user;
    }

    const user =
      await userRepository.getUserById(id);

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  }

  async updateUser(
    id: string,
    data: UserUpdateData,
    requesterRole: string
  ) {
    if (isDemoMode()) {
      throw new ApiError(
        400,
        "User updates are disabled in demo mode"
      );
    }

    const allowedFields: Partial<IUser> = {};

    if (data.firstName !== undefined) {
      allowedFields.firstName =
        data.firstName;
    }

    if (data.lastName !== undefined) {
      allowedFields.lastName =
        data.lastName;
    }

    if (data.email !== undefined) {
      allowedFields.email =
        data.email;
    }

    /**
     * Privileged fields are admin-only.
     */
    if (requesterRole === "admin") {
      if (data.isVerified !== undefined) {
        allowedFields.isVerified =
          data.isVerified;
      }

      if (data.isActive !== undefined) {
        allowedFields.isActive =
          data.isActive;
      }

      if (data.role !== undefined) {
        allowedFields.role =
          data.role;
      }
    } else {
      /**
       * Prevent privilege escalation attempts.
       */
      if (
        data.isVerified !== undefined ||
        data.isActive !== undefined ||
        data.role !== undefined
      ) {
        throw new ApiError(
          403,
          "You are not allowed to modify privileged user fields"
        );
      }
    }

    const user =
      await userRepository.updateUser(
        id,
        allowedFields
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  }

  async deleteUser(id: string) {
    if (isDemoMode()) {
      throw new ApiError(
        400,
        "User deletion is disabled in demo mode"
      );
    }

    const user =
      await userRepository.deleteUser(id);

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return {
      message: "User deleted successfully",
    };
  }
}

export default new UserService();
