import { CreateAuditDto } from "../dto/CreateAudit.dto";
import auditRepository from "../repositories/Audit.repository";

class AuditService {
  async create(data: CreateAuditDto) {
    return auditRepository.create(data);
  }

  async getAll(filters: Record<string, unknown> = {}) {
    return auditRepository.findAll(filters);
  }

  async getById(id: string) {
    return auditRepository.findById(id);
  }
}

export default new AuditService();
