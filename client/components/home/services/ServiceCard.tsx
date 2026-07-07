"use client";

import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

import GlassCard from "@/components/ui/effects/GlassCard";

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
    <GlassCard className="h-full">
      <motion.article
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          group
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          p-8
        "
      >
        {/* Ambient Glow */}
        <div
          className="
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-cyan-400/10
            blur-[90px]
            transition-all
            duration-700
            group-hover:scale-150
          "
        />

        {/* Top Border */}
        <div
          className="
            absolute
            left-8
            top-0
            h-[3px]
            w-0
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-indigo-500
            transition-all
            duration-500
            group-hover:w-28
          "
        />

        <div className="relative z-10 flex h-full flex-col">
          <ServiceIcon icon={icon} />

          <h3 className="mt-8 text-2xl font-extrabold text-slate-900">
            {title}
          </h3>

          <p className="mt-5 flex-1 leading-8 text-slate-600">
            {description}
          </p>

          <motion.div
            whileHover={{
              x: 6,
            }}
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              font-semibold
              text-cyan-600
            "
          >
            Learn More

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            />
          </motion.div>
        </div>
      </motion.article>
    </GlassCard>
  );
}