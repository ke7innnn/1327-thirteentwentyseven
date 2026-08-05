"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function KeithShahSignatureGreen({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 120"
            fill="none"
            stroke="#2E8B5A"
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

function StitchWaveUnderline({ active, id }: { active: boolean; id: string }) {
    return (
        <svg
            className="w-full h-3 overflow-visible pointer-events-none mt-1"
            viewBox="0 0 300 12"
            fill="none"
            aria-hidden="true"
        >
            <defs>
                <mask id={`stitch-mask-${id}`}>
                    <path
                        d="M0,6 Q75,1 150,6 T300,6"
                        pathLength="1"
                        stroke="white"
                        strokeWidth="12"
                        fill="none"
                        style={{
                            strokeDasharray: "1",
                            strokeDashoffset: active ? 0 : 1,
                            transition: "stroke-dashoffset 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />
                </mask>
            </defs>
            <path
                d="M0,6 Q75,1 150,6 T300,6"
                mask={`url(#stitch-mask-${id})`}
                stroke="#2E8B5A"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="10 7"
                strokeLinecap="round"
            />
        </svg>
    );
}

interface ValueItem {
    num: string;
    title: string;
    slug: string;
    image: string;
    alt: string;
    aspect: string;
    staggerClass: string;
}

const VALUES_DATA: ValueItem[] = [
    {
        num: "01",
        title: "COMMUNITY",
        slug: "community",
        image: "/aboutus/about-4.png",
        alt: "1327 crew members wearing custom apparel",
        aspect: "aspect-[4/5]",
        staggerClass: "mt-0",
    },
    {
        num: "02",
        title: "TRUST",
        slug: "trust",
        image: "/aboutus/about-2.png",
        alt: "Atelier embroidery precision sample detail",
        aspect: "aspect-[3/4]",
        staggerClass: "mt-8 md:mt-12",
    },
    {
        num: "03",
        title: "RESPECT",
        slug: "respect",
        image: "/aboutus/about-3.png",
        alt: "Workshop floor craftsman at stitching machine",
        aspect: "aspect-[4/5]",
        staggerClass: "mt-0 md:-mt-6",
    },
    {
        num: "04",
        title: "LOYALTY",
        slug: "loyalty",
        image: "/aboutus/about-1.png",
        alt: "1327 custom apparel product lineup",
        aspect: "aspect-[3/4]",
        staggerClass: "mt-8 md:mt-6",
    },
];

export default function AboutUs() {
    const reduced = useReducedMotion() ?? false;
    const [activeIndex, setActiveIndex] = useState<number>(0); // Default: 01 COMMUNITY active
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Revert to 01 COMMUNITY on section mouse leave
    const handleMouseLeaveSection = () => {
        setActiveIndex(0);
    };

    return (
        <section
            id="about"
            aria-label="About 1327 Thirteen Twenty Seven — The Code"
            onMouseLeave={handleMouseLeaveSection}
            className="relative z-10 w-full bg-[#0B1710] text-[#F7F5F0] py-20 md:py-28 overflow-hidden select-none rounded-none border-b border-[#F7F5F0]/15 min-h-[105vh]"
        >
            {/* Fine Topographic Contour SVG Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-35 mix-blend-multiply">
                <Image
                    src="/bg/contour_dark_green.svg"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10">

                {/* ─── KICKER & HEADER BAR ────────────────────────────────────────────── */}
                <div className="w-full mb-10 md:mb-14">
                    <div className="flex justify-between items-center font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#F7F5F0]/65 pb-4 border-b border-[#F7F5F0]/20">
                        <span>&#123; 02 &#125; / THE CODE</span>
                        <span className="hidden sm:inline">MALAD WEST, BOMBAY</span>
                    </div>
                </div>

                {/* ─── MAIN ASYMMETRIC COLLAGE + VALUE LIST GRID ─────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">

                    {/* Left Column (~54%): Asymmetric Photo Collage */}
                    <div className="order-2 md:order-1 md:col-span-7 lg:col-span-7 flex flex-col gap-10">
                        
                        {/* 4 Staggered Photographs Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
                            {VALUES_DATA.map((item, idx) => {
                                const isActive = activeIndex === idx;
                                return (
                                    <Link
                                        key={item.num}
                                        href={`/values/${item.slug}`}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        onFocus={() => setActiveIndex(idx)}
                                        className={`relative w-full ${item.aspect} ${item.staggerClass} block rounded-none overflow-hidden border border-[#F7F5F0]/15 transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B5A] ${
                                            isActive ? "z-30 scale-[1.03]" : "z-10 scale-100"
                                        }`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            fill
                                            sizes="(max-width: 768px) 48vw, 26vw"
                                            quality={80}
                                            style={{
                                                willChange: isActive ? "filter" : "auto",
                                            }}
                                            className={`object-cover rounded-none transition-all duration-400 ease-out ${
                                                isMobile || isActive
                                                    ? "grayscale-0 brightness-100"
                                                    : "grayscale brightness-[0.75]"
                                            }`}
                                            loading="lazy"
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Short Origin Lead Copy (Bottom-Left) */}
                        <motion.p
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                            className="font-sans text-sm sm:text-base font-light text-[#F7F5F0]/70 leading-relaxed max-w-[38ch] pt-2"
                        >
                            1327 is a number that came off the street, borrowed from the films we grew up on. It stands for one thing: nothing matters more than family.
                        </motion.p>
                    </div>

                    {/* Right Column (~38%): Value List & Signature Block */}
                    <div className="order-1 md:order-2 md:col-span-5 lg:col-span-5 flex flex-col justify-between h-full pt-2">
                        
                        {/* 4 Right-Aligned Display Value Entries */}
                        <ol aria-label="Atelier Values" className="flex flex-col gap-6 sm:gap-8 w-full">
                            {VALUES_DATA.map((item, idx) => {
                                const isActive = activeIndex === idx;
                                return (
                                    <li key={item.num} className="w-full text-left md:text-right">
                                        <Link
                                            href={`/values/${item.slug}`}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                            onFocus={() => setActiveIndex(idx)}
                                            className="group relative inline-flex flex-col items-start md:items-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B5A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1710]"
                                        >
                                            <div className="flex items-baseline gap-3 md:flex-row-reverse">
                                                {/* Display Title */}
                                                <span
                                                    className={`font-heading font-black uppercase text-3xl sm:text-5xl lg:text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.02em] transition-colors duration-300 ${
                                                        isActive ? "text-[#2E8B5A]" : "text-[#F7F5F0]/55 hover:text-[#F7F5F0]/80"
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>

                                                {/* Mono Index */}
                                                <span className="font-mono text-xs sm:text-sm font-bold text-[#F7F5F0]/40 tracking-wider">
                                                    {item.num}
                                                </span>
                                            </div>

                                            {/* Hand-sewn Wave Running-Stitch Underline */}
                                            <div className="w-full max-w-[240px] sm:max-w-[320px]">
                                                <StitchWaveUnderline active={isActive} id={item.num} />
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Signature & Attribution Block (Beneath List) */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                            className="mt-12 sm:mt-16 pt-6 border-t border-[#F7F5F0]/20 flex flex-col items-start md:items-end gap-2 w-full"
                        >
                            {/* Keith Shah Signature Vector in #2E8B5A */}
                            <div className="w-44 sm:w-56 h-14 relative opacity-95">
                                <KeithShahSignatureGreen className="w-full h-full" />
                            </div>
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F7F5F0]/55 font-bold">
                                KEITH SHAH — FOUNDER
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F7F5F0]/40 font-bold">
                                FOUNDED IN MALAD WEST, BOMBAY
                            </span>
                        </motion.div>

                    </div>

                </div>

            </div>
        </section>
    );
}
