"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";
import { WHATSAPP_URL } from "@/config/constants";

const WHATSAPP_PROCESS_URL =
    WHATSAPP_URL ||
    "https://wa.me/919819001327?text=Hi%201327%2C%20I%27m%20looking%20to%20place%20an%20order%20for%20custom%20uniforms.";

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

interface StageData {
    step: string;
    dayRange: string;
    cumDay: string;
    title: string;
    body: string;
    leadTime: string;
    image: string;
    hoverImage: string;
    alt: string;
}

const STAGES: StageData[] = [
    {
        step: "01",
        dayRange: "DAY 01–02",
        cumDay: "DAY 02",
        title: "Artwork & Brief",
        body: "Send your logo, garment type and quantity. We come back with fabric options and a quote.",
        leadTime: "24–48 HRS",
        image: "/feed/feed-04.jpg",
        hoverImage: "/servicepics/veganleather-pouches.jpg",
        alt: "Workshop artwork proof and embroidery specification sample",
    },
    {
        step: "02",
        dayRange: "DAY 03–05",
        cumDay: "DAY 05",
        title: "Sample & Approval",
        body: "We stitch a physical sample. You approve the fabric, the fit and the embroidery before anything scales.",
        leadTime: "3–5 DAYS",
        image: "/feed/feed-02.jpg",
        hoverImage: "/feed/feed-01.jpg",
        alt: "Single stitched sample cap with custom Devanagari embroidery",
    },
    {
        step: "03",
        dayRange: "DAY 06–17",
        cumDay: "DAY 17",
        title: "Production",
        body: "Cut, print or embroider, finish, quality-check. Every piece carries a tag.",
        leadTime: "7–12 DAYS",
        image: "/feed/feed-03.jpg",
        hoverImage: "/servicepics/apron-full.jpg",
        alt: "Masa Bakery crew member in custom printed black back-graphic tee and cap",
    },
    {
        step: "04",
        dayRange: "DAY 18–21",
        cumDay: "DAY 21",
        title: "Delivery",
        body: "Packed and delivered across Mumbai, or shipped anywhere in India.",
        leadTime: "2–4 DAYS",
        image: "/feed/feed-05.jpg",
        hoverImage: "/servicepics/veganleather-coasters.jpg",
        alt: "Packed and finished 1327 hospitality sets and apparel stock",
    },
];

// ─── STAGE FRAME COMPONENT WITH HOVER IMAGE SWAP ──────────────────────────────
function StageFrame({ stage }: { stage: StageData }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-[82vw] lg:w-[42vw] shrink-0 flex flex-col justify-between h-[520px] lg:h-[580px] bg-[#14140F] p-6 lg:p-8 border-l border-[#F7F5F0]/15 relative rounded-none group"
        >
            {/* Top: Mono Over-Caption */}
            <div className="flex justify-between items-center font-mono text-xs font-bold tracking-[0.2em] text-[#F7F5F0]/65 uppercase">
                <span>STAGE {stage.step}</span>
                <span className="text-[#2E8B5A]">{stage.dayRange}</span>
            </div>

            {/* 4:5 Photograph Container with 200ms Image Hover Swap */}
            <div className="relative w-full h-[260px] lg:h-[310px] my-4 overflow-hidden rounded-none bg-[#1F1F18] border border-[#F7F5F0]/10">
                <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 1024px) 82vw, 42vw"
                    quality={80}
                    className={`object-cover rounded-none transition-opacity duration-200 ease-out ${
                        isHovered ? "opacity-0" : "opacity-100"
                    }`}
                    loading="lazy"
                />
                <Image
                    src={stage.hoverImage}
                    alt={`${stage.alt} - Completed view`}
                    fill
                    sizes="(max-width: 1024px) 82vw, 42vw"
                    quality={80}
                    className={`object-cover rounded-none transition-opacity duration-200 ease-out ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                />

                {/* Oversized Outlined Numeral Overlapping Bottom-Left Edge */}
                <div
                    className="absolute -bottom-4 left-3 font-heading font-black text-6xl lg:text-7xl text-transparent pointer-events-none select-none"
                    style={{ WebkitTextStroke: "2px #F7F5F0" }}
                >
                    {stage.step}
                </div>
            </div>

            {/* Bottom: Content & Lead Time */}
            <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-heading font-black text-2xl lg:text-3xl uppercase tracking-tight text-[#F7F5F0]">
                    {stage.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F7F5F0]/80 font-light leading-relaxed max-w-md">
                    {stage.body}
                </p>
                <div className="mt-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#2E8B5A]">
                    {stage.leadTime}
                </div>
            </div>
        </div>
    );
}

// ─── MAIN PROCESS REEL COMPONENT ──────────────────────────────────────────────
export default function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion() ?? false;

    const [windowWidth, setWindowWidth] = useState(1280);
    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {
        const updateWidths = () => {
            setWindowWidth(window.innerWidth);
            if (trackRef.current) {
                setTrackWidth(trackRef.current.scrollWidth);
            }
        };
        updateWidths();
        window.addEventListener("resize", updateWidths);
        return () => window.removeEventListener("resize", updateWidths);
    }, []);

    const isDesktop = windowWidth >= 1024 && !reduced;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(trackWidth - windowWidth || 0)]
    );

    // SVG Stitch Line Mask Progress
    const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const logoY = useTransform(scrollYProgress, [0.65, 1], [140, -140]);

    return (
        <section
            ref={sectionRef}
            id="process"
            aria-labelledby="process-headline"
            className={`relative bg-[#14140F] text-[#F7F5F0] select-none rounded-none ${
                isDesktop ? "h-[420vh]" : "py-20 lg:py-28 border-b border-[#F7F5F0]/15"
            }`}
        >
            {/* ─── DESKTOP PINNED WRAPPER ─────────────────────────────────────────────── */}
            <div className={isDesktop ? "sticky top-0 h-screen overflow-hidden flex items-center" : "w-full"}>
                
                {/* Continuous Track */}
                <motion.div
                    ref={trackRef}
                    style={{ x: isDesktop ? x : 0 }}
                    className={`flex items-stretch h-full ${
                        isDesktop ? "w-max" : "flex-col lg:flex-row overflow-x-auto snap-x snap-mandatory px-5"
                    }`}
                >
                    {/* SVG RUNNING STITCH LINE (DESKTOP) */}
                    {isDesktop && (
                        <svg
                            className="absolute top-[62%] left-0 w-full h-8 pointer-events-none z-0"
                            preserveAspectRatio="none"
                            viewBox="0 0 1000 32"
                        >
                            <defs>
                                <mask id="stitchReveal">
                                    <motion.path
                                        d="M 0,16 L 1000,16"
                                        pathLength="1"
                                        stroke="white"
                                        strokeWidth="32"
                                        fill="none"
                                        style={{ strokeDasharray: "1", strokeDashoffset: dashOffset }}
                                    />
                                </mask>
                            </defs>
                            <path
                                d="M 0,16 L 1000,16"
                                mask="url(#stitchReveal)"
                                stroke="#2E8B5A"
                                strokeWidth="2.5"
                                fill="none"
                                strokeDasharray="14 9"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}

                    {/* ─── PANEL 0: TITLE (60vw DESKTOP) ────────────────────────────── */}
                    <div className="w-full lg:w-[60vw] shrink-0 flex flex-col justify-between p-8 lg:p-16 border-r border-[#F7F5F0]/15 min-h-[440px] lg:min-h-[580px] relative z-10 bg-[#14140F]">
                        <div className="flex flex-col items-start gap-4">
                            <SectionMarker sectionKey="process" className="!text-[#F7F5F0]" />
                            <h2
                                id="process-headline"
                                className="font-heading font-black uppercase text-left leading-[0.84] tracking-[-0.02em] text-[#F7F5F0]"
                                style={{ fontSize: "clamp(2.75rem, 7vw, 7.5rem)" }}
                            >
                                <span>FROM BRIEF</span>
                                <br />
                                <span
                                    className="text-transparent"
                                    style={{ WebkitTextStroke: "2px #F7F5F0" }}
                                >
                                    TO BOX.
                                </span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6 mt-8">
                            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#F7F5F0]/65 font-bold">
                                EVERY ORDER RUNS THE SAME FOUR STAGES.
                            </p>
                            <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#2E8B5A] flex items-center gap-2">
                                <span>SCROLL</span>
                                <span className="animate-pulse">→</span>
                            </div>
                        </div>
                    </div>

                    {/* ─── PANEL 1: STAGE 01 ────────────────────────────────────────── */}
                    <StageFrame stage={STAGES[0]} />

                    {/* ─── PANEL 2: STAGE 02 ────────────────────────────────────────── */}
                    <StageFrame stage={STAGES[1]} />

                    {/* ─── PANEL 3: PULL-QUOTE (46vw DESKTOP) ───────────────────────── */}
                    <div className="w-full lg:w-[46vw] shrink-0 flex flex-col justify-between p-8 lg:p-14 border-l border-[#F7F5F0]/15 relative z-10 bg-[#14140F] min-h-[420px] lg:min-h-[580px]">
                        <div className="font-mono text-xs font-bold tracking-[0.2em] text-[#2E8B5A] uppercase">
                            OUR COMMITMENT
                        </div>

                        <div className="my-auto flex flex-col gap-6 max-w-xl">
                            <blockquote className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight tracking-tight text-[#F7F5F0]">
                                “We&apos;d rather lose the order than ship a sample we&apos;re not happy with.”
                            </blockquote>

                            {/* Keith Shah Signature Vector in #2E8B5A */}
                            <div className="w-48 sm:w-64 h-16 relative mt-2 opacity-90">
                                <KeithShahSignatureGreen className="w-full h-full" />
                            </div>
                        </div>

                        <div className="font-mono text-xs text-[#F7F5F0]/55 uppercase tracking-widest">
                            KEITH SHAH — FOUNDER &amp; HEAD OF PRODUCTION
                        </div>
                    </div>

                    {/* ─── PANEL 4: STAGE 03 ────────────────────────────────────────── */}
                    <StageFrame stage={STAGES[2]} />

                    {/* ─── PANEL 5: STAGE 04 ────────────────────────────────────────── */}
                    <StageFrame stage={STAGES[3]} />

                    {/* ─── PANEL 6: CLOSING PANEL (55vw DESKTOP) ────────────────────── */}
                    <div className="w-full lg:w-[55vw] shrink-0 flex flex-col justify-between p-8 lg:p-16 border-l border-[#F7F5F0]/15 relative z-10 bg-[#14140F] min-h-[440px] lg:min-h-[580px]">
                        <div className="font-mono text-xs font-bold tracking-[0.2em] text-[#F7F5F0]/65 uppercase">
                            TYPICAL TURNAROUND
                        </div>

                        <div className="my-auto flex flex-col items-start gap-4">
                            <div className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#F7F5F0]">
                                14–21 DAYS
                            </div>
                            <p className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#F7F5F0]/65">
                                FROM APPROVED ARTWORK TO DELIVERED STOCK
                            </p>
                        </div>

                        {/* CTA Block */}
                        <div className="mt-8">
                            <a
                                href={WHATSAPP_PROCESS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full sm:w-[300px] h-[60px] sm:h-[64px] bg-[#F7F5F0] text-[#14140F] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 border border-[#F7F5F0] transition-all duration-200 ease-out hover:bg-[#14140F] hover:text-[#F7F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
                            >
                                <span>START AN ORDER</span>
                                <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* ─── PANEL 7: 1327 GREEN & WHITE LOGO SECTION TRANSITION ───────────── */}
                    <div className="w-full lg:w-[45vw] shrink-0 flex flex-col justify-center items-center p-8 lg:p-16 border-l border-[#F7F5F0]/15 relative z-10 bg-[#14140F] min-h-[440px] lg:min-h-[580px] overflow-hidden">
                        <motion.div
                            style={{ y: logoY }}
                            initial={reduced ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false, margin: "-10% 0px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-64 sm:w-80 lg:w-[360px] aspect-[4/3] flex items-center justify-center p-6 bg-[#105233] border border-[#2E8B5A]/40 rounded-none shadow-2xl"
                        >
                            <Image
                                src="/logo/1327_white_transparent_logo.png"
                                alt="1327 Thirteen Twenty Seven Logo"
                                fill
                                sizes="(max-width: 1024px) 320px, 360px"
                                className="object-contain p-4"
                                priority={false}
                            />
                        </motion.div>
                        <span className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-[#2E8B5A] mt-6">
                            THIRTEEN TWENTY SEVEN
                        </span>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
