"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function SubmitButton({
  loading = false,
  children,
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      disabled={loading || props.disabled}
      className={`
        inline-flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-full
        bg-slate-900
        px-8
        py-4
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}