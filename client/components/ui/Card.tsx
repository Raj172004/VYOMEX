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
        "group rounded-3xl border border-slate-200 bg-white",

        shadow === "sm" && "shadow-sm",

        shadow === "md" && "shadow-lg shadow-slate-200/60",

        shadow === "lg" && "shadow-2xl shadow-blue-100/40",

        hover &&
          "transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(37,99,235,.15)]",

        padding === "sm" && "p-6",

        padding === "md" && "p-8",

        padding === "lg" && "p-10",

        padding === "none" && "overflow-hidden",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}