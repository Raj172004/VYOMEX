"use client";

import {
  Activity,
  CheckCircle2,
  CircleDollarSign,
  FolderKanban,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Project,
  ProjectService,
} from "@/services/projects/project.service";

import ProjectFormModal from "./ProjectFormModal";
import ProjectTable from "./ProjectTable";

type FilterStatus =
  | "all"
  | "planning"
  | "active"
  | "completed"
  | "on-hold";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<FilterStatus>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  useEffect(() => {
    void loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const response =
        await ProjectService.getAll();

      setProjects(response.data.data);
    } catch (err) {
      console.error(
        "Failed to load projects:",
        err
      );

      setError(
        "Unable to load projects. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          project.title,
          project.description,
          project.client,
          project.status,
          project.priority,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch)
          );

      const matchesStatus =
        status === "all" ||
        project.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [projects, search, status]);

  const activeCount = projects.filter(
    (project) =>
      project.status === "active"
  ).length;

  const planningCount = projects.filter(
    (project) =>
      project.status === "planning"
  ).length;

  const completedCount = projects.filter(
    (project) =>
      project.status === "completed"
  ).length;

  const totalBudget = projects.reduce(
    (total, project) =>
      total + (project.budget ?? 0),
    0
  );

  function openCreateModal() {
    setEditingProject(null);
    setModalOpen(true);
  }

  async function openEditModal(project: Project) {
    try {
      setError("");

      const response = await ProjectService.getById(project._id);
      const freshProject = response.data.data;

      setEditingProject(freshProject);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to load project for editing:", error);
      setError("Unable to load project details. Please try again.");
    }
  }

  function handleSaved(project: Project) {
    setProjects((current) => {
      const exists = current.some(
        (item) => item._id === project._id
      );

      if (exists) {
        return current.map((item) =>
          item._id === project._id
            ? project
            : item
        );
      }

      return [project, ...current];
    });
  }

  async function handleDelete(
    project: Project
  ) {
    const confirmed = window.confirm(
      `Delete project "${project.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await ProjectService.delete(
        project._id
      );

      setProjects((current) =>
        current.filter(
          (item) =>
            item._id !== project._id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete project:",
        err
      );

      window.alert(
        "Unable to delete this project. Please try again."
      );
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
            <FolderKanban size={14} />
            Workspace
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Plan, manage and track your
            VYOMEX projects from one
            workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FolderKanban}
          label="Total Projects"
          value={projects.length}
          description="All workspace projects"
        />

        <StatCard
          icon={Activity}
          label="Active Projects"
          value={activeCount}
          description="Currently in progress"
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          description="Successfully delivered"
          iconClass="text-emerald-600"
          iconBackground="bg-emerald-50"
        />

        <StatCard
          icon={CircleDollarSign}
          label="Total Budget"
          value={formatCurrency(totalBudget)}
          description={`${planningCount} projects planning`}
          iconClass="text-violet-600"
          iconBackground="bg-violet-50"
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects, clients, status..."
              aria-label="Search projects"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ["all", "All"],
                ["planning", "Planning"],
                ["active", "Active"],
                ["completed", "Completed"],
                ["on-hold", "On Hold"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  status === value
                    ? "bg-slate-950 text-white shadow-md"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {projects.length}
            </span>{" "}
            projects
          </p>

          {(search || status !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700"
            >
              Clear filters
            </button>
          )}
        </div>

        {loading && (
          <div className="space-y-4 pt-5">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-2xl bg-slate-100"
                />
              )
            )}
          </div>
        )}

        {!loading && error && (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FolderKanban size={24} />
            </div>

            <h3 className="mt-4 font-black text-slate-900">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadProjects()}
              className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FolderKanban size={24} />
              </div>

              <h3 className="mt-4 font-black text-slate-900">
                {search || status !== "all"
                  ? "No projects match your filters"
                  : "No projects yet"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {search || status !== "all"
                  ? "Try adjusting your search or filters."
                  : "Create your first project to get started."}
              </p>

              {!search &&
                status === "all" && (
                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    <Plus size={16} />
                    New Project
                  </button>
                )}
            </div>
          )}

        {!loading &&
          !error &&
          filteredProjects.length > 0 && (
            <div className="pt-5">
              <ProjectTable
                projects={filteredProjects}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </div>
          )}
      </div>

      <ProjectFormModal
        open={modalOpen}
        project={editingProject}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSaved}
      />
    </section>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  label: string;
  value: number | string;
  description: string;
  iconClass?: string;
  iconBackground?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass = "text-cyan-600",
  iconBackground = "bg-cyan-50",
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBackground}`}
      >
        <Icon
          size={20}
          className={iconClass}
        />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-3xl font-black tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

