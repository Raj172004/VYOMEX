"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  ListTodo,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  Task,
  TaskService,
} from "@/services/tasks/task.service";

type TaskStatus =
  | "todo"
  | "in-progress"
  | "review"
  | "done";

type TaskPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "In Review",
  done: "Completed",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    TaskStatus | "all"
  >("all");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await TaskService.getAll();

      setTasks(response.data?.data ?? []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setTasks([]);
      setError(
        "Unable to load tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: tasks.length,

      active: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,

      review: tasks.filter(
        (task) => task.status === "review"
      ).length,

      done: tasks.filter(
        (task) => task.status === "done"
      ).length,
    }),
    [tasks]
  );

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await TaskService.delete(id);

      setTasks((current) =>
        current.filter(
          (task) => task._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err
      );

      setError(
        "Unable to delete this task. Please try again."
      );
    }
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-200/20 blur-[120px]" />

        <div className="absolute right-0 top-[280px] h-[380px] w-[380px] rounded-full bg-blue-200/15 blur-[130px]" />

        <div className="absolute bottom-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-100/30 blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
                Workspace
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Tasks
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage work, priorities, assignments and
                deadlines.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
            >
              <Plus size={18} />
              Create Task
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Tasks"
            value={stats.total}
            description="All workspace tasks"
            icon={ListTodo}
            iconClass="text-cyan-600"
            iconBackground="bg-cyan-50"
          />

          <StatCard
            label="In Progress"
            value={stats.active}
            description="Currently being worked on"
            icon={Clock3}
            iconClass="text-blue-600"
            iconBackground="bg-blue-50"
          />

          <StatCard
            label="In Review"
            value={stats.review}
            description="Waiting for review"
            icon={CircleAlert}
            iconClass="text-amber-600"
            iconBackground="bg-amber-50"
          />

          <StatCard
            label="Completed"
            value={stats.done}
            description="Successfully delivered"
            icon={CheckCircle2}
            iconClass="text-emerald-600"
            iconBackground="bg-emerald-50"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadTasks()}
              className="shrink-0 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Filters */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search tasks..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | TaskStatus
                    | "all"
                )
              }
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 lg:w-48"
            >
              <option value="all">
                All statuses
              </option>

              <option value="todo">
                To Do
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="review">
                In Review
              </option>

              <option value="done">
                Completed
              </option>
            </select>
          </div>
        </section>

        {/* Tasks table */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-950">
                  Task overview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {filteredTasks.length}{" "}
                  {filteredTasks.length === 1
                    ? "task"
                    : "tasks"}{" "}
                  shown
                </p>
              </div>

              <div className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:block">
                {tasks.length} total
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Task
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Due Date
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hours
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRows />
                ) : filteredTasks.length === 0 ? (
                  <EmptyState
                    hasSearch={Boolean(
                      search.trim()
                    )}
                  />
                ) : (
                  filteredTasks.map((task) => (
                    <TaskRow
                      key={task._id}
                      task={task}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
  iconBackground,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  iconBackground: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBackground}`}
        >
          <Icon
            size={20}
            className={iconClass}
          />
        </div>

        <span className="text-3xl font-black tracking-tight text-slate-950">
          {value}
        </span>
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function TaskRow({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="group transition hover:bg-slate-50/80">
      <td className="px-6 py-5">
        <div className="max-w-md">
          <p className="font-bold text-slate-900">
            {task.title}
          </p>

          {task.description && (
            <p className="mt-1 truncate text-xs text-slate-400">
              {task.description}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-5">
        <StatusBadge
          status={task.status as TaskStatus}
        />
      </td>

      <td className="px-6 py-5">
        <PriorityBadge
          priority={
            task.priority as TaskPriority
          }
        />
      </td>

      <td className="px-6 py-5 text-sm text-slate-500">
        {formatDate(task.dueDate)}
      </td>

      <td className="px-6 py-5 text-sm font-medium text-slate-600">
        {task.estimatedHours ?? 0}h
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-end gap-1 opacity-70 transition group-hover:opacity-100">
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-500 transition hover:bg-cyan-50 hover:text-cyan-600"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(task._id)
            }
            className="rounded-xl p-2.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({
  status,
}: {
  status?: TaskStatus;
}) {
  const config: Record<
    TaskStatus,
    string
  > = {
    todo: "bg-slate-100 text-slate-600",
    "in-progress":
      "bg-blue-50 text-blue-700",
    review:
      "bg-amber-50 text-amber-700",
    done:
      "bg-emerald-50 text-emerald-700",
  };

  const label =
    status && statusLabels[status]
      ? statusLabels[status]
      : "Unknown";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${
        status
          ? config[status]
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${
          status === "done"
            ? "bg-emerald-500"
            : status === "review"
              ? "bg-amber-500"
              : status === "in-progress"
                ? "bg-blue-500"
                : "bg-slate-400"
        }`}
      />

      {label}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority?: TaskPriority;
}) {
  const config: Record<
    TaskPriority,
    string
  > = {
    low: "bg-slate-100 text-slate-600",
    medium:
      "bg-blue-50 text-blue-700",
    high:
      "bg-orange-50 text-orange-700",
    critical:
      "bg-red-50 text-red-700",
  };

  const label =
    priority && priorityLabels[priority]
      ? priorityLabels[priority]
      : "Normal";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
        priority
          ? config[priority]
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {label}
    </span>
  );
}

function formatDate(
  date?: string
) {
  if (!date) {
    return "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â";
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function LoadingRows() {
  return (
    <>
      {[1, 2, 3, 4].map((row) => (
        <tr key={row}>
          <td
            colSpan={6}
            className="px-6 py-4"
          >
            <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

function EmptyState({
  hasSearch,
}: {
  hasSearch: boolean;
}) {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-20 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
          <ListTodo
            size={28}
            className="text-slate-300"
          />
        </div>

        <h3 className="mt-5 text-base font-bold text-slate-900">
          {hasSearch
            ? "No tasks found"
            : "No tasks yet"}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
          {hasSearch
            ? "Try adjusting your search or status filter."
            : "Create your first task to start managing work in your workspace."}
        </p>

        {!hasSearch && (
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-800"
          >
            <Plus size={16} />
            Create Task
          </button>
        )}
      </td>
    </tr>
  );
}