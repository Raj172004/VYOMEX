import { Request, Response } from "express";

import { ApiResponse } from "../../../utils/ApiResponse";

export const getProfile = (
  req: Request,
  res: Response
) => {
  return res.status(200).json(
    new ApiResponse(
      true,
      "Profile fetched successfully",
      req.user
    )
  );
};