"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-500
        hover:border-blue-300
        hover:shadow-2xl
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
          <Icon
            size={30}
            className="text-blue-600"
          />
        </div>

        <h3 className="mt-8 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-8 text-slate-600">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600">
          Learn More

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.div>
  );
}