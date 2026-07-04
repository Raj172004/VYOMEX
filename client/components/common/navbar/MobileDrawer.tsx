"use client";

import { AnimatePresence, motion } from "framer-motion";

import { navLinks } from "./navbar.data";
import NavItem from "./NavItem";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            absolute
            left-0
            top-full
            w-full
            border-t
            border-slate-200
            bg-white
            shadow-xl
            lg:hidden
          "
        >
          <div className="flex flex-col p-6">
            {navLinks.map((item) => (
              <NavItem
                key={item.href}
                label={item.label}
                href={item.href}
                onClick={onClose}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}