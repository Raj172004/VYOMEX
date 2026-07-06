"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container";

export default function ContactCTA() {
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
            Ready To Build
            <br />
            Your Next Product?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-cyan-100">
            Turn your ideas into scalable digital products with a team that
            focuses on quality, performance, and long-term success.
          </p>

          <Link
            href="/services"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore Our Services

            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}