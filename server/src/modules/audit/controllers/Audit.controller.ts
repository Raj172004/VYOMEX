import { Request, Response } from "express";

import auditService from "../services/Audit.service";

class AuditController {
  async getAll(req: Request, res: Response) {
    const {
      actor,
      action,
      entity,
      entityId,
    } = req.query;

    const filters: Record<string, unknown> = {};

    if (typeof actor === "string") {
      filters.actor = actor;
    }

    if (typeof action === "string") {
      filters.action = action;
    }

    if (typeof entity === "string") {
      filters.entity = entity;
    }

    if (typeof entityId === "string") {
      filters.entityId = entityId;
    }

    const audits = await auditService.getAll(filters);

    return res.status(200).json({
      success: true,
      data: audits,
    });
  }

  async getById(req: Request, res: Response) {
    const auditId = String(req.params.id);

    const audit = await auditService.getById(auditId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: audit,
    });
  }
}

export default new AuditController();
