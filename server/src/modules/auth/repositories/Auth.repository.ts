import { User } from "../../user/models/User.model";

export class AuthRepository {
  async findByEmail(email: string) {
    return User.findOne({ email }).select("+password");
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return User.create(data);
  }
}

export default new AuthRepository();
