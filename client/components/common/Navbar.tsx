"use client";

import Container from "@/components/ui/Container";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import NavButton from "./NavButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">

      <Container>

        <div className="flex h-20 items-center justify-between">

          <Logo />

          <DesktopMenu />

          <NavButton />

          <MobileMenu />

        </div>

      </Container>

    </header>
  );
}