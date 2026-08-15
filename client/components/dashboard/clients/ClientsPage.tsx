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
  }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-zinc-500/10 text-slate-500 border-zinc-500/20",
  },
  lead: {
    label: "Lead",
    className:
      "bg-blue-500/10 text-cyan-600 border-blue-500/20",
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
    setEditing(null);
    setForm(emptyForm);
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
    <div className="space-y-6">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-medium text-cyan-600">
            CRM
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Clients
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Manage your client relationships from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Plus size={17} />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard
          icon={Users}
          label="Total Clients"
          value={stats.total}
        />

        <StatCard
          icon={CheckCircle2}
          label="Active"
          value={stats.active}
        />

        <StatCard
          icon={Clock3}
          label="Leads"
          value={stats.leads}
        />

        <StatCard
          icon={UserRound}
          label="Inactive"
          value={stats.inactive}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search clients..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          <p className="text-xs text-slate-400">
            {clients.length} client
            {clients.length === 1 ? "" : "s"}
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 p-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 rounded-3xl bg-cyan-50 p-5 text-cyan-600 shadow-sm">
              <Users className="text-slate-400" />
            </div>

            <h3 className="text-lg font-black tracking-tight text-slate-950">
              {search
                ? "No clients found"
                : "No clients yet"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-400">
              {search
                ? "Try a different search term."
                : "Add your first client to start building your CRM."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Plus size={16} />
                Add Client
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {clients.map((client) => {
              const status =
                statusConfig[client.status];

              return (
                <div
                  key={client._id}
                  className="group flex flex-col gap-4 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelected(client)
                    }
                    className="flex min-w-0 items-center gap-3 text-left"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-sm font-semibold text-slate-950">
                      {getInitials(client.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-950">
                        {client.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {client.company ||
                          client.email}
                      </p>
                    </div>
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
                      <Mail size={14} />
                      {client.email}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(client)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-950"
                      aria-label="Edit client"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        void deleteClient(client)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete client"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <ModalHeader
              title={selected.name}
              onClose={() => setSelected(null)}
            />

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
                  selected.phone || "Not provided"
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
                icon={MapPin}
                label="Location"
                value={
                  [
                    selected.address?.city,
                    selected.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  "Not provided"
                }
              />
            </div>

            {selected.notes && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
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
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-50"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  void deleteClient(selected)
                }
                className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal onClose={closeForm}>
          <form
            onSubmit={saveClient}
            className="space-y-5"
          >
            <ModalHeader
              title={
                editing
                  ? "Edit Client"
                  : "Add Client"
              }
              onClose={closeForm}
            />

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
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
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
                  className="w-full rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl px-4 py-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
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

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="City"
                value={
                  form.address?.city ?? ""
                }
                onChange={(value) =>
                  updateAddress("city", value)
                }
                placeholder="Hyderabad"
              />

              <Field
                label="State"
                value={
                  form.address?.state ?? ""
                }
                onChange={(value) =>
                  updateAddress("state", value)
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
                  form.address?.postalCode ?? ""
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

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
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
                className="w-full resize-none rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl px-4 py-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl p-4">
      <div className="flex items-center justify-between">
        <Icon size={18} className="text-slate-400" />
        <span className="text-2xl font-semibold text-slate-950">
          {value}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        {label}
      </p>
    </div>
  );
}

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
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl px-4 py-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
      />
    </div>
  );
}

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
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={14} />
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-1.5 truncate text-sm text-slate-950">
        {value}
      </p>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/15 sm:p-7">
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-950"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}


