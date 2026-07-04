"use client";

import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";

export default function NavButton() {
  return (
    <Button
      size="md"
      className="hidden xl:flex"
    >
      Start Project

      <ArrowRight size={18} />
    </Button>
  );
}