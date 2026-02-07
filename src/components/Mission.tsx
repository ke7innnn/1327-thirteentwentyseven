"use client";

import { motion, useTransform } from "framer-motion";
import MissionCanvas from "./MissionCanvas";
import { EASING, DURATION, STAGGER, viewportConfig } from "@/lib/motion";

export default function Mission() {
    return (
        <section id="mission" className="relative z-10 bg-transparent text-white border-b-2 border-white/20 p-0">
            {/* Increased scrollDuration to 300vh for a longer scroll experience */}
            <MissionCanvas numFrames={164} scrollDuration={300}>
                {(progress: any) => <Content scrollProgress={progress} />}
            </MissionCanvas>
        </section>
    );
}

function Content({ scrollProgress }: { scrollProgress: any }) {
    const missionText = "We’re dedicated to crafting high-quality custom t-shirts and uniforms for businesses, while building a community that values our relationships and partnerships. We’re here not just to make apparel, but to create connections and stories that last.";

    // Title Animation: Fade in and slide up at the very beginning
    const yTitle = useTransform(scrollProgress, [0, 0.1], [50, 0]);
    const opacityTitle = useTransform(scrollProgress, [0, 0.1], [0, 1]);

    return (
        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
            {/* Left aligned container occupying partial width (45%) */}
            {/* Added pt-40 to clear header and max-w-xl to ensure text wraps nicely within view */}
            <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center h-full pt-24 pb-20">
                <motion.h2
                    style={{ y: yTitle, opacity: opacityTitle, fontFamily: "var(--font-anton)" }}
                    className="text-6xl md:text-8xl font-bold uppercase text-[#fdfbcf] mb-12 font-heading tracking-[0.1em] text-left"
                >
                    Our Mission
                </motion.h2>

                <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 leading-relaxed perspective-[1000px] text-left">
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

            {/* Right side is empty for video visibility */}
        </div>
    )
}

function Word({ word, index, scrollProgress, totalWords }: { word: string, index: number, scrollProgress: any, totalWords: number }) {
    // Reveal text word by word from progress 0.15 to 1.0
    // This ensures the paragraph completes exactly when the video/scroll completes

    const revealStart = 0.15;
    const revealEnd = 1.0;
    const totalDuration = revealEnd - revealStart;

    // Calculate start time for this specific word
    const wordStart = revealStart + (index / totalWords) * totalDuration;
    // Word fades in over a short duration (e.g., 2% of scroll) for a snappy effect
    const wordEnd = wordStart + 0.02;

    // Clamp values to ensure they are valid ranges
    const safeStart = Math.min(wordStart, 0.98);
    const safeEnd = Math.min(wordEnd, 1.0);

    const opacity = useTransform(scrollProgress, [safeStart, safeEnd], [0, 1]);
    const y = useTransform(scrollProgress, [safeStart, safeEnd], [10, 0]);
    const color = useTransform(scrollProgress, [safeStart, safeEnd], ["#4a635d", "#E3FCEC"]); // Darker to Light transition

    return (
        <span className="relative inline-block">
            <motion.span
                style={{ opacity, y, color, fontFamily: '"Times New Roman", serif' }}
                className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight inline-block"
            >
                {word}
            </motion.span>
        </span>
    )
}
