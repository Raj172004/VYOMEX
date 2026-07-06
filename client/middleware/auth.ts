import { getAccessToken } from "@/lib/auth/tokens";

export function isAuthenticated() {
  return Boolean(getAccessToken());
}