"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Globe,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

import Container from "@/components/ui/Container";

const projects = [
  {
    title: "VYOMEX Commerce",
    category: "E-Commerce",
    description:
      "Enterprise e-commerce platform with analytics, secure payments, inventory management, and customer dashboard.",
    icon: ShoppingBag,
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    metric: "+185% Sales",
  },
  {
    title: "Finance Dashboard",
    category: "Web Application",
    description:
      "Business intelligence dashboard with real-time analytics, reports, and KPI tracking.",
    icon: BarChart3,
    technologies: ["React", "Node.js", "Charts"],
    metric: "50K+ Users",
  },
  {
    title: "Travel Platform",
    category: "Responsive Platform",
    description:
      "Booking and travel management platform optimized for performance across every device.",
    icon: Globe,
    technologies: ["Next.js", "AWS", "REST API"],
    metric: "98 Lighthouse",
  },
  {
    title: "Healthcare Mobile",
    category: "Mobile Application",
    description:
      "Patient management application focused on secure communication and appointment scheduling.",
    icon: Smartphone,
    technologies: ["React", "Express", "MongoDB"],
    metric: "24/7 Support",
  },
];

export default function ProjectsGrid() {
  return (
    <section className="py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_40px_100px_rgba(37,99,235,.12)]"
              >
                {/* Project Preview */}
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700">
                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl"
                  >
                    <Icon
                      size={44}
                      className="text-white"
                    />
                  </motion.div>

                  <div className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                    {project.category}
                  </div>

                  <div className="absolute right-6 bottom-6 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">
                    {project.metric}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-black text-slate-900">
                    {project.title}
                  </h3>

                  <p className="mt-5 leading-8 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="mt-10 inline-flex items-center gap-2 font-semibold text-cyan-600 transition hover:gap-3"
                  >
                    View Case Study

                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}