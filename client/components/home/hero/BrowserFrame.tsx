"use client";

import { motion } from "framer-motion";

import AnalyticsCards from "./AnalyticsCards";
import RevenueChart from "./RevenueChart";
import ProgressCard from "./ProgressCard";
import RecentProjects from "./RecentProjects";
import ActivityFeed from "./activity/ActivityFeed";
export default function BrowserFrame() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        shadow-[0_40px_120px_rgba(37,99,235,.18)]
      "
    >
      {/* Animated Border Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[32px]
          bg-gradient-to-r
          from-cyan-400/0
          via-cyan-400/20
          to-blue-500/0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Browser Header */}
      <div
        className="
          relative
          flex
          items-center
          justify-between
          border-b
          border-slate-200/70
          bg-white/70
          px-6
          py-4
          backdrop-blur-md
        "
      >
        {/* Browser Buttons */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* URL */}
        <div
          className="
            rounded-full
            border
            border-slate-200
            bg-white
            px-5
            py-2
            text-xs
            font-medium
            text-slate-500
            shadow-sm
          "
        >
          dashboard.vyomex.com
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-2">
          <motion.span
            animate={{
              scale: [1, 1.45, 1],
              opacity: [1, 0.35, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
            }}
            className="h-2.5 w-2.5 rounded-full bg-emerald-500"
          />

          <span
            className="
              text-xs
              font-semibold
              text-emerald-600
            "
          >
            Live
          </span>
        </div>
      </div>

      {/* Dashboard */}
      <div
        className="
          relative
          space-y-6
          bg-slate-50/80
          p-7
          backdrop-blur-sm
        "
      >
        <AnalyticsCards />

        <RevenueChart />

        <div className="grid gap-6 lg:grid-cols-2">
  <ProgressCard />

  <RecentProjects />
</div>

<div className="mt-6">
  <ActivityFeed />
</div>
      </div>
    </motion.div>
  );
}