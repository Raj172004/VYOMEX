"use client";

import { Globe, ShieldCheck } from "lucide-react";

export default function SocialLogin() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50"
      >
        <Globe size={20} />

        Google
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50"
      >
        <ShieldCheck size={20} />

        GitHub
      </button>
    </div>
  );
}