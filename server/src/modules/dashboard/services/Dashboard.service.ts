import dashboardRepository from "../repositories/Dashboard.repository";

class DashboardService {
  async getOverview(ownerId: string) {
    return dashboardRepository.getOverview(ownerId);
  }

  async getProjectAnalytics(ownerId: string) {
    return dashboardRepository.getProjectAnalytics(ownerId);
  }

  async getTaskAnalytics(ownerId: string) {
    return dashboardRepository.getTaskAnalytics(ownerId);
  }

  async getInvoiceAnalytics(ownerId: string) {
    return dashboardRepository.getInvoiceAnalytics(ownerId);
  }

  async getRevenueAnalytics(ownerId: string) {
    return dashboardRepository.getRevenueAnalytics(ownerId);
  }

  async getRecentActivity(ownerId: string) {
    return dashboardRepository.getRecentActivity(ownerId);
  }

  async getDeadlines(ownerId: string) {
    return dashboardRepository.getDeadlines(ownerId);
  }

  async getTopClients(ownerId: string) {
    return dashboardRepository.getTopClients(ownerId);
  }
}

export default new DashboardService();
