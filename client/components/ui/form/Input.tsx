"use client";

import {
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { LucideIcon } from "lucide-react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,
      icon: Icon,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
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
            ref={ref}
            {...props}
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-4
              ${Icon ? "pl-14" : "pl-5"}
              pr-5
              outline-none
              transition-all
              duration-300
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              }
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
);

Input.displayName = "Input";

export default Input;