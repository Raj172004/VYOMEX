"use client";

import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Loader2,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import {
  CreateProjectPayload,
  Project,
  ProjectService,
} from "@/services/projects/project.service";

interface ProjectFormModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

interface FormState {
  title: string;
  description: string;
  client: string;
  status:
    | "planning"
    | "active"
    | "completed"
    | "on-hold";
  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";
  budget: string;
  startDate: string;
  endDate: string;
}

const initialForm: FormState = {
  title: "",
  description: "",
  client: "",
  status: "planning",
  priority: "medium",
  budget: "",
  startDate: "",
  endDate: "",
};

export default function ProjectFormModal({
  open,
  project,
  onClose,
  onSuccess,
}: ProjectFormModalProps) {
  const [form, setForm] =
    useState<FormState>(initialForm);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEditing = Boolean(project);

  useEffect(() => {
    if (!open) {
      return;
    }

    setError("");

    if (project) {
      setForm({
        title: project.title ?? "",
        description:
          project.description ?? "",
        client: typeof project.client === "string" ? project.client : project.client?._id ?? "",
        status:
          normalizeStatus(project.status),
        priority:
          normalizePriority(
            project.priority
          ),
        budget:
          project.budget !== undefined
            ? String(project.budget)
            : "",
        startDate:
          toInputDate(project.startDate),
        endDate:
          toInputDate(project.endDate),
      });
    } else {
      setForm(initialForm);
    }
  }, [open, project]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, saving, onClose]);

  if (!open) {
    return null;
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const title =
      form.title.trim();

    const client =
      form.client.trim();

    if (!title) {
      setError(
        "Project title is required."
      );
      return;
    }

    if (!client) {
      setError(
        "Client ID is required."
      );
      return;
    }

    if (!form.startDate) {
      setError(
        "Start date is required."
      );
      return;
    }

    if (!form.endDate) {
      setError(
        "End date is required."
      );
      return;
    }

    if (
      form.endDate <
      form.startDate
    ) {
      setError(
        "End date cannot be earlier than the start date."
      );
      return;
    }

    let budget:
      | number
      | undefined;

    if (form.budget.trim()) {
      const parsedBudget =
        Number(form.budget);

      if (
        !Number.isFinite(
          parsedBudget
        ) ||
        parsedBudget < 0
      ) {
        setError(
          "Budget must be a valid positive number."
        );
        return;
      }

      budget = parsedBudget;
    }

    const payload: CreateProjectPayload =
      {
        title,
        description:
          form.description.trim() ||
          undefined,
        client,
        status: form.status,
        priority: form.priority,
        budget,
        startDate:
          form.startDate,
        endDate:
          form.endDate,
      };

    try {
      setSaving(true);

      const response = project
        ? await ProjectService.update(
            project._id,
            payload
          )
        : await ProjectService.create(
            payload
          );

      onSuccess(response.data.data);

      onClose();
    } catch (err: unknown) {
      console.error(
        "Project save failed:",
        err
      );

      const apiMessage =
        getApiErrorMessage(err);

      setError(
        apiMessage ??
          `Unable to ${
            isEditing
              ? "update"
              : "create"
          } the project. Please try again.`
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={() => {
          if (!saving) {
            onClose();
          }
        }}
        className="absolute inset-0 cursor-default bg-slate-950/50 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <FolderKanban
                size={20}
              />
            </div>

            <div>
              <h2
                id="project-modal-title"
                className="text-xl font-black tracking-tight text-slate-950"
              >
                {isEditing
                  ? "Edit Project"
                  : "Create Project"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isEditing
                  ? "Update the project details."
                  : "Add a new project to your workspace."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!saving) {
                onClose();
              }
            }}
            disabled={saving}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-6 px-5 py-6 sm:px-7">
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Basic information */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FileText
                  size={17}
                  className="text-cyan-600"
                />

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Basic Information
                </h3>
              </div>

              <div className="grid gap-5">
                <Field
                  label="Project Title"
                  required
                >
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateField(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="e.g. VYOMEX Website Redesign"
                    disabled={saving}
                    className={inputClass}
                    autoFocus
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe the project scope and objectives..."
                    disabled={saving}
                    rows={4}
                    className={`${inputClass} resize-none py-3`}
                  />
                </Field>

                <Field
                  label="Client ID"
                  required
                >
                  <input
                    type="text"
                    value={form.client}
                    onChange={(event) =>
                      updateField(
                        "client",
                        event.target.value
                      )
                    }
                    placeholder="Enter MongoDB Client ID"
                    disabled={saving}
                    className={inputClass}
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Use the Client MongoDB ID. A client selector will be connected in the next refinement.
                  </p>
                </Field>
              </div>
            </div>

            {/* Project configuration */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FolderKanban
                  size={17}
                  className="text-cyan-600"
                />

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Project Configuration
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target
                          .value as FormState["status"]
                      )
                    }
                    disabled={saving}
                    className={inputClass}
                  >
                    <option value="planning">
                      Planning
                    </option>
                    <option value="active">
                      Active
                    </option>
                    <option value="completed">
                      Completed
                    </option>
                    <option value="on-hold">
                      On Hold
                    </option>
                  </select>
                </Field>

                <Field label="Priority">
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      updateField(
                        "priority",
                        event.target
                          .value as FormState["priority"]
                      )
                    }
                    disabled={saving}
                    className={inputClass}
                  >
                    <option value="low">
                      Low
                    </option>
                    <option value="medium">
                      Medium
                    </option>
                    <option value="high">
                      High
                    </option>
                    <option value="critical">
                      Critical
                    </option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Financial information */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <CircleDollarSign
                  size={17}
                  className="text-cyan-600"
                />

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Financial Information
                </h3>
              </div>

              <Field label="Budget">
                <div className="relative">
                  <CircleDollarSign
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.budget}
                    onChange={(event) =>
                      updateField(
                        "budget",
                        event.target.value
                      )
                    }
                    placeholder="0"
                    disabled={saving}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </Field>
            </div>

            {/* Timeline */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays
                  size={17}
                  className="text-cyan-600"
                />

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Timeline
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Start Date"
                  required
                >
                  <input
                    type="date"
                    value={
                      form.startDate
                    }
                    onChange={(event) =>
                      updateField(
                        "startDate",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="End Date"
                  required
                >
                  <input
                    type="date"
                    value={form.endDate}
                    min={
                      form.startDate ||
                      undefined
                    }
                    onChange={(event) =>
                      updateField(
                        "endDate",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {saving
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({
  label,
  required,
  children,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-50";

function normalizeStatus(
  status?: string
): FormState["status"] {
  if (
    status === "active" ||
    status === "completed" ||
    status === "on-hold"
  ) {
    return status;
  }

  return "planning";
}

function normalizePriority(
  priority?: string
): FormState["priority"] {
  if (
    priority === "low" ||
    priority === "high" ||
    priority === "critical"
  ) {
    return priority;
  }

  return "medium";
}

function toInputDate(
  value?: string
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getApiErrorMessage(
  error: unknown
) {
  if (
    typeof error !== "object" ||
    error === null
  ) {
    return undefined;
  }

  const response =
    (
      error as {
        response?: {
          data?: {
            message?: string;
            error?: {
              message?: string;
            };
          };
        };
      }
    ).response;

  return (
    response?.data?.message ??
    response?.data?.error?.message
  );
}

