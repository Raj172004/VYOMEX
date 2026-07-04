"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "Healthcare SaaS",
    status: "Completed",
    color: "bg-emerald-500",
  },
  {
    name: "Restaurant Platform",
    status: "In Review",
    color: "bg-yellow-500",
  },
  {
    name: "Real Estate CRM",
    status: "Development",
    color: "bg-blue-500",
  },
];

export default function RecentProjects() {
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

        <h3 className="mb-6 font-bold text-slate-900">
          Recent Projects
        </h3>

        <div className="space-y-5">

          {projects.map((project, index) => (
            <motion.div
              key={project.name}
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
              whileHover={{
                x: 4,
              }}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                px-3
                py-2
                transition-colors
                duration-300
                hover:bg-slate-50
              "
            >
              <div>

                <h4 className="font-semibold text-slate-900">
                  {project.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {project.status}
                </p>

              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className={`
                  h-3
                  w-3
                  rounded-full
                  ${project.color}
                `}
              />

            </motion.div>
          ))}

        </div>

      </div>

    </motion.div>
  );
}