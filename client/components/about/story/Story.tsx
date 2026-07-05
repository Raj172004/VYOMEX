"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";

export default function Story() {
  return (
    <section className="relative py-28">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              Our Story
            </span>

            <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
              We Build Digital Products
              <span className="text-cyan-600"> That Matter.</span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              VYOMEX was founded with a single vision—to help businesses
              transform their ideas into world-class digital experiences.
              Instead of creating ordinary websites, we engineer scalable,
              high-performance platforms that drive measurable growth.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Every project combines strategy, design, engineering, and
              long-term support to create products that remain valuable for
              years.
            </p>

            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-slate-800">
              Learn More

              <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[36px] border border-slate-200 bg-white p-10 shadow-[0_40px_100px_rgba(37,99,235,.10)]">
              <div className="absolute -top-5 left-10 rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white">
                Since 2026
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-4xl font-black text-slate-900">50+</h3>
                  <p className="mt-2 text-slate-500">
                    Successfully Delivered Projects
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-slate-900">20+</h3>
                  <p className="mt-2 text-slate-500">
                    Global Business Clients
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-slate-900">99%</h3>
                  <p className="mt-2 text-slate-500">
                    Client Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}