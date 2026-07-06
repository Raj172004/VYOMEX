"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

import AuthCard from "../shared/AuthCard";
import AuthDivider from "../shared/AuthDivider";
import AuthHeader from "../shared/AuthHeader";
import SocialLogin from "../shared/SocialLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthCard>
      <AuthHeader
        badge="Welcome Back"
        title="Sign In"
        description="Access your VYOMEX dashboard to manage projects, invoices, messages, and more."
      />

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-5 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-8 text-center text-slate-600">
        Do not have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-cyan-600"
        >
          Create Account
        </Link>
      </p>
    </AuthCard>
  );
}