"use client";

import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import ServiceIcon from "./ServiceIcon";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-200
        hover:shadow-[0_25px_70px_rgba(37,99,235,.12)]
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-500/0
          via-cyan-300/5
          to-blue-500/10
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        <ServiceIcon icon={icon} />

        <h3 className="mt-8 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>

        <motion.div
          whileHover={{
            x: 5,
          }}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            font-semibold
            text-blue-600
          "
        >
          Learn More

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}