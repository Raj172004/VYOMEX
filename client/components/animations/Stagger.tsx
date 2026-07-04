"use client";

import { motion } from "framer-motion";
import { container } from "@/lib/animations";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Stagger({
  children,
  className,
}: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}