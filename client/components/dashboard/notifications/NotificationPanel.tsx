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
import {
  connectSocket,
  disconnectSocket,
} from "@/lib/socket";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
  user?: string;
  createdAt?: string;
};

const iconMap = {
  success: Sparkles,
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
};

export default function NotificationPanel() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response =
          await NotificationService.getAll();

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
      const userId =
        notifications.find(
          (notification) => notification.user
        )?.user;

      if (!userId) {
        console.warn(
          "[NotificationPanel] User ID unavailable"
        );
        return;
      }

      await NotificationService.markAllAsRead(
        userId
      );

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

  const deleteNotification = async (
    id: string
  ) => {
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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-950">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-black text-cyan-700">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Recent workspace updates
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={actionLoading !== null}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex"
            >
              <CheckCheck size={15} />

              {actionLoading === "all"
                ? "Updating..."
                : "Mark all read"}
            </button>
          )}

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Bell size={18} />
          </div>
        </div>
      </div>

      {unreadCount > 0 && (
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={actionLoading !== null}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 sm:hidden"
        >
          <CheckCheck size={15} />

          {actionLoading === "all"
            ? "Updating..."
            : "Mark all as read"}
        </button>
      )}

      <div className="mt-5 space-y-3">
        {loading ? (
          [1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-2xl bg-slate-100"
            />
          ))
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center">
            <Check
              size={24}
              className="mx-auto text-emerald-500"
            />

            <p className="mt-2 text-sm font-semibold text-slate-600">
              You&apos;re all caught up.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              New workspace notifications will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon =
              iconMap[notification.type];

            const busy =
              actionLoading === notification._id;

            return (
              <div
                key={notification._id}
                className={`group flex gap-3 rounded-2xl border p-4 transition ${
                  notification.isRead
                    ? "border-slate-100 bg-slate-50"
                    : "border-cyan-100 bg-cyan-50/50"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900">
                      {notification.title}
                    </p>

                    {!notification.isRead && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {notification.createdAt && (
                      <p className="text-[10px] font-semibold text-slate-400">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString("en-IN")}
                      </p>
                    )}

                    <div className="ml-auto flex items-center gap-1">
                      {!notification.isRead && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification._id
                            )
                          }
                          disabled={busy}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Mark as read"
                          aria-label="Mark notification as read"
                        >
                          <Check size={14} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(
                            notification._id
                          )
                        }
                        disabled={busy}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete notification"
                        aria-label="Delete notification"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
