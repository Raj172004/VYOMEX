import crypto from "crypto";

export const generatePasswordResetToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const getPasswordResetExpiry = (
  expiresIn: string
): Date => {
  const match = expiresIn.match(
    /^(\d+)(m|h|d)$/
  );

  if (!match) {
    return new Date(
      Date.now() + 15 * 60 * 1000
    );
  }

  const value = Number(match[1]);
  const unit = match[2];

  const milliseconds =
    unit === "m"
      ? value * 60 * 1000
      : unit === "h"
      ? value * 60 * 60 * 1000
      : value * 24 * 60 * 60 * 1000;

  return new Date(
    Date.now() + milliseconds
  );
};
