import { INotification } from "../interfaces/INotification";

export class CreateNotificationDto {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user: string;

  constructor(
    data: Pick<
      INotification,
      "title" | "message" | "type"
    > & {
      user: string;
    }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.type = data.type;
    this.isRead = false;
    this.user = data.user;
  }
}
