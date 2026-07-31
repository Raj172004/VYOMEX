import { UploadResponseDto } from "../dto/UploadResponse.dto";
import storageFactory from "../storage/StorageFactory";

class UploadService {
  private readonly storage = storageFactory.getProvider();

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
    return this.storage.delete(filePath);
  }

  public fileExists(filePath: string): boolean {
    return this.storage.exists(filePath);
  }
}

export default new UploadService();