"use client";

import Link from "next/link";

import { navigation } from "@/data/navigation";

export default function DesktopMenu() {
  return (
    <nav className="hidden items-center gap-10 xl:flex">

      {navigation.map((item) => (

        <Link
          key={item.href}
          href={item.href}
          className="
          relative
          text-sm
          font-semibold
          text-slate-600
          transition-all
          duration-300
          hover:text-blue-600
          after:absolute
          after:left-0
          after:-bottom-2
          after:h-[2px]
          after:w-0
          after:bg-blue-600
          after:transition-all
          hover:after:w-full
        "
        >
          {item.label}
        </Link>

      ))}

    </nav>
  );
}