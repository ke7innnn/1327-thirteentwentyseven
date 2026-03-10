"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;

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
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const loadedCountRef = useRef(0);
    const [ready, setReady] = useState(false);

    // Preload all frames on mount
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let mounted = true;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                if (!mounted) return;
                loadedCountRef.current++;
                if (loadedCountRef.current >= TOTAL_FRAMES) {
                    setReady(true);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;

        // Draw the first frame immediately once it's loaded
        const firstImg = images[0];
        if (firstImg.complete) {
            drawFrame(0);
        } else {
            firstImg.onload = () => {
                if (!mounted) return;
                loadedCountRef.current++;
                drawFrame(0);
                if (loadedCountRef.current >= TOTAL_FRAMES) {
                    setReady(true);
                }
            };
        }

        return () => { mounted = false; };
    }, []);

    // Handle canvas resize
    useEffect(() => {
        function handleResize() {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Draw a frame with cover-style scaling
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
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

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }, []);

    // Redraw on resize
    useEffect(() => {
        if (canvasSize.width > 0) {
            drawFrame(0);
        }
    }, [canvasSize, drawFrame]);

    // Map scroll progress (0..1) → frame index (0..239)
    const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
        drawFrame(index);
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
        <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between relative z-10 gap-6 md:gap-16 py-16 md:py-0">
            {/* Title */}
            <div className="w-full md:w-5/12 flex flex-col justify-center md:items-start flex-shrink-0">
                <motion.h2
                    style={{ y: yTitle, opacity: opacityTitle, fontFamily: "var(--font-bodoni)" }}
                    className="text-5xl sm:text-6xl md:text-8xl font-bold uppercase text-[#fdfbcf] font-heading tracking-[0.1em] text-left leading-none"
                >
                    Our Mission
                </motion.h2>
            </div>

            {/* Paragraph — word chunks instead of per-word */}
            <div className="w-full md:w-6/12 flex flex-col justify-center overflow-y-auto max-h-[55vh] md:max-h-none">
                <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2 leading-relaxed text-left">
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
