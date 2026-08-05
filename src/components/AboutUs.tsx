"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EASING } from "@/lib/motion";

// ─── PROOF BAR PLACEHOLDERS (FLAGGED FOR CLIENT VERIFICATION) ─────────────────
const PROOF_CELLS = [
    { label: "ESTABLISHED", value: "EST. 2024" },
    { label: "CREWS SERVED", value: "50+ CREWS DRESSED" },
    { label: "PIECES PRODUCED", value: "10,000+ PIECES STITCHED" },
    { label: "ATELIER LOCATION", value: "MALAD WEST, BOMBAY" },
];

// ─── MOVEMENT 2: THE CODE (VALUES INDEX) ──────────────────────────────────────
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
        definition: "Sample first, always. You approve the piece before it ever scales.",
        slug: "trust",
    },
    {
        num: "03",
        title: "RESPECT",
        definition: "Same standard on the workshop floor as in the quote.",
        slug: "respect",
    },
    {
        num: "04",
        title: "LOYALTY",
        definition: "We don't chase the next order. We keep the last one.",
        slug: "loyalty",
    },
];

export default function AboutUs() {
    const reduced = useReducedMotion() ?? false;

    return (
        <section
            id="about"
            aria-label="About 1327 Thirteen Twenty Seven — Origin & Code"
            className="relative z-10 py-24 md:py-32 bg-black text-white overflow-hidden border-b border-white/10"
        >
            {/* Gemini Generated Leather & Apparel Craftsmanship Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/bg/leather_apparel_craftsmanship_bg.png"
                    alt="Craftsmanship and Leather Atelier Background"
                    fill
                    sizes="100vw"
                    className="object-cover object-center brightness-[0.45] contrast-[1.08]"
                    priority
                />
                {/* Subtle dark vignette overlay for optimal text readability */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
            </div>

            <div className="relative z-10 w-full">
                
                {/* ─── MOVEMENT 1 — THE ORIGIN ──────────────────────────────────────────────── */}
                <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 mb-20 md:mb-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        
                        {/* Left Column (cols 1–5): Founder Portrait */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: EASING }}
                            className="lg:col-span-5 relative w-full"
                        >
                            <div className="relative aspect-[3/2] sm:aspect-[4/5] w-full overflow-hidden border border-white/15 bg-black/60 rounded-none shadow-2xl">
                                <Image
                                    src="/aboutus/keith_shah_founder.jpg"
                                    alt="Keith Shah, Founder of 1327"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 42vw"
                                    className="object-cover rounded-none object-top"
                                    loading="lazy"
                                />

                                {/* Solid Brand Green Caption Box Overlay */}
                                <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-[#105233] text-white z-10 rounded-none border-t border-r border-white/30 shadow-md">
                                    <div className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase leading-tight">
                                        <p className="text-white">KEITH SHAH</p>
                                        <p className="text-white/80">FOUNDER</p>
                                        <p className="text-white/60">MALAD WEST</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column (cols 7–12): Origin Prose & Signature */}
                        <div className="lg:col-span-7 flex flex-col justify-center gap-6">
                            {/* Kicker */}
                            <motion.div
                                initial={reduced ? false : { opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.5, ease: EASING }}
                                className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white flex items-center gap-2"
                            >
                                <span className="text-white font-bold">&#123; 01 &#125;</span>
                                <span>/ THE ORIGIN</span>
                            </motion.div>

                            {/* Headline — Hard-broken 2 lines */}
                            <motion.h2
                                initial={reduced ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.7, ease: EASING, delay: 0.08 }}
                                className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] text-white"
                            >
                                <span className="block text-white">It Runs On</span>
                                <span className="block text-white">Family.</span>
                            </motion.h2>

                            <motion.div
                                initial={reduced ? false : { scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.6, ease: EASING }}
                                style={{ transformOrigin: "left" }}
                                className="w-full h-px bg-white/20 my-1"
                            />

                            {/* Lead Paragraph — Prose at Scale */}
                            <motion.p
                                initial={reduced ? false : { opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.6, ease: EASING, delay: 0.12 }}
                                className="font-sans text-lg sm:text-xl md:text-2xl font-light text-white leading-relaxed max-w-2xl"
                            >
                                1327 is a number that came off the street, borrowed from the films we grew up on, and it stands for one thing: nothing matters more than family. We didn&apos;t build a merch company. We built a crew that happens to make uniforms.
                            </motion.p>

                            {/* Founder Note — Body Size */}
                            <motion.p
                                initial={reduced ? false : { opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.6, ease: EASING, delay: 0.16 }}
                                className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl font-light"
                            >
                                I started this in Malad West, working shoulder-to-shoulder with cafés, kitchens, studios and crews across Bombay — designing, stitching and embroidering uniforms their teams are proud to pull on every shift. We don&apos;t chase orders. We keep the ones we&apos;ve got, and they keep us.
                            </motion.p>

                            {/* Signature Block */}
                            <motion.div
                                initial={reduced ? false : { opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.6, ease: EASING, delay: 0.2 }}
                                className="pt-4 flex flex-col items-start gap-1.5 border-t border-white/15"
                            >
                                <span className="font-heading italic text-xl sm:text-2xl text-white tracking-widest uppercase">
                                    Keith Shah
                                </span>
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                                    KEITH SHAH — FOUNDER
                                </span>
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* ─── PROOF BAR ──────────────────────────────────────────────────────────── */}
                <div className="border-t border-b border-white/20 py-4 bg-black/20">
                    <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
                            {PROOF_CELLS.map((cell, idx) => (
                                <div key={idx} className="px-3 sm:px-6 py-2 flex flex-col gap-1 text-center md:text-left">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                                        {cell.label}
                                    </span>
                                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
                                        {cell.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── MOVEMENT 2 — THE CODE (VALUES INDEX) ────────────────────────────────── */}
                <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-28">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/20">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white">
                                / THE CODE
                            </span>
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                            FOUR PRINCIPLES
                        </span>
                    </div>

                    {/* 4 Tabular Ruled Rows */}
                    <div className="border-b border-white/20">
                        {VALUES_INDEX.map((item) => (
                            <Link
                                key={item.num}
                                href={`/values/${item.slug}`}
                                className="group relative block border-t border-white/20 py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3C26]"
                                aria-label={`${item.title} — ${item.definition}`}
                            >
                                {/* Green Fill Wipe on Hover / Focus */}
                                <div className="absolute inset-0 bg-[#072618] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-240 ease-out pointer-events-none" />

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-3 md:gap-6 min-h-[64px]">
                                    {/* Mono Index (1fr = col-span-2) */}
                                    <div className="md:col-span-2 font-mono text-xl sm:text-2xl font-bold tracking-tighter text-white/90 group-hover:text-white transition-colors">
                                        {item.num}
                                    </div>

                                    {/* Display Name (3fr = col-span-3) */}
                                    <div className="md:col-span-3 font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-white transition-colors">
                                        {item.title}
                                    </div>

                                    {/* Definition (6fr = col-span-6) */}
                                    <div className="md:col-span-6 font-sans text-sm sm:text-base text-white/80 group-hover:text-white font-light leading-relaxed transition-colors">
                                        {item.definition}
                                    </div>

                                    {/* Arrow (1fr = col-span-1) */}
                                    <div className="md:col-span-1 text-left md:text-right font-mono text-lg text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-240">
                                        ↗
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
