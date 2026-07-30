import { PaginationQueryDto } from "../../../common/dto/PaginationQuery.dto";

export class ClientQueryDto extends PaginationQueryDto {
  company?: string;

  email?: string;

  status?: string;
}