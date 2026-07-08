"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import NavbarBackground from "./NavbarBackground";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
      }}
      className="fixed inset-x-0 top-0 z-[9999]"
    >
      <NavbarBackground scrolled={scrolled} />

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-[1400px]
          items-center
          justify-between
          px-6
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Logo />
        </motion.div>

        <DesktopMenu />

        <MobileMenu />
      </div>

      {scrolled && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            absolute
            bottom-0
            left-1/2
            h-px
            w-[92%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-cyan-300/70
            to-transparent
          "
        />
      )}
    </motion.header>
  );
}