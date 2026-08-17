import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: Number(process.env.PORT ?? 5000),

  CLIENT_URL:
    process.env.CLIENT_URL ??
    "http://localhost:3000",

  DATA_MODE:
    process.env.DATA_MODE ?? "demo",

  MONGODB_URI:
    process.env.MONGODB_URI ??
    "mongodb://127.0.0.1:27017/vyomex",

  JWT_SECRET:
    process.env.JWT_SECRET ??
    "CHANGE_ME_ACCESS_SECRET",

  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN ?? "15m",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ??
    "CHANGE_ME_REFRESH_SECRET",

  JWT_REFRESH_EXPIRES_IN:
    process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",

  MAIL_HOST:
    process.env.MAIL_HOST ?? "",

  MAIL_PORT:
    Number(process.env.MAIL_PORT ?? 587),

  MAIL_USER:
    process.env.MAIL_USER ?? "",

  MAIL_PASSWORD:
    process.env.MAIL_PASSWORD ?? "",

  MAIL_FROM:
    process.env.MAIL_FROM ?? "",

  PASSWORD_RESET_EXPIRES_IN:
    process.env.PASSWORD_RESET_EXPIRES_IN ?? "15m",
};
