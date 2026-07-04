"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <motion.div
        whileHover={{
          rotate: 360,
          scale: 1.1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-blue-600
          to-cyan-500
          text-white
          shadow-lg
        "
      >
        <Code2 size={22} />
      </motion.div>

      <div>
        <h2 className="text-xl font-black tracking-wide text-slate-900">
          VYOMEX
        </h2>

        <p className="-mt-1 text-xs text-slate-500">
          Design • Develop • Grow
        </p>
      </div>
    </Link>
  );
}