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
    <footer className="relative overflow-hidden bg-slate-950 text-white" data-aos="fade-up">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_40%)]" />

      <Container>

        <div className="grid gap-14 py-20 md:grid-cols-2 xl:grid-cols-4">

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

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaLinkedinIn size={18} />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaXTwitter size={18} />
              </Link>

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
                  className="block text-slate-400 transition hover:translate-x-1 hover:text-white"
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
                  className="block text-slate-400 transition hover:translate-x-1 hover:text-white"
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
                  className="text-blue-400"
                />

                <span className="text-slate-400">
                  hello@vyomex.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-blue-400"
                />

                <span className="text-slate-400">
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-blue-400"
                />

                <span className="text-slate-400">
                  Hyderabad, Telangana, India
                </span>

              </div>

            </div>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold transition-all duration-300 hover:scale-105">

              Start Project

              <ArrowUpRight size={18} />

            </button>

          </div>

        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 py-8 text-sm text-slate-500 lg:flex-row">

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