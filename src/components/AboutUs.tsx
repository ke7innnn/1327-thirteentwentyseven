"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── KEITH SHAH VECTOR SIGNATURE (DEEP GREEN #105233) ────────────────────────
function KeithShahSignature({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 120"
            fill="none"
            stroke="#105233"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M25,85 C45,20 55,15 70,70 C80,90 90,85 100,50 C105,35 120,45 130,75 M115,60 C140,55 155,58 170,60 C180,62 190,55 200,50 M215,30 C220,20 225,15 230,80 C235,95 240,60 250,55 C260,50 270,55 280,60 M270,35 C290,30 315,35 340,40 C360,45 375,30 385,25 M275,75 C305,70 335,72 365,75" />
        </svg>
    );
}

// ─── VALUE TILES DATA ─────────────────────────────────────────────────────────
interface ValueTileData {
    num: string;
    title: string;
    definition: string;
    slug: string;
    baseImage: string;
    hoverImage: string;
    alt: string;
}

const VALUE_TILES: ValueTileData[] = [
    {
        num: "01",
        title: "COMMUNITY",
        definition: "The crews we dress become the people we know.",
        slug: "community",
        baseImage: "/aboutus/about-4.png",
        hoverImage: "/feed/feed-01.jpg",
        alt: "1327 crew members wearing custom uniforms",
    },
    {
        num: "02",
        title: "TRUST",
        definition: "Sample first, always. You approve before it scales.",
        slug: "trust",
        baseImage: "/aboutus/about-2.png",
        hoverImage: "/feed/feed-02.jpg",
        alt: "Craftsman inspecting sample embroidery precision",
    },
    {
        num: "03",
        title: "RESPECT",
        definition: "Same standard on the workshop floor as in the quote.",
        slug: "respect",
        baseImage: "/aboutus/about-3.png",
        hoverImage: "/feed/feed-04.jpg",
        alt: "1327 Malad West workshop floor and cutting table",
    },
    {
        num: "04",
        title: "LOYALTY",
        definition: "We don't chase the next order. We keep the last one.",
        slug: "loyalty",
        baseImage: "/aboutus/about-1.png",
        hoverImage: "/feed/feed-05.jpg",
        alt: "Full 1327 apparel and hospitality product range",
    },
];

// ─── MAIN COMPRESSED ORIGIN SECTION ──────────────────────────────────────────
export default function AboutUs() {
    const reduced = useReducedMotion() ?? false;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            id="about"
            aria-labelledby="origin-kicker"
            className="relative z-10 bg-[#F2EFE8] text-[#105233] py-16 md:py-24 border-b border-[#105233]/15 overflow-hidden select-none rounded-none"
        >
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10">

                {/* ─── MOVEMENT 1 — THE FOUNDER ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
                    
                    {/* Left Column (Cols 1–4 Desktop / Aspect 3:4): Founder Portrait */}
                    <motion.div
                        initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
                        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="md:col-span-4 relative aspect-[3/4] w-full overflow-hidden border border-[#105233]/15 rounded-none shadow-none bg-[#105233]/5"
                    >
                        <Image
                            src="/aboutus/about-3.png"
                            alt="Keith Shah, Founder of 1327 in Malad West workshop"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 32vw"
                            className="object-cover rounded-none object-center"
                        />

                        {/* Solid #105233 Caption Box Bottom-Left */}
                        <div className="absolute bottom-0 left-0 p-3 bg-[#105233] text-[#F7F5F0] z-10 rounded-none border-t border-r border-[#F7F5F0]/20">
                            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">
                                <p className="text-[#F7F5F0]">KEITH SHAH</p>
                                <p className="text-[#F7F5F0]/75">FOUNDER</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column (Cols 6–11 Desktop): Text & Proof Line */}
                    <div className="md:col-span-8 lg:col-span-7 md:col-start-5 flex flex-col gap-5 text-left">
                        
                        {/* Kicker */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, ease: EASE }}
                            id="origin-kicker"
                            className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-[#105233]"
                        >
                            / THE ORIGIN
                        </motion.div>

                        {/* Headline — Two lines */}
                        <motion.h2
                            initial={reduced ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#105233] leading-[0.88]"
                        >
                            <span className="block">It Runs On</span>
                            <span className="block">Family.</span>
                        </motion.h2>

                        {/* Lead Paragraph */}
                        <motion.p
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
                            className="font-sans text-base sm:text-lg text-[#105233]/90 font-light leading-relaxed max-w-xl"
                        >
                            1327 is a number that came off the street, borrowed from the films we grew up on. It stands for one thing: nothing matters more than family. We didn&apos;t build a merch company — we built a crew that happens to make uniforms.
                        </motion.p>

                        {/* Signature Block */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
                            className="flex flex-col items-start gap-1 mt-2"
                        >
                            <div className="w-44 h-12 relative opacity-90">
                                <KeithShahSignature className="w-full h-full text-[#105233]" />
                            </div>
                            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#105233]">
                                KEITH SHAH — FOUNDER
                            </span>
                        </motion.div>

                        {/* Single-Row Proof Line */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.4, delay: 0.32, ease: EASE }}
                            className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#105233]/85 border-t border-[#105233]/15 pt-4 mt-2"
                        >
                            EST. 2026 · 150+ CREWS DRESSED · MALAD WEST, BOMBAY
                        </motion.div>

                    </div>
                </div>

                {/* ─── MOVEMENT 2 — THE CODE ──────────────────────────────────────────── */}
                <div className="w-full flex flex-col gap-6 pt-6 border-t border-[#105233]/15">
                    
                    {/* Header Label */}
                    <div className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-[#105233]">
                        / THE CODE
                    </div>

                    {/* 4 Value Image Tiles (2x2 on Mobile / 4 in a row on Desktop) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                        {VALUE_TILES.map((tile, idx) => {
                            const isSelfHovered = hoveredIndex === idx;
                            const isSiblingHovered = hoveredIndex !== null && !isSelfHovered;

                            return (
                                <Link
                                    key={tile.slug}
                                    href={`/values/${tile.slug}`}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onFocus={() => setHoveredIndex(idx)}
                                    onBlur={() => setHoveredIndex(null)}
                                    aria-label={`${tile.title} — ${tile.definition}`}
                                    className={`group relative w-full aspect-[4/5] bg-[#105233]/10 border border-[#105233]/15 overflow-hidden rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#105233] focus-visible:ring-offset-2 transition-all duration-320 ease-out transform-gpu ${
                                        isSiblingHovered ? "opacity-55" : "opacity-100"
                                    } ${isSelfHovered ? "scale-[1.02] z-20" : "z-10"}`}
                                >
                                    {/* Base Image */}
                                    <Image
                                        src={tile.baseImage}
                                        alt={tile.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 24vw"
                                        quality={80}
                                        className={`object-cover rounded-none transition-transform duration-600 ease-out ${
                                            isSelfHovered ? "scale-105" : "scale-100"
                                        }`}
                                        loading="lazy"
                                    />

                                    {/* Hover Image Crossfade (if hovered) */}
                                    <Image
                                        src={tile.hoverImage}
                                        alt={`${tile.alt} detail`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 24vw"
                                        quality={80}
                                        className={`object-cover rounded-none transition-opacity duration-320 ease-out ${
                                            isSelfHovered ? "opacity-100" : "opacity-0"
                                        }`}
                                        loading="lazy"
                                    />

                                    {/* Mono Index Top-Left */}
                                    <div className="absolute top-3 left-3 font-mono text-xs font-bold tracking-widest text-[#F7F5F0] z-20">
                                        {tile.num}
                                    </div>

                                    {/* Arrow Top-Right (Fade-in on Hover) */}
                                    <div
                                        className={`absolute top-3 right-3 font-mono text-sm text-[#F7F5F0] z-20 transition-opacity duration-320 ${
                                            isSelfHovered ? "opacity-100" : "opacity-0 md:opacity-0"
                                        }`}
                                    >
                                        ↗
                                    </div>

                                    {/* Green Vertical Gradient (scaleY 35% -> 65% on hover) */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-[#105233] via-[#105233]/75 to-transparent origin-bottom transition-transform duration-320 ease-out z-10 pointer-events-none"
                                        style={{
                                            transform: isSelfHovered ? "scaleY(0.70)" : "scaleY(0.40)",
                                        }}
                                    />

                                    {/* Bottom Content: Value Title + Slide-up Definition */}
                                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-20 flex flex-col justify-end text-left">
                                        <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#F7F5F0]">
                                            {tile.title}
                                        </h3>
                                        
                                        {/* Definition text: Accessible & Slide-up Reveal */}
                                        <div
                                            className={`transition-all duration-320 ease-out overflow-hidden ${
                                                isSelfHovered
                                                    ? "max-h-20 opacity-100 pt-1"
                                                    : "max-h-0 md:max-h-0 md:opacity-0 max-h-20 opacity-100 pt-1"
                                            }`}
                                        >
                                            <p className="font-sans text-xs sm:text-sm text-[#F7F5F0]/90 font-light leading-snug">
                                                {tile.definition}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}
