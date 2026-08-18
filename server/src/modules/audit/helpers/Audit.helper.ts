import mongoose from "mongoose";
import { Request } from "express";

import auditService from "../services/Audit.service";
import { AuditAction } from "../models/Audit.model";

interface WriteAuditParams {
  action: AuditAction;
  entity: string;
  entityId?: string;
  actor?: string;
  description: string;
  metadata?: Record<string, unknown>;
  req?: Request;
}

/**
 * Best-effort audit persistence.
 *
 * Audit logging must never block the primary request when
 * MongoDB is unavailable or disconnected.
 */
export const writeAudit = async ({
  action,
  entity,
  entityId,
  actor,
  description,
  metadata,
  req,
}: WriteAuditParams): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    await auditService.create({
      action,
      entity,
      entityId,
      actor,
      description,
      metadata: {
        ...metadata,
        ...(req
          ? {
              ip:
                req.ip ||
                req.socket?.remoteAddress ||
                undefined,
              userAgent:
                req.get("user-agent") || undefined,
              method: req.method,
              path: req.originalUrl || req.url,
            }
          : {}),
      },
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
