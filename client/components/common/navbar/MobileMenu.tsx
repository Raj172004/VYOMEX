"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import MobileDrawer from "./MobileDrawer";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2"
        aria-label="Toggle menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}