import { ApiResponse } from "../responses/ApiResponse";

export class ResponseHelper {
  static success<T>(
    message: string,
    data?: T
  ) {
    return new ApiResponse(
      true,
      message,
      data
    );
  }

  static error(
    message: string
  ) {
    return new ApiResponse(
      false,
      message
    );
  }
}