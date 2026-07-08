"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-semibold transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-blue-200",
          "disabled:pointer-events-none disabled:opacity-60",

          {
            "px-5 py-2.5 text-sm": size === "sm",
            "px-7 py-3.5 text-base": size === "md",
            "px-9 py-4.5 text-lg": size === "lg",
          },

          {
            "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_20px_60px_rgba(37,99,235,.35)] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(37,99,235,.45)]":
              variant === "primary",

            "border border-slate-300 bg-white/70 text-slate-900 backdrop-blur-xl hover:bg-white hover:border-blue-300 hover:shadow-xl":
              variant === "outline",

            "bg-slate-900 text-white hover:bg-slate-800":
              variant === "secondary",
          },

          className
        )}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {loading ? (
          <div className="relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;