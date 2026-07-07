"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      className = "",
      placeholder,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    return (
      <div className="space-y-2">
        <label className="block font-semibold text-slate-700">
          {label}
        </label>

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            ref={ref}
            {...props}
            type={
              showPassword ? "text" : "password"
            }
            placeholder={placeholder}
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-4
              pl-14
              pr-14
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

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;