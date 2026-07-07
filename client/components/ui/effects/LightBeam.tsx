"use client";

import { motion } from "framer-motion";

export default function LightBeam() {
  return (
    <motion.div
      animate={{
        x: [-200, 250, -200],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "linear",
      }}
      className="
        pointer-events-none

        absolute
        left-0
        top-0

        h-full
        w-[300px]

        rotate-12

        bg-gradient-to-r
        from-transparent
        via-cyan-400/10
        to-transparent

        blur-3xl
      "
    />
  );
}