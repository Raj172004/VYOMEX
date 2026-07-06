"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import AuthCard from "../shared/AuthCard";
import AuthHeader from "../shared/AuthHeader";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthCard>
      <AuthHeader
        badge="Reset Password"
        title="Create New Password"
        description="Choose a strong password for your account."
      />

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-14 outline-none transition focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800"
        >
          Update Password
        </button>
      </form>
    </AuthCard>
  );
}