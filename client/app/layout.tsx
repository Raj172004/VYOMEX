import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import AOSProvider from "@/providers/AOSProvider";

import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import AuthProvider from "@/providers/AuthProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {/* Global Scroll Progress */}
        <ScrollProgress />

        {/* Global Cursor Spotlight */}
        <CursorSpotlight />

        {/* Global Providers */}
        <AOSProvider>
          {children}
        </AOSProvider>
        <AuthProvider>
  {children}
</AuthProvider>
      </body>
    </html>
  );
}