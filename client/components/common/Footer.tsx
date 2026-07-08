import Link from "next/link";
import Container from "@/components/ui/Container";

import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const services = [
  "Web Development",
  "UI / UX Design",
  "Mobile Apps",
  "AI Solutions",
  "Cloud Services",
];

const company = [
  "About",
  "Portfolio",
  "Careers",
  "Blog",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,.18),transparent_40%)]" />

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <Container>
        <div className="relative z-10 grid gap-14 py-24 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-4xl font-black tracking-tight">
              VYOMEX
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Building premium digital experiences,
              enterprise software and scalable
              technology solutions for ambitious businesses.
            </p>

            <div className="mt-8 flex gap-4">
              {[FaGithub, FaLinkedinIn, FaXTwitter].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-cyan-500"
                  >
                    <Icon size={18} />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Services
            </h3>

            <div className="space-y-4">
              {services.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-slate-400 transition-all duration-300 hover:translate-x-2 hover:text-cyan-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Company
            </h3>

            <div className="space-y-4">
              {company.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-slate-400 transition-all duration-300 hover:translate-x-2 hover:text-cyan-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Contact
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-cyan-400"
                />
                <span className="text-slate-400">
                  hello@vyomex.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-cyan-400"
                />
                <span className="text-slate-400">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-cyan-400"
                />
                <span className="text-slate-400">
                  Hyderabad, Telangana
                </span>
              </div>
            </div>

            <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,.45)]">
              Start Project

              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-6 border-t border-slate-800 py-8 text-sm text-slate-500 lg:flex-row">
          <p>
            © 2026 VYOMEX. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="#" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}