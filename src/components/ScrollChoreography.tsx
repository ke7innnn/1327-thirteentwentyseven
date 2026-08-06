"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollChoreography({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Smooth spring physics for 60FPS fluid momentum
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 24,
        restDelta: 0.001,
    });

    // Coordinates & Rotations across Sections 1 to 3
    // 0.00 - 0.25: Section 1 (Hero) — Top Right to Mid Right
    // 0.25 - 0.65: Section 2 (Brand Tag & Manifesto) — Sweeps Across Left & Loops Center
    // 0.65 - 1.00: Section 3 (The Code) — Weaves down Left Image Grid into Founder Creed
    const needleX = useTransform(
        smoothProgress,
        [0, 0.2, 0.42, 0.65, 0.85, 0.98],
        ["82%", "76%", "16%", "50%", "28%", "48%"]
    );

    const needleY = useTransform(
        smoothProgress,
        [0, 0.2, 0.42, 0.65, 0.85, 0.98],
        ["6%", "24%", "46%", "65%", "84%", "97%"]
    );

    const needleRotate = useTransform(
        smoothProgress,
        [0, 0.2, 0.42, 0.65, 0.85, 0.98],
        [20, 55, 135, 40, 120, 90]
    );

    const needleScale = useTransform(
        smoothProgress,
        [0, 0.15, 0.5, 0.85, 0.98],
        [0.85, 1.15, 1.3, 1.1, 0.8]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 0.04, 0.94, 0.99],
        [0, 1, 1, 0]
    );

    if (reduced) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden select-none">
            {/* Trailing Emerald & Gold Stitched SVG Thread Path */}
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                {/* Outer Emerald Glow Thread */}
                <motion.path
                    d="M 82% 6% C 72% 18%, 78% 34%, 16% 46% C 8% 54%, 42% 60%, 50% 65% C 58% 70%, 22% 78%, 28% 84% C 34% 88%, 46% 94%, 48% 97%"
                    fill="none"
                    stroke="#4FB47E"
                    strokeWidth="3.5"
                    strokeDasharray="9 6"
                    strokeLinecap="round"
                    style={{
                        pathLength: smoothProgress,
                        opacity: 0.65,
                    }}
                />
                {/* Inner Gold Core Thread */}
                <motion.path
                    d="M 82% 6% C 72% 18%, 78% 34%, 16% 46% C 8% 54%, 42% 60%, 50% 65% C 58% 70%, 22% 78%, 28% 84% C 34% 88%, 46% 94%, 48% 97%"
                    fill="none"
                    stroke="#E6B87D"
                    strokeWidth="1.75"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    style={{
                        pathLength: smoothProgress,
                        opacity: 0.9,
                    }}
                />
            </svg>

            {/* Traveling Atelier Needle Object */}
            <motion.div
                style={{
                    left: needleX,
                    top: needleY,
                    rotate: needleRotate,
                    scale: needleScale,
                    opacity,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-[0_0_18px_rgba(79,180,126,0.7)]"
            >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        {/* Drop Shadow */}
                        <path
                            d="M 50 5 L 53 40 L 52 92 L 50 97 L 48 92 L 47 40 Z"
                            fill="rgba(0,0,0,0.35)"
                            transform="translate(3, 3)"
                        />
                        {/* Metallic Needle Shaft */}
                        <path
                            d="M 50 5 L 53 40 L 52 92 L 50 97 L 48 92 L 47 40 Z"
                            fill="url(#needleMetallicGrad)"
                            stroke="#C89B68"
                            strokeWidth="0.8"
                        />
                        {/* Eyelet Hole */}
                        <ellipse cx="50" cy="18" rx="1.8" ry="6" fill="#0D1712" stroke="#E6B87D" strokeWidth="0.8" />
                        {/* Thread Loop in Eyelet */}
                        <path
                            d="M 28 18 Q 44 15 50 18 T 72 22"
                            stroke="#4FB47E"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Metallic Gradient Definition */}
                        <defs>
                            <linearGradient id="needleMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="35%" stopColor="#F7F5F0" />
                                <stop offset="65%" stopColor="#E6B87D" />
                                <stop offset="100%" stopColor="#4FB47E" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Beacon Pulse Accent */}
                    <div className="absolute top-2 w-3.5 h-3.5 rounded-full bg-[#4FB47E]/50 animate-ping pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
}
