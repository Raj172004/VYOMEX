"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative h-36 overflow-hidden">
      {/* Top Line */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300/70
          to-transparent
        "
      />

      {/* Aurora */}

      <motion.div
        animate={{
          x: [-120, 120, -120],
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-0

          h-40
          w-[900px]

          -translate-x-1/2

          rounded-full

          bg-cyan-400/10

          blur-[120px]
        "
      />

      <motion.div
        animate={{
          x: [120, -120, 120],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-6

          h-36
          w-[700px]

          -translate-x-1/2

          rounded-full

          bg-blue-500/10

          blur-[120px]
        "
      />
    </div>
  );
}