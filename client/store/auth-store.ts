import { create } from "zustand";

import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "@/lib/auth/tokens";

import {
  AuthState,
  LoginData,
} from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: getAccessToken() ?? null,

  authenticated: Boolean(getAccessToken()),

  loading: false,

  login: (data: LoginData) => {
    setTokens(data.accessToken);

    set({
      token: data.accessToken,
      authenticated: true,
      user: data.user,
      loading: false,
    });
  },

  logout: () => {
    clearTokens();

    set({
      token: null,
      authenticated: false,
      user: null,
      loading: false,
    });
  },

  setLoading: (loading: boolean) =>
    set({
      loading,
    }),
}));