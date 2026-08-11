"use client";

import Link from "next/link";
import {
  Bell,
  Menu,
  Plus,
  Search,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 sm:block">
              VYOMEX Workspace
            </p>
            <h1 className="text-lg font-black text-slate-950 sm:text-xl">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex">
            <Search size={17} className="text-slate-400" />
            <span className="text-sm text-slate-400">
              Search workspace...
            </span>
            <kbd className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-400">
              /
            </kbd>
          </div>

          <Link
            href="/dashboard/notifications"
            className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:border-cyan-200 hover:text-cyan-600"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
          </Link>

          <Link
            href="/dashboard/clients"
            className="hidden items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:flex"
          >
            <Plus size={17} />
            New Client
          </Link>
        </div>
      </div>
    </header>
  );
}
