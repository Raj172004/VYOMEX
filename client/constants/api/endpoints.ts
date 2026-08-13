export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
  },

  dashboard: {
    overview: "/dashboard/overview",
    projects: "/dashboard/projects",
    tasks: "/dashboard/tasks",
    invoices: "/dashboard/invoices",
    revenue: "/dashboard/revenue",
    activity: "/dashboard/activity",
    deadlines: "/dashboard/deadlines",
    topClients: "/dashboard/top-clients",
  },

  clients: {
    base: "/clients",
    byId: (id: string) => `/clients/${id}`,
  },

  projects: {
    base: "/projects",
    byId: (id: string) => `/projects/${id}`,
  },

  tasks: {
    base: "/tasks",
    byId: (id: string) => `/tasks/${id}`,
  },

  invoices: {
    base: "/invoices",
    byId: (id: string) => `/invoices/${id}`,
  },

  notifications: {
    base: "/notifications",
    byId: (id: string) => `/notifications/${id}`,
    byUser: (userId: string) =>
      `/notifications/user/${userId}`,
    markAsRead: (id: string) =>
      `/notifications/${id}/read`,
    markAllAsRead: (userId: string) =>
      `/notifications/user/${userId}/read-all`,
    unreadCount: (userId: string) =>
      `/notifications/user/${userId}/unread-count`,
  },

  upload: {
    single: "/upload/single",
    avatar: "/upload/avatar",
    multiple: "/upload/multiple",
    delete: "/upload/delete",
  },
} as const;
