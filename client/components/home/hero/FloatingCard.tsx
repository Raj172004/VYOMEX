"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FloatingCard() {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="text-sm text-slate-500">
        Monthly Growth
      </div>

      <div className="mt-2 flex items-center gap-2">

        <h3 className="text-3xl font-black">
          +18.4%
        </h3>

        <ArrowUpRight
          className="text-green-500"
          size={20}
        />

      </div>

      <p className="mt-2 text-sm text-slate-500">
        compared to last month
      </p>
    </motion.div>
  );
}