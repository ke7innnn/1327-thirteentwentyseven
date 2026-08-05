"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import ContactModal from "./ContactModal";
import BrandTagTransition from "./BrandTagTransition";
import SectionMarker from "./ui/SectionMarker";
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
            {/* Smooth Hero sequence container */}
            <div ref={heroRef} className="relative w-full h-[110vh]">
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
                    <div className="absolute inset-0 bg-black/40 z-[1]" />

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
    const lastScheduledFrame = useRef(-1);
    const rafId = useRef(0);
    const pendingFrame = useRef(-1);
    const [canvasSize, setCanvasSize] = useState(() =>
        typeof window !== "undefined" ? { width: window.innerWidth, height: window.innerHeight } : { width: 1920, height: 1080 }
    );

    // Draw a frame with cover-style scaling (memoised, no deps)
    const drawFrame = useCallback((frameIndex: number) => {
        if (frameIndex === lastDrawnFrame.current) return; // skip if already drawn
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
        if (!ctx) return;
        ctx.imageSmoothingQuality = "medium";

        // Try to draw the requested frame
        let img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) {
            // Find the nearest loaded frame backward and forward to avoid flashing stutters
            let foundNearest = false;
            for (let offset = 1; offset < 30; offset++) {
                const prev = frameIndex - offset;
                if (prev >= 0) {
                    const prevImg = imagesRef.current[prev];
                    if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
                        img = prevImg;
                        foundNearest = true;
                        break;
                    }
                }
                const next = frameIndex + offset;
                if (next < TOTAL_FRAMES) {
                    const nextImg = imagesRef.current[next];
                    if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
                        img = nextImg;
                        foundNearest = true;
                        break;
                    }
                }
            }
            if (!foundNearest) return; // wait until at least one frame is loaded
        }

        if (!img) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Cover-style: fill canvas without distortion
        const scale = Math.max(cw / iw, ch / ih);
        const sw = cw / scale;
        const sh = ch / scale;
        const sx = (iw - sw) / 2;
        const sy = (ih - sh) / 2;

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
        lastDrawnFrame.current = frameIndex;
    }, []);

    // RAF-throttled draw: only one draw per animation frame
    const scheduleDrawFrame = useCallback((frameIndex: number) => {
        pendingFrame.current = frameIndex;
        if (rafId.current) return; // already scheduled
        rafId.current = requestAnimationFrame(() => {
            rafId.current = 0;
            if (pendingFrame.current >= 0) {
                drawFrame(pendingFrame.current);
            }
        });
    }, [drawFrame]);

    // Preload frames progressively: first batch eagerly, then rest in idle callbacks
    useEffect(() => {
        let mounted = true;
        const images = imagesRef.current;

        // Load a single frame and return a promise
        const loadImage = (i: number): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.decoding = "async";
                img.src = getFramePath(i);
                img.onload = () => {
                    if (mounted) {
                        images[i] = img;
                        // Draw frame 0 as soon as it's loaded
                        if (i === 0) drawFrame(0);
                    }
                    resolve();
                };
                img.onerror = () => resolve();
            });
        };

        // Load first batch eagerly (critical frames the user sees first)
        const loadFirstBatch = async () => {
            const promises: Promise<void>[] = [];
            for (let i = 0; i < Math.min(FIRST_BATCH, TOTAL_FRAMES); i++) {
                promises.push(loadImage(i));
            }
            await Promise.all(promises);
        };

        // Load remaining frames in small batches using requestIdleCallback / setTimeout
        const loadRemainingFrames = () => {
            let i = FIRST_BATCH;
            const BATCH = 20;

            const loadBatch = () => {
                if (!mounted || i >= TOTAL_FRAMES) return;
                const end = Math.min(i + BATCH, TOTAL_FRAMES);
                for (let j = i; j < end; j++) {
                    loadImage(j);
                }
                i = end;
                // Use requestIdleCallback if available, else setTimeout
                if (typeof requestIdleCallback !== "undefined") {
                    requestIdleCallback(loadBatch);
                } else {
                    setTimeout(loadBatch, 16);
                }
            };
            loadBatch();
        };

        loadFirstBatch().then(loadRemainingFrames);

        return () => {
            mounted = false;
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [drawFrame]);

    // Handle canvas resize with debounce
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
        // Set initial size immediately
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
            lastDrawnFrame.current = -1; // force redraw
            drawFrame(0);
        }
    }, [canvasSize, drawFrame]);

    // Map scroll progress (0..1.176) → frame index (0..239) with clamping.
    // Pinned lock plays 85% of frames (0..204) up to scrollProgress = 1.0.
    // At scrollProgress = 1.0, lock breaks and section unpins while remaining 15% of frames (204..239) continue playing as user scrolls down!
    const frameIndex = useTransform(scrollProgress, [0, 1.176], [0, TOTAL_FRAMES - 1], { clamp: true });

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
        if (index !== lastScheduledFrame.current) {
            lastScheduledFrame.current = index;
            scheduleDrawFrame(index);
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute inset-0 w-full h-full z-0"
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
                    className="absolute inset-0 w-full h-full flex flex-col justify-between px-5 sm:px-8 md:px-16 lg:px-24 pt-20 pb-4 sm:pt-24 sm:pb-6 md:py-28 animate-[fadeIn_0.5s_ease-out]"
                >
                    {/* Top Bar */}
                    <div className="flex justify-end items-center text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/50 w-full">
                        <span className="text-right hidden sm:inline">Malad West — Mumbai, IN</span>
                    </div>

                    {/* Center Number */}
                    <div className="w-full flex justify-start items-center">
                        <h1 className="text-[22vw] md:text-[22vw] font-bold leading-none tracking-tight flex items-center font-heading select-none text-[#F2F9F4]">
                            <span>13</span>
                            <span>27</span>
                        </h1>
                    </div>

                    {/* Bottom Content */}
                    <div className="w-full flex flex-col gap-3 sm:gap-5">
                        {/* Heading & Description */}
                        <div className="flex flex-col items-start text-left gap-2 sm:gap-3">
                            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-black uppercase text-white tracking-tight leading-[0.9] font-sans">
                                <span className="block">Designed for the</span>
                                <span className="block text-[#1EA86E]">Bold.</span>
                            </h2>
                            <p className="text-xs sm:text-sm md:text-lg text-white/70 max-w-2xl font-sans leading-relaxed hidden sm:block">
                                Premium custom apparel and uniforms for crews that move like family — cut, printed and embroidered in Mumbai.
                            </p>
                        </div>

                        {/* Buttons — Styled in 1327 Logo Font (Sugo / font-heading) with Lando hover shift */}
                        <div className="flex flex-wrap items-center gap-3.5">
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="group bg-white text-black hover:bg-[#105233] hover:text-white hover:border-[#105233] border-2 border-white font-heading font-black text-sm sm:text-base md:text-lg uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-none flex items-center gap-2.5 transition-all duration-200 ease-out whitespace-nowrap cursor-pointer shadow-lg"
                            >
                                <span>REACH OUT</span>
                                <span className="text-xs sm:text-sm transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                            </button>
                            <button
                                onClick={handleScrollToNext}
                                className="group border-2 border-white/90 text-white hover:bg-white hover:text-black font-heading font-black text-sm sm:text-base md:text-lg uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-none flex items-center gap-2.5 transition-all duration-200 ease-out whitespace-nowrap cursor-pointer"
                            >
                                <span>SEE THE WORK</span>
                                <span className="text-xs sm:text-sm transition-transform duration-200 ease-out group-hover:translate-y-1">⬇</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}

function ManifestoSection() {
    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 40 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    return (
        <section
            id="manifesto"
            className="relative z-20 bg-[#eae6df] text-[#0a0a0a] py-16 md:py-28 border-b border-black/10 w-full overflow-hidden"
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
                    background: "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(255,255,255,0.6) 0%, transparent 85%)",
                }}
            />

            {/* Giant 1327 Brand Watermark */}
            <div className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.06]">
                <span className="font-heading font-black text-9xl sm:text-[14rem] md:text-[20rem] tracking-tighter text-[#105233]">
                    1327
                </span>
            </div>

            <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-10% 0px" }}
                variants={containerVariants}
                className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between min-h-0 md:min-h-[65vh] gap-8 md:gap-0 relative z-10"
            >
                {/* Top Bar */}
                <div className="flex flex-col gap-3">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#105233] text-white shadow-sm self-start"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                            1327 — BRAND MANIFESTO
                        </span>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="flex justify-between items-center border-b border-black/10 pb-3 w-full"
                    >
                        <SectionMarker sectionKey="mission" />
                        <span className="text-right font-mono text-xs uppercase tracking-[0.2em] text-black/50">The Manifesto</span>
                    </motion.div>
                </div>

                {/* Central Title */}
                <div className="w-full flex justify-start items-center my-auto py-8">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold uppercase tracking-tight leading-[0.95] text-left text-black max-w-5xl font-sans flex flex-col items-start">
                        <motion.span variants={itemVariants} className="block">
                            We don&apos;t make
                        </motion.span>
                        <motion.span variants={itemVariants} className="block mt-2">
                            Merch.
                        </motion.span>
                        <motion.span variants={itemVariants} className="block mt-2">
                            We build{" "}
                            <span className="text-[#105233] font-black uppercase">
                                Identity.
                            </span>
                        </motion.span>
                        
                        {/* Horizontal black bar divider */}
                        <motion.div 
                            variants={{
                                initial: { width: 0, opacity: 0 },
                                animate: { width: "64px", opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="h-1 bg-[#105233] my-6 rounded-full"
                        />
                        
                        <motion.span 
                            variants={itemVariants} 
                            className="block"
                            style={{ WebkitTextStroke: "1.5px #0a0a0a", color: "transparent" }}
                        >
                            Stitch by Stitch.
                        </motion.span>
                    </h2>
                </div>

                {/* Bottom Row */}
                <motion.div 
                    variants={itemVariants}
                    className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end mt-4 pt-4 border-t border-black/10"
                >
                    <div className="md:col-span-4 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-[#105233] font-bold self-start md:self-end text-left flex items-center gap-2">
                        <span>/ Why We Exist</span>
                        <span className="text-black/30 font-normal">| 1327</span>
                    </div>
                    <div
                        style={{ fontFamily: '"Times New Roman", serif' }}
                        className="md:col-span-8 text-sm sm:text-base md:text-lg lg:text-xl font-light text-black/90 leading-relaxed text-left"
                    >
                        Every crew deserves a uniform worth belonging to. We cut premium fabric, obsess over embroidery and skip every shortcut — so your people feel like a team, and your brand becomes impossible to miss.
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
