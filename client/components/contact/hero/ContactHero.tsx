"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import Container from "@/components/ui/Container";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[180px]" />

        <div className="absolute -left-44 top-24 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute -right-44 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[180px]" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700"
          >
            <Sparkles size={16} />

            Contact VYOMEX
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
            }}
            className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl"
          >
            Let Us Build
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Something Amazing
            </span>
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
            Tell us about your project. We help startups, businesses,
            and enterprises design, develop, and scale premium digital
            products.
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
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-slate-800"
            >
              Start Conversation

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600"
            >
              View Portfolio
            </Link>
          </motion.div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <Mail
                className="mx-auto text-cyan-600"
                size={34}
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Email
              </h3>

              <p className="mt-2 text-slate-600">
                Fast responses for every inquiry.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <Phone
                className="mx-auto text-cyan-600"
                size={34}
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Call
              </h3>

              <p className="mt-2 text-slate-600">
                Discuss your project directly with us.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <MessageSquare
                className="mx-auto text-cyan-600"
                size={34}
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Consultation
              </h3>

              <p className="mt-2 text-slate-600">
                Schedule a free discovery session.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}