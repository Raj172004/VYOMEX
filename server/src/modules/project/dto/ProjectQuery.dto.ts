import { PaginationQueryDto } from "../../../common/dto/PaginationQuery.dto";

export class ProjectQueryDto extends PaginationQueryDto {
  client?: string;

  status?: string;

  priority?: string;
}