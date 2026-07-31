import { Request } from "express";
import { FileFilterCallback } from "multer";

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP and PDF files are allowed."
    )
  );
}