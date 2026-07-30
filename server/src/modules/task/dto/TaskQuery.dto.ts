import { PaginationQueryDto } from "../../../common/dto/PaginationQuery.dto";

export class TaskQueryDto extends PaginationQueryDto {
  project?: string;

  assignedTo?: string;

  status?: string;

  priority?: string;
}