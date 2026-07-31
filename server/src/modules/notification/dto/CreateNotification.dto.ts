import { INotification } from "../interfaces/INotification";

export class CreateNotificationDto implements INotification {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user?: string;

  constructor(data: INotification) {
    this.title = data.title;
    this.message = data.message;
    this.type = data.type;
    this.isRead = data.isRead ?? false;
    this.user = data.user;
  }
}