import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  shadow?: "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  hover = false,
  shadow = "md",
  padding = "lg",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/60",
        "bg-white/70",
        "backdrop-blur-2xl",

        shadow === "sm" &&
          "shadow-sm",

        shadow === "md" &&
          "shadow-[0_20px_60px_rgba(15,23,42,.08)]",

        shadow === "lg" &&
          "shadow-[0_35px_90px_rgba(37,99,235,.15)]",

        hover &&
          "transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_45px_120px_rgba(37,99,235,.20)]",

        padding === "sm" &&
          "p-6",

        padding === "md" &&
          "p-8",

        padding === "lg" &&
          "p-10",

        padding === "none" &&
          "p-0",

        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-cyan-50/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}