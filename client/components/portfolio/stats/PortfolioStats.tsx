"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Users,
  Trophy,
  Globe2,
} from "lucide-react";

import Container from "@/components/ui/Container";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "50+",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    value: "35+",
    label: "Happy Clients",
  },
  {
    icon: Trophy,
    value: "99%",
    label: "Client Satisfaction",
  },
  {
    icon: Globe2,
    value: "8+",
    label: "Industries Served",
  },
];

export default function PortfolioStats() {
  return (
    <section className="bg-slate-900 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            Our Impact
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Results That Speak
            <span className="text-cyan-400"> For Themselves</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every project is built with measurable business goals, long-term
            scalability, and exceptional user experience.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500">
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </div>

                <h3 className="mt-8 text-5xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-slate-300">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}