"use client";

import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { DashboardService } from "@/services/dashboard/dashboard.service";
import DashboardStats from "./DashboardStats";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import NotificationPanel from "../notifications/NotificationPanel";

interface OverviewData {
  totalClients: number;
  totalProjects: number;
  totalTasks: number;
  totalInvoices: number;
  totalRevenue: number;
}

interface ProjectAnalytics {
  planning: number;
  active: number;
  completed: number;
  onHold: number;
}

interface TaskAnalytics {
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

interface RevenuePoint {
  year: number;
  month: number;
  revenue: number;
}

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

export default function DashboardOverview() {
  const [overview, setOverview] =
    useState<OverviewData | null>(null);

  const [projects, setProjects] =
    useState<ProjectAnalytics | null>(null);

  const [tasks, setTasks] =
    useState<TaskAnalytics | null>(null);

  const [revenue, setRevenue] =
    useState<RevenuePoint[]>([]);

  const [activity, setActivity] =
    useState<ActivityData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const [
        overviewResponse,
        projectsResponse,
        tasksResponse,
        revenueResponse,
        activityResponse,
      ] = await Promise.all([
        DashboardService.getOverview(),
        DashboardService.getProjects(),
        DashboardService.getTasks(),
        DashboardService.getRevenue(),
        DashboardService.getActivity(),
      ]);

      setOverview(overviewResponse.data.data);
      setProjects(projectsResponse.data.data);
      setTasks(tasksResponse.data.data);
      setRevenue(revenueResponse.data.data);
      setActivity(activityResponse.data.data);
    } catch {
      setError(
        "Unable to load dashboard data. Please check that the API server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-3xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-3xl bg-white shadow-sm" />
          <div className="h-80 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertCircle size={26} />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-950">
            Dashboard unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/5 sm:p-8">
        <div className="relative">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
                Business overview
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Welcome to your workspace.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Monitor clients, projects, tasks, invoices and revenue from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total revenue
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                ?{overview.totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <DashboardStats overview={overview} />

      <QuickActions />

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-950">
                Project health
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Current project distribution
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              ["Planning", projects?.planning ?? 0],
              ["Active", projects?.active ?? 0],
              ["Completed", projects?.completed ?? 0],
              ["On hold", projects?.onHold ?? 0],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              Task progress
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Current task status
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["To do", tasks?.status.todo ?? 0],
              ["In progress", tasks?.status.inProgress ?? 0],
              ["Review", tasks?.status.review ?? 0],
              ["Done", tasks?.status.done ?? 0],
            ].map(([label, value]) => {
              const total = overview.totalTasks || 1;
              const percentage = Math.min(
                100,
                (Number(value) / total) * 100
              );

              return (
                <div key={String(label)}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-slate-600">
                      {label}
                    </span>
                    <span className="font-bold text-slate-950">
                      {value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <RecentActivity
          activity={activity}
          revenue={revenue}
        />

        <NotificationPanel />
      </div>
    </div>
  );
}
