"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  Client,
  ClientService,
  ClientStatus,
  CreateClientInput,
} from "@/services/clients/client.service";

const emptyForm: CreateClientInput = {
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  industry: "",
  status: "lead",
  notes: "",
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
};

const statusConfig: Record<
  ClientStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  active: {
    label: "Active",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    dotClassName: "bg-emerald-500",
  },
  inactive: {
    label: "Inactive",
    className:
      "border-slate-200 bg-slate-50 text-slate-600",
    dotClassName: "bg-slate-400",
  },
  lead: {
    label: "Lead",
    className:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
    dotClassName: "bg-cyan-500",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selected, setSelected] =
    useState<Client | null>(null);

  const [editing, setEditing] =
    useState<Client | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] =
    useState<CreateClientInput>(emptyForm);

  const loadClients = useCallback(
    async (query?: string) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await ClientService.getAll(query);

        setClients(response.data.data ?? []);
      } catch (err) {
        console.error(
          "[ClientsPage] Failed to load clients:",
          err
        );

        setError(
          "Unable to load clients. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadClients(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadClients]);

  const stats = useMemo(() => {
    return {
      total: clients.length,

      active: clients.filter(
        (client) => client.status === "active"
      ).length,

      leads: clients.filter(
        (client) => client.status === "lead"
      ).length,

      inactive: clients.filter(
        (client) => client.status === "inactive"
      ).length,
    };
  }, [clients]);

  const openCreate = () => {
    setSelected(null);
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (client: Client) => {
    setSelected(null);
    setEditing(client);

    setForm({
      name: client.name,
      email: client.email,
      company: client.company ?? "",
      phone: client.phone ?? "",
      website: client.website ?? "",
      industry: client.industry ?? "",
      status: client.status,
      notes: client.notes ?? "",
      address: {
        street: client.address?.street ?? "",
        city: client.address?.city ?? "",
        state: client.address?.state ?? "",
        country: client.address?.country ?? "",
        postalCode:
          client.address?.postalCode ?? "",
      },
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const updateField = (
    field: keyof CreateClientInput,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateAddress = (
    field: keyof NonNullable<
      CreateClientInput["address"]
    >,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      address: {
        ...current.address,
        [field]: value,
      },
    }));
  };

  const saveClient = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editing) {
        const response =
          await ClientService.update(
            editing._id,
            form
          );

        setClients((current) =>
          current.map((client) =>
            client._id === editing._id
              ? response.data.data
              : client
          )
        );
      } else {
        const response =
          await ClientService.create(form);

        setClients((current) => [
          response.data.data,
          ...current,
        ]);
      }

      closeForm();
    } catch (err) {
      console.error(
        "[ClientsPage] Save failed:",
        err
      );

      setError(
        "Unable to save client. Please check the details and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteClient = async (client: Client) => {
    const confirmed = window.confirm(
      `Delete ${client.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await ClientService.delete(client._id);

      setClients((current) =>
        current.filter(
          (item) => item._id !== client._id
        )
      );

      setSelected(null);
    } catch (err) {
      console.error(
        "[ClientsPage] Delete failed:",
        err
      );

      setError(
        "Unable to delete this client."
      );
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* =======================================================
          PAGE HEADER
      ======================================================= */}

      <section>
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
            <Users size={13} />
            CRM
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Clients
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Manage your client relationships,
              contacts and business information
              from one workspace.
            </p>
          </div>

          {/* Premium action bar */}
          <button
            type="button"
            onClick={openCreate}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-2xl"
          >
            <Plus
              size={18}
              className="transition-transform duration-200 group-hover:rotate-90"
            />

            Add Client
          </button>
        </div>
      </section>

      {/* =======================================================
          STAT CARDS
      ======================================================= */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Clients"
          value={stats.total}
          description="All workspace clients"
          iconClassName="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          icon={CheckCircle2}
          label="Active"
          value={stats.active}
          description="Currently active"
          iconClassName="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          icon={Clock3}
          label="Leads"
          value={stats.leads}
          description="Potential clients"
          iconClassName="bg-amber-50 text-amber-600"
        />

        <StatCard
          icon={UserRound}
          label="Inactive"
          value={stats.inactive}
          description="Not currently active"
          iconClassName="bg-slate-100 text-slate-600"
        />
      </section>

      {/* =======================================================
          ERROR
      ======================================================= */}

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="rounded-lg p-1 transition hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =======================================================
          CLIENTS PANEL
      ======================================================= */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
        {/* Search header */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                Client directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and manage everyone connected
                to your workspace.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 lg:w-auto">
              <div className="relative w-full lg:w-[360px]">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search clients..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                />
              </div>

              <span className="hidden whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:inline-flex">
                {clients.length}{" "}
                {clients.length === 1
                  ? "client"
                  : "clients"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-3 p-5 sm:p-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <EmptyClients
            search={search}
            onAdd={openCreate}
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {clients.map((client) => {
              const status =
                statusConfig[client.status];

              return (
                <ClientRow
                  key={client._id}
                  client={client}
                  status={status}
                  onSelect={() =>
                    setSelected(client)
                  }
                  onEdit={() =>
                    openEdit(client)
                  }
                  onDelete={() =>
                    void deleteClient(client)
                  }
                />
              );
            })}
          </div>
        )}
      </section>

      {/* =======================================================
          CLIENT DETAILS MODAL
      ======================================================= */}

      {selected && (
        <Modal
          onClose={() => setSelected(null)}
        >
          <div className="space-y-6">
            <ModalHeader
              title="Client details"
              onClose={() => setSelected(null)}
            />

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-lg font-bold text-cyan-700">
                {getInitials(selected.name)}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold tracking-tight text-slate-950">
                  {selected.name}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {selected.company ||
                    selected.email}
                </p>
              </div>

              <span
                className={`ml-auto hidden rounded-full border px-3 py-1.5 text-xs font-semibold sm:inline-flex ${statusConfig[selected.status].className}`}
              >
                {statusConfig[selected.status].label}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Detail
                icon={Mail}
                label="Email"
                value={selected.email}
              />

              <Detail
                icon={Phone}
                label="Phone"
                value={
                  selected.phone ||
                  "Not provided"
                }
              />

              <Detail
                icon={Building2}
                label="Company"
                value={
                  selected.company ||
                  "Not provided"
                }
              />

              <Detail
                icon={Globe2}
                label="Website"
                value={
                  selected.website ||
                  "Not provided"
                }
              />

              <Detail
                icon={MapPin}
                label="Location"
                value={
                  [
                    selected.address?.city,
                    selected.address?.state,
                    selected.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  "Not provided"
                }
              />

              <Detail
                icon={Clock3}
                label="Industry"
                value={
                  selected.industry ||
                  "Not provided"
                }
              />
            </div>

            {selected.notes && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Notes
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {selected.notes}
                </p>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  openEdit(selected)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit Client
              </button>

              <button
                type="button"
                onClick={() =>
                  void deleteClient(selected)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =======================================================
          CREATE / EDIT MODAL
      ======================================================= */}

      {showForm && (
        <Modal onClose={closeForm}>
          <form
            onSubmit={saveClient}
            className="space-y-6"
          >
            <ModalHeader
              title={
                editing
                  ? "Edit Client"
                  : "Add Client"
              }
              onClose={closeForm}
            />

            <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
              <p className="text-sm font-semibold text-slate-950">
                Client information
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Add the essential contact and
                business details for this client.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name *"
                value={form.name ?? ""}
                onChange={(value) =>
                  updateField("name", value)
                }
                placeholder="John Smith"
              />

              <Field
                label="Email *"
                type="email"
                value={form.email ?? ""}
                onChange={(value) =>
                  updateField("email", value)
                }
                placeholder="john@company.com"
              />

              <Field
                label="Company"
                value={form.company ?? ""}
                onChange={(value) =>
                  updateField("company", value)
                }
                placeholder="Acme Inc."
              />

              <Field
                label="Phone"
                value={form.phone ?? ""}
                onChange={(value) =>
                  updateField("phone", value)
                }
                placeholder="+91..."
              />

              <Field
                label="Website"
                value={form.website ?? ""}
                onChange={(value) =>
                  updateField("website", value)
                }
                placeholder="https://..."
              />

              <Field
                label="Industry"
                value={form.industry ?? ""}
                onChange={(value) =>
                  updateField("industry", value)
                }
                placeholder="Technology"
              />

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                >
                  <option value="lead">
                    Lead
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-bold text-slate-950">
                  Location
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Optional business location.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="City"
                  value={
                    form.address?.city ?? ""
                  }
                  onChange={(value) =>
                    updateAddress(
                      "city",
                      value
                    )
                  }
                  placeholder="Hyderabad"
                />

                <Field
                  label="State"
                  value={
                    form.address?.state ?? ""
                  }
                  onChange={(value) =>
                    updateAddress(
                      "state",
                      value
                    )
                  }
                  placeholder="Telangana"
                />

                <Field
                  label="Country"
                  value={
                    form.address?.country ?? ""
                  }
                  onChange={(value) =>
                    updateAddress(
                      "country",
                      value
                    )
                  }
                  placeholder="India"
                />

                <Field
                  label="Postal Code"
                  value={
                    form.address?.postalCode ??
                    ""
                  }
                  onChange={(value) =>
                    updateAddress(
                      "postalCode",
                      value
                    )
                  }
                  placeholder="500001"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Notes
              </label>

              <textarea
                value={form.notes ?? ""}
                onChange={(event) =>
                  updateField(
                    "notes",
                    event.target.value
                  )
                }
                rows={4}
                placeholder="Add useful notes about this client..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-50"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editing
                    ? "Save Changes"
                    : "Create Client"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClassName,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  description: string;
  iconClassName: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          <Icon size={20} />
        </div>

        <span className="text-3xl font-bold tracking-tight text-slate-950">
          {value}
        </span>
      </div>

      <div className="mt-7">
        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   CLIENT ROW
============================================================ */

function ClientRow({
  client,
  status,
  onSelect,
  onEdit,
  onDelete,
}: {
  client: Client;
  status: {
    label: string;
    className: string;
    dotClassName: string;
  };
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group px-5 py-5 transition-colors hover:bg-slate-50/80 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 items-center gap-4 text-left"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-slate-100 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
            {getInitials(client.name)}

            <span
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${status.dotClassName}`}
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">
              {client.name}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="truncate text-xs text-slate-500">
                {client.company ||
                  client.email}
              </span>

              {client.company && (
                <>
                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="truncate text-xs text-slate-400">
                    {client.email}
                  </span>
                </>
              )}
            </div>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`}
            />

            {status.label}
          </span>

          <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-400 xl:flex">
            <Mail size={14} />
            <span className="max-w-[220px] truncate">
              {client.email}
            </span>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-transparent p-2.5 text-slate-400 transition hover:border-slate-200 hover:bg-white hover:text-slate-950"
            aria-label="Edit client"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-transparent p-2.5 text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
            aria-label="Delete client"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyClients({
  search,
  onAdd,
}: {
  search: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600 ring-8 ring-cyan-50/50">
        <Users size={27} />
      </div>

      <h3 className="mt-7 text-lg font-bold tracking-tight text-slate-950">
        {search
          ? "No clients found"
          : "Your client directory is empty"}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? "Try a different search term or clear your search to see all clients."
          : "Add your first client to start building a professional CRM workspace."}
      </p>

      {!search && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Plus size={16} />
          Add your first client
        </button>
      )}
    </div>
  );
}

/* ============================================================
   DETAIL
============================================================ */

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:bg-white">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={15} />

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   FIELD
============================================================ */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-50"
      />
    </div>
  );
}

/* ============================================================
   MODAL
============================================================ */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-7">
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   MODAL HEADER
============================================================ */

function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">
          VYOMEX CRM
        </p>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-xl border border-slate-200 p-2.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-950"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}