"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const merchRef = useRef<HTMLSpanElement>(null);
    const identityRef = useRef<HTMLSpanElement>(null);
    const stitchRef = useRef<HTMLSpanElement>(null);

    const reduced = useReducedMotion() ?? false;

    const [stitchPathD, setStitchPathD] = useState<string>("");
    const [knotPos, setKnotPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState<number>(1280);

    // Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "center 50%"],
    });

    // ─── STAGE PROGRESS MAPPINGS ───────────────────────────────────────────────
    // Line 1 Reveal (0.00 -> 0.20)
    const line1Opacity = useTransform(scrollYProgress, [0.0, 0.2], [0, 1]);
    const line1Y = useTransform(scrollYProgress, [0.0, 0.2], [30, 0]);

    // Line 2 MERCH. Reveal (0.16 -> 0.30)
    const line2Opacity = useTransform(scrollYProgress, [0.16, 0.3], [0, 1]);
    const line2Y = useTransform(scrollYProgress, [0.16, 0.3], [30, 0]);

    // Needle Strike Through MERCH (0.30 -> 0.44) - STARTS AFTER MERCH IS READABLE
    const needleProgress = useTransform(scrollYProgress, [0.3, 0.8], [0, 1], { clamp: true });
    const needleDashOffset = useTransform(needleProgress, [0, 1], [1, 0]);

    // Line 3 WE BUILD IDENTITY Reveal (0.36 -> 0.52)
    const line3Opacity = useTransform(scrollYProgress, [0.36, 0.52], [0, 1]);
    const line3Y = useTransform(scrollYProgress, [0.36, 0.52], [30, 0]);

    // Fabric Wipe across IDENTITY (0.44 -> 0.62)
    const fabricWipeProgress = useTransform(scrollYProgress, [0.44, 0.62], [0, 100], { clamp: true });

    // Line 4 STITCH BY STITCH Reveal (0.58 -> 0.72)
    const line4Opacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
    const line4Y = useTransform(scrollYProgress, [0.58, 0.72], [30, 0]);

    // Knot Opacity & Scale (0.75 -> 0.82)
    const knotOpacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
    const knotScale = useTransform(scrollYProgress, [0.75, 0.82], [0.4, 1]);

    // Body Copy Fade (0.78 -> 0.90)
    const bodyOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
    const bodyY = useTransform(scrollYProgress, [0.78, 0.9], [14, 0]);

    // Spec Strip Fade (0.86 -> 1.00)
    const specOpacity = useTransform(scrollYProgress, [0.86, 1.0], [0, 1]);

    // Giant 1327 Watermark Parallax (±48px)
    const watermarkY = useTransform(scrollYProgress, [0, 1], [-48, 48]);

    // ─── DYNAMIC STITCH PATH CALCULATION AT RUNTIME ────────────────────────────
    useEffect(() => {
        const updatePath = async () => {
            setWindowWidth(window.innerWidth);

            // Wait for fonts to resolve so metrics are exact
            if (typeof document !== "undefined" && document.fonts) {
                await document.fonts.ready;
            }

            if (!containerRef.current || !merchRef.current || !identityRef.current || !stitchRef.current) return;

            const box = containerRef.current.getBoundingClientRect();
            const merch = merchRef.current.getBoundingClientRect();
            const identity = identityRef.current.getBoundingClientRect();
            const stitch = stitchRef.current.getBoundingClientRect();

            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                // Mobile: 3 straight segments (strike -> underline -> terminal knot)
                const mY = merch.top - box.top + merch.height * 0.55;
                const mX1 = 0;
                const mX2 = merch.right - box.left + 8;

                const iY = identity.bottom - box.top + 4;
                const iX1 = identity.left - box.left - 4;
                const iX2 = identity.right - box.left + 8;

                const sY = stitch.bottom - box.top + 6;
                const sX1 = stitch.left - box.left - 4;
                const sX2 = stitch.right - box.left + 10;

                const pathD = `M ${mX1},${mY} L ${mX2},${mY} L ${iX1},${iY} L ${iX2},${iY} L ${sX1},${sY} L ${sX2},${sY}`;
                setStitchPathD(pathD);
                setKnotPos({ x: sX2, y: sY });
            } else {
                // Desktop / Tablet: Continuous curved running-stitch path
                const mY = merch.top - box.top + merch.height * 0.52;
                const mX1 = 0;
                const mX2 = merch.right - box.left + 16;

                const iY = identity.bottom - box.top + 4;
                const iX1 = identity.left - box.left - 8;
                const iX2 = identity.right - box.left + 16;

                const sY = stitch.bottom - box.top + 6;
                const sX1 = stitch.left - box.left - 8;
                const sX2 = stitch.right - box.left + 16;

                const pathD = `
                    M ${mX1},${mY}
                    L ${mX2},${mY}
                    C ${mX2 + 35},${mY} ${iX1 - 25},${iY} ${iX1},${iY}
                    L ${iX2},${iY}
                    C ${iX2 + 45},${iY} ${sX1 - 45},${sY} ${sX1},${sY}
                    L ${sX2},${sY}
                `.replace(/\s+/g, ' ').trim();

                setStitchPathD(pathD);
                setKnotPos({ x: sX2, y: sY });
            }
        };

        updatePath();
        window.addEventListener("resize", updatePath);
        return () => window.removeEventListener("resize", updatePath);
    }, []);

    // Active fabric clip path percentage
    const [fabricClipPercent, setFabricClipPercent] = useState<number>(0);
    useEffect(() => {
        const unsubscribe = fabricWipeProgress.on("change", (val) => setFabricClipPercent(val));
        return () => unsubscribe();
    }, [fabricWipeProgress]);

    return (
        <section
            ref={containerRef}
            id="manifesto"
            aria-labelledby="manifesto-headline"
            className="relative z-20 bg-[#F2EFE8] text-[#105233] py-16 sm:py-20 md:py-28 border-b border-black/10 w-full overflow-hidden select-none rounded-none min-h-screen flex flex-col justify-between"
        >
            {/* Woven Linen Fabric Texture Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-multiply bg-repeat z-0"
                style={{
                    backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                    backgroundSize: "450px 450px",
                }}
            />

            {/* Studio Spotlight Vignette */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(255,255,255,0.65) 0%, transparent 85%)",
                }}
            />

            {/* ─── GHOSTED 1327 WATERMARK WITH SUBTLE PARALLAX (±48px) ─────────────── */}
            <motion.div
                style={{ y: reduced ? 0 : watermarkY }}
                className="absolute -right-12 -bottom-16 pointer-events-none select-none z-0 opacity-[0.06] text-[#105233] leading-none"
            >
                <span className="font-archivo font-extrabold text-[clamp(20rem,42vw,46rem)] tracking-tighter">
                    1327
                </span>
            </motion.div>

            {/* ─── CONTINUOUS RUNNING STITCH NEEDLE SVG PATH (PRIORITY 2) ─────────── */}
            {stitchPathD && !reduced && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                    <defs>
                        <mask id="needleReveal">
                            <motion.path
                                d={stitchPathD}
                                pathLength="1"
                                stroke="white"
                                strokeWidth="36"
                                fill="none"
                                style={{ strokeDasharray: "1", strokeDashoffset: needleDashOffset }}
                            />
                        </mask>
                    </defs>
                    {/* Dashed Running Stitch Path */}
                    <path
                        d={stitchPathD}
                        mask="url(#needleReveal)"
                        stroke="#105233"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="12 8"
                        strokeLinecap="round"
                    />
                    {/* Terminal Cross-Stitch Knot */}
                    <motion.g
                        style={{
                            opacity: knotOpacity,
                            scale: knotScale,
                            transformOrigin: `${knotPos.x}px ${knotPos.y}px`,
                        }}
                    >
                        <path
                            d={`M ${knotPos.x - 6},${knotPos.y - 6} L ${knotPos.x + 6},${knotPos.y + 6} M ${knotPos.x + 6},${knotPos.y - 6} L ${knotPos.x - 6},${knotPos.y + 6}`}
                            stroke="#105233"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </motion.g>
                </svg>
            )}

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between h-full relative z-10 flex-1">
                
                {/* ─── TOP BAR (SECTION MARKER & RULE) ────────────────────────────────── */}
                <div className="flex flex-col gap-3 w-full mb-8 md:mb-12">
                    <div className="flex justify-between items-center border-b border-black/10 pb-3 w-full">
                        <SectionMarker sectionKey="mission" className="!text-[#105233]" />
                        <span className="text-right font-mono text-xs uppercase tracking-[0.2em] text-[#105233]/60 font-bold">
                            THE MANIFESTO
                        </span>
                    </div>
                </div>

                {/* ─── CENTRAL STATEMENT COMPOSITION (PRIORITY 1 & 3) ────────────────── */}
                <div className="w-full my-auto py-4">
                    <h2
                        id="manifesto-headline"
                        className="font-archivo font-extrabold uppercase tracking-[-0.025em] leading-[0.86] text-left text-[#105233] flex flex-col items-start w-full"
                        style={{ fontSize: "clamp(2.75rem, 7.5vw, 7.5rem)" }}
                    >
                        {/* LINE 1: WE DON’T MAKE */}
                        <motion.div
                            style={{
                                opacity: reduced ? 1 : line1Opacity,
                                y: reduced ? 0 : line1Y,
                            }}
                            className="block text-[#105233]"
                        >
                            <span>WE DON’T MAKE</span>
                        </motion.div>

                        {/* LINE 2: MERCH. (Struck through by needle, 1.5rem extra bottom space) */}
                        <motion.div
                            style={{
                                opacity: reduced ? 1 : line2Opacity,
                                y: reduced ? 0 : line2Y,
                            }}
                            className="block mt-2 mb-6 text-[#105233]"
                        >
                            <span ref={merchRef} className="relative inline-block">
                                MERCH.
                                {reduced && (
                                    <span className="absolute inset-x-0 top-[52%] h-[3px] bg-[#105233]" />
                                )}
                            </span>
                        </motion.div>

                        {/* LINE 3: WE BUILD IDENTITY. (Stair step indent +6% on desktop) */}
                        <motion.div
                            style={{
                                opacity: reduced ? 1 : line3Opacity,
                                y: reduced ? 0 : line3Y,
                            }}
                            className="block mt-2 md:pl-[6%]"
                        >
                            <span>WE BUILD </span>
                            <span ref={identityRef} className="relative inline-block">
                                {/* Base text */}
                                <span className="text-[#105233]">IDENTITY.</span>

                                {/* Fabric macro text fill layer wiping in */}
                                <span
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage: "url('/manifesto/fabric-macro.jpg')",
                                        backgroundSize: "cover",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        clipPath: reduced
                                            ? "inset(0 0% 0 0)"
                                            : `inset(0 ${100 - fabricClipPercent}% 0 0)`,
                                    }}
                                >
                                    IDENTITY.
                                </span>
                            </span>
                        </motion.div>

                        {/* LINE 4: STITCH BY STITCH. (Outlined, ~62% scale, stair step indent +14% on desktop) */}
                        <motion.div
                            style={{
                                opacity: reduced ? 1 : line4Opacity,
                                y: reduced ? 0 : line4Y,
                            }}
                            className="block mt-4 md:pl-[14%]"
                        >
                            <span
                                ref={stitchRef}
                                className="inline-block font-archivo font-bold text-transparent text-[0.62em]"
                                style={{ WebkitTextStroke: "2px #105233" }}
                            >
                                STITCH BY STITCH.
                            </span>
                        </motion.div>
                    </h2>

                    {/* ─── RELOCATED BODY COPY (ALIGN TO LINE 4 INDENT) ──────────────── */}
                    <motion.div
                        style={{
                            opacity: reduced ? 1 : bodyOpacity,
                            y: reduced ? 0 : bodyY,
                        }}
                        className="mt-8 md:mt-10 md:pl-[14%] max-w-[44ch]"
                    >
                        <p className="font-archivo font-normal text-base sm:text-lg text-black/85 leading-[1.6]">
                            Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                        </p>
                    </motion.div>
                </div>

                {/* ─── GARMENT CARE SPEC STRIP (SECTION BOTTOM) ────────────────────────── */}
                <motion.div
                    style={{ opacity: reduced ? 1 : specOpacity }}
                    className="w-full border-t border-black/15 pt-4 mt-8 md:mt-12"
                >
                    {/* Desktop / Tablet Single Row */}
                    <div className="hidden sm:flex items-center justify-between w-full font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#105233]">
                        <span>180–380 GSM</span>
                        <span>·</span>
                        <span>3D EMBROIDERY &amp; SCREEN PRINT</span>
                        <span>·</span>
                        <span>MOQ FROM 25 PCS</span>
                        <span>·</span>
                        <span>MADE IN MALAD WEST</span>
                    </div>

                    {/* Mobile 2x2 Grid */}
                    <div className="sm:hidden grid grid-cols-2 gap-3 w-full font-mono text-[11px] uppercase tracking-[0.18em] font-bold text-[#105233]">
                        <div>180–380 GSM</div>
                        <div>3D EMBROIDERY &amp; PRINT</div>
                        <div>MOQ FROM 25 PCS</div>
                        <div>MADE IN MALAD WEST</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
