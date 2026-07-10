export const PERMISSIONS = {
  MANAGE_USERS: "manage:users",
  MANAGE_PROJECTS: "manage:projects",
  MANAGE_CONTACTS: "manage:contacts",
  VIEW_DASHBOARD: "view:dashboard",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];