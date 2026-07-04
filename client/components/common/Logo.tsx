"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
    >
      {/* Logo Mark */}

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
        <span className="text-lg font-black tracking-tight text-white">
          V
        </span>
      </div>

      {/* Logo Text */}

      <div className="leading-none">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          VYOMEX
        </h1>

        <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          DESIGN • DEVELOP • GROW
        </p>
      </div>
    </Link>
  );
}