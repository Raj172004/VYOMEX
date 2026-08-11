"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckSquare,
  FileText,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "New Client",
    description: "Add a business client",
    href: "/dashboard/clients/new",
    icon: Users,
  },
  {
    title: "New Project",
    description: "Start a project",
    href: "/dashboard/projects/new",
    icon: BriefcaseBusiness,
  },
  {
    title: "New Task",
    description: "Create a task",
    href: "/dashboard/tasks/new",
    icon: CheckSquare,
  },
  {
    title: "New Invoice",
    description: "Create an invoice",
    href: "/dashboard/invoices/new",
    icon: FileText,
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-black text-slate-950">
          Quick actions
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-950">
                  {action.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {action.description}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-500"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
