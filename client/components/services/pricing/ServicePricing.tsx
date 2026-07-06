"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import Container from "@/components/ui/Container";

const plans = [
  {
    name: "Starter",
    description: "Perfect for startups and small businesses.",
    price: "Custom",
    features: [
      "Business Website",
      "Responsive Design",
      "SEO Optimization",
      "Contact Forms",
      "Basic Analytics",
    ],
    featured: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses.",
    price: "Custom",
    features: [
      "Everything in Starter",
      "Custom Dashboard",
      "CMS Integration",
      "Authentication",
      "API Integration",
      "Performance Optimization",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Built for organizations at scale.",
    price: "Let's Talk",
    features: [
      "Everything in Professional",
      "Cloud Infrastructure",
      "Advanced Security",
      "Dedicated Support",
      "Scalable Architecture",
      "Long-Term Maintenance",
    ],
    featured: false,
  },
];

export default function ServicePricing() {
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
            Pricing
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Flexible Plans
            <span className="text-cyan-600"> For Every Business</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every project is unique. We tailor the solution, timeline, and
            technology stack to your business goals.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className={`rounded-[32px] border p-10 transition-all duration-300 ${
                plan.featured
                  ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-white shadow-[0_40px_90px_rgba(37,99,235,.15)]"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.featured && (
                <div className="mb-6 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-black text-slate-900">
                {plan.name}
              </h3>

              <p className="mt-3 text-slate-500">
                {plan.description}
              </p>

              <div className="mt-8 text-5xl font-black text-slate-900">
                {plan.price}
              </div>

              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={18}
                      className="text-emerald-500"
                    />

                    <span className="text-slate-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Get Proposal

                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}