"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "Our team usually replies within one business day after receiving your inquiry.",
  },
  {
    question: "Do you sign Non-Disclosure Agreements?",
    answer:
      "Yes. We are happy to sign a Non-Disclosure Agreement before discussing confidential business information.",
  },
  {
    question: "Can you work with international clients?",
    answer:
      "Yes. We collaborate remotely with startups, agencies, and enterprises across multiple countries and time zones.",
  },
  {
    question: "Can you improve an existing product?",
    answer:
      "Yes. We modernize existing applications, improve user experience, optimize performance, and add new features.",
  },
];

export default function ContactFAQ() {
  const [active, setActive] = useState<number>(0);

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
            Everything You Need
            <span className="text-cyan-600"> To Know</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Here are answers to the most common questions before beginning a
            project with VYOMEX.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={faq.question}
                layout
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActive(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-xl font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown className="text-slate-500" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
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