"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Users,
} from "lucide-react";

import {
  Client,
  ClientService,
} from "@/services/clients/client.service";

import ClientFormModal from "./ClientFormModal";

export default function ClientPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function loadClients() {
    try {
      setLoading(true);
      setError("");

      const response = await ClientService.getAll();

      setClients(response.data.data);
    } catch (err) {
      console.error("Failed to load clients:", err);
      setError("Unable to load clients.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadClients();
  }, []);

  function handleClientCreated(client: Client) {
    setClients((current) => [client, ...current]);
  }

  const filteredClients = clients.filter((client) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return [
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
          .includes(query),
      );
  });

  const activeClients = clients.filter(
    (client) => client.status === "active",
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "inactive",
  ).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <Users size={14} />
            Workspace
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Clients
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your VYOMEX client relationships.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/10"
        >
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Users size={20} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Total Clients
          </p>

          <p className="mt-1 text-3xl font-black text-slate-950">
            {clients.length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Building2 size={20} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Active Clients
          </p>

          <p className="mt-1 text-3xl font-black text-slate-950">
            {activeClients}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
            <Users size={20} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Inactive Clients
          </p>

          <p className="mt-1 text-3xl font-black text-slate-950">
            {inactiveClients}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search clients by name, company, email, phone or industry..."
            aria-label="Search clients"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
          />
        </div>

        <div className="mt-6">
          {loading && (
            <div className="rounded-2xl bg-slate-50 p-10 text-center text-sm text-slate-500">
              Loading clients...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl bg-red-50 p-10 text-center">
              <p className="text-sm font-semibold text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => void loadClients()}
                className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredClients.length === 0 && (
              <div className="rounded-2xl bg-slate-50 p-10 text-center">
                <Users
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-bold text-slate-700">
                  {search
                    ? "No clients match your search"
                    : "No clients found"}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {search
                    ? "Try a different name, company, email, phone or industry."
                    : "Add your first client to get started."}
                </p>

                {!search && (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    <Plus size={16} />
                    Add Client
                  </button>
                )}
              </div>
            )}

          {!loading &&
            !error &&
            filteredClients.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-left">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Client
                      </th>

                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Company
                      </th>

                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Email
                      </th>

                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredClients.map((client) => (
                      <tr
                        key={client._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-5">
                          <p className="font-bold text-slate-900">
                            {client.firstName}{" "}
                            {client.lastName}
                          </p>
                        </td>

                        <td className="px-4 py-5 text-sm text-slate-600">
                          {client.company}
                        </td>

                        <td className="px-4 py-5 text-sm text-slate-600">
                          {client.email}
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              client.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>

      <ClientFormModal
        open={modalOpen}
        client={null}
        onClose={() => setModalOpen(false)}
        onSuccess={handleClientCreated}
      />
    </section>
  );
}
