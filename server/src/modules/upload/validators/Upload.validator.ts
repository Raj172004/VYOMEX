export class UploadValidator {
  static validateAvatar(file?: Express.Multer.File): void {
    if (!file) {
      throw new Error("Avatar image is required.");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw new Error("Avatar must be an image.");
    }
  }
}