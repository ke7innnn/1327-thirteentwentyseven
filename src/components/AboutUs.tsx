"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function KeithShahSignatureGreen({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 120"
            fill="none"
            stroke="#4FB47E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M25,85 C45,20 55,15 70,70 C80,90 90,85 100,50 C105,35 120,45 130,75 M115,60 C140,55 155,58 170,60 C180,62 190,55 200,50 M215,30 C220,20 225,15 230,80 C235,95 240,60 250,55 C260,50 270,55 280,60 M270,35 C290,30 315,35 340,40 C360,45 375,30 385,25 M275,75 C305,70 335,72 365,75" />
        </svg>
    );
}

const VALUES_DATA = [
    {
        num: "01",
        title: "COMMUNITY",
        slug: "community",
        image: "/clients/client-1.png",
        alt: "Bisou Bisou crew wearing custom 1327 apparel",
    },
    {
        num: "02",
        title: "TRUST",
        slug: "trust",
        image: "/clients/client-2.png",
        alt: "What's The Rush team in custom 1327 uniforms",
    },
    {
        num: "03",
        title: "RESPECT",
        slug: "respect",
        image: "/clients/client-3.jpeg",
        alt: "Masa Bakery staff in custom 1327 embroidered apparel",
    },
    {
        num: "04",
        title: "LOYALTY",
        slug: "loyalty",
        image: "/clients/client-4.jpeg",
        alt: "Croissant Café team in custom 1327 polo t-shirts",
    },
];

function HandDrawnStitchWave({ active, id, width }: { active: boolean; id: string; width: number }) {
    const w = width > 0 ? width * 1.04 : 220; // 104% width
    const waveD = `M0,8 C${w * 0.22},2 ${w * 0.34},13 ${w * 0.52},7 S${w * 0.8},1 ${w},6`;

    return (
        <svg
            className="w-full h-3 overflow-visible pointer-events-none mt-[0.10em]"
            viewBox={`0 0 ${w} 14`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <mask id={`m-${id}`}>
                    <path
                        d={waveD}
                        pathLength="1"
                        stroke="white"
                        strokeWidth="14"
                        fill="none"
                        style={{
                            strokeDasharray: "1",
                            strokeDashoffset: active ? 0 : 1,
                            transition: "stroke-dashoffset 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />
                </mask>
            </defs>
            <path
                d={waveD}
                mask={`url(#m-${id})`}
                stroke="#4FB47E"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="9 6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function InteractiveImageCard({
    item,
    origIndex,
    isActive,
    onActivate,
    isMobile,
    yParallax,
}: {
    item: (typeof VALUES_DATA)[0];
    origIndex: number;
    isActive: boolean;
    onActivate: () => void;
    isMobile: boolean;
    yParallax: any;
}) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        onActivate();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <motion.div style={{ y: yParallax }} className="w-full relative">
            <motion.div
                whileHover={{
                    scale: 1.05,
                    y: -8,
                    rotateZ: origIndex % 2 === 0 ? 1.5 : -1.5,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="w-full h-full"
            >
                <Link
                    ref={cardRef}
                    href={`/values/${item.slug}`}
                    onMouseEnter={handleMouseEnter}
                    onFocus={onActivate}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`relative w-full aspect-[9/10] block rounded-none overflow-hidden border transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB47E] ${
                        isActive
                            ? "z-30 border-[#4FB47E] shadow-[0_12px_32px_rgba(79,180,126,0.3)]"
                            : "z-10 border-[#EDEBE3]/15 hover:border-[#EDEBE3]/40"
                    }`}
                >
                    <motion.div
                        className="w-full h-full relative"
                        animate={{
                            x: isHovered ? mousePos.x * 24 : 0,
                            y: isHovered ? mousePos.y * 24 : 0,
                            scale: isActive || isHovered ? 1.12 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 768px) 48vw, 26vw"
                            quality={85}
                            style={{
                                willChange: "transform, filter",
                            }}
                            className={`object-cover rounded-none transition-all duration-500 ease-out ${
                                isMobile || isActive || isHovered
                                    ? "grayscale-0 brightness-100"
                                    : "grayscale brightness-[0.72]"
                            }`}
                            loading="lazy"
                        />
                    </motion.div>
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default function AboutUs() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion() ?? false;
    const [activeIndex, setActiveIndex] = useState<number>(0); // Default: 01 COMMUNITY active
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [wordWidths, setWordWidths] = useState<Record<string, number>>({});

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 25,
        restDelta: 0.001,
    });

    // Scroll-driven parallax offsets for columns & items
    const yColA = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [50, -50]);
    const yColB = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);

    const yImg0 = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [20, -20]);
    const yImg1 = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [-15, 15]);
    const yImg2 = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [25, -25]);
    const yImg3 = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [-30, 30]);

    const itemParallaxes = [yImg0, yImg1, yImg2, yImg3];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Measure exact word widths after fonts are ready
    useEffect(() => {
        const measureWordWidths = () => {
            const newWidths: Record<string, number> = {};
            VALUES_DATA.forEach((item) => {
                const el = document.getElementById(`word-${item.num}`);
                if (el) {
                    newWidths[item.num] = el.getBoundingClientRect().width;
                }
            });
            setWordWidths(newWidths);
        };

        if (typeof document !== "undefined" && document.fonts) {
            document.fonts.ready.then(measureWordWidths);
        } else {
            measureWordWidths();
        }

        window.addEventListener("resize", measureWordWidths);
        return () => window.removeEventListener("resize", measureWordWidths);
    }, []);

    // Revert to 01 COMMUNITY on section mouse leave
    const handleMouseLeaveSection = () => {
        setActiveIndex(0);
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-label="About 1327 Thirteen Twenty Seven — The Code"
            onMouseLeave={handleMouseLeaveSection}
            className="code-section relative z-10 w-full bg-[#0D1712] text-[#EDEBE3] pt-24 pb-20 md:pt-28 md:pb-24 min-h-screen overflow-hidden select-none rounded-none border-b border-[#EDEBE3]/15"
        >
            {/* Fine Topographic Contour SVG Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply">
                <Image
                    src="/bg/contour_dark_green.svg"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-between relative z-10">

                {/* ─── KICKER & HEADER BAR (CLEAR STICKY NAV) ───────────────────────── */}
                <div className="w-full mb-6 sm:mb-8">
                    <div className="flex justify-between items-center font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#EDEBE3]/45 pb-3 border-b border-[#EDEBE3]/15">
                        <span>&#123; 02 &#125; THE CODE</span>
                        <span className="hidden sm:inline">MALAD WEST, BOMBAY</span>
                    </div>
                </div>

                {/* ─── MAIN 12-COLUMN GRID ───────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

                    {/* Left Column (~38% width = col-span-5): Centred Value List & Monogram Block */}
                    <div className="order-1 md:order-1 md:col-span-5 flex flex-col justify-center items-center text-center h-full gap-8 lg:gap-10">
                        
                        {/* 4 Centred Display Values (Shared Vertical Axis) */}
                        <ol aria-label="Atelier Values" className="value-list flex flex-col items-center text-center w-full">
                            {VALUES_DATA.map((item, idx) => {
                                const isActive = activeIndex === idx;
                                const w = wordWidths[item.num] || 0;
                                return (
                                    <li key={item.num} className="value-item inline-flex flex-col items-center text-center my-0.5">
                                        <Link
                                            href={`/values/${item.slug}`}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                            onFocus={() => setActiveIndex(idx)}
                                            className="group relative inline-flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB47E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1712]"
                                        >
                                            {/* Display Title with tight 0.95 line-height */}
                                            <span
                                                id={`word-${item.num}`}
                                                className={`font-heading font-black uppercase text-center tracking-[-0.02em] leading-[0.95] transition-colors duration-300 ${
                                                    isActive ? "text-[#4FB47E]" : "text-[#EDEBE3]/38 hover:text-[#EDEBE3]/60"
                                                }`}
                                                style={{ fontSize: "clamp(2.75rem, 4.8vw, 7.25rem)" }}
                                            >
                                                {item.title}
                                            </span>

                                            {/* Hand-Drawn Wave Stitch Underline (104% width, 0.10em below baseline) */}
                                            <div className="w-full flex justify-center">
                                                <HandDrawnStitchWave active={isActive} id={item.num} width={w} />
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Bottom-Left Quadrant: Founders Real Signature & Atelier Creed */}
                        <div className="flex flex-col items-center text-center gap-2 pt-4 border-t border-[#EDEBE3]/15 w-full max-w-sm">
                            {/* 1327 Founders Real Signature Image */}
                            <div className="w-52 sm:w-60 h-16 relative my-1">
                                <Image
                                    src="/sign/sign-green.webp"
                                    alt="1327 Founders Signature"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#4FB47E] font-bold">
                                FOUNDERS — 1327 ATELIER
                            </span>

                            {/* Founder Creed Statement */}
                            <p className="font-sans text-xs sm:text-sm font-light text-[#EDEBE3]/75 leading-relaxed max-w-xs pt-1">
                                &ldquo;We didn&apos;t build a merch company — we built a crew that happens to make uniforms.&rdquo;
                            </p>
                        </div>

                    </div>

                    {/* Right Column (~52% width = col-span-7): Uniform 9:10 Image Grid with Client Photos */}
                    <div className="order-2 md:order-2 md:col-span-7 flex flex-col justify-center w-full max-w-[440px] xl:max-w-[480px] mx-auto md:ml-auto md:mr-0">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center">
                            
                            {/* Column A (Left of Image Grid: Images 1 & 3) */}
                            <motion.div style={{ y: yColA }} className="flex flex-col gap-4 sm:gap-6">
                                {[VALUES_DATA[0], VALUES_DATA[2]].map((item) => {
                                    const origIndex = item.num === "01" ? 0 : 2;
                                    const isActive = activeIndex === origIndex;
                                    return (
                                        <InteractiveImageCard
                                            key={item.num}
                                            item={item}
                                            origIndex={origIndex}
                                            isActive={isActive}
                                            onActivate={() => setActiveIndex(origIndex)}
                                            isMobile={isMobile}
                                            yParallax={itemParallaxes[origIndex]}
                                        />
                                    );
                                })}
                            </motion.div>

                            {/* Column B (Right of Image Grid: Images 2 & 4) — Offset UP by 8% */}
                            <motion.div style={{ y: yColB }} className="flex flex-col gap-4 sm:gap-6 -translate-y-0 md:-translate-y-[8%]">
                                {[VALUES_DATA[1], VALUES_DATA[3]].map((item) => {
                                    const origIndex = item.num === "02" ? 1 : 3;
                                    const isActive = activeIndex === origIndex;
                                    return (
                                        <InteractiveImageCard
                                            key={item.num}
                                            item={item}
                                            origIndex={origIndex}
                                            isActive={isActive}
                                            onActivate={() => setActiveIndex(origIndex)}
                                            isMobile={isMobile}
                                            yParallax={itemParallaxes[origIndex]}
                                        />
                                    );
                                })}
                            </motion.div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
