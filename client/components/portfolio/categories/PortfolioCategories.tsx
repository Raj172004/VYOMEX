"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";

const categories = [
  "All Projects",
  "Web Applications",
  "Mobile Apps",
  "E-Commerce",
  "Enterprise",
  "UI / UX",
  "Branding",
];

export default function PortfolioCategories() {
  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
              }}
              whileHover={{
                y: -3,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                index === 0
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-600"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  );
}