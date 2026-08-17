import { ApiError } from "../../../utils/ApiError";

import userRepository from "../repositories/User.repository";

import { IUser } from "../models/User.model";

import {
  isDemoMode,
} from "../../../common/data/DataMode";

import demoUserProvider from "../../../common/data/providers/demo/DemoUser.provider";

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
    data: Partial<IUser>
  ) {

    if (isDemoMode()) {
      throw new ApiError(
        400,
        "User updates are disabled in demo mode"
      );
    }

    const user =
      await userRepository.updateUser(
        id,
        data
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
