export interface CreateTaskDto {
  title: string;

  description?: string;

  status?:
    | "todo"
    | "in-progress"
    | "review"
    | "done";

  priority?:
    | "low"
    | "medium"
    | "high"
    | "critical";

  estimatedHours?: number;

  dueDate: Date;

  project: string;

  assignedTo: string;
}