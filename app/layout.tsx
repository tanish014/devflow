import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFlow — From scattered context to a plan you can ship",
  description:
    "DevFlow turns project requirements, technical notes, and constraints into a clear step-by-step engineering plan with dependency-aware flowcharts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#09090b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
