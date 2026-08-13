export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },

  dashboard: {
    overview: "/dashboard/overview",
    activity: "/dashboard/activity",
    projects: "/dashboard/projects",
    revenue: "/dashboard/revenue",
    tasks: "/dashboard/tasks",
    invoices: "/dashboard/invoices",
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

  upload: {
    single: "/upload/single",
  },

  notifications: {
    base: "/notifications",

    byId: (id: string) =>
      `/notifications/${id}`,

    byUser: (userId: string) =>
      `/notifications/user/${userId}`,

    markAsRead: (id: string) =>
      `/notifications/${id}/read`,

    markAllAsRead: () =>
      `/notifications/read-all`,

    unreadCount: (userId: string) =>
      `/notifications/user/${userId}/unread-count`,
  },
} as const;
