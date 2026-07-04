"use client";

import { motion } from "framer-motion";

import { companyMetrics } from "@/constants/whyChoose";

export default function MetricCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-br
        from-blue-600
        via-indigo-600
        to-cyan-500
        p-10
        text-white
        shadow-[0_35px_100px_rgba(37,99,235,.35)]
      "
    >
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <p className="text-lg opacity-80">
        {companyMetrics.title}
      </p>

      <h2 className="mt-4 text-7xl font-black">
        {companyMetrics.value}
      </h2>

      <h3 className="mt-4 text-2xl font-bold">
        {companyMetrics.subtitle}
      </h3>

      <p className="mt-6 max-w-sm leading-8 text-blue-100">
        {companyMetrics.description}
      </p>
    </motion.div>
  );
}