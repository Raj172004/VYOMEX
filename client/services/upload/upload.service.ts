import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import { ApiResponse } from "@/types/api/common";

export interface UploadResult {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url?: string;
}

export const UploadService = {
  uploadSingle(
    file: File,
    fieldName = "file"
  ) {
    const formData = new FormData();

    formData.append(fieldName, file);

    return api.post<ApiResponse<UploadResult>>(
      API_ENDPOINTS.upload.single,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  uploadAvatar(file: File) {
    return this.uploadSingle(file, "avatar");
  },

  uploadClientFile(file: File) {
    return this.uploadSingle(file, "client");
  },

  uploadProjectFile(file: File) {
    return this.uploadSingle(file, "project");
  },

  uploadInvoiceFile(file: File) {
    return this.uploadSingle(file, "invoice");
  },
};
