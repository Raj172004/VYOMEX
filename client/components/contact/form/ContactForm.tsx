"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

import Container from "@/components/ui/Container";

export default function ContactForm() {
  return (
    <section
      id="contact-form"
      className="py-28"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              Contact Form
            </span>

            <h2 className="mt-6 text-5xl font-black text-slate-900">
              Tell Us About
              <span className="text-cyan-600"> Your Project</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Complete the form and our team will review your requirements.
              We normally respond within one business day.
            </p>

            <div className="mt-10 space-y-6">
              {[
                "Free project consultation",
                "Technical recommendations",
                "Architecture planning",
                "Transparent pricing",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="h-3 w-3 rounded-full bg-cyan-500" />

                  <span className="text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}

          <motion.form
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl"
          >
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Company
                </label>

                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Budget
                </label>

                <select className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500">
                  <option>Select Budget</option>
                  <option>$1k - $5k</option>
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k+</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Project Details
                </label>

                <textarea
                  rows={6}
                  placeholder="Describe your project..."
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Send Message

                <Send size={18} />
              </button>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}