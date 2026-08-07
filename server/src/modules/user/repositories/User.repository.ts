import { BaseRepository } from "../../../common/database/BaseRepository";

import { User, IUser } from "../models/User.model";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return this.findOne({
      email,
    });
  }

  async getAllUsers() {
    return this.findAll({
      sort: {
        createdAt: -1,
      },
      select: "-password",
    });
  }

  async getUserById(id: string) {
    return this.findById(id, {
      select: "-password",
    });
  }

  async updateUser(
    id: string,
    data: Partial<IUser>
  ) {
    return this.update(id, data);
  }

  async deleteUser(id: string) {
    return this.delete(id);
  }
}

export default new UserRepository();