import { env } from "../../config/env";

import {
  DataMode,
} from "./DataProvider";

export function getDataMode(): DataMode {
  const mode = env.DATA_MODE.toLowerCase();

  if (
    mode !== "demo" &&
    mode !== "production"
  ) {
    throw new Error(
      `Invalid DATA_MODE: ${env.DATA_MODE}. Expected "demo" or "production".`
    );
  }

  return mode;
}

export function isDemoMode(): boolean {
  return getDataMode() === "demo";
}

export function isProductionMode(): boolean {
  return getDataMode() === "production";
}
