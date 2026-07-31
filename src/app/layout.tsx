import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="h-full antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
