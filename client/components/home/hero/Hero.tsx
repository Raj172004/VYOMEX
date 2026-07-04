"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";
import Parallax from "@/components/ui/Parallax";

import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        pt-24
        pb-24

        lg:min-h-screen
        lg:pt-10
        lg:pb-10
      "
    >
      {/* Premium Background */}
      <BackgroundEffects />

      <Container>
        <div
          className="
            grid
            items-center
            gap-20

            lg:grid-cols-2
          "
        >
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <HeroContent />
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <Parallax strength={18}>
              <HeroVisual />
            </Parallax>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}