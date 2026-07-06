"use client";

import { InputHTMLAttributes } from "react";

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({
  label,
  ...props
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        {...props}
        className="h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
      />

      <span className="text-sm text-slate-700">
        {label}
      </span>
    </label>
  );
}