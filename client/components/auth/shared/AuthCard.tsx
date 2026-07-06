"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-10
        shadow-[0_25px_80px_rgba(15,23,42,.08)]
      "
    >
      {children}
    </div>
  );
}