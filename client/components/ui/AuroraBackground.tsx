"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Left Glow */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-20, 30, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]"
      />

      {/* Right Glow */}
      <motion.div
        animate={{
          x: [30, -40, 30],
          y: [20, -30, 20],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-10%] top-[20%] h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[120px]"
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]"
      />
    </div>
  );
}