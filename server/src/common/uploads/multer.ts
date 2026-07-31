import multer from "multer";
import path from "path";

import { fileFilter } from "./fileFilter";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "uploads";

    switch (file.fieldname) {
      case "avatar":
        folder = "uploads/avatars";
        break;

      case "client":
        folder = "uploads/clients";
        break;

      case "project":
        folder = "uploads/projects";
        break;

      case "invoice":
        folder = "uploads/invoices";
        break;
    }

    cb(null, folder);
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});