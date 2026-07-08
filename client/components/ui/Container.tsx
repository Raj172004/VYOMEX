import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-[1400px]",
        "px-6",
        "sm:px-8",
        "lg:px-12",
        "xl:px-16",
        className
      )}
    >
      {children}
    </div>
  );
}