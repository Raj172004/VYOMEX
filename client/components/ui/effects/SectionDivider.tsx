"use client";

export default function SectionDivider() {
  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-px w-[92%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  );
}