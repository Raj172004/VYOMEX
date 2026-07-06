"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  MapPin,
  Navigation,
} from "lucide-react";

import Container from "@/components/ui/Container";

export default function OfficeMap() {
  return (
    <section className="py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              Our Office
            </span>

            <h2 className="mt-6 text-5xl font-black text-slate-900">
              Visit
              <span className="text-cyan-600"> VYOMEX</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We collaborate with clients around the world through remote
              meetings while also supporting in-person sessions by appointment.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-cyan-600" />

                <div>
                  <h3 className="font-bold text-slate-900">
                    Office Location
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building2 className="mt-1 text-cyan-600" />

                <div>
                  <h3 className="font-bold text-slate-900">
                    Business Hours
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Monday – Friday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="mt-1 text-cyan-600" />

                <div>
                  <h3 className="font-bold text-slate-900">
                    Remote Collaboration
                  </h3>

                  <p className="mt-2 text-slate-600">
                    We work with startups and enterprises across multiple
                    countries and time zones.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 shadow-[0_40px_120px_rgba(15,23,42,.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.18),transparent_45%)]" />

              <div className="relative flex h-[420px] items-center justify-center rounded-[28px] border border-white/10 bg-slate-800">
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500">
                    <Navigation
                      size={40}
                      className="text-white"
                    />
                  </div>

                  <h3 className="mt-8 text-3xl font-black text-white">
                    Interactive Map
                  </h3>

                  <p className="mx-auto mt-4 max-w-sm leading-8 text-slate-300">
                    Google Maps integration will be connected during
                    backend deployment with live office coordinates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}