import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: "default" | "muted" | "dark" | "gradient";
  spacing?: "sm" | "md" | "lg" | "xl";
}

export default function Section({
  children,
  className,
  background = "default",
  spacing = "lg",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",

        background === "default" &&
          "bg-white",

        background === "muted" &&
          "bg-gradient-to-b from-slate-50 via-white to-slate-50",

        background === "gradient" &&
          "bg-[radial-gradient(circle_at_top,#dbeafe_0%,#eff6ff_30%,#ffffff_100%)]",

        background === "dark" &&
          "bg-slate-950 text-white",

        spacing === "sm" &&
          "py-16",

        spacing === "md" &&
          "py-20",

        spacing === "lg" &&
          "py-28 lg:py-32",

        spacing === "xl" &&
          "py-36 lg:py-44",

        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}