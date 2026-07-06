"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
} from "lucide-react";

import Container from "@/components/ui/Container";

const workflow = [
  {
    step: "01",
    icon: Search,
    title: "Discovery",
    description:
      "Business analysis, requirement gathering, competitor research, and technical planning.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "UI / UX Design",
    description:
      "Wireframes, prototypes, design systems, and user-focused interface design.",
  },
  {
    step: "03",
    icon: Code2,
    title: "Development",
    description:
      "Enterprise-grade frontend and backend development using modern technologies.",
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "Testing",
    description:
      "Quality assurance, accessibility, performance optimization, and security validation.",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Deployment",
    description:
      "Production deployment, monitoring, analytics integration, and continuous support.",
  },
];

export default function Workflow() {
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
            Development Workflow
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            How Every Project
            <span className="text-cyan-600"> Comes to Life</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every engagement follows a structured engineering process that
            minimizes risk and maximizes product quality.
          </p>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent lg:block" />

          <div className="space-y-10">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="relative flex flex-col gap-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-white">
                    <Icon size={30} />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-bold tracking-widest text-cyan-600">
                      STEP {item.step}
                    </div>

                    <h3 className="mt-2 text-3xl font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}