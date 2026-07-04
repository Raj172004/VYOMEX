"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
}

export default function ProcessCard({
  step,
  title,
  description,
}: ProcessCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        relative
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
        {step}
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600">
        Learn More

        <ArrowRight size={18} />
      </div>
    </motion.div>
  );
}