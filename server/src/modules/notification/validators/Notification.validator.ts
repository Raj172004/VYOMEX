import {
  body,
  param,
  validationResult,
} from "express-validator";

import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ApiError } from "../../../utils/ApiError";

const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => error.msg)
      .join(", ");

    return next(new ApiError(400, message));
  }

  next();
};

export const validateNotificationId = [
  param("id")
    .trim()
    .isMongoId()
    .withMessage("Invalid notification ID"),

  handleValidationErrors,
];

export const validateNotificationUserId = [
  param("userId")
    .trim()
    .isMongoId()
    .withMessage("Invalid user ID"),

  handleValidationErrors,
];

export const validateCreateNotification = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Notification title is required")
    .isLength({ max: 200 })
    .withMessage(
      "Notification title must not exceed 200 characters"
    ),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Notification message is required")
    .isLength({ max: 2000 })
    .withMessage(
      "Notification message must not exceed 2000 characters"
    ),

  body("type")
    .optional()
    .isIn([
      "success",
      "info",
      "warning",
      "error",
    ])
    .withMessage(
      "Notification type must be success, info, warning, or error"
    ),

  handleValidationErrors,
];

export const validateUpdateNotification = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
      "Notification title cannot be empty"
    )
    .isLength({ max: 200 })
    .withMessage(
      "Notification title must not exceed 200 characters"
    ),

  body("message")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
      "Notification message cannot be empty"
    )
    .isLength({ max: 2000 })
    .withMessage(
      "Notification message must not exceed 2000 characters"
    ),

  body("type")
    .optional()
    .isIn([
      "success",
      "info",
      "warning",
      "error",
    ])
    .withMessage(
      "Notification type must be success, info, warning, or error"
    ),

  body("isRead")
    .optional()
    .isBoolean()
    .withMessage("isRead must be a boolean"),

  handleValidationErrors,
];
