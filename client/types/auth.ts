export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  authenticated: boolean;

  login: (data: AuthResponse) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}