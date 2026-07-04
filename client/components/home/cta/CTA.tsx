import { ArrowRight, Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function CTA() {
  return (
    <Section spacing="xl" data-aos="zoom-in">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 px-8 py-20 text-center text-white shadow-2xl lg:px-16">

          {/* Background Blur */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-md">
              <Sparkles size={16} />
              Let's Build Something Extraordinary
            </div>

            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Ready To Transform Your
              <span className="block text-blue-200">
                Digital Presence?
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100">
              Whether you're launching a startup, modernizing enterprise software
              or building an AI-powered platform, VYOMEX is ready to turn your
              vision into a fast, scalable and beautiful digital product.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-slate-100"
              >
                Start Your Project

                <ArrowRight size={20} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-700"
              >
                Schedule A Consultation
              </Button>

            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">

              <span>✓ Free Consultation</span>

              <span>✓ Transparent Pricing</span>

              <span>✓ Modern Tech Stack</span>

              <span>✓ Long-Term Support</span>

            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}