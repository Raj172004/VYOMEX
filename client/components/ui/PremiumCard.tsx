import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PremiumCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-3xl",
        "border border-slate-200",
        "bg-white",
        "shadow-sm",
        "transition-all duration-500",
        "hover:-translate-y-3",
        "hover:border-blue-500/30",
        "hover:shadow-2xl",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-cyan-500/5" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}