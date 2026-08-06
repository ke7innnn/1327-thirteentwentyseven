"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import ContactModal from "./ContactModal";
import BrandTagTransition from "./BrandTagTransition";
import SectionMarker from "./ui/SectionMarker";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { HERO_MOQ_LINE } from "@/config/constants";

const TOTAL_FRAMES = 240;
// Batch size for progressive loading — first batch loads instantly, rest load in background
const FIRST_BATCH = 50;

function getFramePath(index: number): string {
    const num = String(index + 1).padStart(3, "0");
    return `/sequence/ezgif-frame-${num}.jpg`;
}

export default function Mission() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end end"]
    });

    return (
        <div id="mission" className="relative w-full z-10">
            {/* Smooth Hero sequence container with 250vh sticky scroll pin length */}
            <div ref={heroRef} className="relative w-full h-[250vh]">
                <section className="sticky top-0 w-full h-screen overflow-hidden">
                    {/* Instant fallback frame 1 for 0ms initial render before JS canvas hydratation */}
                    <NextImage
                        src="/sequence/ezgif-frame-001.jpg"
                        alt="1327 Hero Frame 1"
                        fill
                        priority
                        unoptimized
                        className="object-cover object-center z-0 pointer-events-none"
                    />

                    {/* Scroll-driven frame animation background */}
                    <FrameCanvas scrollProgress={scrollYProgress} />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40 z-[2]" />

                    {/* Bottom gradient mask — blends green video frame background to 100% pitch black */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#105233] via-[#105233]/95 to-transparent z-[5] pointer-events-none" />

                    <HeroContent scrollProgress={scrollYProgress} />
                </section>
            </div>

            {/* Transition: Scroll-driven 1327 Brand Tag */}
            <BrandTagTransition />

            {/* Manifesto Section */}
            <ManifestoSection />
        </div>
    );
}

function FrameCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const lastDrawnFrame = useRef(-1);
    const autoPlayFrame = useRef(0);
    const lastScrollTime = useRef(0);
    const isScrolling = useRef(false);

    const [canvasSize, setCanvasSize] = useState(() =>
        typeof window !== "undefined" ? { width: window.innerWidth, height: window.innerHeight } : { width: 1920, height: 1080 }
    );

    // Draw a frame with cover-style scaling
    const drawFrame = useCallback((frameIndex: number) => {
        if (frameIndex === lastDrawnFrame.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
        if (!ctx) return;
        ctx.imageSmoothingQuality = "medium";

        let img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) {
            // Find nearest loaded frame
            for (let offset = 1; offset < 30; offset++) {
                const prev = (frameIndex - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
                const prevImg = imagesRef.current[prev];
                if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
                    img = prevImg;
                    break;
                }
            }
        }
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const scale = Math.max(cw / iw, ch / ih);
        const sw = cw / scale;
        const sh = ch / scale;
        const sx = (iw - sw) / 2;
        const sy = (ih - sh) / 2;

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
        lastDrawnFrame.current = frameIndex;
    }, []);

    // Scroll listener to detect active scrolling
    useEffect(() => {
        let scrollTimer: ReturnType<typeof setTimeout>;
        const handleScroll = () => {
            isScrolling.current = true;
            lastScrollTime.current = Date.now();
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                isScrolling.current = false;
            }, 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(scrollTimer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Continuous Autoplay RAF loop (~25 FPS) when standing still
    useEffect(() => {
        let rafId: number;
        let lastTimestamp = 0;
        const frameInterval = 1000 / 25; // 25 FPS video playback

        const loop = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const elapsed = timestamp - lastTimestamp;

            if (!isScrolling.current && elapsed >= frameInterval) {
                lastTimestamp = timestamp;
                autoPlayFrame.current = (autoPlayFrame.current + 1) % TOTAL_FRAMES;
                drawFrame(autoPlayFrame.current);
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [drawFrame]);

    // Preload all 240 frames eagerly
    useEffect(() => {
        let mounted = true;
        const images = imagesRef.current;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.decoding = "async";
            img.src = getFramePath(i);
            img.onload = () => {
                if (mounted) {
                    images[i] = img;
                    if (i === 0) drawFrame(0);
                }
            };
        }

        return () => {
            mounted = false;
        };
    }, [drawFrame]);

    // Handle canvas resize
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        function handleResize() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setCanvasSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 100);
        }
        requestAnimationFrame(() => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Redraw current frame on resize
    useEffect(() => {
        if (canvasSize.width > 0) {
            lastDrawnFrame.current = -1;
            drawFrame(autoPlayFrame.current);
        }
    }, [canvasSize, drawFrame]);

    // Scroll-driven frame transform when scrolling
    const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1], { clamp: true });

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (isScrolling.current) {
            const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
            autoPlayFrame.current = index;
            drawFrame(index);
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute inset-0 w-full h-full z-[1]"
            style={{ display: "block" }}
        />
    );
}

function HeroContent({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Hero Section Overlay (1327 DESIGNED FOR THE BOLD): Stays 100% visible on screen
    // while locked, and unpins smoothly as user scrolls down into Manifesto
    const opacityHero = useTransform(scrollProgress, [0, 0.7, 1.0], [1, 1, 0]);
    const yHero = useTransform(scrollProgress, [0, 0.7, 1.0], [0, 0, -40]);
    const pointerEventsHero = useTransform(scrollProgress, (latest: number) => latest > 0.8 ? "none" : "auto");

    const handleScrollToNext = () => {
        const nextSec = document.getElementById("manifesto");
        if (nextSec) {
            nextSec.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
                <motion.div
                    style={{ opacity: opacityHero, y: yHero, pointerEvents: pointerEventsHero }}
                    className="absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-8 sm:py-24 animate-[fadeIn_0.5s_ease-out]"
                >


                    {/* Unified Left-Aligned Hero Typography Stack */}
                    <div className="w-full max-w-5xl flex flex-col items-start text-left gap-3 sm:gap-5 my-auto pt-6">
                        {/* Giant 1327 Header */}
                        <h1 className="font-heading font-black text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[11rem] xl:text-[13rem] leading-[0.82] tracking-tighter text-[#F2F9F4] select-none -ml-1 sm:-ml-2">
                            1327
                        </h1>

                        {/* Subheading / MOQ Callout */}
                        <p className="font-mono text-xs sm:text-sm md:text-base text-[#4FB47E] tracking-widest uppercase font-semibold">
                            {HERO_MOQ_LINE}
                        </p>

                        {/* Primary & Secondary Hero CTAs */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
                            {/* Primary CTA: REACH OUT */}
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#4FB47E] text-[#0D1712] font-heading font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(79,180,126,0.5)] transition-all duration-300 transform active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>REACH OUT</span>
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0D1712] text-[#4FB47E] group-hover:rotate-45 transition-transform duration-300">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </span>
                                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
                            </button>

                            {/* Secondary CTA: SEE THE WORK */}
                            <button
                                onClick={handleScrollToNext}
                                className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-[#4FB47E]/60 bg-black/40 backdrop-blur-md text-[#F2F9F4] font-heading font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden hover:border-[#4FB47E] transition-all duration-300 transform active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-[#0D1712] transition-colors duration-300">
                                    <span>SEE THE WORK</span>
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4FB47E]/20 text-[#4FB47E] group-hover:bg-[#0D1712] group-hover:text-[#4FB47E] transition-colors duration-300">
                                        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                                    </span>
                                </span>
                                <span className="absolute inset-0 bg-[#4FB47E] scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}

function VideoWordIdentity({ reduced }: { reduced?: boolean }) {
    const [frameIndex, setFrameIndex] = useState(30);

    useEffect(() => {
        if (reduced) return;
        if (typeof window !== "undefined" && window.innerWidth < 900) return;

        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev >= 90 ? 30 : prev + 1));
        }, 50); // 20 FPS video fill inside text

        return () => clearInterval(interval);
    }, [reduced]);

    const frameNum = String(frameIndex).padStart(3, "0");
    const framePath = `/sequence/ezgif-frame-${frameNum}.jpg`;

    return (
        <span
            className="inline-block relative text-transparent font-black uppercase bg-cover bg-center transition-all duration-75 select-none"
            style={{
                backgroundImage: `url('${framePath}')`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "contrast(1.35) brightness(0.95) sepia(1) hue-rotate(90deg) saturate(2.2)",
            }}
        >
            IDENTITY.
        </span>
    );
}

function StitchLineText({ reduced }: { reduced?: boolean }) {
    return (
        <div className="relative inline-block">
            {/* Outlined Base Text: transparent fill, 1.5px deep green stroke */}
            <span
                className="block text-transparent tracking-normal select-none"
                style={{
                    WebkitTextStroke: "1.5px #105233",
                }}
            >
                STITCH BY STITCH.
            </span>

            {!reduced && (
                <>
                    {/* Left-to-Right Green Fill Wipe */}
                    <motion.div
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        viewport={{ once: true, margin: "-15% 0px" }}
                        transition={{
                            duration: 1.4,
                            delay: 0.36,
                            ease: [0.65, 0, 0.35, 1],
                        }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <span
                            className="block text-[#105233] tracking-normal font-black"
                            style={{
                                WebkitTextStroke: "1.5px #105233",
                            }}
                        >
                            STITCH BY STITCH.
                        </span>
                    </motion.div>

                    {/* 2px Green Needle Tick riding the wipe edge */}
                    <motion.span
                        initial={{ left: "0%", opacity: 1 }}
                        whileInView={{ left: "100%", opacity: [1, 1, 0] }}
                        viewport={{ once: true, margin: "-15% 0px" }}
                        transition={{
                            left: {
                                duration: 1.4,
                                delay: 0.36,
                                ease: [0.65, 0, 0.35, 1],
                            },
                            opacity: {
                                duration: 1.4,
                                delay: 0.36,
                                times: [0, 0.9, 1],
                                ease: "linear",
                            },
                        }}
                        className="absolute top-0 bottom-0 w-[2px] bg-[#105233] pointer-events-none"
                    />
                </>
            )}
        </div>
    );
}

function StitchCounter({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const [count, setCount] = useState(1327);

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        setCount(Math.round(1327 + latest * 850));
    });

    return (
        <span className="font-mono text-xs tracking-[0.2em] font-bold text-[#105233] tabular-nums">
            &#123; STITCHES: {String(count).padStart(4, "0")} &#125;
        </span>
    );
}

function ManifestoSection() {
    const reduced = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Subtly drifting watermark positioned top-right so it NEVER overlaps the outlined line
    const watermarkX = useTransform(scrollYProgress, [0, 1], [-40, 60]);

    // Parallax rates for Process Plates A & B and Full-Bleed Macro Band
    const yPlateA = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const yPlateB = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yMacro = useTransform(scrollYProgress, [0, 1], [15, -25]);

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            className="relative z-20 bg-[#eae6df] text-[#0a0a0a] py-20 md:py-28 border-b border-black/10 w-full overflow-hidden select-none rounded-none"
        >
            {/* Woven Linen Apparel Fabric Texture Overlay */}
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

            {/* Giant 1327 Brand Watermark: Ends above outlined line cap height at opacity 0.04 */}
            <motion.div
                style={{ x: watermarkX, opacity: 0.04 }}
                className="absolute right-2 lg:right-12 top-8 md:top-12 pointer-events-none select-none z-0"
            >
                <span className="font-heading font-black text-8xl sm:text-[14rem] md:text-[20rem] tracking-tighter text-[#105233]">
                    1327
                </span>
            </motion.div>

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between gap-10 md:gap-14 relative z-10">
                {/* Header Block */}
                <div className="flex flex-col gap-4">
                    {/* Top Pill with dot and single curly brace delimiter */}
                    <motion.div
                        initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-none bg-[#105233] text-white shadow-sm self-start"
                    >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                            ● &#123; 1327 BRAND MANIFESTO &#125;
                        </span>
                    </motion.div>

                    {/* Single Delimiter System Header Bar */}
                    <div className="flex justify-between items-center border-b border-black/15 pb-4 w-full font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#105233]">
                        <span>&#123; 01 &#125; OUR MISSION</span>
                        <StitchCounter scrollProgress={scrollYProgress} />
                    </div>
                </div>

                {/* Display Block & Process Plates Layout Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
                    {/* 4 Lines Display Block */}
                    <div className="md:col-span-8 lg:col-span-9 flex justify-start items-center">
                        <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] uppercase text-left text-[#0a0a0a] w-full flex flex-col items-start gap-1 sm:gap-2 leading-[0.95] md:leading-[0.88]">
                            {/* Line 1: WE DON'T MAKE (indent 0) */}
                            <div className="overflow-hidden w-full">
                                <motion.span
                                    initial={reduced ? { y: 0 } : { y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.9, delay: 0, ease: [0.215, 0.61, 0.355, 1] }}
                                    className="block ml-0 md:ml-0 tracking-tight md:tracking-[-0.02em]"
                                >
                                    WE DON&apos;T MAKE
                                </motion.span>
                            </div>

                            {/* Line 2: MERCH. (indent 7% on desktop) */}
                            <div className="overflow-hidden w-full">
                                <motion.span
                                    initial={reduced ? { y: 0 } : { y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.9, delay: 0.09, ease: [0.215, 0.61, 0.355, 1] }}
                                    className="block ml-0 md:ml-[7%] tracking-tight md:tracking-[-0.02em]"
                                >
                                    MERCH.
                                </motion.span>
                            </div>

                            {/* Line 3: WE BUILD IDENTITY. (indent 0, IDENTITY filled with footage) */}
                            <div className="overflow-hidden w-full">
                                <motion.span
                                    initial={reduced ? { y: 0 } : { y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.9, delay: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
                                    className="block ml-0 md:ml-0 tracking-tight md:tracking-[-0.02em]"
                                >
                                    WE BUILD{" "}
                                    <VideoWordIdentity reduced={reduced} />
                                </motion.span>
                            </div>

                            {/* Line 4: STITCH BY STITCH. (indent 7% on desktop) */}
                            <div className="overflow-hidden w-full">
                                <motion.div
                                    initial={reduced ? { y: 0 } : { y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.9, delay: 0.27, ease: [0.215, 0.61, 0.355, 1] }}
                                    className="ml-0 md:ml-[7%]"
                                >
                                    <StitchLineText reduced={reduced} />
                                </motion.div>
                            </div>
                        </h2>
                    </div>

                    {/* Process Plates A & B (Right Margin) */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6 relative">
                        {/* Process Plate A (~180x230, upper right beside lines 1-2) */}
                        <motion.div
                            style={reduced ? {} : { y: yPlateA }}
                            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative w-full md:w-[190px] h-52 md:h-[240px] border border-black/15 bg-[#0a0a0a]/05 p-1 flex flex-col justify-between overflow-hidden group shadow-sm self-start md:self-auto"
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <NextImage
                                    src="/sequence/ezgif-frame-060.jpg"
                                    alt="1327 Atelier Heavy Fabric Spec"
                                    fill
                                    className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#105233]/20 mix-blend-multiply pointer-events-none" />
                            </div>
                            {/* Spec Caption Chip A */}
                            <div className="bg-[#eae6df]/95 backdrop-blur-sm border-t border-black/15 p-2 font-mono text-[9px] text-[#105233] font-bold tracking-wider leading-tight">
                                <div>FABRIC: 320 GSM COTTON</div>
                                <div className="text-black/50">STITCH COUNT: 14/INCH</div>
                            </div>
                        </motion.div>

                        {/* Process Plate B (~140x140, lower right beside line 3, hidden on mobile < 900px) */}
                        <motion.div
                            style={reduced ? {} : { y: yPlateB }}
                            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="hidden md:flex relative w-[145px] h-[145px] border border-black/15 bg-[#0a0a0a]/05 p-1 flex-col justify-between overflow-hidden group shadow-sm self-end translate-x-4 lg:translate-x-8"
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <NextImage
                                    src="/sequence/ezgif-frame-120.jpg"
                                    alt="1327 Emerald Thread Spec"
                                    fill
                                    className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#105233]/20 mix-blend-multiply pointer-events-none" />
                            </div>
                            {/* Spec Caption Chip B */}
                            <div className="bg-[#eae6df]/95 backdrop-blur-sm border-t border-black/15 p-1.5 font-mono text-[8.5px] text-[#105233] font-bold tracking-wider leading-tight">
                                <div>THREAD: EMERALD 40/2</div>
                                <div className="text-black/50">ATELIER NO: #1327-A</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Full-Bleed Macro Band (200-260px tall horizontal strip) */}
                <motion.div
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full h-52 sm:h-60 md:h-64 border-y border-black/15 overflow-hidden my-2 group"
                >
                    {/* Parallax Macro Background */}
                    <motion.div
                        style={reduced ? {} : { y: yMacro }}
                        className="absolute inset-0 w-full h-[120%] -top-[10%]"
                    >
                        <NextImage
                            src="/manifesto/fabric-macro.jpg"
                            alt="1327 Seam Under Tension Macro Spec"
                            fill
                            className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#105233]/30 mix-blend-multiply pointer-events-none" />
                    </motion.div>

                    {/* Macro Band Spec Caption Chip */}
                    <div className="absolute bottom-4 left-4 sm:left-8 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-[#eae6df]/90 backdrop-blur-md border border-black/20 font-mono text-[10px] sm:text-xs text-[#105233] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#105233]" />
                        <span>● &#123; MACRO SPEC: HIGH-DENSITY SEAM TENSION // 320 GSM &#125;</span>
                    </div>
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-2 border-t border-black/15"
                >
                    <div className="md:col-span-4 font-mono text-xs tracking-[0.2em] uppercase text-[#105233] font-bold text-left flex flex-wrap items-center gap-3">
                        <span>&#123; WHY WE EXIST &#125;</span>
                        <span className="text-black/40 font-normal">&#123; 1327 &#125;</span>
                        
                        {/* Integrated Hang Tag Badge */}
                        <motion.div
                            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.6, delay: 0.47, ease: [0.215, 0.61, 0.355, 1] }}
                            className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#105233]/25 bg-[#105233]/05 rounded-none font-mono text-[10px] text-[#105233] font-bold tracking-wider"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#105233]" />
                            <span>1327-TAG #01</span>
                        </motion.div>
                    </div>

                    <div className="md:col-span-8 font-sans text-base sm:text-lg md:text-xl font-light text-[#0a0a0a]/85 leading-relaxed text-left max-w-2xl">
                        Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
