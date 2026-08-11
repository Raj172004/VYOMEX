"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CircleAlert,
  Info,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { NotificationService } from "@/services/notifications/notification.service";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  isRead: boolean;
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

  useEffect(() => {
    async function load() {
      try {
        const response =
          await NotificationService.getAll();

        setNotifications(
          response.data.data.slice(0, 5)
        );
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Notifications
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Recent workspace updates
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
          <Bell size={18} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          [1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-slate-100"
            />
          ))
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center">
            <Check
              size={24}
              className="mx-auto text-emerald-500"
            />
            <p className="mt-2 text-sm font-semibold text-slate-600">
              You&apos;re all caught up.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon =
              iconMap[notification.type];

            return (
              <div
                key={notification._id}
                className={`flex gap-3 rounded-2xl border p-4 ${
                  notification.isRead
                    ? "border-slate-100 bg-slate-50"
                    : "border-cyan-100 bg-cyan-50/50"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                  <Icon size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    {notification.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {notification.message}
                  </p>

                  {notification.createdAt && (
                    <p className="mt-2 text-[10px] font-semibold text-slate-400">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
