"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  error?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

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
          type={show ? "text" : "password"}
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
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-cyan-500"
            }
          `}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}