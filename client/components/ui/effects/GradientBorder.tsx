"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function GradientBorder({
  children,
}: Props) {
  return (
    <div
      className="
        rounded-[30px]
        bg-gradient-to-r
        from-cyan-400
        via-blue-500
        to-indigo-500
        p-[1px]
      "
    >
      <div className="rounded-[29px] bg-white">
        {children}
      </div>
    </div>
  );
}