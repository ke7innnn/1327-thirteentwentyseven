"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} id="mission" className="relative z-10 bg-transparent text-white border-b-2 border-white/20 p-0 h-[200vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* Static Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/newbg/ng.jpeg"
                        alt="Mission Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <Content scrollProgress={scrollYProgress} />
            </div>
        </section>
    );
}

function Content({ scrollProgress }: { scrollProgress: any }) {
    const missionText = "We’re dedicated to crafting high-quality custom t-shirts and uniforms for businesses, while building a community that values our relationships and partnerships. We’re here not just to make apparel, but to create connections and stories that last.";

    // Title Animation: Fade in and slide up
    const yTitle = useTransform(scrollProgress, [0, 0.2], [50, 0]);
    const opacityTitle = useTransform(scrollProgress, [0, 0.2], [0, 1]);

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

            {/* Paragraph */}
            <div className="w-full md:w-6/12 flex flex-col justify-center overflow-y-auto max-h-[55vh] md:max-h-none">
                <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2 leading-relaxed perspective-[1000px] text-left">
                    {/* Render words with scroll-driven reveal */}
                    {missionText.split(" ").map((word, i) => (
                        <Word
                            key={i}
                            word={word}
                            index={i}
                            scrollProgress={scrollProgress}
                            totalWords={missionText.split(" ").length}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Word({ word, index, scrollProgress, totalWords }: { word: string, index: number, scrollProgress: any, totalWords: number }) {
    // Reveal text word by word
    const revealStart = 0.1;
    const revealEnd = 0.8;
    const totalDuration = revealEnd - revealStart;

    const wordStart = revealStart + (index / totalWords) * totalDuration;
    const wordEnd = wordStart + 0.05;

    const safeStart = Math.min(wordStart, 0.95);
    const safeEnd = Math.min(wordEnd, 1.0);

    const opacity = useTransform(scrollProgress, [safeStart, safeEnd], [0, 1]);
    const y = useTransform(scrollProgress, [safeStart, safeEnd], [10, 0]);
    const color = useTransform(scrollProgress, [safeStart, safeEnd], ["rgba(255,255,255,0.15)", "#ffffff"]);

    return (
        <span className="relative inline-block">
            <motion.span
                style={{ opacity, y, color, fontFamily: '"Times New Roman", serif' }}
                className="text-base sm:text-lg md:text-3xl lg:text-4xl font-light tracking-tight inline-block"
            >
                {word}
            </motion.span>
        </span>
    )
}
