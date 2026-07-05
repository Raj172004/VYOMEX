"use client";

import { motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Globe,
  Users,
} from "lucide-react";

import Container from "@/components/ui/Container";

const achievements = [
  {
    icon: BriefcaseBusiness,
    value: "50+",
    title: "Projects Delivered",
    description:
      "Successfully delivered modern websites, SaaS platforms, dashboards, and enterprise applications.",
  },
  {
    icon: Users,
    value: "20+",
    title: "Happy Clients",
    description:
      "Helping startups, businesses, and enterprises achieve measurable digital growth.",
  },
  {
    icon: Globe,
    value: "10+",
    title: "Industries",
    description:
      "Serving multiple industries with scalable and future-ready digital solutions.",
  },
  {
    icon: Award,
    value: "99%",
    title: "Client Satisfaction",
    description:
      "Committed to delivering quality, performance, and long-term business value.",
  },
];

export default function Achievements() {
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
            Achievements
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Numbers That
            <span className="text-cyan-600"> Define Excellence</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every milestone reflects our commitment to innovation,
            engineering excellence, and long-term client success.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_80px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 transition-colors group-hover:bg-cyan-500">
                  <Icon
                    size={30}
                    className="text-cyan-600 transition-colors group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-5xl font-black text-slate-900">
                  {item.value}
                </h3>

                <h4 className="mt-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h4>

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