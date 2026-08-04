"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
    MotionValue,
} from "framer-motion";
import Image from "next/image";

// ─── NAMED CONSTANT FOR PIN SCROLL LENGTH ────────────────────────────────────
export const PIN_SCROLL_LENGTH_DESKTOP = "120vh";
export const PIN_SCROLL_LENGTH_MOBILE = "100vh";

const values = [
    { num: "01", word: "COMMUNITY" },
    { num: "02", word: "TRUST" },
    { num: "03", word: "RESPECT" },
    { num: "04", word: "LOYALTY" },
];

function ClothingAccentsBackground({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    // Parallax scroll transforms for background clothing accents
    const yTape = useTransform(scrollProgress, [0, 1], [-100, 100]);
    const yBadgeLeft = useTransform(scrollProgress, [0, 1], [-60, 80]);
    const yBadgeRight = useTransform(scrollProgress, [0, 1], [80, -60]);
    const rotateStitch = useTransform(scrollProgress, [0, 1], [-8, 12]);
    const opacityStitch = useTransform(scrollProgress, [0, 0.5, 1], [0.25, 0.5, 0.25]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* 1. Left Side: Animated Tailor's Measuring Tape Strip */}
            <motion.div
                style={{ y: yTape }}
                className="absolute left-4 sm:left-12 top-6 bottom-6 w-8 sm:w-10 border-r border-[#1EA86E]/40 flex flex-col justify-between py-8 opacity-40"
            >
                {[...Array(14)].map((_, i) => (
                    <div key={i} className="flex items-center gap-1.5 font-mono text-[9px] text-[#1EA86E]">
                        <span className="w-3 h-px bg-[#1EA86E]/70" />
                        <span className="tabular-nums font-bold">0{i + 1}</span>
                    </div>
                ))}
            </motion.div>

            {/* 2. Right Side: Floating Garment Spec Tag 1 */}
            <motion.div
                style={{ y: yBadgeRight, rotate: rotateStitch }}
                className="absolute right-6 sm:right-16 top-1/4 bg-black/60 backdrop-blur-md border border-[#1EA86E]/40 px-3.5 py-2 rounded-sm text-left shadow-lg opacity-85 hidden xs:block"
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1EA86E] animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#1EA86E] uppercase">
                        FABRIC SPEC
                    </span>
                </div>
                <div className="font-mono text-[10px] text-white/90 font-medium tracking-wider">
                    320 GSM HEAVY COTTON
                </div>
                <div className="font-mono text-[8px] text-white/50 tracking-widest mt-0.5">
                    THREAD: EMERALD 40/2
                </div>
            </motion.div>

            {/* 3. Left Side: Floating Garment Spec Tag 2 */}
            <motion.div
                style={{ y: yBadgeLeft }}
                className="absolute left-8 sm:left-24 bottom-1/4 bg-black/60 backdrop-blur-md border border-[#1EA86E]/40 px-3 py-2 rounded-sm text-left shadow-lg opacity-80 hidden sm:block"
            >
                <div className="font-mono text-[9px] font-bold text-[#1EA86E] tracking-widest uppercase">
                    STITCH COUNT: 14/INCH
                </div>
                <div className="font-mono text-[8px] text-white/60 tracking-wider mt-0.5">
                    ATELIER NO: #1327-A
                </div>
            </motion.div>

            {/* 4. Animated Embroidery Stitch Line Guide (SVG) */}
            <motion.svg
                style={{ opacity: opacityStitch }}
                className="absolute inset-0 w-full h-full stroke-white/30 fill-none"
            >
                <line
                    x1="10%"
                    y1="0"
                    x2="90%"
                    y2="100%"
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                />
                <line
                    x1="90%"
                    y1="0"
                    x2="10%"
                    y2="100%"
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                />
            </motion.svg>

            {/* 5. Giant Monogram 1327 Apparel Stamp Watermark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none">
                <span className="font-heading font-black text-[18vw] text-white leading-none tracking-tight">
                    1327
                </span>
            </div>
        </div>
    );
}

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

    // Directly bind scroll progress to viewport scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sp = scrollYProgress;

    // ─── DIRECT GPU TRANSFORM MAPPINGS ───────────────────────────────────────
    const maxYRot = isMobile ? 8 : 14;

    const scale      = useTransform(sp, [0.00, 1.00], [1.00, 1.00]);
    const translateY = useTransform(sp, [0.00, 1.00], [0, 0]);
    const opacity    = useTransform(sp, [0.00, 1.00], [1, 1]);
    const rotateX    = useTransform(sp, [0.00, 0.25, 0.50, 0.75, 1.00], [0, 4, 0, -4, 0]);
    const rotateY    = useTransform(sp, [0.00, 0.60, 1.00], [0, 180, 180]);
    const cordRotate = useTransform(sp, [0.00, 0.30, 0.60], [0, -2, 0]);

    // Fast, zero-re-render opacity toggles for front/back faces
    const frontOpacity = useTransform(sp, [0.28, 0.32], [1, 0]);
    const backOpacity  = useTransform(sp, [0.30, 0.34], [0, 1]);

    // Sheen light
    const lightAngle   = useTransform(sp, [0.00, 0.50, 1.00], [110, 145, 175]);
    const lightOpacity = useTransform(sp, [0.00, 0.30, 0.70, 1.00], [0.15, 0.20, 0.12, 0.08]);

    // Shadow
    const shadowOpacity = useTransform(sp, [0.00, 1.00], [0.35, 0.35]);

    // Motion-based caption swap
    const caption1Opacity = useTransform(sp, [0.28, 0.32], [1, 0]);
    const caption2Opacity = useTransform(sp, [0.30, 1.00], [0, 1]);

    if (prefersReducedMotion) {
        return (
            <section className="py-20 text-[#eae6df] bg-[#105233] flex flex-col items-center justify-center px-6">
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
            className="relative w-full text-white bg-[#105233]"
            style={{
                height: isMobile ? PIN_SCROLL_LENGTH_MOBILE : PIN_SCROLL_LENGTH_DESKTOP,
            }}
        >
            {/* Accessible DOM copy */}
            <div className="sr-only">
                <h3>THE CODE</h3>
                <ul>{values.map(v => <li key={v.num}>{v.num} {v.word}</li>)}</ul>
                <p>MADE IN MALAD WEST — 19.1871° N / 72.8488° E</p>
            </div>

            {/* Sticky Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center select-none bg-[#105233]">
                {/* Brand Green Background with Luxury Apparel Woven Fabric Texture */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#105233]">
                    <div
                        className="absolute inset-0 opacity-[0.25] mix-blend-multiply bg-repeat"
                        style={{
                            backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                            backgroundSize: "450px 450px",
                        }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(30,168,110,0.15) 0%, rgba(12,60,37,0.6) 100%)",
                        }}
                    />
                </div>

                {/* Clothing-Themed Animated Scrollable Accents */}
                <ClothingAccentsBackground scrollProgress={sp} />

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
                                        MADE IN MALAD WEST
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
