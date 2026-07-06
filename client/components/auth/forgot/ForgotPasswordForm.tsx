"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

import AuthCard from "../shared/AuthCard";
import AuthHeader from "../shared/AuthHeader";

export default function ForgotPasswordForm() {
  return (
    <AuthCard>
      <AuthHeader
        badge="Password Recovery"
        title="Forgot Password"
        description="Enter your email address and we will send password reset instructions."
      />

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-5 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800"
        >
          Send Reset Link
        </button>
      </form>

      <div className="mt-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold text-cyan-600"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}