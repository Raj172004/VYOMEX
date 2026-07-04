"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <motion.h1
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        mt-8
        text-5xl
        font-black
        leading-tight
        tracking-tight
        text-slate-900

        lg:text-7xl
      "
    >
      Building
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
        {" "}Digital Products
      </span>

      <br />

      That Scale Businesses
    </motion.h1>
  );
}