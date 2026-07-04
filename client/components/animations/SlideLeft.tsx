"use client";

import { motion } from "framer-motion";
import { fadeLeft } from "@/lib/animations";

export default function SlideLeft({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  );
}