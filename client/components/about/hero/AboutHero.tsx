"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[160px]" />

        <div className="absolute -left-40 top-32 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[160px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[180px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700"
          >
            <Sparkles size={16} />

            About VYOMEX
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl"
          >
            Building Digital
            <br />

            Experiences That
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Inspire Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600"
          >
            VYOMEX is a modern software agency focused on creating premium
            digital products, scalable web applications, enterprise platforms,
            and exceptional user experiences that help businesses grow with
            confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-slate-800">
              Explore Our Work

              <ArrowRight size={18} />
            </button>

            <button className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600">
              Meet Our Team
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              ["50+", "Projects Delivered"],
              ["20+", "Enterprise Clients"],
              ["99%", "Client Satisfaction"],
              ["24/7", "Support"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl"
              >
                <h3 className="text-3xl font-black text-slate-900">
                  {value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}