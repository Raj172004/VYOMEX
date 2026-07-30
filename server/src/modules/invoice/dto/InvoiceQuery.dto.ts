import { PaginationQueryDto } from "../../../common/dto/PaginationQuery.dto";

export class InvoiceQueryDto extends PaginationQueryDto {
  client?: string;

  project?: string;

  status?: string;

  invoiceNumber?: string;
}