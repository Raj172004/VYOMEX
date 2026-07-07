"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface NotificationCardProps {
  title: string;
  subtitle: string;
  amount?: string;
  delay?: number;
}

export default function NotificationCard({
  title,
  subtitle,
  amount,
  delay = 0,
}: NotificationCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 60,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.6,
      }}
      whileHover={{
        scale: 1.04,
        y: -3,
      }}
      className="
        w-[260px]
        rounded-2xl
        border
        border-white/30
        bg-white/80
        p-4
        shadow-[0_20px_60px_rgba(15,23,42,.12)]
        backdrop-blur-xl
      "
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-emerald-100 p-2">
          <CheckCircle2
            size={18}
            className="text-emerald-600"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">
            {title}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        {amount && (
          <span className="text-sm font-bold text-emerald-600">
            {amount}
          </span>
        )}
      </div>
    </motion.div>
  );
}