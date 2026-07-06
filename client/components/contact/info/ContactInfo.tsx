"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  MessageCircle,
  Globe,
} from "lucide-react";

import Container from "@/components/ui/Container";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@vyomex.com",
    description: "Send us your project requirements anytime.",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
    description: "Available Monday to Friday, 9 AM - 6 PM.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Hyderabad, Telangana",
    description: "Serving clients worldwide with remote collaboration.",
  },
  {
    icon: Clock3,
    title: "Response Time",
    value: "Within 24 Hours",
    description: "Fast responses for all project inquiries.",
  },
  {
    icon: MessageCircle,
    title: "Consultation",
    value: "Free Discovery Call",
    description: "Discuss goals, scope, and technical planning.",
  },
  {
    icon: Globe,
    title: "Availability",
    value: "Worldwide",
    description: "Remote-first collaboration across different time zones.",
  },
];

export default function ContactInfo() {
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
            Contact Information
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Multiple Ways
            <span className="text-cyan-600"> To Reach Us</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you have an idea, a question, or an existing product to
            improve, our team is ready to help.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon
                    size={30}
                    className="text-cyan-600"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 font-semibold text-cyan-600">
                  {item.value}
                </p>

                <p className="mt-5 leading-8 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}