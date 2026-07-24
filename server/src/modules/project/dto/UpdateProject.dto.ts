export interface UpdateProjectDto {
  title?: string;

  description?: string;

  client?: string;

  status?: "planning" | "active" | "completed" | "on-hold";

  priority?: "low" | "medium" | "high" | "critical";

  budget?: number;

  startDate?: Date;

  endDate?: Date;

  assignedTo?: string[];
}