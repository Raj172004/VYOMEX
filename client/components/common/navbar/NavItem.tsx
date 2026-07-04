"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

import { NavItemProps } from "./navbar.types";

export default function NavItem({
  label,
  href,
  active,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "group relative px-3 py-2 text-sm font-semibold transition-colors duration-300",
        active
          ? "text-blue-600"
          : "text-slate-700 hover:text-blue-600"
      )}
    >
      {label}

      <motion.span
        className="
          absolute
          bottom-0
          left-3
          h-0.5
          w-0
          bg-blue-600
          transition-all
          duration-300
          group-hover:w-[calc(100%-24px)]
        "
      />
    </Link>
  );
}