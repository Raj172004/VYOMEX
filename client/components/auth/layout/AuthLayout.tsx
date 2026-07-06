"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import AuthIllustration from "../shared/AuthIllustration";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Panel */}

        <motion.section
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 lg:flex"
        >
          <AuthIllustration />
        </motion.section>

        {/* Right Panel */}

        <motion.section
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="flex items-center justify-center px-8 py-20"
        >
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <h1 className="text-5xl font-black text-slate-900">
                {title}
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </motion.section>
      </div>
    </main>
  );
}