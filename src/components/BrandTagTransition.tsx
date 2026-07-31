"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import Image from "next/image";

// ─── NAMED CONSTANT FOR PIN SCROLL LENGTH ────────────────────────────────────
export const PIN_SCROLL_LENGTH_DESKTOP = "200vh";
export const PIN_SCROLL_LENGTH_MOBILE = "150vh";

const values = [
    { num: "01", word: "COMMUNITY" },
    { num: "02", word: "TRUST" },
    { num: "03", word: "RESPECT" },
    { num: "04", word: "LOYALTY" },
];

export default function BrandTagTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Directly bind scroll progress to viewport scroll (GPU accelerated compositor execution)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sp = scrollYProgress;

    // ─── DIRECT GPU TRANSFORM MAPPINGS ───────────────────────────────────────
    const maxYRot = isMobile ? 8 : 14;

    const scale      = useTransform(sp, [0.00, 0.15, 0.70, 1.00], [0.65, 1.00, 1.00, 0.90]);
    const translateY = useTransform(sp, [0.00, 0.15, 0.70, 1.00], [50, 0, 0, -25]);
    const opacity    = useTransform(sp, [0.00, 0.10, 0.90, 1.00], [0, 1, 1, 0]);
    const rotateX    = useTransform(sp, [0.00, 0.15, 0.45, 0.70, 1.00], [-20, 0, 4, -4, 0]);
    const rotateY    = useTransform(sp, [0.00, 0.15, 0.45, 0.70, 1.00], [0, -maxYRot, maxYRot, 180, 180]);
    const cordRotate = useTransform(sp, [0.15, 0.45, 0.70], [-2, 2, 0]);

    // Fast, zero-re-render opacity toggles for front/back faces
    const frontOpacity = useTransform(sp, [0.44, 0.48], [1, 0]);
    const backOpacity  = useTransform(sp, [0.46, 0.50], [0, 1]);

    // Sheen light
    const lightAngle   = useTransform(sp, [0.00, 0.50, 1.00], [110, 145, 175]);
    const lightOpacity = useTransform(sp, [0.00, 0.30, 0.70, 1.00], [0.08, 0.20, 0.12, 0.04]);

    // Shadow
    const shadowOpacity = useTransform(sp, [0.75, 0.85, 0.95, 1.00], [0, 0.35, 0.35, 0]);

    // Motion-based caption swap (No React state re-renders!)
    const caption1Opacity = useTransform(sp, [0.44, 0.48], [1, 0]);
    const caption2Opacity = useTransform(sp, [0.46, 0.50], [0, 1]);

    if (prefersReducedMotion) {
        return (
            <section className="py-20 text-[#eae6df] bg-black flex flex-col items-center justify-center px-6">
                <div className="w-[260px] sm:w-[340px] bg-[#eae6df] text-[#105233] rounded-lg p-6 flex flex-col items-center border border-[#ccc8be] shadow-xl">
                    <Image
                        src="/logo/1327_logo_v2.png"
                        alt="1327 Logo"
                        width={64}
                        height={64}
                        className="w-auto h-12 object-contain"
                        unoptimized
                        priority
                    />
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#105233] uppercase mt-4">
                        THIRTEEN TWENTYSEVEN
                    </span>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            aria-label="1327 Brand Tag"
            className="relative w-full text-white bg-black"
            style={{
                height: isMobile ? PIN_SCROLL_LENGTH_MOBILE : PIN_SCROLL_LENGTH_DESKTOP,
            }}
        >
            {/* Accessible DOM copy */}
            <div className="sr-only">
                <h3>DESIGNED FOR THE BOLD</h3>
                <ul>{values.map(v => <li key={v.num}>{v.num} {v.word}</li>)}</ul>
                <p>MADE IN MALAD WEST — 19.1871° N / 72.8488° E</p>
            </div>

            {/* Sticky Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center select-none bg-black">
                {/* Gemini Craftsmanship Background */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <Image
                        src="/bg/craftsmanship_bg.png"
                        alt="Craftsmanship Atelier Workshop"
                        fill
                        className="object-cover object-center brightness-70"
                        unoptimized
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
                </div>

                {/* Perspective Stage */}
                <div
                    className="relative z-10 flex items-center justify-center w-full h-full"
                    style={{ perspective: 1200 }}
                >
                    {/* Floating 3D Card Assembly */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            scale, translateY, opacity, rotateX, rotateY,
                            transformStyle: "preserve-3d",
                            willChange: "transform",
                        }}
                        className="relative w-[260px] sm:w-[330px] aspect-[2/3]"
                    >
                        {/* Cord */}
                        <motion.div
                            style={{ rotate: cordRotate }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                        >
                            <div className="w-0.5 h-16 bg-[#2a352a] rounded-full" />
                        </motion.div>

                        {/* Physical edge layers */}
                        <div className="absolute inset-0 bg-[#d0cbc0] rounded-lg pointer-events-none" style={{ transform: "translateZ(-1.5px)" }} />
                        <div className="absolute inset-0 bg-[#dcd7cb] rounded-lg pointer-events-none" style={{ transform: "translateZ(1.5px)" }} />

                        {/* Sheen overlay */}
                        <motion.div
                            className="absolute inset-0 rounded-lg z-20 pointer-events-none"
                            style={{
                                opacity: lightOpacity,
                                background: `linear-gradient(${lightAngle}deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 55%)`,
                                transform: "translateZ(3px)",
                            }}
                        />

                        {/* ─── FRONT FACE (1327 BRAND LOGO) ────────────────────────────── */}
                        <motion.div
                            className="absolute inset-0 w-full h-full bg-[#eae6df] text-[#105233] rounded-lg p-6 sm:p-10 flex flex-col justify-between items-center border border-[#ccc8be]"
                            style={{
                                opacity: frontOpacity,
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transformStyle: "preserve-3d",
                                transform: "rotateY(0deg) translateZ(2px)",
                            }}
                        >
                            {/* Metal Eyelet Hole */}
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#105233]/40 bg-[#105233]/10 flex items-center justify-center mt-1">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#105233]" />
                            </div>

                            {/* Centered Brand Mark */}
                            <div className="flex flex-col items-center gap-5 sm:gap-6 my-auto text-center">
                                <Image
                                    src="/logo/1327_logo_v2.png"
                                    alt="1327 Logo"
                                    width={72}
                                    height={72}
                                    className="w-auto h-14 sm:h-18 object-contain"
                                    unoptimized
                                    priority
                                />
                                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#105233] uppercase">
                                    THIRTEEN TWENTYSEVEN
                                </span>
                            </div>

                            {/* Bottom detail mark */}
                            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#105233]/40">
                                EST. BOMBAY
                            </span>
                        </motion.div>

                        {/* ─── BACK FACE (UPGRADED HIGH-END TYPOGRAPHY SPEC) ───────────── */}
                        <motion.div
                            className="absolute inset-0 w-full h-full bg-[#eae6df] text-[#105233] rounded-lg border border-[#ccc8be] flex flex-col items-center justify-between overflow-hidden"
                            style={{
                                opacity: backOpacity,
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transformStyle: "preserve-3d",
                                transform: "rotateY(180deg) translateZ(2px)",
                            }}
                        >
                            {/* Top: Eyelet & 1327 Brand Logo Mark */}
                            <div className="flex flex-col items-center pt-4 sm:pt-5 pb-1 gap-2">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#105233]/35 bg-[#105233]/08 flex items-center justify-center">
                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#105233]/80" />
                                </div>
                                <Image
                                    src="/logo/1327_logo_v2.png"
                                    alt="1327 Logo"
                                    width={52}
                                    height={52}
                                    className="w-auto h-8 sm:h-9 object-contain"
                                    unoptimized
                                    priority
                                />
                            </div>

                            {/* Decorative top rule */}
                            <div className="w-[82%] h-px bg-[#105233]/15" />

                            {/* SPEC BLOCK */}
                            <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-8 py-2 w-full gap-3 sm:gap-4">
                                {/* Headline */}
                                <div className="text-center">
                                    <p className="font-heading font-black text-[#105233] uppercase leading-none tracking-tight text-lg sm:text-xl">
                                        DESIGNED
                                    </p>
                                    <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-[#105233]/55 uppercase mt-0.5">
                                        FOR THE BOLD
                                    </p>
                                </div>

                                {/* Divider with dot */}
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex-1 h-px bg-[#105233]/20" />
                                    <div className="w-1 h-1 rounded-full bg-[#105233]/30" />
                                    <div className="flex-1 h-px bg-[#105233]/20" />
                                </div>

                                {/* Values */}
                                <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                                    {values.map(({ num, word }) => (
                                        <div key={num} className="flex items-baseline justify-between w-full">
                                            <span className="font-mono text-[9px] sm:text-[10px] text-[#105233]/40 tracking-[0.15em] tabular-nums">
                                                {num}
                                            </span>
                                            <span className="font-heading font-black text-[#105233] uppercase tracking-tight text-sm sm:text-base leading-none">
                                                {word}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider with dot */}
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex-1 h-px bg-[#105233]/20" />
                                    <div className="w-1 h-1 rounded-full bg-[#105233]/30" />
                                    <div className="flex-1 h-px bg-[#105233]/20" />
                                </div>

                                {/* Location */}
                                <div className="text-center">
                                    <p className="font-heading font-bold text-[#105233] uppercase tracking-wide text-xs sm:text-sm leading-tight">
                                        MALAD WEST
                                    </p>
                                    <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#105233]/50 mt-0.5 uppercase">
                                        MADE IN BOMBAY
                                    </p>
                                    <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] text-[#105233]/35 mt-0.5">
                                        19.1871° N &nbsp;/&nbsp; 72.8488° E
                                    </p>
                                </div>
                            </div>

                            {/* Bottom stamp with 1327 Brand Logo */}
                            <div className="w-[82%] h-px bg-[#105233]/15" />
                            <div className="py-2.5 sm:py-3 flex flex-col items-center gap-1">
                                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.28em] text-[#105233]/70 uppercase text-center">
                                    1327 &nbsp;·&nbsp; AUTHENTIC
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact shadow at end */}
                    <motion.div
                        style={{ opacity: shadowOpacity }}
                        className="absolute bottom-16 sm:bottom-24 w-40 sm:w-56 h-5 rounded-[100%] bg-black/70 blur-xl pointer-events-none"
                    />
                </div>

                {/* Bottom caption with zero-re-render Framer Motion opacity swap */}
                <div className="absolute bottom-6 sm:bottom-10 inset-x-0 flex justify-center pointer-events-none z-20">
                    <motion.span
                        style={{ opacity: caption1Opacity }}
                        className="absolute font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#eae6df]/40 uppercase"
                    >
                        EVERY PIECE CARRIES A TAG
                    </motion.span>
                    <motion.span
                        style={{ opacity: caption2Opacity }}
                        className="absolute font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#eae6df]/40 uppercase"
                    >
                        EVERY TAG CARRIES A CODE
                    </motion.span>
                </div>
            </div>
        </section>
    );
}
