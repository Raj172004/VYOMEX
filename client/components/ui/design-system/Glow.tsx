"use client";

export default function Glow() {
  return (
    <>
      <div
        className="
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/10
          blur-[150px]
        "
      />

      <div
        className="
          absolute
          right-0
          bottom-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-400/10
          blur-[150px]
        "
      />
    </>
  );
}