import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  CLIENT = "client",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;

  phone?: string;

  avatar?: string;

  role: UserRole;

  isVerified: boolean;

  isBlocked: boolean;

  refreshToken?: string;

  createdAt: Date;

  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

export default User;