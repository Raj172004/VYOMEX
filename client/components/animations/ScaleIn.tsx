"use client";

import { motion } from "framer-motion";

export default function ScaleIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        scale: 0.92,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  );
}