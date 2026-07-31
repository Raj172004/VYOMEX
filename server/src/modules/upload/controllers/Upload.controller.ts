import { Request, Response, NextFunction } from "express";

import uploadService from "../services/Upload.service";

class UploadController {
  async uploadSingle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "File uploaded successfully.",
        data: uploadService.getFileInfo(req.file),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UploadController();