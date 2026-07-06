"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container";

export default function PortfolioCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <h2 className="text-5xl font-black leading-tight text-white md:text-6xl">
            Ready to Create
            <br />
            Your Success Story?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-cyan-100">
            Build your next digital product with a team focused on quality,
            scalability, and long-term business value.
          </p>

          <Link
            href="/contact"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Start Your Project

            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}