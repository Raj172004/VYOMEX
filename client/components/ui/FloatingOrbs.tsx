"use client";

import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <>
      <motion.div
        animate={{
          y: [-15, 20, -15],
          x: [-20, 15, -20],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="absolute left-20 top-40 h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.8)]"
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [15, -10, 15],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute right-24 top-52 h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.8)]"
      />

      <motion.div
        animate={{
          y: [-25, 25, -25],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 left-1/3 h-5 w-5 rounded-full bg-indigo-400 shadow-[0_0_40px_rgba(129,140,248,0.8)]"
      />
    </>
  );
}