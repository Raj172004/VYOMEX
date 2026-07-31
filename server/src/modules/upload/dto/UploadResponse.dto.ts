import { IUploadResponse } from "../interfaces/IUploadResponse";

export class UploadResponseDto implements IUploadResponse {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;

  constructor(data: IUploadResponse) {
    this.filename = data.filename;
    this.originalName = data.originalName;
    this.mimeType = data.mimeType;
    this.size = data.size;
    this.path = data.path;
    this.url = data.url;
  }
}