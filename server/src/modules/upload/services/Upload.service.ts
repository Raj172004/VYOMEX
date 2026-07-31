import { UploadResponseDto } from "../dto/UploadResponse.dto";
import fileStorageHelper from "../helpers/FileStorage.helper";

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

  public deleteFile(filePath: string): boolean {
    return fileStorageHelper.deleteFile(filePath);
  }
}

export default new UploadService();