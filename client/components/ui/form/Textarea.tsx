"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          min-h-[180px]
          w-full
          rounded-2xl
          border
          border-slate-300
          p-5
          outline-none
          transition-all
          duration-300
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-100
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}