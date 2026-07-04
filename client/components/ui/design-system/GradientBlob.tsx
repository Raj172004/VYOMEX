"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export default function GradientBlob({
  className = "",
}: Props) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
        rotate: [0, 8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 10,
      }}
      className={`
        absolute
        rounded-full
        bg-gradient-to-br
        from-blue-500/20
        via-cyan-400/15
        to-indigo-500/20
        blur-[120px]
        ${className}
      `}
    />
  );
}