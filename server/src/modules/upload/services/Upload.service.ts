import { UploadResponseDto } from "../dto/UploadResponse.dto";

class UploadService {
  public getFileInfo(file: Express.Multer.File): UploadResponseDto {
    const normalizedPath = file.path.replace(/\\/g, "/");

    const relativePath = normalizedPath.replace(/^uploads\//, "");

    return new UploadResponseDto({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: normalizedPath,
      url: `/uploads/${relativePath}`,
    });
  }

  public getFilesInfo(files: Express.Multer.File[]): UploadResponseDto[] {
    return files.map((file) => this.getFileInfo(file));
  }
}

export default new UploadService();