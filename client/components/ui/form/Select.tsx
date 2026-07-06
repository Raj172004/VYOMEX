"use client";

import { SelectHTMLAttributes } from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export default function Select({
  label,
  error,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-slate-700">
        {label}
      </label>

      <select
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-5
          py-4
          outline-none
          transition-all
          duration-300
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-100
          ${className}
        `}
      >
        {children}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}