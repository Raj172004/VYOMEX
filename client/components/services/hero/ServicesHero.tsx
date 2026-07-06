"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Cloud,
} from "lucide-react";

import Container from "@/components/ui/Container";

const services = [
  {
    icon: Globe,
    title: "Web Development",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
  },
  {
    icon: Code2,
    title: "Custom Software",
  },
];

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-28">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[180px]" />

        <div className="absolute -left-44 top-32 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[160px]" />

        <div className="absolute -right-44 bottom-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[180px]" />
      </div>

      <Container>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700"
          >
            <Sparkles size={16} />

            Premium Digital Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
            }}
            className="mx-auto mt-8 max-w-5xl text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl"
          >
            Engineering
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Digital Products
            </span>

            <br />

            That Drive Growth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600"
          >
            We design, develop, and scale modern digital products using
            enterprise architecture, cutting-edge technologies, and
            user-focused experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.8,
            }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-slate-800"
            >
              Start Your Project

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600"
            >
              View Portfolio
            </Link>
          </motion.div>

          <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.6,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-cyan-200 hover:shadow-[0_30px_80px_rgba(37,99,235,.12)]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                    <Icon
                      size={30}
                      className="text-cyan-600"
                    />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}