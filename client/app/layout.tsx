import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import AOSProvider from "@/providers/AOSProvider";
import AuthProvider from "@/providers/AuthProvider";

import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "VYOMEX",
  description: "Premium Software Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overflow-x-hidden antialiased`}
      >
        {/* Global UI */}
        <ScrollProgress />
        <CursorSpotlight />

        {/* Global Providers */}
        <AuthProvider>
          <AOSProvider>{children}</AOSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
