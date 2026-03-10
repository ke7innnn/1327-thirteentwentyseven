"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASING } from "@/lib/motion";

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -5]);

    const images = [
        { src: "/aboutus/about-1.png", alt: "1327 custom branded t-shirts showcase" },
        { src: "/aboutus/about-2.png", alt: "Custom embroidery work by 1327 Mumbai" },
        { src: "/aboutus/about-3.png", alt: "1327 team crafting uniforms in Malad West" },
        { src: "/aboutus/about-4.png", alt: "Premium custom apparel by 1327 Thirteen Twenty Seven" },
    ];

    // Title: converging from left/right — NO blur
    const xLeft = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
    const xRight = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Exit: simple fade + parallax (no blur, no scale)
    const yExit = useTransform(scrollYProgress, [0.9, 1], [0, 300]);
    const opacityExit = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    return (
        <section
            id="about"
            ref={containerRef}
            aria-label="About 1327 Thirteen Twenty Seven"
            className="relative z-10 py-32 bg-transparent text-white overflow-hidden"
        >
            <motion.div
                style={{ y: yExit, opacity: opacityExit }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col md:flex-row items-start gap-40 md:gap-24 relative">

                    {/* Text Column (Left) */}
                    <div className="w-full md:w-1/2 relative md:sticky md:top-40 self-start z-30">
                        <h2 className="text-7xl md:text-9xl font-thin tracking-tighter mb-4 leading-[0.85] font-heading origin-left flex flex-col">
                            <motion.span
                                style={{ x: xLeft, opacity: opacityTitle }}
                                className="block"
                            >
                                ABOUT
                            </motion.span>
                            <motion.span
                                style={{ x: xRight, opacity: opacityTitle }}
                                className="block text-[#fdfbcf] font-heading"
                            >
                                US
                            </motion.span>
                        </h2>

                        <motion.div
                            className="flex flex-col gap-6"
                        >
                            <ScrollRevealParagraph>
                                If you grew up watching <span className="text-white font-medium" style={{ fontFamily: '"Times New Roman", serif' }}>Fast and Furious</span>,
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
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-8 relative">
                        {/* Column 1 */}
                        <motion.div style={{ y: y1, rotate: rotate1 }} className="flex flex-col gap-8">
                            {images.filter((_, i) => i % 2 === 0).map((img, index) => (
                                <ParallaxImage key={`col1-${index}`} src={img.src} alt={img.alt} index={index} />
                            ))}
                        </motion.div>

                        {/* Column 2 */}
                        <motion.div style={{ y: y2, rotate: rotate2 }} className="flex flex-col gap-8 mt-24">
                            {images.filter((_, i) => i % 2 !== 0).map((img, index) => (
                                <ParallaxImage key={`col2-${index}`} src={img.src} alt={img.alt} index={index} />
                            ))}
                        </motion.div>
                    </div>

                </div>
            </motion.div>

            {/* Smooth Transition Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#105233] pointer-events-none z-20" />
        </section>
    );
}

function ParallaxImage({ src, alt, index }: { src: string, alt: string, index: number }) {
    return (
        <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border-[5px] border-white/90 group transition-transform duration-700 shadow-2xl shadow-black/50 hover:-translate-y-1 hover:scale-[1.02]"
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0A1F0A]/20 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
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
            style={{ y, opacity, fontFamily: '"Times New Roman", serif' }}
            className="text-xl md:text-2xl font-light leading-relaxed text-[#E3FCEC]"
        >
            {children}
        </motion.p>
    )
}
