"use client";

import {
  ButtonHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient"
    | "destructive";

  size?: "sm" | "md" | "lg";

  loading?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
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
          "inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300",
          "hover:-translate-y-1 active:translate-y-0",
          "focus:outline-none focus:ring-4 focus:ring-cyan-200",
          "disabled:cursor-not-allowed disabled:opacity-60",

          {
            "rounded-xl px-5 py-2.5 text-sm":
              size === "sm",

            "rounded-2xl px-6 py-3 text-base":
              size === "md",

            "rounded-2xl px-8 py-4 text-lg":
              size === "lg",
          },

          {
            "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-[0_20px_60px_rgba(37,99,235,.30)] hover:shadow-[0_30px_80px_rgba(37,99,235,.40)]":
              variant === "primary",

            "bg-slate-900 text-white hover:bg-slate-800":
              variant === "secondary",

            "border border-slate-300 bg-white/70 backdrop-blur-xl text-slate-900 hover:border-cyan-300 hover:bg-white":
              variant === "outline",

            "bg-transparent text-slate-700 hover:bg-slate-100":
              variant === "ghost",

            "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white":
              variant === "gradient",

            "bg-red-600 text-white hover:bg-red-700":
              variant === "destructive",
          },

          className
        )}
        {...props}
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;