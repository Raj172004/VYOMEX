export type ProjectStatus =
  | "planning"
  | "active"
  | "completed"
  | "on-hold";

export type ProjectPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface CreateProjectDto {
  title: string;
  description?: string;
  client: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  budget?: number;
  startDate: string;
  endDate: string;
  assignedTo?: string[];
}
