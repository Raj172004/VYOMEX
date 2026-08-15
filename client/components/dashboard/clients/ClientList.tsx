"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Mail, Phone, Plus, Search, Users, LucideIcon } from "lucide-react";

import {
  Client,
  ClientStatus,
} from "@/types/client";
import { ClientService } from "@/services/clients/client.service";

const statusLabels: Record<
  ClientStatus,
  string
> = {
  active: "Active",
  inactive: "Inactive",
  lead: "Lead",
};

export default function ClientList() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<"all" | ClientStatus>("all");

  const [error, setError] =
    useState<string | null>(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await ClientService.getAll();

      setClients(
        response.data.data ?? []
      );
    } catch (err) {
      console.error(
        "[ClientList] Load error:",
        err
      );

      setError(
        "Unable to load clients."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        !query ||
        client.name
          .toLowerCase()
          .includes(query) ||
        client.email
          .toLowerCase()
          .includes(query) ||
        client.company
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        client.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [clients, search, status]);

  const stats = useMemo(() => {
    return {
      total: clients.length,
      active: clients.filter(
        (client) =>
          client.status === "active"
      ).length,
      leads: clients.filter(
        (client) =>
          client.status === "lead"
      ).length,
      inactive: clients.filter(
        (client) =>
          client.status === "inactive"
      ).length,
    };
  }, [clients]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-white/5" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-96 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Clients
          </h1>

          <p className="mt-1 text-sm text-white/50">
            Manage your client relationships
            and business contacts.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <Plus size={17} />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "Total",
            value: stats.total,
            Icon: Users,
          },
          {
            label: "Active",
            value: stats.active,
            Icon: Users,
          },
          {
            label: "Leads",
            value: stats.leads,
            Icon: Users,
          },
          {
            label: "Inactive",
            value: stats.inactive,
            Icon: Building2,
          },
        ].map(({ label, value, Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">
                {label}
              </span>

              <Icon
                size={17}
                className="text-white/40"
              />
            </div>

            <p className="mt-3 text-2xl font-semibold text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search clients..."
            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "all"
                | ClientStatus
            )
          }
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none"
        >
          <option value="all">
            All Status
          </option>
          <option value="active">
            Active
          </option>
          <option value="lead">
            Lead
          </option>
          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                <th className="px-6 py-4">
                  Client
                </th>
                <th className="px-6 py-4">
                  Contact
                </th>
                <th className="px-6 py-4">
                  Industry
                </th>
                <th className="px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map(
                (client) => (
                  <tr
                    key={client._id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium text-white">
                        {client.name}
                      </div>

                      <div className="mt-1 text-xs text-white/40">
                        {client.company ||
                          "Independent client"}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail size={14} />
                        {client.email}
                      </div>

                      {client.phone && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
                          <Phone size={13} />
                          {client.phone}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5 text-sm text-white/60">
                      {client.industry ||
                        "—"}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {
                          statusLabels[
                            client.status
                          ]
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}

              {filteredClients.length ===
                0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center"
                  >
                    <Users
                      size={28}
                      className="mx-auto text-white/20"
                    />

                    <p className="mt-3 text-sm text-white/50">
                      No clients found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}












