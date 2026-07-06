"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  Cpu,
  Workflow,
} from "lucide-react";

import Container from "@/components/ui/Container";

const technologies = [
  {
    icon: Code2,
    title: "Frontend",
    description:
      "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Database,
    title: "Backend",
    description:
      "Node.js, Express.js, MongoDB, Mongoose, REST APIs",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Cloud,
    title: "Cloud",
    description:
      "AWS, Docker, CI/CD, Vercel, GitHub Actions",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "JWT, Authentication, Authorization, Validation",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Workflow,
    title: "Development",
    description:
      "Agile Workflow, Git, Clean Architecture, Scalable Code",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Cpu,
    title: "Performance",
    description:
      "SEO, Optimization, Accessibility, Core Web Vitals",
    color: "from-sky-500 to-cyan-500",
  },
];

export default function ServiceTechnologies() {
  return (
    <section className="py-28">
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
            <span className="text-cyan-600"> We Build With</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Enterprise-grade tools and technologies for secure,
            scalable, and high-performance applications.
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
                  scale: 1.02,
                }}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_90px_rgba(37,99,235,.12)]"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tech.color}`}
                >
                  <Icon
                    className="text-white"
                    size={30}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {tech.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {tech.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}