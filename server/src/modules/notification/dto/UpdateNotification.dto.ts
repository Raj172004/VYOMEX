import { INotification } from "../interfaces/INotification";

export class UpdateNotificationDto implements Partial<INotification> {
  title?: string;
  message?: string;
  type?: "success" | "info" | "warning" | "error";
  isRead?: boolean;
  user?: string;

  constructor(data: Partial<INotification>) {
    Object.assign(this, data);
  }
}