"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  scaleHover,
} from "@/lib/animations";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({
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
      whileHover={scaleHover.whileHover}
      whileTap={scaleHover.whileTap}
      className={className}
    >
      {children}
    </motion.div>
  );
}