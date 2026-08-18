import { Request, Response, NextFunction } from "express";

export function ownerOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role === "admin") {
    return next();
  }

  const requestedUserId = String(req.params.id);

  if (req.user._id.toString() !== requestedUserId) {
    return res.status(403).json({
      success: false,
      message: "You can only access your own account",
    });
  }

  next();
}
