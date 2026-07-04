"use client";

import Floating from "@/components/ui/Floating";

import BrowserFrame from "./BrowserFrame";
import FloatingCard from "./FloatingCard";
import AnalyticsCards from "./AnalyticsCards";
import ProgressCard from "./ProgressCard";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">

      <Floating duration={7}>
        <BrowserFrame />
      </Floating>

      <div className="absolute -left-12 top-24 hidden xl:block">
        <Floating
          delay={0.3}
          duration={5}
        >
          <FloatingCard />
        </Floating>
      </div>

      <div className="absolute -right-12 top-8 hidden xl:block">
        <Floating
          delay={0.8}
          duration={6}
        >
          <AnalyticsCards />
        </Floating>
      </div>

      <div className="absolute -bottom-10 right-20 hidden xl:block">
        <Floating
          delay={1.2}
          duration={4}
        >
          <ProgressCard />
        </Floating>
      </div>
    </div>
  );
}