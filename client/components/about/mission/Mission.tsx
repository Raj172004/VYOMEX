"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Target,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/ui/Container";

const missionCards = [
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "We build modern, scalable digital products using cutting-edge technologies and enterprise architecture.",
  },
  {
    icon: Target,
    title: "Purpose",
    description:
      "Every solution is designed to solve real business problems and create measurable growth for our clients.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "Performance, security, accessibility and maintainability are built into every project from day one.",
  },
];

export default function Mission() {
  return (
    <section className="bg-slate-50 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Mission
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Building Products That
            <span className="text-cyan-600"> Create Impact</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We combine strategy, design, engineering, and long-term support to
            create premium digital experiences that help businesses scale with
            confidence.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {missionCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-[0_30px_70px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon
                    className="text-cyan-600"
                    size={30}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}