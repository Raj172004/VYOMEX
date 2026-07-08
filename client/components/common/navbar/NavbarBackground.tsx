"use client";

import clsx from "clsx";

interface NavbarBackgroundProps {
  scrolled: boolean;
}

export default function NavbarBackground({
  scrolled,
}: NavbarBackgroundProps) {
  return (
    <>
      <div
        className={clsx(
          "absolute inset-0 -z-20 transition-all duration-500",

          scrolled
            ? `
              border-b
              border-white/30
              bg-white/70
              backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(15,23,42,.08)]
            `
            : "bg-transparent"
        )}
      />

      {scrolled && (
        <>
          <div className="absolute inset-0 -z-30 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-indigo-400/5" />

          <div className="absolute bottom-0 left-1/2 h-px w-[94%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        </>
      )}
    </>
  );
}