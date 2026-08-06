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

function FabricReveal({
    src,
    alt,
    markText = "1327",
}: {
    src: string;
    alt: string;
    markText?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50, r: 160 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y, r: 220 });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 50, y: 50, r: 160 });
    };

    return (
        <div className="fabric-frame w-full h-full">
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="fabric w-full h-full"
            >
                {/* Base Unlit Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="fabric__img grayscale contrast-125 brightness-80"
                />

                {/* Lit Reveal Mask Layer */}
                <div
                    className="fabric__reveal pointer-events-none"
                    style={
                        {
                            "--mx": `${mousePos.x}%`,
                            "--my": `${mousePos.y}%`,
                            "--r": `${mousePos.r}px`,
                        } as React.CSSProperties
                    }
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt=""
                        className="fabric__img fabric__img--lit grayscale contrast-125"
                    />
                </div>

                {/* Knitted Watermark Overlay */}
                <div className="fabric__mark font-heading select-none">
                    {markText}
                </div>
            </div>
        </div>
    );
}

function ManifestoSection() {
    const reduced = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // ─── THREE-ACT COLOR ARCHITECTURE ───────────────────────────────────────
    // Act 1 (0.00-0.45): Cream ground (#eae6df), near-black ink (#0a0a0a), deep green accent (#105233)
    // Act 2 (0.45-0.72): Lerp ground -> deep green (#105233), ink -> cream (#eae6df), accent -> cream (#eae6df)
    // Act 3 (0.72-1.00): Deep green ground (#105233), cream ink & accent (#eae6df)
    const groundColor = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], ["#eae6df", "#eae6df", "#105233", "#105233"]);
    const inkColor = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], ["#0a0a0a", "#0a0a0a", "#eae6df", "#eae6df"]);
    const accentColor = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], ["#105233", "#105233", "#eae6df", "#eae6df"]);
    const ruleColor = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], ["rgba(10,10,10,0.15)", "rgba(10,10,10,0.15)", "rgba(234,230,223,0.25)", "rgba(234,230,223,0.25)"]);

    // Watermark position & opacity
    const watermarkX = useTransform(scrollYProgress, [0, 1], [-40, 60]);

    // Act 1 & 2 Left Image Column Motion
    const columnY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-40%"]);
    const columnX = useTransform(scrollYProgress, [0.45, 0.70], ["0%", "-120%"]);
    const columnOpacity = useTransform(scrollYProgress, [0.45, 0.68], [1, 0]);

    // Act 3 Display Block Fade Out
    const displayOpacity = useTransform(scrollYProgress, [0.65, 0.78], [1, 0]);
    const displayY = useTransform(scrollYProgress, [0.65, 0.78], [0, -30]);

    // Act 3 Floating Single Image Motion
    const act3Opacity = useTransform(scrollYProgress, [0.70, 0.80], [0, 1]);
    const act3Scale = useTransform(scrollYProgress, [0.70, 0.80], [0.92, 1]);

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            className="relative z-20 w-full select-none rounded-none min-h-screen border-b border-black/10 md:h-[280vh]"
        >
            {/* DESKTOP PINNED THREE-ACT LAYOUT (>= 900px / md) */}
            <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
                <motion.div
                    style={{ backgroundColor: groundColor, color: inkColor }}
                    className="relative w-full h-full flex flex-col justify-between py-8 lg:py-12 px-8 sm:px-12 lg:px-20 transition-colors duration-200"
                >
                    {/* Woven Linen Apparel Fabric Texture Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-multiply bg-repeat z-0"
                        style={{
                            backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                            backgroundSize: "450px 450px",
                        }}
                    />

                    {/* Giant 1327 Brand Watermark: Ends above outlined line cap height at opacity 0.04 */}
                    <motion.div
                        style={{ x: watermarkX, opacity: 0.04 }}
                        className="absolute right-2 lg:right-12 top-8 md:top-12 pointer-events-none select-none z-0"
                    >
                        <motion.span
                            style={{ color: accentColor }}
                            className="font-heading font-black text-8xl sm:text-[14rem] md:text-[20rem] tracking-tighter"
                        >
                            1327
                        </motion.span>
                    </motion.div>

                    {/* Header Block */}
                    <div className="relative z-20 flex flex-col gap-3">
                        <motion.div
                            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ backgroundColor: accentColor, color: groundColor }}
                            className="inline-flex items-center gap-2.5 px-3 py-1 self-start shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                                &#123; 1327 BRAND MANIFESTO &#125;
                            </span>
                        </motion.div>

                        <motion.div
                            style={{ borderColor: ruleColor }}
                            className="flex justify-between items-center border-b pb-3 w-full font-mono text-xs font-bold uppercase tracking-[0.2em]"
                        >
                            <motion.span style={{ color: accentColor }}>&#123; 01 &#125; OUR MISSION</motion.span>
                            <StitchCounter scrollProgress={scrollYProgress} accentColor={accentColor} />
                        </motion.div>
                    </div>

                    {/* Central Area: Split View (Act 1 & 2) vs Centered Image (Act 3) */}
                    <div className="relative z-20 w-full my-auto py-2 flex items-center justify-between min-h-[420px]">
                        
                        {/* ACT 1 & 2: LEFT 40% IMAGE COLUMN */}
                        <motion.div
                            style={{
                                x: columnX,
                                y: columnY,
                                opacity: columnOpacity,
                            }}
                            className="w-[42%] max-w-[460px] flex flex-col gap-4 pointer-events-none pr-4"
                        >
                            {PROCESS_SHOT_LIST.map((item, idx) => (
                                <div key={idx} className="relative w-full border border-black/15 bg-black/5 p-1 flex flex-col justify-between overflow-hidden shadow-sm">
                                    <div className="relative w-full h-52 lg:h-64 overflow-hidden">
                                        <NextImage
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover grayscale contrast-125"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-[#105233]/15 mix-blend-multiply" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* ACT 1 & 2: RIGHT 60% DISPLAY TYPE BLOCK */}
                        <motion.div
                            style={{ opacity: displayOpacity, y: displayY }}
                            className="w-[60%] flex justify-start items-center"
                        >
                            <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-[5.5rem] uppercase text-left w-full flex flex-col items-start gap-1 leading-[0.88]">
                                <div className="overflow-hidden w-full">
                                    <motion.span
                                        initial={reduced ? { y: 0 } : { y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0, ease: [0.215, 0.61, 0.355, 1] }}
                                        className="block ml-0 tracking-[-0.02em]"
                                    >
                                        WE DON&apos;T MAKE
                                    </motion.span>
                                </div>

                                <div className="overflow-hidden w-full">
                                    <motion.span
                                        initial={reduced ? { y: 0 } : { y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.09, ease: [0.215, 0.61, 0.355, 1] }}
                                        className="block ml-[7%] tracking-[-0.02em]"
                                    >
                                        MERCH.
                                    </motion.span>
                                </div>

                                <div className="overflow-hidden w-full">
                                    <motion.span
                                        initial={reduced ? { y: 0 } : { y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
                                        className="block ml-0 tracking-[-0.02em]"
                                    >
                                        WE BUILD{" "}
                                        <VideoWordIdentity reduced={reduced} />
                                    </motion.span>
                                </div>

                                <div className="overflow-hidden w-full">
                                    <motion.div
                                        initial={reduced ? { y: 0 } : { y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.27, ease: [0.215, 0.61, 0.355, 1] }}
                                        className="ml-[7%]"
                                    >
                                        <StitchLineText reduced={reduced} strokeColor={accentColor} />
                                    </motion.div>
                                </div>
                            </h2>
                        </motion.div>

                        {/* ACT 3: FABRIC REVEAL INTERACTIVE FLOATING MACRO CONTAINER */}
                        <motion.div
                            style={{ opacity: act3Opacity, scale: act3Scale }}
                            className="absolute inset-0 m-auto w-[65%] max-w-3xl aspect-[16/10] z-30 pointer-events-auto shadow-2xl overflow-hidden"
                        >
                            <FabricReveal
                                src="/manifesto/fabric-macro.jpg"
                                alt="1327 Seam Under Tension Macro Spec"
                                markText="1327"
                            />
                        </motion.div>

                    </div>

                    {/* Bottom Row: Manifesto Paragraph */}
                    <motion.div
                        style={{ borderColor: ruleColor }}
                        className="relative z-20 w-full pt-3 border-t flex justify-start"
                    >
                        <div className="font-sans text-base lg:text-lg font-light leading-relaxed text-left max-w-2xl">
                            Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* MOBILE LAYOUT (< 900px / md) — UNPINNED DOCUMENT FLOW */}
            <div className="md:hidden relative w-full bg-[#eae6df] text-[#0a0a0a] py-16 px-5 flex flex-col gap-10">
                {/* Mobile Header */}
                <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#105233] text-white self-start">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                            &#123; 1327 BRAND MANIFESTO &#125;
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-black/15 pb-3 w-full font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#105233]">
                        <span>&#123; 01 &#125; OUR MISSION</span>
                        <span>&#123; STITCHES: 1327 &#125;</span>
                    </div>
                </div>

                {/* Mobile Display Block: Flush-left, collapse indents to 0, leading 0.95 */}
                <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase text-left leading-[0.95] flex flex-col gap-1">
                    <div className="overflow-hidden w-full">
                        <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="block">
                            WE DON&apos;T MAKE
                        </motion.span>
                    </div>
                    <div className="overflow-hidden w-full">
                        <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08 }} className="block">
                            MERCH.
                        </motion.span>
                    </div>
                    <div className="overflow-hidden w-full">
                        <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.16 }} className="block">
                            WE BUILD <VideoWordIdentity reduced={reduced} />
                        </motion.span>
                    </div>
                    <div className="overflow-hidden w-full">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.24 }}>
                            <StitchLineText reduced={reduced} />
                        </motion.div>
                    </div>
                </h2>

                {/* Mobile Image Sequence (Act 1 stacked) */}
                <div className="flex flex-col gap-4 my-2">
                    {PROCESS_SHOT_LIST.map((item, idx) => (
                        <div key={idx} className="relative w-full border border-black/15 bg-black/5 p-1 flex flex-col justify-between overflow-hidden">
                            <div className="relative w-full h-56 overflow-hidden">
                                <NextImage src={item.src} alt={item.alt} fill className="object-cover grayscale contrast-125" loading="lazy" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Act 3 Floating Single Image (8% margins) */}
                <div className="w-[92%] mx-auto aspect-[16/10] my-2 shadow-lg overflow-hidden">
                    <FabricReveal
                        src="/manifesto/fabric-macro.jpg"
                        alt="1327 Seam Under Tension Macro Spec"
                        markText="1327"
                    />
                </div>

                {/* Mobile Manifesto Paragraph */}
                <div className="flex flex-col gap-4 pt-4 border-t border-black/15">
                    <p className="font-sans text-base text-[#0a0a0a]/85 leading-relaxed font-light">
                        Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                    </p>
                </div>
            </div>
        </section>
    );
}
