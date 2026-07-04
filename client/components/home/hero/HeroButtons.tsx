"use client";

import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

import {
  ArrowRight,
  Play,
} from "lucide-react";

export default function HeroButtons() {
  return (
    <div
      className="
        mt-14
        flex
        flex-col
        gap-5

        sm:flex-row
        sm:items-center
      "
    >
      <Magnetic>
        <Button
          size="lg"
          className="
            group
            relative
            overflow-hidden
            shadow-[0_20px_60px_rgba(37,99,235,.35)]
            transition-all
            duration-500
            hover:shadow-[0_25px_80px_rgba(37,99,235,.45)]
          "
        >
          {/* Hover Glow */}
          <span
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-blue-500/0
              via-white/15
              to-cyan-400/0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          <span className="relative z-10 flex items-center gap-2">
            Start Your Project

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </span>
        </Button>
      </Magnetic>

      <Magnetic>
        <Button
          variant="outline"
          size="lg"
          className="
            group
            border-slate-300
            bg-white/60
            backdrop-blur-xl
            transition-all
            duration-500
            hover:bg-white
            hover:shadow-xl
          "
        >
          <span className="flex items-center gap-2">
            <Play
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            View Portfolio
          </span>
        </Button>
      </Magnetic>
    </div>
  );
}