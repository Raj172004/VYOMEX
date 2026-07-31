import { Request, Response, NextFunction } from "express";

import uploadService from "../services/Upload.service";
import { UploadValidator } from "../validators/Upload.validator";

class UploadController {
  public async uploadSingle(
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

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      UploadValidator.validateAvatar(req.file);

      return res.status(201).json({
        success: true,
        message: "Avatar uploaded successfully.",
        data: uploadService.getFileInfo(req.file!),
      });
    } catch (error) {
      next(error);
    }
  }

  public async uploadMultiple(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Files uploaded successfully.",
        count: files.length,
        data: uploadService.getFilesInfo(files),
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { path } = req.body;

      if (!path) {
        return res.status(400).json({
          success: false,
          message: "File path is required.",
        });
      }

      const deleted = uploadService.deleteFile(path);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "File not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "File deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UploadController();