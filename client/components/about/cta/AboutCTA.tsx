"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700" />

      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-[180px]" />

      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-[200px]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl rounded-[40px] border border-white/20 bg-white/10 p-16 text-center backdrop-blur-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white">
            <Sparkles size={16} />
            <span>Let&apos;s Build Something Amazing</span>
          </div>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl">
            Ready to Transform
            <br />
            Your Digital Presence?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100">
            Whether you&apos;re launching a startup, scaling your business,
            or modernizing enterprise software, VYOMEX is ready to turn your
            vision into reality.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
            >
              View Portfolio
            </Link>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/20 pt-12 md:grid-cols-3">
            <div>
              <h3 className="text-4xl font-black text-white">50+</h3>
              <p className="mt-2 text-blue-100">
                Projects Delivered
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-white">99%</h3>
              <p className="mt-2 text-blue-100">
                Client Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-white">24/7</h3>
              <p className="mt-2 text-blue-100">
                Dedicated Support
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}