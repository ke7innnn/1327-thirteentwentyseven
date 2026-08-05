"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VALUES_DATA = [
    {
        num: "01",
        title: "COMMUNITY",
        slug: "community",
        image: "/feed/feed-01.jpg",
        alt: "1327 crew members wearing custom apparel",
    },
    {
        num: "02",
        title: "TRUST",
        slug: "trust",
        image: "/feed/feed-02.jpg",
        alt: "Atelier embroidery precision sample detail",
    },
    {
        num: "03",
        title: "RESPECT",
        slug: "respect",
        image: "/feed/feed-04.jpg",
        alt: "Workshop floor craftsman at stitching machine",
    },
    {
        num: "04",
        title: "LOYALTY",
        slug: "loyalty",
        image: "/feed/feed-03.jpg",
        alt: "1327 custom apparel product lineup",
    },
];

function HandDrawnStitchWave({ active, id, width }: { active: boolean; id: string; width: number }) {
    const w = width > 0 ? width * 1.04 : 220; // 104% width
    const waveD = `M0,8 C${w * 0.22},2 ${w * 0.34},13 ${w * 0.52},7 S${w * 0.8},1 ${w},6`;

    return (
        <svg
            className="w-full h-3 overflow-visible pointer-events-none mt-[0.10em]"
            viewBox={`0 0 ${w} 14`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <mask id={`m-${id}`}>
                    <path
                        d={waveD}
                        pathLength="1"
                        stroke="white"
                        strokeWidth="14"
                        fill="none"
                        style={{
                            strokeDasharray: "1",
                            strokeDashoffset: active ? 0 : 1,
                            transition: "stroke-dashoffset 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />
                </mask>
            </defs>
            <path
                d={waveD}
                mask={`url(#m-${id})`}
                stroke="#4FB47E"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="9 6"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function AboutUs() {
    const reduced = useReducedMotion() ?? false;
    const [activeIndex, setActiveIndex] = useState<number>(0); // Default: 01 COMMUNITY active
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [wordWidths, setWordWidths] = useState<Record<string, number>>({});

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Measure exact word widths after fonts are ready
    useEffect(() => {
        const measureWordWidths = () => {
            const newWidths: Record<string, number> = {};
            VALUES_DATA.forEach((item) => {
                const el = document.getElementById(`word-${item.num}`);
                if (el) {
                    newWidths[item.num] = el.getBoundingClientRect().width;
                }
            });
            setWordWidths(newWidths);
        };

        if (typeof document !== "undefined" && document.fonts) {
            document.fonts.ready.then(measureWordWidths);
        } else {
            measureWordWidths();
        }

        window.addEventListener("resize", measureWordWidths);
        return () => window.removeEventListener("resize", measureWordWidths);
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
            className="code-section relative z-10 w-full bg-[#0D1712] text-[#EDEBE3] pt-28 pb-12 lg:h-screen lg:min-h-[720px] overflow-hidden select-none rounded-none border-b border-[#EDEBE3]/15"
        >
            {/* Fine Topographic Contour SVG Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply">
                <Image
                    src="/bg/contour_dark_green.svg"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-between relative z-10">

                {/* ─── KICKER & HEADER BAR (CLEAR STICKY NAV) ───────────────────────── */}
                <div className="w-full mb-4 sm:mb-6">
                    <div className="flex justify-between items-center font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#EDEBE3]/45 pb-3 border-b border-[#EDEBE3]/15">
                        <span>&#123; 02 &#125; / THE CODE</span>
                        <span className="hidden sm:inline">MALAD WEST, BOMBAY</span>
                    </div>
                </div>

                {/* ─── MAIN 12-COLUMN GRID ───────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center my-auto h-full max-h-[80vh]">

                    {/* Left Column (~52% width = col-span-7): Uniform 9:10 Image Grid */}
                    <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center h-full">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center">
                            
                            {/* Column A (Left: Images 1 & 3) */}
                            <div className="flex flex-col gap-4 sm:gap-6">
                                {[VALUES_DATA[0], VALUES_DATA[2]].map((item) => {
                                    const origIndex = item.num === "01" ? 0 : 2;
                                    const isActive = activeIndex === origIndex;
                                    return (
                                        <Link
                                            key={item.num}
                                            href={`/values/${item.slug}`}
                                            onMouseEnter={() => setActiveIndex(origIndex)}
                                            onFocus={() => setActiveIndex(origIndex)}
                                            className={`relative w-full aspect-[9/10] block rounded-none overflow-hidden border border-[#EDEBE3]/15 transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB47E] ${
                                                isActive ? "z-30 scale-[1.03]" : "z-10 scale-100"
                                            }`}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.alt}
                                                fill
                                                sizes="(max-width: 768px) 48vw, 26vw"
                                                quality={85}
                                                style={{
                                                    willChange: isActive ? "filter" : "auto",
                                                }}
                                                className={`object-cover rounded-none transition-all duration-400 ease-out ${
                                                    isMobile || isActive
                                                        ? "grayscale-0 brightness-100"
                                                        : "grayscale brightness-[0.72]"
                                                }`}
                                                loading="lazy"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Column B (Right: Images 2 & 4) — Offset UP by 8% */}
                            <div className="flex flex-col gap-4 sm:gap-6 -translate-y-0 md:-translate-y-[8%]">
                                {[VALUES_DATA[1], VALUES_DATA[3]].map((item) => {
                                    const origIndex = item.num === "02" ? 1 : 3;
                                    const isActive = activeIndex === origIndex;
                                    return (
                                        <Link
                                            key={item.num}
                                            href={`/values/${item.slug}`}
                                            onMouseEnter={() => setActiveIndex(origIndex)}
                                            onFocus={() => setActiveIndex(origIndex)}
                                            className={`relative w-full aspect-[9/10] block rounded-none overflow-hidden border border-[#EDEBE3]/15 transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB47E] ${
                                                isActive ? "z-30 scale-[1.03]" : "z-10 scale-100"
                                            }`}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.alt}
                                                fill
                                                sizes="(max-width: 768px) 48vw, 26vw"
                                                quality={85}
                                                style={{
                                                    willChange: isActive ? "filter" : "auto",
                                                }}
                                                className={`object-cover rounded-none transition-all duration-400 ease-out ${
                                                    isMobile || isActive
                                                        ? "grayscale-0 brightness-100"
                                                        : "grayscale brightness-[0.72]"
                                                }`}
                                                loading="lazy"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                        </div>
                    </div>

                    {/* Right Column (~38% width = col-span-5): Centred Value List & Monogram Block */}
                    <div className="order-1 md:order-2 md:col-span-5 flex flex-col justify-center items-center text-center h-full gap-8 lg:gap-10">
                        
                        {/* 4 Centred Display Values (Shared Vertical Axis) */}
                        <ol aria-label="Atelier Values" className="value-list flex flex-col items-center text-center w-full">
                            {VALUES_DATA.map((item, idx) => {
                                const isActive = activeIndex === idx;
                                const w = wordWidths[item.num] || 0;
                                return (
                                    <li key={item.num} className="value-item inline-flex flex-col items-center text-center my-0.5">
                                        <Link
                                            href={`/values/${item.slug}`}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                            onFocus={() => setActiveIndex(idx)}
                                            className="group relative inline-flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB47E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1712]"
                                        >
                                            {/* Display Title with tight 0.95 line-height */}
                                            <span
                                                id={`word-${item.num}`}
                                                className={`font-heading font-black uppercase text-center tracking-[-0.02em] leading-[0.95] transition-colors duration-300 ${
                                                    isActive ? "text-[#4FB47E]" : "text-[#EDEBE3]/38 hover:text-[#EDEBE3]/60"
                                                }`}
                                                style={{ fontSize: "clamp(2.75rem, 4.8vw, 7.25rem)" }}
                                            >
                                                {item.title}
                                            </span>

                                            {/* Hand-Drawn Wave Stitch Underline (104% width, 0.10em below baseline) */}
                                            <div className="w-full flex justify-center">
                                                <HandDrawnStitchWave active={isActive} id={item.num} width={w} />
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Bottom-Right Quadrant: Monogram, Provenance & Links */}
                        <div className="flex flex-col items-center text-center gap-3 pt-4 border-t border-[#EDEBE3]/15 w-full max-w-sm">
                            {/* 1327 Monogram Mark */}
                            <div className="relative w-14 h-8 opacity-45">
                                <Image
                                    src="/logo/1327_white_transparent_logo.png"
                                    alt="1327 Monogram"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Provenance Line */}
                            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#EDEBE3]/40 font-bold">
                                FOUNDED IN MALAD WEST, BOMBAY
                            </span>

                            {/* Start An Order CTA Link */}
                            <a
                                href="https://wa.me/919819001327?text=Hi%201327%2C%20I%27m%20looking%20to%20place%20an%20order%20for%20custom%20uniforms."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs font-bold text-[#EDEBE3] hover:text-[#4FB47E] tracking-[0.2em] uppercase border-b border-[#EDEBE3]/30 pb-0.5 transition-colors my-1 inline-block"
                            >
                                START AN ORDER ↗
                            </a>

                            {/* Social & Channel Links */}
                            <div className="flex items-center justify-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#EDEBE3]/45">
                                <a href="https://www.instagram.com/1327_thirteentwentyseven/" target="_blank" rel="noopener noreferrer" className="hover:text-[#EDEBE3] transition-colors">
                                    INSTAGRAM
                                </a>
                                <span>·</span>
                                <a href="https://www.youtube.com/@1327-thirteentwentyseven" target="_blank" rel="noopener noreferrer" className="hover:text-[#EDEBE3] transition-colors">
                                    YOUTUBE
                                </a>
                                <span>·</span>
                                <a href="https://wa.me/919819001327?text=Hi%201327%2C%20I%27m%20looking%20to%20place%20an%20order%20for%20custom%20uniforms." target="_blank" rel="noopener noreferrer" className="hover:text-[#EDEBE3] transition-colors">
                                    WHATSAPP
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
