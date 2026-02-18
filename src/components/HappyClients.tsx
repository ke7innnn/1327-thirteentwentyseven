"use client";

import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASING, DURATION, viewportConfig, hoverLift } from "@/lib/motion";
import ScrollReveal from "./ScrollReveal";
import BrandCarousel from "./BrandCarousel";

const clients = [
    "/clients/client-1.png",
    "/clients/client-2.png",
    "/clients/client-3.jpeg",
    "/clients/client-4.jpeg",
    "/clients/client-5.jpeg",
    "/clients/client-6.jpeg",
    "/clients/client-7.jpeg",
];

export default function HappyClients() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to skew
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

    // Scroll Progress for Title Animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // "Trusted By" Scale & Parallax Animation
    // Starts VERY large (15x) and far offset (-300px), settles to normal (1x, 0px)
    // Parallax feel created by the large movement range mapped to scroll
    const scaleTitle = useTransform(scrollYProgress, [0, 0.25], [15, 1]);
    const yTitle = useTransform(scrollYProgress, [0, 0.25], [-300, 0]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    // Marquee Entrance Animation: "Crazy" Modern 3D Effect
    // Marquee comes from deep in Z-space, tilted back, and flies up
    const yMarquee = useTransform(scrollYProgress, [0, 0.4], [600, 0]);
    const rotateXMarquee = useTransform(scrollYProgress, [0, 0.4], [45, 0]);
    const scaleMarquee = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
    const opacityMarquee = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section id="clients" ref={containerRef} className="relative z-30 py-32 bg-[#105233] text-white overflow-hidden border-b border-white/10 perspective-[1000px]">
            {/* Top Gradient for Smooth Transition from Services (Black -> Transparent) - REMOVED */}
            {/* <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" /> */}

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div style={{ scale: scaleTitle, y: yTitle, opacity: opacityTitle }}>
                    <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#fdfbcf] mb-4 font-heading">
                        Trusted By
                    </h2>
                </motion.div>
                <ScrollReveal>
                    <h3 className="text-4xl md:text-6xl font-thin tracking-tighter text-white font-heading">
                        OUR HAPPY CLIENTS
                    </h3>
                </ScrollReveal>

                {/* Brand Logo Carousel */}
                <div className="mt-12 mb-8">
                    <BrandCarousel />
                </div>
            </div>

            {/* Skewing Marquee Container with Entrance Animation */}
            <motion.div
                style={{
                    skewX: skewVelocity,
                    y: yMarquee,
                    rotateX: rotateXMarquee,
                    scale: scaleMarquee,
                    opacity: opacityMarquee,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full overflow-hidden flex py-8"
            >
                <motion.div
                    className="flex gap-8 items-center"
                    initial={{ x: 0 }}
                    animate={{ x: "-33.333333%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* Triplicate list for seamless loop */}
                    {[...clients, ...clients, ...clients].map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative w-[300px] h-[400px] flex-shrink-0 transition-all duration-500 rounded-sm overflow-hidden group border-[5px] border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            whileHover={{
                                y: -4,
                                scale: 1.02,
                                zIndex: 10,
                                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)"
                            }}
                            transition={{ duration: 0.3, ease: EASING }}
                        >
                            <Image
                                src={src}
                                alt="Client"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-[#061E13]/20 group-hover:bg-transparent transition-colors" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            {/* Top Gradient for Smooth Transition from Services (Black -> Transparent) - REMOVED */}
            {/* <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" /> */}
        </section>
    );
}
