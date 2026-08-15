import { INotification } from "../interfaces/INotification";

export class UpdateNotificationDto
  implements Partial<Omit<INotification, "user">>
{
  title?: string;
  message?: string;
  type?: "success" | "info" | "warning" | "error";
  isRead?: boolean;

  constructor(
    data: Partial<Omit<INotification, "user">>
  ) {
    Object.assign(this, data);
  }
}