"use client";

import {
  Activity,
  Building2,
  CheckCircle2,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Client,
  ClientService,
} from "@/services/clients/client.service";

import ClientFormModal from "./ClientFormModal";
import ClientTable from "./ClientTable";

type FilterStatus =
  | "all"
  | "active"
  | "inactive";

export default function ClientsPage() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<FilterStatus>("all");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  useEffect(() => {
    void loadClients();
  }, []);

  async function loadClients() {
    try {
      setLoading(true);
      setError("");

      const response =
        await ClientService.getAll();

      setClients(response.data.data);
    } catch {
      setError(
        "Unable to load clients. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          client.firstName,
          client.lastName,
          client.company,
          client.email,
          client.phone,
          client.industry,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch)
          );

      const matchesStatus =
        status === "all" ||
        client.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [clients, search, status]);

  const activeCount = clients.filter(
    (client) => client.status === "active"
  ).length;

  const inactiveCount = clients.filter(
    (client) => client.status === "inactive"
  ).length;

  function openCreateModal() {
    setEditingClient(null);
    setModalOpen(true);
  }

  function openEditModal(client: Client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  function handleSaved(client: Client) {
    setClients((current) => {
      const exists = current.some(
        (item) => item._id === client._id
      );

      if (exists) {
        return current.map((item) =>
          item._id === client._id
            ? client
            : item
        );
      }

      return [client, ...current];
    });
  }

  async function handleDelete(client: Client) {
    const confirmed = window.confirm(
      `Delete ${client.firstName} ${client.lastName} from your clients?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(client._id);

      await ClientService.delete(
        client._id
      );

      setClients((current) =>
        current.filter(
          (item) => item._id !== client._id
        )
      );
    } catch {
      window.alert(
        "Unable to delete this client. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
            <Users size={14} />
            Workspace
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Clients
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your client relationships,
            contact information and account status
            from one workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Clients"
          value={clients.length}
          description="All workspace clients"
        />

        <StatCard
          icon={CheckCircle2}
          label="Active Clients"
          value={activeCount}
          description="Currently active"
          iconClass="text-emerald-600"
          iconBackground="bg-emerald-50"
        />

        <StatCard
          icon={Activity}
          label="Inactive Clients"
          value={inactiveCount}
          description="Currently inactive"
          iconClass="text-slate-500"
          iconBackground="bg-slate-100"
        />
      </div>

      {/* Main content */}
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl sm:p-5">
        {/* Toolbar */}
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
              placeholder="Search clients, companies, emails..."
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
                ["active", "Active"],
                ["inactive", "Inactive"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setStatus(value)
                }
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

        {/* Result summary */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredClients.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {clients.length}
            </span>{" "}
            clients
          </p>

          {(search ||
            status !== "all") && (
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

        {/* Loading */}
        {loading && (
          <div className="space-y-4 pt-5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Building2 size={24} />
            </div>

            <h3 className="mt-4 font-black text-slate-900">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadClients()}
              className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Data */}
        {!loading && !error && (
          <div className="pt-5">
            <ClientTable
              clients={filteredClients}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <ClientFormModal
        open={modalOpen}
        client={editingClient}
        onClose={() => {
          if (!deletingId) {
            setModalOpen(false);
          }
        }}
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
  value: number;
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
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBackground}`}
        >
          <Icon
            size={20}
            className={iconClass}
          />
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-3xl font-black tracking-tight text-slate-950">
          {value}
        </span>
      </div>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}