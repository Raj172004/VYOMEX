import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/api/endpoints";
import { ApiResponse } from "@/types/api/common";

export interface DashboardOverview {
  totalClients: number;
  totalProjects: number;
  totalTasks: number;
  totalInvoices: number;
  totalRevenue: number;
}

export interface ProjectAnalytics {
  planning: number;
  active: number;
  completed: number;
  onHold: number;
}

export interface TaskAnalytics {
  status: {
    todo: number;
    inProgress: number;
    review: number;
    done: number;
  };

  priority: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export interface RevenuePoint {
  year: number;
  month: number;
  revenue: number;
}

export interface InvoiceAnalytics {
  draft: number;
  sent: number;
  paid: number;
  overdue: number;
}

export interface DashboardActivity {
  projects: Array<{
    _id: string;
    title: string;
    status: string;
    createdAt: string;
  }>;

  tasks: Array<{
    _id: string;
    title: string;
    status: string;
    createdAt: string;
  }>;

  invoices: Array<{
    _id: string;
    invoiceNumber: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
}

export interface DashboardDeadlineTask {
  _id: string;
  title: string;
  dueDate: string;
  priority: string;
  status: string;
}

export interface DashboardDeadlineProject {
  _id: string;
  title: string;
  endDate: string;
  status: string;
}

export interface DashboardDeadlines {
  overdueTasks: DashboardDeadlineTask[];
  upcomingTasks: DashboardDeadlineTask[];
  upcomingProjects: DashboardDeadlineProject[];
}

export interface DashboardTopClient {
  clientId: string;
  name: string;
  company?: string;
  email?: string;
  totalRevenue: number;
  invoiceCount: number;
}

export const DashboardService = {
  getOverview() {
    return api.get<ApiResponse<DashboardOverview>>(
      API_ENDPOINTS.dashboard.overview
    );
  },

  getProjects() {
    return api.get<ApiResponse<ProjectAnalytics>>(
      API_ENDPOINTS.dashboard.projects
    );
  },

  getTasks() {
    return api.get<ApiResponse<TaskAnalytics>>(
      API_ENDPOINTS.dashboard.tasks
    );
  },

  getInvoices() {
    return api.get<ApiResponse<InvoiceAnalytics>>(
      API_ENDPOINTS.dashboard.invoices
    );
  },

  getRevenue() {
    return api.get<ApiResponse<RevenuePoint[]>>(
      API_ENDPOINTS.dashboard.revenue
    );
  },

  getActivity() {
    return api.get<ApiResponse<DashboardActivity>>(
      API_ENDPOINTS.dashboard.activity
    );
  },

  getDeadlines() {
    return api.get<ApiResponse<DashboardDeadlines>>(
      API_ENDPOINTS.dashboard.deadlines
    );
  },

  getTopClients() {
    return api.get<ApiResponse<DashboardTopClient[]>>(
      API_ENDPOINTS.dashboard.topClients
    );
  },
};
