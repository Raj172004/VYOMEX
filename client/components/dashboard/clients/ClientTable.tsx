"use client";

import {
  Building2,
  Eye,
  Mail,
  Pencil,
  Phone,
  Trash2,
  User,
} from "lucide-react";

import type { Client } from "@/services/clients/client.service";

interface ClientTableProps {
  clients: Client[];
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

function getInitials(
  firstName: string,
  lastName: string,
) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`
    .toUpperCase();
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
    month: "short",
    year: "numeric",
  });
}

export default function ClientTable({
  clients,
  onView,
  onEdit,
  onDelete,
}: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <User
            size={28}
            className="text-slate-400"
          />
        </div>

        <h3 className="mt-5 text-lg font-black text-slate-900">
          No clients found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          There are no clients matching your current
          search or filter.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Added
                </th>

                <th className="w-32 px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr
                  key={client._id}
                  className="group transition hover:bg-slate-50/70"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-blue-500/15">
                        {getInitials(
                          client.name, client.name, )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {client.name}{" "}
                          {client.name}
                        </p>

                        <p className="mt-0.5 truncate text-sm text-slate-500">
                          {client.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Building2
                        size={16}
                        className="text-slate-400"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {client.company}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      {client.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone size={13} />
                          {client.phone}
                        </div>
                      )}

                      {client.website && (
                        <div className="truncate text-xs text-slate-400">
                          {client.website}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        client.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          client.status === "active"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />

                      {client.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {formatDate(client.createdAt)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-1 opacity-60 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() =>
                          onView(client)
                        }
                        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        aria-label={`View ${client.name} ${client.name}`}
                        title="View client"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit(client)
                        }
                        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-cyan-50 hover:text-cyan-600"
                        aria-label={`Edit ${client.name} ${client.name}`}
                        title="Edit client"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(client)
                        }
                        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${client.name} ${client.name}`}
                        title="Delete client"
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

      {/* Mobile / Tablet */}
      <div className="grid gap-4 lg:hidden">
        {clients.map((client) => (
          <article
            key={client._id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-black text-white">
                  {getInitials(
                    client.name, client.name, )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-black text-slate-900">
                    {client.name}{" "}
                    {client.name}
                  </h3>

                  <p className="truncate text-sm text-slate-500">
                    {client.company}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                  client.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {client.status === "active"
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail
                  size={16}
                  className="text-slate-400"
                />

                <span className="truncate">
                  {client.email}
                </span>
              </div>

              {client.phone && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone
                    size={16}
                    className="text-slate-400"
                  />

                  <span>{client.phone}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Building2
                  size={16}
                  className="text-slate-400"
                />

                <span>{client.company}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">
                Added {formatDate(client.createdAt)}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onView(client)
                  }
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  aria-label={`View ${client.name} ${client.name}`}
                  title="View client"
                >
                  <Eye size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onEdit(client)
                  }
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
                  aria-label={`Edit ${client.name} ${client.name}`}
                  title="Edit client"
                >
                  <Pencil size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onDelete(client)
                  }
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${client.name} ${client.name}`}
                  title="Delete client"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}





