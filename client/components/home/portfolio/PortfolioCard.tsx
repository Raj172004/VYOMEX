"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import BrowserMockup from "../BrowserMockup";

import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/effects/GlassCard";

interface Props {
  project: {
    title: string;
    category: string;
    description: string;
    gradient: string;
    status: string;
  };
}

export default function PortfolioCard({
  project,
}: Props) {
  return (
    <GlassCard className="h-full">
      <motion.article
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.3,
        }}
        className="group flex h-full flex-col overflow-hidden"
      >
        {/* Preview */}
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <BrowserMockup
              gradient={project.gradient}
            />
          </motion.div>

          {/* Glow */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-t
              from-slate-950/10
              via-transparent
              to-transparent

              opacity-0

              transition-opacity
              duration-500

              group-hover:opacity-100
            "
          />

          {/* Status */}
          <div className="absolute right-5 top-5">
            <span
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-white/85

                px-4
                py-2

                text-xs
                font-bold

                text-emerald-700

                backdrop-blur-xl
              "
            >
              <CheckCircle2 size={14} />

              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-8">
          <span
            className="
              inline-flex
              w-fit

              rounded-full

              bg-cyan-100

              px-4
              py-2

              text-xs
              font-bold
              uppercase
              tracking-[0.22em]

              text-cyan-700
            "
          >
            {project.category}
          </span>

          <h3
            className="
              mt-7

              text-3xl
              font-black

              tracking-tight

              text-slate-900
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-5

              flex-1

              leading-8

              text-slate-600
            "
          >
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind",
            ].map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full

                  border
                  border-slate-200

                  bg-slate-50

                  px-3
                  py-1

                  text-xs
                  font-semibold

                  text-slate-600
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-between">
            <Button variant="outline">
              View Case Study
            </Button>

            <motion.div
              whileHover={{
                rotate: 45,
                scale: 1.15,
              }}
            >
              <ArrowUpRight
                size={22}
                className="text-cyan-600"
              />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </GlassCard>
  );
}