import { create } from "zustand";

import { clearTokens, setTokens } from "@/lib/auth/tokens";
import { AuthResponse, AuthState } from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: null,

  authenticated: false,

  loading: false,

  login: (data: AuthResponse) => {
    setTokens(data.token, data.refreshToken);

    set({
      user: data.user,
      token: data.token,
      authenticated: true,
      loading: false,
    });
  },

  logout: () => {
    clearTokens();

    set({
      user: null,
      token: null,
      authenticated: false,
      loading: false,
    });
  },

  setLoading: (loading: boolean) =>
    set({
      loading,
    }),
}));