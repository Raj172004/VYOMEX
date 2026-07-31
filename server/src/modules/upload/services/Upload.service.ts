import { UploadResponseDto } from "../dto/UploadResponse.dto";

class UploadService {
  public getFileInfo(file: Express.Multer.File): UploadResponseDto {
    const folder = file.destination
      .replace(/\\/g, "/")
      .split("/")
      .pop();

    return new UploadResponseDto({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path.replace(/\\/g, "/"),
      url: `/uploads/${folder}/${file.filename}`,
    });
  }

  public getFilesInfo(files: Express.Multer.File[]): UploadResponseDto[] {
    return files.map((file) => this.getFileInfo(file));
  }
}

export default new UploadService();