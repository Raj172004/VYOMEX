"use client";

import { motion } from "framer-motion";

interface FloatingProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export default function Floating({
  children,
  delay = 0,
  duration = 5,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}