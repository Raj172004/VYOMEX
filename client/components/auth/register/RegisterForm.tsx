"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

import AuthCard from "../shared/AuthCard";
import AuthDivider from "../shared/AuthDivider";
import AuthHeader from "../shared/AuthHeader";
import SocialLogin from "../shared/SocialLogin";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthCard>
      <AuthHeader
        badge="Create Account"
        title="Register"
        description="Create your VYOMEX account to manage projects, invoices, and collaboration."
      />

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-5 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

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

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-14 outline-none transition focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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
          Create Account
        </button>
      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-8 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-cyan-600"
        >
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}