import dashboardRepository from "../repositories/Dashboard.repository";

class DashboardService {
  async getOverview() {
    return dashboardRepository.getOverview();
  }

  async getProjectAnalytics() {
    return dashboardRepository.getProjectAnalytics();
  }

  async getTaskAnalytics() {
    return dashboardRepository.getTaskAnalytics();
  }

  async getInvoiceAnalytics() {
    return dashboardRepository.getInvoiceAnalytics();
  }

  async getRevenueAnalytics() {
    return dashboardRepository.getRevenueAnalytics();
  }

  async getRecentActivity() {
    return dashboardRepository.getRecentActivity();
  }

  async getDeadlines() {
    return dashboardRepository.getDeadlines();
  }

  async getTopClients() {
    return dashboardRepository.getTopClients();
  }
}

export default new DashboardService();