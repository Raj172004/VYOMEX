import {
  ProjectPriority,
  ProjectStatus,
} from "./CreateProject.dto";

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  client?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  budget?: number;
  startDate?: string;
  endDate?: string;
  assignedTo?: string[];
}
