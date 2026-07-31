class UploadService {
  public getFileInfo(
    file: Express.Multer.File
  ) {
    return {
      filename: file.filename,

      originalName: file.originalname,

      mimeType: file.mimetype,

      size: file.size,

      path: file.path.replace(/\\/g, "/"),
    };
  }
}

export default new UploadService();