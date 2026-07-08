import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/Auth.repository";

import { RegisterDto } from "../dto/Register.dto";
import { LoginDto } from "../dto/Login.dto";

import { ApiError } from "../../../utils/ApiError";

import { env } from "../../../config/env";

class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await authRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return {
      user,
      accessToken,
    };
  }
}

export default new AuthService();