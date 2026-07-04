"use client";

import { motion } from "framer-motion";

export default function ProgressCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white/90
        p-6
        shadow-sm
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-200
        hover:shadow-[0_20px_60px_rgba(37,99,235,.15)]
      "
    >
      {/* Hover Glow */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-500/0
          via-cyan-400/5
          to-blue-500/10
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <h3 className="font-bold text-slate-900">
            Website Launch
          </h3>

          <motion.span
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-sm
              font-semibold
              text-blue-700
            "
          >
            86%
          </motion.span>

        </div>

        {/* Animated Progress */}

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "86%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-600
              via-indigo-500
              to-cyan-400
            "
          />

        </div>

        <div className="mt-6 space-y-4">

          {[
            {
              title: "UI Design",
              value: "100%",
            },
            {
              title: "Frontend",
              value: "92%",
            },
            {
              title: "Backend",
              value: "74%",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.12,
              }}
              className="flex justify-between text-sm"
            >
              <span className="text-slate-500">
                {item.title}
              </span>

              <span className="font-semibold text-slate-900">
                {item.value}
              </span>
            </motion.div>
          ))}

        </div>

      </div>

    </motion.div>
  );
}