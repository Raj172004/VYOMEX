"use client";

import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2
          size={48}
          className="mx-auto animate-spin text-cyan-600"
        />

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Authenticating...
        </h2>

        <p className="mt-2 text-slate-600">
          Please wait while we verify your session.
        </p>
      </div>
    </div>
  );
}