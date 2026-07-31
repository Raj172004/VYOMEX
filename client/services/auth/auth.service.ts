import api from "@/lib/api/axios";

import { AUTH_API } from "@/constants/auth";

import {
  ApiResponse,
  LoginData,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

export const AuthService = {
  login(data: LoginRequest) {
    return api.post<ApiResponse<LoginData>>(
      AUTH_API.LOGIN,
      data
    );
  },

  register(data: RegisterRequest) {
    return api.post(
      AUTH_API.REGISTER,
      data
    );
  },

  logout() {
    return api.post(AUTH_API.LOGOUT);
  },

  getProfile() {
    return api.get(AUTH_API.PROFILE);
  },
};