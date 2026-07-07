import { create } from "zustand";

import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "@/lib/auth/tokens";

import {
  AuthResponse,
  AuthState,
} from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: getAccessToken() ?? null,

  authenticated: Boolean(getAccessToken()),

  loading: false,

  login: (data: AuthResponse) => {
    setTokens(data.token, data.refreshToken);

    set({
      token: data.token,
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