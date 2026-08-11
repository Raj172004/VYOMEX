"use client";

import {
  CalendarDays,
  CircleDollarSign,
  Edit3,
  FolderKanban,
  Trash2,
} from "lucide-react";

import type { Project } from "@/services/projects/project.service";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
}: ProjectTableProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Priority
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Budget
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                  Timeline
                </th>

                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="group transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-5">
                    <div className="flex min-w-[220px] items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                        <FolderKanban size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {project.title}
                        </p>

                        <p className="mt-1 max-w-[260px] truncate text-xs text-slate-400">
                          {project.description ||
                            "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <p className="max-w-[160px] truncate text-sm font-semibold text-slate-700">
                      {typeof project.client === "string" ? project.client : project.client?.company ?? "Not assigned"}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <StatusBadge
                      status={project.status}
                    />
                  </td>

                  <td className="px-5 py-5">
                    <PriorityBadge
                      priority={project.priority}
                    />
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                      <CircleDollarSign
                        size={15}
                        className="text-slate-400"
                      />

                      {project.budget !==
                      undefined
                        ? formatCurrency(
                            project.budget
                          )
                        : "—"}
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <Timeline
                      startDate={
                        project.startDate
                      }
                      endDate={
                        project.endDate
                      }
                    />
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(project)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
                        aria-label={`Edit ${project.title}`}
                        title="Edit project"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(project)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${project.title}`}
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {projects.map((project) => (
          <article
            key={project._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <FolderKanban size={19} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-black text-slate-900">
                    {project.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {typeof project.client === "string" ? project.client : project.client?.company ?? "No client assigned"}
                  </p>
                </div>
              </div>

              <StatusBadge
                status={project.status}
              />
            </div>

            {project.description && (
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                {project.description}
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InfoItem
                label="Priority"
                value={
                  <PriorityBadge
                    priority={
                      project.priority
                    }
                  />
                }
              />

              <InfoItem
                label="Budget"
                value={
                  project.budget !==
                  undefined
                    ? formatCurrency(
                        project.budget
                      )
                    : "—"
                }
              />

              <InfoItem
                label="Start"
                value={formatDate(
                  project.startDate
                )}
              />

              <InfoItem
                label="End"
                value={formatDate(
                  project.endDate
                )}
              />
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  onEdit(project)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Edit3 size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  onDelete(project)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function StatusBadge({
  status,
}: {
  status?: string;
}) {
  const normalized =
    status?.toLowerCase() ?? "planning";

  const styles: Record<
    string,
    string
  > = {
    planning:
      "bg-amber-50 text-amber-700 ring-amber-200",
    active:
      "bg-cyan-50 text-cyan-700 ring-cyan-200",
    completed:
      "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "on-hold":
      "bg-slate-100 text-slate-600 ring-slate-200",
  };

  const labels: Record<
    string,
    string
  > = {
    planning: "Planning",
    active: "Active",
    completed: "Completed",
    "on-hold": "On Hold",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
        styles[normalized] ??
        "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {labels[normalized] ??
        capitalize(normalized)}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority?: string;
}) {
  if (!priority) {
    return (
      <span className="text-sm text-slate-400">
        —
      </span>
    );
  }

  const normalized =
    priority.toLowerCase();

  const styles: Record<
    string,
    string
  > = {
    low: "text-slate-500",
    medium: "text-blue-600",
    high: "text-orange-600",
    critical: "text-red-600",
  };

  return (
    <span
      className={`text-sm font-bold ${
        styles[normalized] ??
        "text-slate-600"
      }`}
    >
      {capitalize(normalized)}
    </span>
  );
}

function Timeline({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  if (!startDate && !endDate) {
    return (
      <span className="text-sm text-slate-400">
        —
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
      <CalendarDays
        size={14}
        className="shrink-0 text-slate-400"
      />

      <span>
        {formatDate(startDate)}
      </span>

      <span className="text-slate-300">
        →
      </span>

      <span>
        {formatDate(endDate)}
      </span>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-1">
        {typeof value === "string" ? (
          <p className="truncate text-sm font-bold text-slate-700">
            {value}
          </p>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatDate(
  value?: string
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

function capitalize(
  value: string
) {
  return value.charAt(0).toUpperCase() +
    value.slice(1);
}

