"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Every project is different, but most websites take between 4–8 weeks, while enterprise platforms depend on the project scope and required integrations.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. We offer maintenance, monitoring, performance optimization, feature enhancements, and long-term technical support.",
  },
  {
    question: "Can you redesign an existing application?",
    answer:
      "Absolutely. We modernize legacy systems, improve UI and UX, optimize performance, and migrate applications to modern technologies.",
  },
  {
    question: "Which technologies do you specialize in?",
    answer:
      "We build solutions using Next.js, React, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS, Docker, AWS, and other modern technologies.",
  },
];

export default function ServiceFAQ() {
  const [open, setOpen] = useState<number>(0);

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
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Have Questions?
            <span className="text-cyan-600"> We Have Answers</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Here are answers to the most common questions our clients ask
            before starting a project.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const active = open === index;

            return (
              <motion.div
                key={faq.question}
                layout
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-xl font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: active ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown className="text-slate-600" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 leading-8 text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}