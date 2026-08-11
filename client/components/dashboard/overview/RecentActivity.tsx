"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckSquare,
  FileText,
} from "lucide-react";

interface ActivityData {
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

interface RecentActivityProps {
  activity: ActivityData | null;
  revenue: Array<{
    year: number;
    month: number;
    revenue: number;
  }>;
}

export default function RecentActivity({
  activity,
  revenue,
}: RecentActivityProps) {
  const items = [
    ...(activity?.projects ?? []).map((item) => ({
      id: `project-${item._id}`,
      title: item.title,
      subtitle: `Project - ${item.status}`,
      date: item.createdAt,
      icon: BriefcaseBusiness,
    })),
    ...(activity?.tasks ?? []).map((item) => ({
      id: `task-${item._id}`,
      title: item.title,
      subtitle: `Task - ${item.status}`,
      date: item.createdAt,
      icon: CheckSquare,
    })),
    ...(activity?.invoices ?? []).map((item) => ({
      id: `invoice-${item._id}`,
      title: item.invoiceNumber,
      subtitle: `Invoice - ${item.status}`,
      date: item.createdAt,
      icon: FileText,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 7);

  const latestRevenue =
    revenue.length > 0
      ? revenue[revenue.length - 1]
      : null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Recent activity
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Latest workspace activity
          </p>
        </div>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-sm font-bold text-cyan-600"
        >
          View
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {latestRevenue && (
        <div className="mt-5 rounded-2xl bg-cyan-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
            Latest revenue
          </p>

          <p className="mt-1 text-2xl font-black text-slate-950">
            INR {latestRevenue.revenue.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {latestRevenue.month}/{latestRevenue.year}
          </p>
        </div>
      )}

      <div className="mt-5 divide-y divide-slate-100">
        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-400">
            No activity yet.
          </div>
        ) : (
          items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-0.5 text-xs capitalize text-slate-500">
                    {item.subtitle}
                  </p>
                </div>

                <time className="hidden text-xs text-slate-400 sm:block">
                  {new Date(item.date).toLocaleDateString("en-IN")}
                </time>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
