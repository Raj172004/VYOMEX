import { CreateAuditDto } from "../dto/CreateAudit.dto";

export interface AuditRepository {
  create(data: CreateAuditDto): Promise<unknown>;
  findAll(filters?: Record<string, unknown>): Promise<unknown[]>;
  findById(id: string): Promise<unknown>;
}
