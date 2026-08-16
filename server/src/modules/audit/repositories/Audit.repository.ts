import mongoose from "mongoose";

import Audit from "../models/Audit.model";
import { CreateAuditDto } from "../dto/CreateAudit.dto";
import { AuditRepository } from "../interfaces/Audit.interface";

class AuditRepositoryImpl implements AuditRepository {
  async create(data: CreateAuditDto) {
    return Audit.create({
      ...data,
      actor: data.actor
        ? new mongoose.Types.ObjectId(data.actor)
        : undefined,
      entityId: data.entityId
        ? new mongoose.Types.ObjectId(data.entityId)
        : undefined,
    });
  }

  async findAll(filters: Record<string, unknown> = {}) {
    return Audit.find(filters)
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id: string) {
    return Audit.findById(id).lean();
  }
}

export default new AuditRepositoryImpl();
