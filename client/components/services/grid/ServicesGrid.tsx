"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  MonitorSmartphone,
  Cloud,
  BrainCircuit,
} from "lucide-react";

import Container from "@/components/ui/Container";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Modern business websites, enterprise portals, SaaS applications, and custom web platforms built for performance and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native-like mobile experiences using modern technologies with responsive and intuitive interfaces.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "High-converting online stores with payment integration, inventory management, analytics, and SEO optimization.",
  },
  {
    icon: MonitorSmartphone,
    title: "UI / UX Design",
    description:
      "Premium user interfaces and user experiences designed for engagement, accessibility, and business growth.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Cloud deployment, infrastructure architecture, CI/CD automation, monitoring, and scalable hosting solutions.",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description:
      "Integrate intelligent AI assistants, automation workflows, recommendation systems, and business intelligence.",
  },
];

export default function ServicesGrid() {
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
            Our Services
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Complete Digital
            <span className="text-cyan-600"> Solutions</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We provide end-to-end digital services designed to help startups,
            growing businesses, and enterprises build scalable products.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_35px_80px_rgba(37,99,235,.12)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 transition group-hover:bg-cyan-500">
                  <Icon
                    size={30}
                    className="text-cyan-600 transition group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}