"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Manifesto() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const merchSpanRef = useRef<HTMLSpanElement>(null);
    const [merchWidth, setMerchWidth] = useState(0);
    const reduced = useReducedMotion() ?? false;

    // Dynamically measure MERCH. span width for accurate SVG strike positioning
    useLayoutEffect(() => {
        const updateWidth = () => {
            if (merchSpanRef.current) {
                setMerchWidth(merchSpanRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 85%", "center 55%"],
    });

    // ─── SCROLL SEQUENCE MAPPINGS ──────────────────────────────────────────────
    // 0.00–0.28: Line 1 word clip reveals
    const line1Progress = useTransform(scrollYProgress, [0.0, 0.28], [0, 1], { clamp: true });
    // 0.28–0.46: Stitch strike draws through MERCH.
    const strikeProgress = useTransform(scrollYProgress, [0.28, 0.46], [1, 0], { clamp: true });
    // 0.38–0.62: Line 2 reveals
    const line2Progress = useTransform(scrollYProgress, [0.38, 0.62], [0, 1], { clamp: true });
    // 0.60–0.76: Line 3 reveals
    const line3Progress = useTransform(scrollYProgress, [0.6, 0.76], [0, 1], { clamp: true });
    // 0.72–0.88: Body copy fades and rises
    const bodyProgress = useTransform(scrollYProgress, [0.72, 0.88], [0, 1], { clamp: true });
    const bodyY = useTransform(scrollYProgress, [0.72, 0.88], [14, 0], { clamp: true });
    // 0.84–1.00: Spec strip hairline & cells reveal
    const specProgress = useTransform(scrollYProgress, [0.84, 1.0], [0, 1], { clamp: true });

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            aria-labelledby="manifesto-kicker"
            className="relative z-20 bg-[#14140F] text-[#F7F5F0] py-20 md:py-28 border-b border-[#F7F5F0]/15 overflow-hidden select-none rounded-none"
        >
            {/* Preload fabric macro image for text fill */}
            <link rel="preload" href="/manifesto/fabric-macro.jpg" as="image" />

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10 flex flex-col gap-12 md:gap-16">
                
                {/* ─── SECTION MARKER ─────────────────────────────────────────────────── */}
                <motion.div
                    style={{ opacity: reduced ? 1 : line1Progress }}
                    id="manifesto-kicker"
                >
                    <SectionMarker sectionKey="manifesto" className="!text-[#F7F5F0]" />
                </motion.div>

                {/* ─── DESCENDING STAIR STATEMENT ─────────────────────────────────────── */}
                <h2 className="font-heading font-black uppercase text-left leading-[0.84] tracking-[-0.025em] text-[#F7F5F0] flex flex-col gap-2">
                    
                    {/* Line 1: WE DON'T MAKE MERCH. (Indent 0) */}
                    <div className="overflow-hidden pb-1 flex items-center flex-wrap gap-x-[0.25em]">
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line1Progress,
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                        >
                            WE
                        </motion.span>
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line1Progress,
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                        >
                            DON&apos;T
                        </motion.span>
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line1Progress,
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                        >
                            MAKE
                        </motion.span>

                        {/* MERCH. with SVG Stitch Strike */}
                        <div className="relative inline-block">
                            <span
                                ref={merchSpanRef}
                                className="relative z-10 inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                            >
                                MERCH.
                            </span>

                            {/* SVG Running Stitch Strike */}
                            <svg
                                className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-20"
                                style={{ width: merchWidth || "100%", height: "32px" }}
                                preserveAspectRatio="none"
                                viewBox="0 0 1000 32"
                                aria-hidden="true"
                            >
                                <defs>
                                    <mask id="strikeRevealMask">
                                        <motion.path
                                            d="M 0,16 L 1000,16"
                                            pathLength="1"
                                            stroke="white"
                                            strokeWidth="32"
                                            fill="none"
                                            style={{
                                                strokeDasharray: "1",
                                                strokeDashoffset: reduced ? "0" : strikeProgress,
                                            }}
                                        />
                                    </mask>
                                </defs>
                                <path
                                    d="M 0,16 L 1000,16"
                                    mask="url(#strikeRevealMask)"
                                    stroke="#2E8B5A"
                                    strokeWidth="3.5"
                                    fill="none"
                                    strokeDasharray="14 9"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Line 2: WE BUILD IDENTITY. (Indent +8% Desktop/Tablet) */}
                    <div className="overflow-hidden pb-1 flex items-center flex-wrap gap-x-[0.25em] md:translate-x-[5%] lg:translate-x-[8%]">
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line2Progress,
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                        >
                            WE
                        </motion.span>
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line2Progress,
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)]"
                        >
                            BUILD
                        </motion.span>

                        {/* Fabric-Filled IDENTITY. */}
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line2Progress,
                                backgroundImage: "url('/manifesto/fabric-macro.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                            className="inline-block text-[clamp(2.75rem,8.5vw,9rem)] select-text"
                        >
                            IDENTITY.
                        </motion.span>
                    </div>

                    {/* Line 3: STITCH BY STITCH. (Outlined, ~60% scale, Indent +18% Desktop) */}
                    <div className="overflow-hidden pb-1 md:translate-x-[11%] lg:translate-x-[18%]">
                        <motion.span
                            style={{
                                clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                opacity: reduced ? 1 : line3Progress,
                                WebkitTextStroke: "2px #F7F5F0",
                            }}
                            className="inline-block text-[clamp(1.75rem,5vw,5.4rem)] text-transparent"
                        >
                            STITCH BY STITCH.
                        </motion.span>
                    </div>

                </h2>

                {/* ─── BODY COPY (ALIGNED TO LINE 3 INDENT, MAX 46CH) ────────────────── */}
                <motion.div
                    style={{
                        opacity: reduced ? 1 : bodyProgress,
                        y: reduced ? 0 : bodyY,
                    }}
                    className="md:translate-x-[11%] lg:translate-x-[18%] max-w-[46ch] text-left"
                >
                    <p className="font-sans text-base sm:text-lg text-[#F7F5F0]/80 font-light leading-relaxed">
                        Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                    </p>
                </motion.div>

                {/* ─── MONO SPEC STRIP ───────────────────────────────────────────────── */}
                <div className="w-full flex flex-col gap-4 mt-4 pt-6 border-t border-[#F7F5F0]/15">
                    <motion.div
                        style={{
                            scaleX: reduced ? 1 : specProgress,
                            transformOrigin: "left",
                        }}
                        className="w-full h-[1px] bg-[#F7F5F0]/15"
                    />

                    {/* Desktop/Tablet Single Row / Mobile 2x2 Grid */}
                    <motion.div
                        style={{ opacity: reduced ? 1 : specProgress }}
                        className="grid grid-cols-2 md:flex items-center justify-between gap-3 text-left font-mono text-xs uppercase tracking-widest text-[#F7F5F0]/65 font-bold"
                    >
                        <span>
                            <strong className="text-[#F7F5F0]">180–380 GSM</strong>
                        </span>
                        <span className="hidden md:inline text-[#F7F5F0]/30">·</span>
                        <span>
                            <strong className="text-[#F7F5F0]">3D EMBROIDERY &amp; SCREEN PRINT</strong>
                        </span>
                        <span className="hidden md:inline text-[#F7F5F0]/30">·</span>
                        <span>
                            <strong className="text-[#F7F5F0]">MOQ FROM 25 PCS</strong>
                        </span>
                        <span className="hidden md:inline text-[#F7F5F0]/30">·</span>
                        <span>
                            <strong className="text-[#F7F5F0]">MADE IN MALAD WEST</strong>
                        </span>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
