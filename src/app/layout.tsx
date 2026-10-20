import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes, IBM_Plex_Mono } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = { title: "Shahbaz Ali | Software Developer", description: "Portfolio of Shahbaz Ali, software developer working with Python, Django and AI systems." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}