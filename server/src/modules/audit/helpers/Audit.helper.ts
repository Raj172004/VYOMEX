import { Request } from "express";

import auditService from "../services/Audit.service";
import { AuditAction } from "../models/Audit.model";

interface WriteAuditParams {
  req: Request;
  action: AuditAction;
  entity: string;
  entityId?: string;
  description: string;
  metadata?: Record<string, unknown>;
}

/**
 * Best-effort audit writer.
 *
 * Audit persistence must never break the primary business operation.
 * Any audit persistence failure is logged and intentionally swallowed.
 */
export const writeAudit = async ({
  req,
  action,
  entity,
  entityId,
  description,
  metadata,
}: WriteAuditParams): Promise<void> => {
  const actor = req.user?._id
    ? req.user._id.toString()
    : undefined;

  try {
    await auditService.create({
      actor,
      action,
      entity,
      entityId,
      description,
      metadata,
      ipAddress:
        req.ip ||
        req.socket.remoteAddress ||
        undefined,
      userAgent:
        req.get("user-agent") ||
        undefined,
    });
  } catch (error) {
    console.error(
      "========== AUDIT WRITE FAILED =========="
    );

    console.error({
      error,
      action,
      entity,
      entityId,
      actor,
      description,
    });

    console.error(
      "Audit failure ignored to preserve primary operation."
    );

    console.error(
      "========================================"
    );
  }
};
