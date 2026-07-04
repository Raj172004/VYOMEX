"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Animation =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "none";

interface MotionProps {
  children: ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variants: Record<Animation, Variants> = {
  none: {
    hidden: {},
    visible: {},
  },

  fadeUp: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },

  fadeDown: {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },

  fadeLeft: {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },

  fadeRight: {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },

  scale: {
    hidden: {
      opacity: 0,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
};

export default function Motion({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={variants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.25,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}