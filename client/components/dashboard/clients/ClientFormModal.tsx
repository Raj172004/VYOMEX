"use client";

import {
  Building2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import { useEffect, useId } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Client,
  ClientService,
  ClientStatus,
  CreateClientPayload,
} from "@/services/clients/client.service";

interface ClientFormModalProps {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSuccess: (client: Client) => void;
}

const clientSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(50, "First name must be 50 characters or less."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(50, "Last name must be 50 characters or less."),

  company: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .max(120, "Company name must be 120 characters or less."),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or less."),

  website: z
    .string()
    .trim()
    .max(200, "Website must be 200 characters or less.")
    .refine(
      (value) =>
        value === "" ||
        /^https?:\/\/.+/i.test(value),
      "Website must start with http:// or https://.",
    ),

  industry: z
    .string()
    .trim()
    .max(100, "Industry must be 100 characters or less."),

  address: z
    .string()
    .trim()
    .max(200, "Address must be 200 characters or less."),

  city: z
    .string()
    .trim()
    .max(100, "City must be 100 characters or less."),

  country: z
    .string()
    .trim()
    .max(100, "Country must be 100 characters or less."),

  status: z.enum(["active", "inactive"]),

  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be 1000 characters or less."),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const defaultValues: ClientFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  address: "",
  city: "",
  country: "",
  status: "active",
  notes: "",
};

export default function ClientFormModal({
  open,
  client,
  onClose,
  onSuccess,
}: ClientFormModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      firstName: client?.firstName ?? "",
      lastName: client?.lastName ?? "",
      company: client?.company ?? "",
      email: client?.email ?? "",
      phone: client?.phone ?? "",
      website: client?.website ?? "",
      industry: client?.industry ?? "",
      address: client?.address ?? "",
      city: client?.city ?? "",
      country: client?.country ?? "",
      status: client?.status ?? "active",
      notes: client?.notes ?? "",
    });
  }, [open, client, reset]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isSubmitting, onClose]);

  if (!open) {
    return null;
  }

  async function onSubmit(values: ClientFormValues) {
    const payload: CreateClientPayload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      company: values.company.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim() || undefined,
      website: values.website.trim() || undefined,
      industry: values.industry.trim() || undefined,
      address: values.address.trim() || undefined,
      city: values.city.trim() || undefined,
      country: values.country.trim() || undefined,
      status: values.status as ClientStatus,
      notes: values.notes.trim() || undefined,
    };

    try {
      const response = client
        ? await ClientService.update(client._id, payload)
        : await ClientService.create(payload);

      const savedClient = response.data.data;

      onSuccess(savedClient);

      toast.success(
        client
          ? "Client updated successfully."
          : "Client created successfully.",
      );

      onClose();
    } catch (error: unknown) {
      console.error("Failed to save client:", error);

      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            errors?: Record<string, string>;
          };
        };
      };

      const apiMessage =
        axiosError.response?.data?.message ??
        "Unable to save the client. Please try again.";

      const apiErrors = axiosError.response?.data?.errors;

      if (apiErrors) {
        Object.entries(apiErrors).forEach(([field, message]) => {
          if (field in defaultValues) {
            setError(field as keyof ClientFormValues, {
              type: "server",
              message,
            });
          }
        });
      }

      toast.error(apiMessage);
    }
  }

  const inputClass = (fieldError?: string) =>
    [
      "h-12 w-full rounded-2xl border bg-white text-sm text-slate-700 outline-none transition",
      "placeholder:text-slate-400",
      "focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10",
      fieldError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200",
    ].join(" ");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[0_40px_120px_rgba(15,23,42,.30)] sm:rounded-[32px]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
              Client Management
            </p>

            <h2
              id={titleId}
              className="mt-1 text-xl font-black text-slate-950 sm:text-2xl"
            >
              {client ? "Edit Client" : "Add New Client"}
            </h2>

            <p
              id={descriptionId}
              className="mt-1 text-sm text-slate-500"
            >
              {client
                ? "Update client information and account status."
                : "Add a new client to your VYOMEX workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="ml-4 shrink-0 rounded-2xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close client form"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="overflow-y-auto px-6 py-6 sm:px-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="First Name"
              icon={User}
              placeholder="John"
              required
              error={errors.firstName?.message}
              registration={register("firstName")}
            />

            <FormField
              label="Last Name"
              icon={User}
              placeholder="Doe"
              required
              error={errors.lastName?.message}
              registration={register("lastName")}
            />

            <FormField
              label="Company"
              icon={Building2}
              placeholder="Acme Corporation"
              required
              error={errors.company?.message}
              registration={register("company")}
            />

            <FormField
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="john@company.com"
              required
              error={errors.email?.message}
              registration={register("email")}
            />

            <FormField
              label="Phone"
              icon={Phone}
              type="tel"
              placeholder="+91 98765 43210"
              error={errors.phone?.message}
              registration={register("phone")}
            />

            <FormField
              label="Website"
              icon={Globe}
              type="url"
              placeholder="https://company.com"
              error={errors.website?.message}
              registration={register("website")}
            />

            <FormField
              label="Industry"
              placeholder="Technology"
              error={errors.industry?.message}
              registration={register("industry")}
            />

            <div>
              <label
                htmlFor="client-status"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Status
              </label>

              <select
                id="client-status"
                {...register("status")}
                className={inputClass(errors.status?.message)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {errors.status?.message && (
                <FieldError message={errors.status.message} />
              )}
            </div>

            <div className="sm:col-span-2">
              <FormField
                label="Address"
                icon={MapPin}
                placeholder="Street address"
                error={errors.address?.message}
                registration={register("address")}
              />
            </div>

            <FormField
              label="City"
              placeholder="Hyderabad"
              error={errors.city?.message}
              registration={register("city")}
            />

            <FormField
              label="Country"
              placeholder="India"
              error={errors.country?.message}
              registration={register("country")}
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="client-notes"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Notes
              </label>

              <textarea
                id="client-notes"
                rows={4}
                placeholder="Add internal notes about this client..."
                {...register("notes")}
                className={[
                  "w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition",
                  "placeholder:text-slate-400",
                  "focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10",
                  errors.notes?.message
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200",
                ].join(" ")}
              />

              {errors.notes?.message && (
                <FieldError message={errors.notes.message} />
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {isSubmitting
                ? client
                  ? "Saving..."
                  : "Creating..."
                : client
                  ? "Save Changes"
                  : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  icon?: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  registration: UseFormRegisterReturn;
}

function FormField({
  label,
  placeholder,
  type = "text",
  required = false,
  error,
  icon: Icon,
  registration,
}: FormFieldProps) {
  const id = `client-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-cyan-600">*</span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : undefined
          }
          {...registration}
          className={[
            "h-12 w-full rounded-2xl border bg-white text-sm text-slate-700 outline-none transition",
            "placeholder:text-slate-400",
            "focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200",
            Icon ? "pl-11 pr-4" : "px-4",
          ].join(" ")}
        />
      </div>

      {error && (
        <FieldError
          id={`${id}-error`}
          message={error}
        />
      )}
    </div>
  );
}

function FieldError({
  id,
  message,
}: {
  id?: string;
  message: string;
}) {
  return (
    <p
      id={id}
      className="mt-1.5 text-xs font-medium text-red-600"
    >
      {message}
    </p>
  );
}


