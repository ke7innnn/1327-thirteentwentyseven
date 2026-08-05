"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";
import { feedPosts, FeedPost } from "@/content/feed";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const YOUTUBE_URL = "https://www.youtube.com/@1327-thirteentwentyseven";
const INSTAGRAM_URL = "https://www.instagram.com/1327_thirteentwentyseven/";

// ─── DESKTOP / TABLET FANNED CARD COMPONENT ──────────────────────────────────
function FannedCard({
    post,
    index,
    totalCards,
    scrollYProgress,
    reduced,
    isTablet,
}: {
    post: FeedPost;
    index: number;
    totalCards: number;
    scrollYProgress: any;
    reduced: boolean;
    isTablet: boolean;
}) {
    const centerIndex = Math.floor(totalCards / 2);
    const offset = index - centerIndex;

    const baseZ = 10 - Math.abs(offset);
    const targetX = offset * (isTablet ? 150 : 210);
    const targetY = offset * offset * (isTablet ? 14 : 18);
    const targetRotate = offset * 5;
    const targetScale = 1 - Math.abs(offset) * 0.04;

    const delay = Math.abs(offset) * 0.06;
    const progress = useTransform(scrollYProgress, [delay, 1], [0, 1], { clamp: true });

    const x = useTransform(progress, [0, 1], [0, targetX]);
    const y = useTransform(progress, [0, 1], [0, targetY]);
    const rotate = useTransform(progress, [0, 1], [0, targetRotate]);
    const scale = useTransform(progress, [0, 1], [0.88, targetScale]);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label={post.alt}
            style={{
                x: reduced ? targetX : x,
                y: reduced ? (isHovered ? targetY - 10 : targetY) : y,
                rotate: reduced ? targetRotate : rotate,
                scale: reduced ? (isHovered ? targetScale * 1.03 : targetScale) : scale,
                zIndex: isHovered ? 20 : baseZ,
            }}
            whileHover={
                reduced
                    ? undefined
                    : {
                          y: targetY - 10,
                          scale: targetScale * 1.03,
                          transition: { duration: 0.22, ease: "easeOut" },
                      }
            }
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] xl:w-[280px] aspect-[4/5] bg-[#F2EFE8] border border-[#105233]/15 rounded-none shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#105233] focus-visible:ring-offset-2 overflow-hidden cursor-pointer transform-gpu will-change-transform group"
        >
            <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 1280px) 220px, 280px"
                quality={80}
                className="object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
            />
        </motion.a>
    );
}

// ─── MAIN SOCIAL FEED SECTION ────────────────────────────────────────────────
export default function SocialFeed() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion() ?? false;
    const [windowWidth, setWindowWidth] = useState(1280);
    const [mobileFrame, setMobileFrame] = useState(1);
    const mobileTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isTablet = windowWidth >= 768 && windowWidth < 1280;
    const isDesktop = windowWidth >= 1280;

    // Displayed posts: 5 posts on tablet, 7 posts on desktop
    const activePosts = isTablet ? feedPosts.slice(1, 6) : feedPosts;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"],
    });

    // Mobile scroll snap frame counter
    const handleMobileScroll = useCallback(() => {
        const el = mobileTrackRef.current;
        if (!el) return;
        const cardW = el.firstElementChild?.clientWidth ?? 1;
        const currentIdx = Math.round(el.scrollLeft / cardW);
        setMobileFrame(Math.min(feedPosts.length, Math.max(1, currentIdx + 1)));
    }, []);

    return (
        <section
            ref={sectionRef}
            id="feed"
            aria-labelledby="feed-headline"
            className="relative z-20 bg-[#F2EFE8] text-[#105233] py-20 md:py-28 border-b border-[#105233]/15 overflow-hidden select-none rounded-none"
        >
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10 flex flex-col items-center">
                
                {/* ─── SECTION MARKER & HEADLINE ──────────────────────────────────────── */}
                <div className="w-full flex flex-col items-start gap-4 mb-12 md:mb-16">
                    <motion.div
                        initial={reduced ? false : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <SectionMarker sectionKey="feed" className="!text-[#105233]" />
                    </motion.div>

                    {/* Headline — Two lines: WORN (solid) / EVERY SHIFT (outlined) */}
                    <div className="w-full overflow-hidden">
                        <motion.h2
                            id="feed-headline"
                            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                            viewport={{ once: true, margin: "-5% 0px" }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                            className="font-heading font-black uppercase text-left leading-[0.84] tracking-[-0.02em] text-[#105233]"
                            style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
                        >
                            {/* Desktop / Tablet: Offset line 2 right by ~6% */}
                            <div className="hidden md:flex flex-col items-start w-full">
                                <span>WORN</span>
                                <span
                                    className="text-transparent translate-x-[6%]"
                                    style={{ WebkitTextStroke: "2px #105233" }}
                                >
                                    EVERY SHIFT
                                </span>
                            </div>

                            {/* Mobile (<768px): Stacked left-aligned */}
                            <div className="md:hidden flex flex-col items-start gap-1">
                                <span>WORN</span>
                                <span
                                    className="text-transparent"
                                    style={{ WebkitTextStroke: "1.5px #105233" }}
                                >
                                    EVERY SHIFT
                                </span>
                            </div>
                        </motion.h2>
                    </div>
                </div>

                {/* ─── DESKTOP / TABLET FANNED CARDS CONTAINER ──────────────────────── */}
                <div className="hidden md:block w-full h-[360px] xl:h-[440px] relative my-6">
                    {activePosts.map((post, idx) => (
                        <FannedCard
                            key={post.id}
                            post={post}
                            index={idx}
                            totalCards={activePosts.length}
                            scrollYProgress={scrollYProgress}
                            reduced={reduced}
                            isTablet={isTablet}
                        />
                    ))}
                </div>

                {/* ─── MOBILE SCROLL SNAP RAIL (<768px) ─────────────────────────────── */}
                <div className="md:hidden w-full flex flex-col gap-4 my-4">
                    <div
                        ref={mobileTrackRef}
                        onScroll={handleMobileScroll}
                        className="flex overflow-x-auto gap-3 snap-x snap-mandatory pb-3"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {feedPosts.map((post) => (
                            <a
                                key={post.id}
                                href={post.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={post.alt}
                                className="snap-center shrink-0 w-[68vw] aspect-[4/5] relative bg-[#F2EFE8] border border-[#105233]/15 rounded-none overflow-hidden"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.alt}
                                    fill
                                    sizes="68vw"
                                    quality={80}
                                    className="object-cover rounded-none"
                                />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Frame Counter */}
                    <div className="flex justify-center items-center w-full">
                        <span className="font-mono text-xs font-bold text-[#105233]/70 tracking-widest uppercase">
                            {String(mobileFrame).padStart(2, "0")} / {String(feedPosts.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* ─── SUB-LINES / CTAS BENEATH CARDS ──────────────────────────────────── */}
                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                    className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 text-center sm:text-left z-30"
                >
                    {/* Primary CTA: Instagram Link */}
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group font-heading font-black text-xl sm:text-2xl uppercase tracking-wider text-[#105233] flex items-center gap-2 transition-transform duration-180 ease-out hover:translate-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#105233]"
                    >
                        <span>FOLLOW 1327 ON INSTAGRAM</span>
                        <span className="transition-transform duration-180 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                            ↗
                        </span>
                    </a>

                    {/* Secondary Link: Absorbed Workshop Film Link */}
                    <a
                        href={YOUTUBE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-bold text-[#105233]/65 hover:text-[#105233] uppercase tracking-widest transition-colors duration-180 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#105233]"
                    >
                        WATCH THE WORKSHOP FILM ↗
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
