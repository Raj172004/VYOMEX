"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/75
        backdrop-blur-xl
        shadow-[0_30px_90px_rgba(37,99,235,.12)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}