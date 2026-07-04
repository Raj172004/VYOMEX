"use client";

import { motion } from "framer-motion";
import { fadeRight } from "@/lib/animations";

export default function SlideRight({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeRight}
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