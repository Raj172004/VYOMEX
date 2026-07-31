import { Router } from "express";

import { upload } from "../../../common/uploads/multer";

import uploadController from "../controllers/Upload.controller";

const router = Router();

router.post(
  "/single",
  upload.single("file"),
  uploadController.uploadSingle
);

router.post(
  "/avatar",
  upload.single("avatar"),
  uploadController.uploadAvatar
);

export default router;