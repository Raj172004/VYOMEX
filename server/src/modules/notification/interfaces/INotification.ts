export interface INotification {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user?: string;
}