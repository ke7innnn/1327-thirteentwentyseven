import type { Metadata } from "next";
import localFont from "next/font/local"; // Replaces 'next/font/google'
import { Abril_Fatface, Anton } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CinematicGrain from "@/components/ui/CinematicGrain";
import CustomCursor from "@/components/ui/CustomCursor";

const sugo = localFont({
  src: "../../public/fonts/Sugo-Pro-Display-Regular-trial.ttf",
  variable: "--font-sugo",
  display: "swap",
});

const carltine = localFont({
  src: "../../public/fonts/CarltineRegular.ttf",
  variable: "--font-carltine",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green Luxury Fashion",
  description: "High-end editorial fashion experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(
          sugo.variable,
          abril.variable,
          carltine.variable,
          anton.variable,
          "antialiased text-white overflow-x-hidden selection:bg-[#C9FF23] selection:text-black font-body"
        )}
      >
        <SmoothScroll>
          <CinematicGrain />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
