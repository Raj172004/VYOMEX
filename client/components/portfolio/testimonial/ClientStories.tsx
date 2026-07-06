"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import Container from "@/components/ui/Container";

const stories = [
  {
    company: "TechNova",
    person: "Alex Johnson",
    role: "Chief Executive Officer",
    review:
      "VYOMEX transformed our outdated platform into a modern digital product. Performance improved significantly and the user experience exceeded our expectations.",
  },
  {
    company: "FinCore",
    person: "Sarah Williams",
    role: "Product Manager",
    review:
      "The engineering quality, communication, and delivery process were exceptional. Every milestone was completed on time with outstanding attention to detail.",
  },
  {
    company: "HealthSync",
    person: "Michael Chen",
    role: "Founder",
    review:
      "From planning to deployment, the experience was seamless. The final application is fast, scalable, and exactly what our business required.",
  },
];

export default function ClientStories() {
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
            Client Success Stories
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Trusted By
            <span className="text-cyan-600"> Growing Businesses</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Long-term partnerships built on trust, engineering excellence,
            transparency, and measurable business results.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_90px_rgba(37,99,235,.12)]"
            >
              <Quote
                size={34}
                className="text-cyan-500"
              />

              <div className="mt-6 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-slate-600">
                {story.review}
              </p>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {story.person}
                </h3>

                <p className="text-sm text-slate-500">
                  {story.role}
                </p>

                <div className="mt-3 inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {story.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}