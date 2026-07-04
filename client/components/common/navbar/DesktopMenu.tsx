"use client";

import { motion } from "framer-motion";

import { navLinks } from "./navbar.data";
import NavItem from "./NavItem";
import CTAButton from "./CTAButton";

export default function DesktopMenu() {
  return (
    <div className="hidden items-center gap-10 lg:flex">
      <nav className="flex items-center gap-2">
        {navLinks.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <NavItem
              label={item.label}
              href={item.href}
            />
          </motion.div>
        ))}
      </nav>

      <CTAButton />
    </div>
  );
}