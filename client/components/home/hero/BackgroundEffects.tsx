"use client";

import { motion } from "framer-motion";

import MouseGlow from "@/components/ui/design-system/MouseGlow";
import Glow from "@/components/ui/design-system/Glow";
import GridPattern from "@/components/ui/design-system/GridPattern";
import GradientBlob from "@/components/ui/design-system/GradientBlob";

export default function BackgroundEffects() {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 -z-50 bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#ffffff_100%)]" />

      {/* Shared Design System */}
      <GridPattern />

      <Glow />

      <MouseGlow />

      {/* Premium Animated Blobs */}

      <GradientBlob className="-left-44 top-0 h-[520px] w-[520px]" />

      <GradientBlob className="-right-44 top-32 h-[520px] w-[520px]" />

      <GradientBlob className="bottom-[-220px] left-1/2 h-[650px] w-[650px] -translate-x-1/2" />

      {/* Aurora Layer */}

      <motion.div
        animate={{
          x: [-40, 50, -40],
          y: [-20, 30, -20],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 -z-40 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[150px]"
      />

      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [20, -30, 20],
          scale: [1.08, 1, 1.08],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-32 -z-40 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[180px]"
      />

      <motion.div
        animate={{
          y: [-30, 30, -30],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-180px] left-1/2 -z-40 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-400/12 blur-[200px]"
      />

      {/* Radial Mask */}

      <div
        className="absolute inset-0 -z-20"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 100%)",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.35), transparent)",
        }}
      />

      {/* Floating Orbs */}

      <motion.div
        animate={{
          x: [-15, 20, -15],
          y: [-10, 20, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="absolute left-24 top-40 -z-10 h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_45px_rgba(34,211,238,.9)]"
      />

      <motion.div
        animate={{
          x: [20, -15, 20],
          y: [15, -20, 15],
        }}
        transition={{
          repeat: Infinity,
          duration: 13,
          ease: "easeInOut",
        }}
        className="absolute right-28 top-60 -z-10 h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,.9)]"
      />

      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 left-1/3 -z-10 h-5 w-5 rounded-full bg-indigo-400 shadow-[0_0_40px_rgba(129,140,248,.8)]"
      />

      {/* Noise Texture */}

      <div
        className="absolute inset-0 -z-10 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}