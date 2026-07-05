"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

import Container from "@/components/ui/Container";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace modern technologies and continuously improve every solution we build.",
  },
  {
    icon: HeartHandshake,
    title: "Integrity",
    description:
      "Transparency, honesty, and long-term relationships guide every client partnership.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "We follow enterprise standards for security, performance, maintainability, and accessibility.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Great products are built through teamwork, communication, and shared vision.",
  },
];

export default function Values() {
  return (
    <section className="py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Our Values
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Principles That
            <span className="text-cyan-600"> Drive Everything</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our culture is built around continuous learning, technical
            excellence, customer success, and creating long-term value.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                }}
                className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_30px_80px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon
                    size={30}
                    className="text-cyan-600"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}