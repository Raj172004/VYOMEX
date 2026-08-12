"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  StickyNote,
  User,
  X,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

import {
  Client,
  ClientService,
} from "@/services/clients/client.service";

interface ClientDetailsModalProps {
  open: boolean;
  client: Client | null;
  onClose: () => void;
}

function formatDate(date?: string) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date?: string) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(
  firstName: string,
  lastName: string,
) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`
    .toUpperCase();
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex min-w-0 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ClientDetailsModal({
  open,
  client,
  onClose,
}: ClientDetailsModalProps) {
  const titleId = useId();

  const [details, setDetails] =
    useState<Client | null>(client);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loadDetails() {
    if (!client?._id) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await ClientService.getById(client._id);

      setDetails(response.data.data);
    } catch (requestError) {
      console.error(
        "Failed to load client details:",
        requestError,
      );

      setError(
        "Unable to load the latest client details.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open || !client) {
      return;
    }

    setDetails(client);
    void loadDetails();
  }, [open, client]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, loading, onClose]);

  if (!open || !client) {
    return null;
  }

  const activeClient = details ?? client;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[0_40px_120px_rgba(15,23,42,.30)] sm:rounded-[32px]"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50" />

          <div className="relative flex items-start justify-between gap-5 px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-black text-white shadow-xl shadow-blue-500/20">
                {getInitials(
                  activeClient.firstName,
                  activeClient.lastName,
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
                  Client Profile
                </p>

                <h2
                  id={titleId}
                  className="mt-1 truncate text-xl font-black tracking-tight text-slate-950 sm:text-2xl"
                >
                  {activeClient.firstName}{" "}
                  {activeClient.lastName}
                </h2>

                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                  <Building2 size={14} />
                  {activeClient.company}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="shrink-0 rounded-2xl border border-slate-200 bg-white/80 p-2.5 text-slate-500 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close client details"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          {loading && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm font-semibold text-cyan-700">
              <RefreshCw
                size={16}
                className="animate-spin"
              />
              Refreshing client information...
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-red-800">
                    Unable to refresh details
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void loadDetails()}
                  disabled={loading}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-100 disabled:opacity-50"
                >
                  <RefreshCw size={14} />
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Account Status
              </p>

              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold ${
                    activeClient.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeClient.status === "active"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />

                  {activeClient.status === "active"
                    ? "Active Client"
                    : "Inactive Client"}
                </span>
              </div>
            </div>

            {activeClient.industry && (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Industry
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {activeClient.industry}
                </p>
              </div>
            )}
          </div>

          {/* Contact */}
          <section className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-cyan-500" />

              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">
                Contact Information
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Mail}
                label="Email"
                value={activeClient.email}
              />

              <DetailItem
                icon={Phone}
                label="Phone"
                value={activeClient.phone}
              />

              <DetailItem
                icon={Globe}
                label="Website"
                value={activeClient.website}
              />

              <DetailItem
                icon={Building2}
                label="Company"
                value={activeClient.company}
              />
            </div>
          </section>

          {/* Location */}
          {(activeClient.address ||
            activeClient.city ||
            activeClient.country) && (
            <section className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-blue-500" />

                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">
                  Location
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <MapPin size={17} />
                  </div>

                  <div>
                    {activeClient.address && (
                      <p className="text-sm font-semibold text-slate-800">
                        {activeClient.address}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-slate-500">
                      {[
                        activeClient.city,
                        activeClient.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Notes */}
          {activeClient.notes && (
            <section className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-violet-500" />

                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">
                  Internal Notes
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <StickyNote size={17} />
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {activeClient.notes}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Metadata */}
          <section className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-slate-400" />

              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">
                Account Metadata
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={CalendarDays}
                label="Created"
                value={formatDateTime(
                  activeClient.createdAt,
                )}
              />

              <DetailItem
                icon={CheckCircle2}
                label="Last Updated"
                value={formatDateTime(
                  activeClient.updatedAt,
                )}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:px-8">
          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <User size={14} />
            Client record
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
