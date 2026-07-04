"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import { navigation } from "@/data/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="xl:hidden"
      >
        <Menu size={28} />
      </button>

      <div
        className={`fixed inset-0 z-[100] bg-white transition-all duration-500 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-black">

            VYOMEX

          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>

        </div>

        <div className="flex flex-col gap-8 p-8">

          {navigation.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-bold text-slate-700"
            >
              {item.label}
            </Link>

          ))}

        </div>

      </div>
    </>
  );
}