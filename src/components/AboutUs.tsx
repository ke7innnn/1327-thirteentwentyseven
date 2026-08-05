"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function KeithShahSignatureBone({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 120"
            fill="none"
            stroke="#F7F5F0"
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

const VALUES_INDEX = [
    {
        num: "01",
        title: "COMMUNITY",
        definition: "The crews we dress become the people we know.",
        slug: "community",
    },
    {
        num: "02",
        title: "TRUST",
        definition: "Sample first, always.",
        slug: "trust",
    },
    {
        num: "03",
        title: "RESPECT",
        definition: "Same standard on the floor as in the quote.",
        slug: "respect",
    },
    {
        num: "04",
        title: "LOYALTY",
        definition: "We don't chase the next order.",
        slug: "loyalty",
    },
];

export default function AboutUs() {
    const reduced = useReducedMotion() ?? false;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            id="about"
            aria-label="About 1327 Thirteen Twenty Seven — The Origin"
            className="relative z-10 w-full bg-[#14140F] text-[#F7F5F0] py-20 md:py-28 overflow-hidden select-none rounded-none border-b border-[#F7F5F0]/15"
        >
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10">

                {/* ─── KICKER & TOP RULE ────────────────────────────────────────────── */}
                <div className="w-full mb-10 md:mb-14">
                    <div className="flex justify-between items-center font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#F7F5F0]/65 pb-4">
                        <span>&#123; 02 &#125; / THE ORIGIN</span>
                        <span className="hidden sm:inline">MALAD WEST, BOMBAY</span>
                    </div>
                    <motion.div
                        initial={reduced ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.6, ease: EASE }}
                        style={{ transformOrigin: "left" }}
                        className="w-full h-px bg-[#F7F5F0]/20"
                    />
                </div>

                {/* ─── 12-COLUMN MAIN FOUNDER BLOCK ──────────────────────────────────── */}
                <div className="relative min-h-[500px] lg:min-h-[620px] grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">

                    {/* Left Column (Cols 1–7): Headline, Body & Signature */}
                    <div className="md:col-span-7 flex flex-col justify-between h-full relative z-30 pb-4">
                        
                        {/* Headline Stack with Green Silhouette Mask Overlay */}
                        <div className="relative mb-8">
                            
                            {/* Base Headline (Bone Text) */}
                            <motion.h2
                                initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
                                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.7, ease: EASE }}
                                className="font-heading font-black uppercase text-left leading-[0.84] tracking-[-0.025em] text-[#F7F5F0]"
                                style={{ fontSize: "clamp(3rem, 8.5vw, 9.5rem)" }}
                            >
                                IT RUNS ON
                                <br />
                                FAMILY.
                            </motion.h2>

                            {/* Masked Headline Overlay (Green Color #2E8B5A over Keith Silhouette) */}
                            {!isMobile && (
                                <motion.h2
                                    aria-hidden="true"
                                    initial={reduced ? false : { opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
                                    className="absolute inset-0 font-heading font-black uppercase text-left leading-[0.84] tracking-[-0.025em] text-[#2E8B5A] pointer-events-none select-none"
                                    style={{
                                        fontSize: "clamp(3rem, 8.5vw, 9.5rem)",
                                        WebkitMaskImage: "url('/origin/keith_silhouette_mask.png')",
                                        maskImage: "url('/origin/keith_silhouette_mask.png')",
                                        WebkitMaskSize: "contain",
                                        maskSize: "contain",
                                        WebkitMaskPosition: "right bottom",
                                        maskPosition: "right bottom",
                                        WebkitMaskRepeat: "no-repeat",
                                        maskRepeat: "no-repeat",
                                    }}
                                >
                                    IT RUNS ON
                                    <br />
                                    FAMILY.
                                </motion.h2>
                            )}
                        </div>

                        {/* Body Copy & Signature Block */}
                        <div className="flex flex-col gap-6 max-w-[42ch]">
                            <motion.p
                                initial={reduced ? false : { opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                                className="font-sans text-base sm:text-lg md:text-xl font-light text-[#F7F5F0]/80 leading-relaxed"
                            >
                                1327 is a number that came off the street, borrowed from the films we grew up on. It stands for one thing: nothing matters more than family. We didn&apos;t build a merch company — we built a crew that happens to make uniforms.
                            </motion.p>

                            {/* Signature Block */}
                            <motion.div
                                initial={reduced ? false : { opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                                className="pt-3 border-t border-[#F7F5F0]/20 flex flex-col items-start gap-1"
                            >
                                <div className="w-44 sm:w-56 h-14 relative opacity-90">
                                    <KeithShahSignatureBone className="w-full h-full" />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F7F5F0]/60 font-bold">
                                    KEITH SHAH — FOUNDER
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column (Cols 8–12): Cut-Out Portrait of Keith (Layer 20) */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 48 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                        className="md:col-span-5 relative w-full h-[400px] sm:h-[500px] lg:h-[600px] z-20 flex justify-center md:justify-end items-end pointer-events-none"
                    >
                        <div className="relative w-[85vw] sm:w-[50vw] md:w-[100%] h-full max-w-[480px]">
                            <Image
                                src="/origin/keith_founder.png"
                                alt="Keith Shah, Founder of 1327"
                                fill
                                sizes="(max-width: 768px) 85vw, 42vw"
                                quality={85}
                                className="object-contain object-bottom"
                                priority={false}
                            />
                        </div>
                    </motion.div>

                </div>

                {/* ─── VALUE ROWS (LAYER 10 — PASSING BEHIND FIGURE) ──────────────── */}
                <div className="relative z-10 w-full border-t border-[#F7F5F0]/20">
                    {VALUES_INDEX.map((item, idx) => (
                        <motion.div
                            key={item.num}
                            initial={reduced ? false : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, delay: 0.07 * idx, ease: EASE }}
                        >
                            <Link
                                href={`/values/${item.slug}`}
                                className="group relative block border-b border-[#F7F5F0]/20 py-6 sm:py-7 px-4 sm:px-6 min-h-[88px] transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
                                aria-label={`${item.title} — ${item.definition}`}
                            >
                                {/* Left-to-Right Hover Fill Wipe (#105233) */}
                                <div
                                    className="absolute inset-0 bg-[#105233] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-240 ease-out pointer-events-none origin-left transform group-hover:scale-x-100"
                                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                                />

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-3 md:gap-6 min-h-[44px]">
                                    {/* Mono Index (col-span-2) */}
                                    <div className="md:col-span-2 font-mono text-xl sm:text-2xl font-bold tracking-tighter text-[#F7F5F0]/90">
                                        {item.num}
                                    </div>

                                    {/* Display Name (col-span-3) */}
                                    <div className="md:col-span-3 font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F7F5F0]">
                                        {item.title}
                                    </div>

                                    {/* Definition (col-span-6) */}
                                    <div className="md:col-span-6 font-sans text-sm sm:text-base text-[#F7F5F0]/80 font-light leading-relaxed">
                                        {item.definition}
                                    </div>

                                    {/* Arrow (col-span-1) */}
                                    <div className="md:col-span-1 text-left md:text-right font-mono text-lg text-[#F7F5F0]/65 transition-transform duration-240 group-hover:translate-x-1">
                                        ↗
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
