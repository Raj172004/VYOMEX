"use client";

import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";

export default function CTAButton() {
  return (
    <Button
      size="sm"
      className="group"
    >
      Get Started

      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Button>
  );
}