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

  async setPasswordResetToken(
    userId: string,
    token: string,
    expiresAt: Date
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        passwordResetToken: token,
        passwordResetExpiresAt: expiresAt,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async findByPasswordResetToken(token: string) {
    return User.findOne({
      passwordResetToken: token,
      passwordResetExpiresAt: {
        $gt: new Date(),
      },
    }).select(
      "+passwordResetToken +passwordResetExpiresAt +password"
    );
  }

  async updatePasswordAndClearResetToken(
    userId: string,
    hashedPassword: string
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        $unset: {
          passwordResetToken: 1,
          passwordResetExpiresAt: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("+password");
  }
}

export default new AuthRepository();
