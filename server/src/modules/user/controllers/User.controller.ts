import { Request, Response, NextFunction } from "express";

import userService from "../services/User.service";

import { writeAudit } from "../../audit/helpers/Audit.helper";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(
        new Error("Authenticated user is missing")
      );
    }

    const user =
      await userService.updateUser(
        req.params.id as string,
        req.body,
        req.user.role
      );

    await writeAudit({
      req,
      action: "UPDATE",
      entity: "User",
      entityId: user._id.toString(),
      description:
        req.body.role !== undefined
          ? `User "${user.email}" updated, role changed to "${user.role}"`
          : `User "${user.email}" updated`,
      metadata: {
        userId: user._id.toString(),
        email: user.email,
        changes: req.body,
        role: user.role,
        isVerified: user.isVerified,
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id as string;

    const user =
      await userService.getUserById(
        userId
      );

    const result =
      await userService.deleteUser(
        userId
      );

    await writeAudit({
      req,
      action: "DELETE",
      entity: "User",
      entityId: userId,
      description:
        `User "${user.email}" deleted`,
      metadata: {
        userId,
        email: user.email,
        role: user.role,
      },
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
