"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";

const timeline = [
  {
    year: "2026",
    title: "VYOMEX Founded",
    description:
      "Started with the vision of building premium digital experiences for modern businesses.",
  },
  {
    year: "2027",
    title: "Enterprise Expansion",
    description:
      "Expanded services into scalable web applications, enterprise software and cloud solutions.",
  },
  {
    year: "Future",
    title: "Global Digital Agency",
    description:
      "Growing into a global technology partner delivering innovative software products worldwide.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-slate-50 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Journey
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Our Growth
            <span className="text-cyan-600"> Timeline</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every milestone reflects our commitment to innovation, engineering,
            and delivering long-term value.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-cyan-200 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-14">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className={`relative flex ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                } items-center`}
              >
                <div className="hidden w-1/2 lg:block" />

                <div className="absolute left-5 z-10 h-6 w-6 rounded-full border-4 border-white bg-cyan-500 shadow-lg lg:left-1/2 lg:-translate-x-1/2" />

                <div className="ml-16 rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm lg:ml-0 lg:w-[45%]">
                  <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
                    {item.year}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}