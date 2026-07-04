"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1.5,
        duration: 0.8,
      }}
      className="
        absolute
        bottom-8
        left-1/2
        hidden
        -translate-x-1/2

        lg:flex
        flex-col
        items-center
        gap-3
      "
    >
      <span
        className="
          text-xs
          font-medium
          uppercase
          tracking-[0.3em]
          text-slate-500
        "
      >
        Scroll
      </span>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="
          flex
          h-12
          w-7
          items-start
          justify-center
          rounded-full
          border
          border-slate-300
          p-1
        "
      >
        <motion.div
          animate={{
            y: [0, 18, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-blue-600
          "
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <ChevronDown
          size={18}
          className="text-slate-500"
        />
      </motion.div>
    </motion.div>
  );
}