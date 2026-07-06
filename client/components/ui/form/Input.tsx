"use client";

import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export default function Input({
  label,
  icon: Icon,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          {...props}
          className={`
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            py-4
            ${Icon ? "pl-14" : "pl-5"}
            pr-5
            outline-none
            transition-all
            duration-300
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-100
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
            ${className}
          `}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}