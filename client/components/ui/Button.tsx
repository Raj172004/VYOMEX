"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-blue-200",
          "disabled:cursor-not-allowed disabled:opacity-60",

          {
            "rounded-xl px-5 py-2.5 text-sm": size === "sm",

            "rounded-2xl px-6 py-3 text-base": size === "md",

            "rounded-2xl px-8 py-4 text-lg": size === "lg",
          },

          {
            "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_20px_60px_rgba(37,99,235,.35)] hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(37,99,235,.45)]":
              variant === "primary",

            "border border-slate-300 bg-white/70 text-slate-900 backdrop-blur-xl hover:bg-white hover:shadow-xl":
              variant === "outline",
          },

          className
        )}
        {...props}
      >
        {loading ? (
          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;