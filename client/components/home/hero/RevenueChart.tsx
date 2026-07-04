"use client";

import { motion } from "framer-motion";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 180 },
  { month: "Feb", revenue: 260 },
  { month: "Mar", revenue: 220 },
  { month: "Apr", revenue: 340 },
  { month: "May", revenue: 310 },
  { month: "Jun", revenue: 420 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
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
      {/* Hover Gradient */}

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

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold text-slate-900">
              Revenue Overview
            </h3>

            <p className="text-sm text-slate-500">
              Last 6 Months
            </p>

          </div>

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              rounded-full
              bg-emerald-100
              px-3
              py-1
              text-sm
              font-semibold
              text-emerald-600
            "
          >
            +18%
          </motion.div>

        </div>

        <div className="h-72">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#2563EB",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #E2E8F0",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={4}
                fill="url(#gradient)"
                animationDuration={1800}
                activeDot={{
                  r: 7,
                  strokeWidth: 2,
                  fill: "#2563EB",
                  stroke: "#ffffff",
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>
  );
}