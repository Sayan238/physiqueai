import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhysiqueAI — AI-Powered Fitness Coach",
  description: "Get personalized AI-generated diet plans, workout routines, and track your fitness progress with PhysiqueAI.",
  keywords: ["fitness", "AI", "diet plan", "workout", "BMI calculator", "Indian diet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#06060a] text-gray-200`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
