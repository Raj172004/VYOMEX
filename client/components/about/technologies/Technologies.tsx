"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  Smartphone,
  Cpu,
} from "lucide-react";

import Container from "@/components/ui/Container";

const technologies = [
  {
    icon: Code2,
    title: "Frontend",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    icon: Database,
    title: "Backend",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud",
    stack: [
      "AWS",
      "Docker",
      "CI/CD",
      "GitHub",
      "Vercel",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    stack: [
      "JWT",
      "Authentication",
      "Authorization",
      "Validation",
      "Encryption",
    ],
  },
  {
    icon: Smartphone,
    title: "Responsive",
    stack: [
      "Mobile First",
      "Tablet",
      "Desktop",
      "Accessibility",
      "SEO",
    ],
  },
  {
    icon: Cpu,
    title: "Performance",
    stack: [
      "Optimization",
      "Lazy Loading",
      "Caching",
      "Code Splitting",
      "Analytics",
    ],
  },
];

export default function Technologies() {
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
            Technology Stack
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Modern Technologies
            <span className="text-cyan-600"> We Use</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We leverage industry-leading technologies to build secure,
            scalable, and high-performance digital products.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.title}
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
                className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_80px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 transition group-hover:bg-cyan-500">
                  <Icon
                    className="text-cyan-600 group-hover:text-white"
                    size={30}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {tech.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-3">
                  {tech.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}