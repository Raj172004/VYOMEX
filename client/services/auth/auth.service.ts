import api from "@/lib/api/axios";
import { AUTH_API } from "@/constants/auth";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth";

export const AuthService = {
  login(data: LoginRequest) {
    return api.post<AuthResponse>(AUTH_API.LOGIN, data);
  },

  register(data: RegisterRequest) {
    return api.post<AuthResponse>(AUTH_API.REGISTER, data);
  },

  logout() {
    return api.post(AUTH_API.LOGOUT);
  },

  getProfile() {
    return api.get(AUTH_API.PROFILE);
  },

  forgotPassword(email: string) {
    return api.post(AUTH_API.FORGOT_PASSWORD, {
      email,
    });
  },

  resetPassword(
    token: string,
    password: string
  ) {
    return api.post(AUTH_API.RESET_PASSWORD, {
      token,
      password,
    });
  },
};