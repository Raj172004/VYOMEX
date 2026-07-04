"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({
  children,
  className,
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
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