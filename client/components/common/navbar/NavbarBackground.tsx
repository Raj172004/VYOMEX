"use client";

import clsx from "clsx";

interface NavbarBackgroundProps {
  scrolled: boolean;
}

export default function NavbarBackground({
  scrolled,
}: NavbarBackgroundProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 -z-10 transition-all duration-500",
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      )}
    />
  );
}