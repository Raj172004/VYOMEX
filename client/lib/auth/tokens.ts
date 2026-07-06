import Cookies from "js-cookie";

const TOKEN_KEY = "vyomex_access_token";
const REFRESH_KEY = "vyomex_refresh_token";

export function setTokens(
  accessToken: string,
  refreshToken?: string
) {
  Cookies.set(TOKEN_KEY, accessToken);

  if (refreshToken) {
    Cookies.set(REFRESH_KEY, refreshToken);
  }
}

export function getAccessToken() {
  return Cookies.get(TOKEN_KEY);
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_KEY);
}

export function clearTokens() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_KEY);
}