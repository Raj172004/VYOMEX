import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;

  background?: "default" | "muted" | "dark";

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
        background === "default" && "bg-white",

        background === "muted" && "bg-slate-50",

        background === "dark" && "bg-slate-950 text-white",

        spacing === "sm" && "py-16",

        spacing === "md" && "py-20",

        spacing === "lg" && "py-28 lg:py-32",

        spacing === "xl" && "py-32 lg:py-40",

        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}