"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.015,
            }
          : undefined
      }
      transition={{
        duration: 0.3,
      }}
      className={cn(
        `
        group
        relative
        overflow-hidden
        rounded-[30px]

        border
        border-white/40

        bg-white/65

        backdrop-blur-2xl

        shadow-[0_25px_80px_rgba(15,23,42,.08)]

        transition-all
        duration-500

        hover:border-cyan-300/70
        hover:shadow-[0_35px_100px_rgba(37,99,235,.18)]
      `,
        className
      )}
    >
      {/* Reflection */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/35
          via-white/5
          to-transparent
        "
      />

      {/* Animated Glow */}
      <motion.div
        animate={{
          x: ["-100%", "180%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "linear",
        }}
        className="
          absolute
          inset-y-0
          w-28
          rotate-12

          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
        "
      />

      {/* Inner Border */}
      <div
        className="
          absolute
          inset-[1px]
          rounded-[29px]
          border
          border-white/20
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}