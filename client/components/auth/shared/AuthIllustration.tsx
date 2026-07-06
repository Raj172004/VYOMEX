"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Sparkles,
} from "lucide-react";

export default function AuthIllustration() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_70%)]" />

      <motion.div
        animate={{
          y: [-12, 12, -12],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="relative z-10 w-full max-w-md rounded-[40px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500">
          <ShieldCheck
            size={42}
            className="text-white"
          />
        </div>

        <h2 className="mt-8 text-4xl font-black text-white">
          Secure Authentication
        </h2>

        <p className="mt-6 leading-8 text-slate-200">
          Enterprise-grade authentication powered by JWT,
          encrypted passwords, secure APIs, and scalable
          backend architecture.
        </p>

        <div className="mt-12 space-y-5">
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
            <Lock className="text-cyan-300" />

            <span className="font-medium text-white">
              Protected User Accounts
            </span>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
            <Sparkles className="text-cyan-300" />

            <span className="font-medium text-white">
              Modern Authentication Experience
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}