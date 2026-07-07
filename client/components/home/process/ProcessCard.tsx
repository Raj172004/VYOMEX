"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import GlassCard from "@/components/ui/effects/GlassCard";

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
    <GlassCard className="h-full">
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
            -right-24
            -top-24
            h-52
            w-52
            rounded-full
            bg-blue-500/10
            blur-[110px]
            transition-all
            duration-700
            group-hover:scale-150
          "
        />

        {/* Animated Top Border */}
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
            group-hover:w-32
          "
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Step Number */}
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl

              bg-gradient-to-br
              from-cyan-500
              via-blue-600
              to-indigo-700

              text-xl
              font-black
              text-white

              shadow-[0_18px_45px_rgba(37,99,235,.35)]
            "
          >
            {step}
          </motion.div>

          <h3
            className="
              mt-8
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-5
              flex-1
              leading-8
              text-slate-600
            "
          >
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