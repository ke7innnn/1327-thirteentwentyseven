"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";
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

    // CTA banner fades in near the end of the hero scroll sequence
    const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const ctaY = useTransform(scrollYProgress, [0.7, 0.9], [40, 0]);

    return (
        <div id="mission" className="relative w-full z-10 bg-[#105233]">
            {/* Hero scroll container — 300vh gives 200vh of locked scroll for smooth 240-frame animation */}
            <div ref={heroRef} className="relative w-full h-[300vh] bg-[#105233]">
                {/* Sticky hero section — stays pinned at top while frames animate */}
                <section className="sticky top-0 w-full h-screen overflow-hidden bg-[#105233] z-10">
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
                    <div className="absolute inset-0 bg-black/35 z-[2]" />

                    {/* Bottom gradient mask — seamlessly blends hero frame into #105233 brand green */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 bg-gradient-to-t from-[#105233] via-[#105233]/90 to-transparent z-[5] pointer-events-none" />

                    <HeroContent scrollProgress={scrollYProgress} />
                </section>

                {/* ─── CTA BANNER: Sticks to bottom of viewport, fades in near end of hero scroll ───── */}
                <motion.div
                    style={{ opacity: ctaOpacity, y: ctaY }}
                    className="sticky bottom-0 z-30 w-full bg-[#105233] border-y border-[#1EA86E]/40 py-6 sm:py-8 px-6 sm:px-12 shadow-2xl"
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1EA86E] flex items-center justify-center md:justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                1327 OFFICIAL APPAREL ORDER
                            </span>
                            <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                                READY TO ORDER YOUR CUSTOM CREW GEAR?
                            </h3>
                        </div>
                        <Link
                            href="/order"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#F2F9F4] text-[#105233] font-heading font-bold text-sm sm:text-base uppercase tracking-wider overflow-hidden shadow-xl hover:bg-black hover:text-white transition-all duration-300 transform active:scale-95 shrink-0 w-full md:w-auto"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <span>PLACE YOUR ORDER NOW</span>
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#105233] text-white group-hover:bg-white group-hover:text-[#105233] transition-all duration-300">
                                    ↗
                                </span>
                            </span>
                        </Link>
                    </div>
                </motion.div>
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
    const opacityHero = useTransform(scrollProgress, [0, 0.85, 1.0], [1, 1, 0]);
    const yHero = useTransform(scrollProgress, [0, 0.85, 1.0], [0, 0, -30]);
    const pointerEventsHero = useTransform(scrollProgress, (latest: number) => latest > 0.9 ? "none" : "auto");

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

                        {/* Primary & Secondary Hero CTAs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto">
                            {/* Primary CTA: REACH OUT */}
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#4FB47E] text-[#0D1712] font-heading font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(79,180,126,0.5)] transition-all duration-300 transform active:scale-95 w-full sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
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
                                className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-[#4FB47E]/60 bg-black/40 backdrop-blur-md text-[#F2F9F4] font-heading font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden hover:border-[#4FB47E] transition-all duration-300 transform active:scale-95 w-full sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-[#0D1712] transition-colors duration-300">
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
                backgroundImage: `linear-gradient(rgba(16, 82, 51, 0.85), rgba(16, 82, 51, 0.85)), url('${framePath}')`,
                backgroundBlendMode: "multiply",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "contrast(1.5) brightness(0.95)",
            }}
        >
            IDENTITY.
        </span>
    );
}

function StitchLineText({ reduced, strokeColor }: { reduced?: boolean; strokeColor?: MotionValue<string> | string }) {
    return (
        <div className="relative inline-block">
            {/* Outlined Base Text: transparent fill */}
            <motion.span
                className="block text-transparent tracking-normal select-none"
                style={{
                    WebkitTextStroke: "1.5px currentColor",
                }}
            >
                STITCH BY STITCH.
            </motion.span>

            {!reduced && (
                <>
                    {/* Left-to-Right Fill Wipe */}
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
                        <motion.span
                            className="block tracking-normal font-black"
                            style={{
                                color: strokeColor || "currentColor",
                                WebkitTextStroke: "1.5px currentColor",
                            }}
                        >
                            STITCH BY STITCH.
                        </motion.span>
                    </motion.div>

                    {/* 2px Needle Tick riding the wipe edge */}
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
                        style={{
                            backgroundColor: strokeColor || "currentColor",
                        }}
                        className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
                    />
                </>
            )}
        </div>
    );
}

function StitchCounter({ scrollProgress, accentColor }: { scrollProgress: MotionValue<number>; accentColor: MotionValue<string> }) {
    const [count, setCount] = useState(1327);

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        setCount(Math.round(1327 + latest * 850));
    });

    return (
        <motion.span
            style={{ color: accentColor }}
            className="font-mono text-xs tracking-[0.2em] font-bold tabular-nums"
        >
            &#123; STITCHES: {String(count).padStart(4, "0")} &#125;
        </motion.span>
    );
}

const PROCESS_SHOT_LIST = [
    { src: "/manifesto/custom-leather-2.jpg", alt: "Custom 1327 Circular Leather Placemat" },
    { src: "/manifesto/custom-leather-3.jpg", alt: "Custom 1327 Leather Coasters Collection" },
];

function ManifestoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const watermarkX = useTransform(scrollYProgress, [0, 1], [-80, 120]);
    const watermarkOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.03, 0.08, 0.03]);

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            className="relative z-20 bg-[#eae6df] text-[#0a0a0a] py-20 md:py-32 border-b border-black/10 w-full overflow-hidden select-none rounded-none"
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

            {/* Giant 1327 Brand Watermark */}
            <motion.div
                style={{ x: watermarkX, opacity: watermarkOpacity }}
                className="absolute right-2 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
            >
                <span className="font-heading font-black text-9xl sm:text-[16rem] md:text-[24rem] tracking-tighter text-[#105233]">
                    1327
                </span>
            </motion.div>

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-12 md:gap-16 relative z-10">
                {/* Top Bar */}
                <div className="flex flex-col gap-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#105233] text-white shadow-sm self-start"
                    >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white">
                            &#123; 1327 BRAND MANIFESTO &#125;
                        </span>
                    </motion.div>

                    <div className="flex justify-between items-center border-b border-black/15 pb-4 w-full font-mono text-xs font-bold uppercase tracking-[0.2em]">
                        <span className="text-[#105233]">&#123; 01 &#125; OUR MISSION</span>
                        <span className="text-[#105233]">&#123; STITCHES: 1327 &#125;</span>
                    </div>
                </div>

                {/* Main Headline Display (Full Width Typographic Statement) */}
                <div className="w-full">
                    <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] uppercase tracking-tight leading-[0.88] text-left text-[#0a0a0a] max-w-6xl flex flex-col items-start gap-1">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            WE DON&apos;T MAKE MERCH.
                        </motion.span>

                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-[#105233]"
                        >
                            WE BUILD IDENTITY.
                        </motion.span>

                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-[#105233]"
                        >
                            STITCH BY STITCH.
                        </motion.span>
                    </h2>
                </div>

                {/* Content Grid: Left Lead Paragraph + Right 3 Spec Pillars */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-black/15 items-start">
                    {/* Left Column: Lead Paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <p className="font-sans text-lg sm:text-xl md:text-2xl font-light text-[#0a0a0a]/90 leading-relaxed">
                            Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                        </p>

                        <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] text-[#105233] uppercase pt-2">
                            <span className="w-8 h-px bg-[#105233]" />
                            <span>CRAFTED IN MUMBAI</span>
                        </div>
                    </motion.div>

                    {/* Right Column: 3 Editorial Spec Pillars */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                            className="p-5 border border-black/15 bg-black/[0.02] flex flex-col gap-2"
                        >
                            <span className="font-mono text-xs font-bold text-[#105233] tracking-[0.15em]">01 / FABRIC</span>
                            <h4 className="font-heading font-black text-lg uppercase text-[#0a0a0a]">320+ GSM</h4>
                            <p className="font-sans text-xs text-[#0a0a0a]/70 leading-normal">
                                Heavyweight combed cottons engineered to retain shape and feel after endless washes.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                            className="p-5 border border-black/15 bg-black/[0.02] flex flex-col gap-2"
                        >
                            <span className="font-mono text-xs font-bold text-[#105233] tracking-[0.15em]">02 / STITCH</span>
                            <h4 className="font-heading font-black text-lg uppercase text-[#0a0a0a]">14 DENSITY</h4>
                            <p className="font-sans text-xs text-[#0a0a0a]/70 leading-normal">
                                High-density embroidery &amp; reinforced seams with zero fraying or loose threads.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.5, delay: 0.49, ease: "easeOut" }}
                            className="p-5 border border-black/15 bg-black/[0.02] flex flex-col gap-2"
                        >
                            <span className="font-mono text-xs font-bold text-[#105233] tracking-[0.15em]">03 / PROOF</span>
                            <h4 className="font-heading font-black text-lg uppercase text-[#0a0a0a]">ZERO SHORTCUTS</h4>
                            <p className="font-sans text-xs text-[#0a0a0a]/70 leading-normal">
                                Physical sample approvals before production. What you approve is what ships.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
