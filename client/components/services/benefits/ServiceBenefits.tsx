"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  Headset,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

import Container from "@/components/ui/Container";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Enterprise Quality",
    description:
      "Every project follows clean architecture, reusable components, and production-ready coding standards.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized applications with excellent Core Web Vitals, SEO, accessibility, and blazing-fast performance.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Development",
    description:
      "Security-first approach with authentication, validation, authorization, and industry best practices.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description:
      "Applications designed to grow with your business without expensive rewrites in the future.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    description:
      "Structured project planning and agile execution ensure predictable delivery timelines.",
  },
  {
    icon: Headset,
    title: "Long-Term Support",
    description:
      "Continuous maintenance, feature updates, monitoring, and technical support after launch.",
  },
];

export default function ServiceBenefits() {
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
            Why Choose VYOMEX
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            More Than a
            <span className="text-cyan-600"> Development Agency</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We become your long-term technology partner, helping your business
            build, launch, and continuously improve digital products.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
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
                className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_80px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 transition group-hover:bg-cyan-500">
                  <Icon
                    size={30}
                    className="text-cyan-600 transition group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}