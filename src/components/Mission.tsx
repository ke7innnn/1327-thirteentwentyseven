"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;
// Batch size for progressive loading — first batch loads instantly, rest load in background
const FIRST_BATCH = 20;

function getFramePath(index: number): string {
    const num = String(index + 1).padStart(3, "0");
    return `/sequence/ezgif-frame-${num}.jpg`;
}

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} id="mission" className="relative z-10 bg-transparent text-white border-b-2 border-white/20 p-0 h-[200vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* Scroll-driven frame animation background */}
                <FrameCanvas scrollProgress={scrollYProgress} />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />

                <Content scrollProgress={scrollYProgress} />
            </div>
        </section>
    );
}

function FrameCanvas({ scrollProgress }: { scrollProgress: any }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const lastDrawnFrame = useRef(-1);
    const rafId = useRef(0);
    const pendingFrame = useRef(-1);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Draw a frame with cover-style scaling (memoised, no deps)
    const drawFrame = useCallback((frameIndex: number) => {
        if (frameIndex === lastDrawnFrame.current) return; // skip if already drawn
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

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
            const BATCH = 10;

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
        setCanvasSize({
            width: window.innerWidth,
            height: window.innerHeight
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

    // Map scroll progress (0..1) → frame index (0..239)
    const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
        scheduleDrawFrame(index);
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

function Content({ scrollProgress }: { scrollProgress: any }) {
    const missionText = "We're dedicated to crafting high-quality custom t-shirts and uniforms for businesses, while building a community that values our relationships and partnerships. We're here not just to make apparel, but to create connections and stories that last.";

    // Title Animation: Fade in and slide up
    const yTitle = useTransform(scrollProgress, [0, 0.2], [50, 0]);
    const opacityTitle = useTransform(scrollProgress, [0, 0.2], [0, 1]);

    // Group words into chunks of 5 (instead of per-word)
    const wordChunks = useMemo(() => {
        const words = missionText.split(" ");
        const chunks: string[][] = [];
        for (let i = 0; i < words.length; i += 5) {
            chunks.push(words.slice(i, i + 5));
        }
        return chunks;
    }, []);

    return (
        <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:items-center relative z-10 gap-10 md:gap-16 pt-20 md:pt-0">
            {/* Left Column: Title and Paragraph */}
            <div className="w-full md:w-7/12 flex flex-col justify-center items-start gap-8 flex-shrink-0">
                <motion.h2
                    style={{ y: yTitle, opacity: opacityTitle, fontFamily: "var(--font-bodoni)" }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-[#fdfbcf] font-heading tracking-[0.05em] text-left leading-none"
                >
                    Our Mission
                </motion.h2>

                <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2 leading-relaxed text-left w-full md:w-[90%] lg:w-[85%]">
                    {wordChunks.map((chunk, i) => (
                        <WordChunk
                            key={i}
                            words={chunk}
                            index={i}
                            scrollProgress={scrollProgress}
                            totalChunks={wordChunks.length}
                        />
                    ))}
                </div>
            </div>

            {/* Right Column: Scroll Indicator */}
            <div className="w-full md:w-5/12 flex flex-col flex-1 items-center justify-center mt-10 md:mt-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="flex flex-col items-center gap-6 text-[#fdfbcf]/80"
                >
                    <span className="uppercase tracking-[0.4em] font-mono text-sm font-bold rotate-90 mb-8 whitespace-nowrap">Scroll Down</span>

                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="rounded-full border border-[#fdfbcf]/50 p-4 flex items-center justify-center backdrop-blur-sm bg-black/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

function WordChunk({ words, index, scrollProgress, totalChunks }: { words: string[], index: number, scrollProgress: any, totalChunks: number }) {
    const revealStart = 0.1;
    const revealEnd = 0.8;
    const totalDuration = revealEnd - revealStart;

    const chunkStart = revealStart + (index / totalChunks) * totalDuration;
    const chunkEnd = chunkStart + 0.08;

    const safeStart = Math.min(chunkStart, 0.95);
    const safeEnd = Math.min(chunkEnd, 1.0);

    const opacity = useTransform(scrollProgress, [safeStart, safeEnd], [0, 1]);
    const y = useTransform(scrollProgress, [safeStart, safeEnd], [10, 0]);

    return (
        <motion.span
            style={{ opacity, y, fontFamily: '"Times New Roman", serif' }}
            className="text-base sm:text-lg md:text-3xl lg:text-4xl font-light tracking-tight inline-block will-change-[transform,opacity]"
        >
            {words.join(" ")}{" "}
        </motion.span>
    )
}
