import adminRepository from "../repositories/Admin.repository";

class AdminService {
  async getDashboard() {
    return adminRepository.getDashboardStats();
  }
}

export default new AdminService();