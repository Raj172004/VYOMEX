"use client";

import Floating from "@/components/ui/Floating";

import BrowserFrame from "./BrowserFrame";
import FloatingCard from "./FloatingCard";
import NotificationStack from "./notifications/NotificationStack";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      {/* Main Dashboard */}
      <Floating duration={7}>
        <BrowserFrame />
      </Floating>

      {/* Live Notifications */}
      <NotificationStack />

      {/* Decorative Floating Card */}
      <div className="absolute -left-14 top-28 hidden xl:block">
        <Floating
          delay={0.5}
          duration={6}
        >
          <FloatingCard />
        </Floating>
      </div>
    </div>
  );
}