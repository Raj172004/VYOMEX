"use client";

import {
  BriefcaseBusiness,
  CheckSquare,
  FileText,
  Users,
} from "lucide-react";

interface DashboardStatsProps {
  overview: {
    totalClients: number;
    totalProjects: number;
    totalTasks: number;
    totalInvoices: number;
    totalRevenue: number;
  };
}

const stats = [
  {
    key: "totalClients",
    label: "Total Clients",
    icon: Users,
  },
  {
    key: "totalProjects",
    label: "Total Projects",
    icon: BriefcaseBusiness,
  },
  {
    key: "totalTasks",
    label: "Total Tasks",
    icon: CheckSquare,
  },
  {
    key: "totalInvoices",
    label: "Total Invoices",
    icon: FileText,
  },
] as const;

export default function DashboardStats({
  overview,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-500">
              {stat.label}
            </p>

            <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              {overview[stat.key].toLocaleString("en-IN")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
