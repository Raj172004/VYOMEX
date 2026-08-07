import { ApiError } from "../../../utils/ApiError";

import userRepository from "../repositories/User.repository";

import { IUser } from "../models/User.model";

class UserService {
  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async getUserById(id: string) {
    const user = await userRepository.getUserById(id);

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
    const user = await userRepository.updateUser(
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