"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";

import Container from "@/components/ui/Container";

const process = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We understand your business goals, users, competitors, and technical requirements before writing a single line of code.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description:
      "Wireframes, user experience, interface design, prototypes, and design systems are created for an outstanding product.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development",
    description:
      "Our engineers build scalable, secure, and maintainable software using modern technologies and enterprise architecture.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Growth",
    description:
      "Deployment, monitoring, analytics, optimization, and long-term support ensure continuous business growth.",
  },
];

export default function ServiceProcess() {
  return (
    <section className="bg-slate-50 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Our Process
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            From Idea to
            <span className="text-cyan-600"> Successful Product</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our proven development workflow ensures every project is delivered
            with quality, transparency, and measurable business value.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-4">
          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="relative rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_30px_80px_rgba(37,99,235,.12)]"
              >
                <span className="absolute right-8 top-8 text-5xl font-black text-slate-100">
                  {item.step}
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon
                    size={30}
                    className="text-cyan-600"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
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