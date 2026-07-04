"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  );
}