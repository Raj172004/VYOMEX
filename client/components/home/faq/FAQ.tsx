"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on scope. A professional business website typically takes 2–4 weeks, while larger SaaS platforms or enterprise applications can range from 6–12 weeks.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. We offer ongoing maintenance, security updates, performance monitoring and feature enhancements to keep your product running smoothly.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We redesign outdated websites with modern UI/UX, improved SEO, better accessibility and significantly improved performance.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "We specialize in Next.js, React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, cloud platforms and AI integrations.",
  },
  {
    question: "Will my website be mobile responsive?",
    answer:
      "Yes. Every project is designed mobile-first and optimized for phones, tablets and desktop devices.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <Section background="default" data-aos="fade-up">
      <Container>
        <Heading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before starting your project with VYOMEX."
        />

        <div className="mx-auto mt-20 max-w-4xl space-y-6">
          {faqs.map((faq, index) => {
            const active = activeIndex === index;

            return (
              <Card
                key={faq.question}
                padding="none"
                shadow="sm"
              >
                <button
                  onClick={() =>
                    setActiveIndex(active ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      active ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    active
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}