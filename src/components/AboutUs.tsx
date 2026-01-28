"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASING, DURATION, STAGGER, viewportConfig, staggerContainer, staggerItem, hoverLift, hoverScale } from "@/lib/motion";

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]); // Slight rotation based on scroll
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -5]);

    const images = [
        "/aboutus/about-1.png",
        "/aboutus/about-2.png",
        "/aboutus/about-3.png",
        "/aboutus/about-4.png",
    ];

    // Converging Title Animation
    // ABOUT comes from Left, US comes from Right
    // Both unblur and fade in
    const xLeft = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
    const xRight = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
    const blurValue = useTransform(scrollYProgress, [0, 0.3], [10, 0]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Exit Animation: "Lingering Parallax"
    // Content moves DOWN (positive Y) as user scrolls out (0.8 -> 1)
    // This makes it appear to move slower than the scroll, staying "behind" the incoming Services section
    const yExit = useTransform(scrollYProgress, [0.7, 1], [0, 300]);
    const scaleExit = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);
    const opacityExit = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
    const blurExit = useTransform(scrollYProgress, [0.7, 1], [0, 20]);
    const filterTemplateExit = useTransform(blurExit, (v) => `blur(${v}px)`);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative z-10 py-32 bg-transparent text-white overflow-hidden perspective-[2000px]"
        >
            <motion.div
                style={{ y: yExit, scale: scaleExit, opacity: opacityExit, filter: filterTemplateExit }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">

                    {/* Text Column (Left) */}
                    <div className="w-full md:w-1/2 sticky top-40 self-start z-20">
                        <h2 className="text-7xl md:text-9xl font-thin tracking-tighter mb-4 leading-[0.85] font-heading origin-left flex flex-col">
                            <motion.span
                                style={{ x: xLeft, filter: `blur(${blur}px)`, opacity: opacityTitle }}
                                className="block"
                            >
                                ABOUT
                            </motion.span>
                            <motion.span
                                style={{ x: xRight, filter: `blur(${blur}px)`, opacity: opacityTitle }}
                                className="block text-[#fdfbcf] font-heading"
                            >
                                US
                            </motion.span>
                        </h2>

                        <motion.div
                            className="flex flex-col gap-6"
                        >
                            <ScrollRevealParagraph>
                                If you grew up watching <span className="text-white font-medium" style={{ fontFamily: "var(--font-carltine)" }}>Fast and Furious</span>,
                                then you know that it's more than just a
                                number—it's a symbol of community, trust,
                                respect, and love amongst friends who
                                became family. That's exactly what our
                                brand stands for.
                            </ScrollRevealParagraph>
                            <ScrollRevealParagraph delay={0.1}>
                                At <span className="text-[#fdfbcf]"><span className="font-heading">1327</span></span>, we embody these
                                values, prioritising the people who make
                                our brand—you.
                            </ScrollRevealParagraph>
                        </motion.div>
                    </div>

                    {/* Image Grid Column (Right) */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-8 relative perspective-[1000px]">
                        {/* Column 1 */}
                        <motion.div style={{ y: y1, rotate: rotate1 }} className="flex flex-col gap-8">
                            {images.filter((_, i) => i % 2 === 0).map((src, index) => (
                                <ParallaxImage key={`col1-${index}`} src={src} index={index} />
                            ))}
                        </motion.div>

                        {/* Column 2 */}
                        <motion.div style={{ y: y2, rotate: rotate2 }} className="flex flex-col gap-8 mt-24">
                            {images.filter((_, i) => i % 2 !== 0).map((src, index) => (
                                <ParallaxImage key={`col2-${index}`} src={src} index={index} />
                            ))}
                        </motion.div>
                    </div>

                </div>
            </motion.div>

            {/* Smooth Transition Gradient to Green (Services Section) */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#105233] pointer-events-none z-20" />
        </section>
    );
}

function ParallaxImage({ src, index }: { src: string, index: number }) {
    // Small random rotation for organic feel
    const randomRotation = [0.5, -0.5, 0.8, -0.8][index % 4];

    return (
        <motion.div
            whileHover={{
                y: -4,
                scale: 1.02,
                rotateZ: randomRotation,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
            transition={{ duration: 0.3, ease: EASING }}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border-[5px] border-white/90 group transition-all duration-700 shadow-2xl shadow-black/50"
        >
            <Image
                src={src}
                alt={`About 1327`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#0A1F0A]/20 transition-opacity duration-500 group-hover:opacity-0" />
        </motion.div>
    )
}

function ScrollRevealParagraph({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <motion.p
            ref={ref}
            style={{ y, opacity, fontFamily: "var(--font-carltine)" }}
            className="text-xl md:text-2xl font-light leading-relaxed text-[#E3FCEC]"
        >
            {children}
        </motion.p>
    )
}
