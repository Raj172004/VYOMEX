"use client";

import { motion } from "framer-motion";

import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <HeroBadge />
      </motion.div>

      <motion.div variants={item}>
        <HeroTitle />
      </motion.div>

      <motion.div variants={item}>
        <HeroDescription />
      </motion.div>

      <motion.div variants={item}>
        <HeroButtons />
      </motion.div>

      <motion.div variants={item}>
        <HeroStats />
      </motion.div>
    </motion.div>
  );
}