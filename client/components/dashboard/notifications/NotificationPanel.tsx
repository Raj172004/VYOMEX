"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  CircleAlert,
  Info,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import { NotificationService } from "@/services/notifications/notification.service";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useAuth } from "@/hooks/useAuth";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
};

const iconMap = {
  success: Sparkles,
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
};

export default function NotificationPanel() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<
    NotificationItem[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await NotificationService.getAll();

        if (!mounted) {
          return;
        }

        setNotifications(
          response.data.data.slice(0, 5)
        );
      } catch (error) {
        console.error(
          "[NotificationPanel] API error:",
          error
        );

        if (mounted) {
          setNotifications([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();

    const socket = connectSocket();

    if (!socket) {
      return () => {
        mounted = false;
      };
    }

    const handleNewNotification = (
      notification: NotificationItem
    ) => {
      if (!mounted) {
        return;
      }

      setNotifications((current) => {
        const exists = current.some(
          (item) => item._id === notification._id
        );

        if (exists) {
          return current;
        }

        return [
          notification,
          ...current,
        ].slice(0, 5);
      });
    };

    socket.on(
      "notification:new",
      handleNewNotification
    );

    return () => {
      mounted = false;

      socket.off(
        "notification:new",
        handleNewNotification
      );

      disconnectSocket();
    };
  }, []);

  const markAsRead = async (id: string) => {
    if (actionLoading) {
      return;
    }

    setActionLoading(id);

    try {
      await NotificationService.markAsRead(id);

      setNotifications((current) =>
        current.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "[NotificationPanel] Mark as read error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  const markAllAsRead = async () => {
    if (
      actionLoading ||
      unreadCount === 0
    ) {
      return;
    }


    setActionLoading("all");

    try {
      await NotificationService.markAllAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "[NotificationPanel] Mark all as read error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  const deleteNotification = async (id: string) => {
    if (actionLoading) {
      return;
    }

    setActionLoading(id);

    try {
      await NotificationService.delete(id);

      setNotifications((current) =>
        current.filter(
          (notification) =>
            notification._id !== id
        )
      );
    } catch (error) {
      console.error(
        "[NotificationPanel] Delete error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-950">
              Recent notifications
            </h2>

            <p className="text-xs text-slate-500">
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount === 1 ? "" : "s"
                  }`
                : "You're all caught up"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={
              actionLoading !== null
            }
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck className="h-4 w-4" />

            <span className="hidden sm:inline">
              {actionLoading === "all"
                ? "Marking..."
                : "Mark all as read"}
            </span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="animate-pulse px-5 py-5 sm:px-6"
              >
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-slate-100" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-slate-100" />
                    <div className="h-3 w-3/4 rounded bg-slate-100" />
                    <div className="h-3 w-1/4 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Bell className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-950">
            No notifications
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            New workspace activity and updates will
            appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {notifications.map(
            (notification) => {
              const Icon =
                iconMap[notification.type];

              const busy =
                actionLoading ===
                notification._id;

              return (
                <div
                  key={notification._id}
                  className={`group px-5 py-5 transition sm:px-6 ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-cyan-50/40"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                        notification.isRead
                          ? "bg-slate-100 text-slate-500"
                          : "bg-cyan-100 text-cyan-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3
                            className={`text-sm ${
                              notification.isRead
                                ? "font-semibold text-slate-800"
                                : "font-bold text-slate-950"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {notification.message}
                          </p>
                        </div>

                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {notification.createdAt && (
                          <span className="text-xs text-slate-400">
                            {new Date(
                              notification.createdAt
                            ).toLocaleString()}
                          </span>
                        )}

                        {!notification.isRead && (
                          <button
                            type="button"
                            onClick={() =>
                              void markAsRead(
                                notification._id
                              )
                            }
                            disabled={busy}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 disabled:opacity-50"
                          >
                            <Check className="h-3.5 w-3.5" />
                            {busy
                              ? "Saving..."
                              : "Mark as read"}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            void deleteNotification(
                              notification._id
                            )
                          }
                          disabled={busy}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}


