"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

export default function ActivityItem({
  title,
  description,
  time,
}: ActivityItemProps) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
        <ArrowUpRight
          size={18}
          className="text-cyan-600"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-slate-900">
          {title}
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <span className="text-xs text-slate-400">
        {time}
      </span>
    </motion.div>
  );
}