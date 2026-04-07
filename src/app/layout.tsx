import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito,
  Caveat,
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-sign",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-quote",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Full-Stack Engineer Portfolio",
  description:
    "AI & Full-Stack Engineer · Mobile Developer — premium portfolio built with Next.js, Framer Motion, GSAP, and Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${caveat.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
