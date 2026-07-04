"use client";

import { motion } from "framer-motion";

import { analyticsCards } from "@/data/home";

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {analyticsCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
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
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200/80
              bg-white/90
              p-5
              shadow-sm
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-cyan-200
              hover:shadow-[0_20px_50px_rgba(14,165,233,.18)]
            "
          >
            {/* Premium Hover Glow */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-cyan-400/0
                via-cyan-300/5
                to-blue-500/10
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-50
                    to-cyan-50
                    p-3
                  "
                >
                  <Icon
                    className="text-blue-600"
                    size={20}
                  />
                </motion.div>

                <motion.span
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-1
                    text-sm
                    font-bold
                    text-emerald-600
                  "
                >
                  {card.growth}
                </motion.span>
              </div>

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <motion.h3
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                {card.value}
              </motion.h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}