import { AuditAction } from "../models/Audit.model";

export interface CreateAuditDto {
  actor?: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}
