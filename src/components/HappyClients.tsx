"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASING } from "@/lib/motion";
import ScrollReveal from "./ScrollReveal";
import BrandCarousel from "./BrandCarousel";

const clients = [
    { src: "/clients/client-1.png", alt: "Happy client wearing custom 1327 branded t-shirt" },
    { src: "/clients/client-2.png", alt: "Business team in custom uniforms by 1327 Mumbai" },
    { src: "/clients/client-3.jpeg", alt: "Restaurant staff in custom 1327 embroidered aprons" },
    { src: "/clients/client-4.jpeg", alt: "Client showcasing custom polo t-shirts by 1327" },
    { src: "/clients/client-5.jpeg", alt: "Corporate team wearing custom 1327 uniforms Mumbai" },
    { src: "/clients/client-6.jpeg", alt: "Custom branded caps by 1327 Thirteen Twenty Seven" },
    { src: "/clients/client-7.jpeg", alt: "Happy customer with custom apparel from 1327 Malad" },
];

export default function HappyClients() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Simple title entrance
    const yTitle = useTransform(scrollYProgress, [0, 0.25], [80, 0]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    // Simple marquee entrance (no 3D, no velocity skew)
    const yMarquee = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
    const opacityMarquee = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section id="clients" ref={containerRef} aria-label="Happy Clients of 1327" className="relative z-30 py-32 bg-[#105233] text-white overflow-hidden border-b border-white/10">
            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div style={{ y: yTitle, opacity: opacityTitle }}>
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

            {/* Marquee — CSS animation, no velocity skew, no 3D */}
            <motion.div
                style={{
                    y: yMarquee,
                    opacity: opacityMarquee,
                }}
                className="relative w-full overflow-hidden flex py-8"
            >
                <div
                    className="flex gap-8 items-center animate-infinite-scroll"
                    style={{ width: "max-content" }}
                >
                    {/* Triplicate for seamless loop */}
                    {[...clients, ...clients, ...clients].map((client, index) => (
                        <div
                            key={index}
                            className="relative w-[300px] h-[400px] flex-shrink-0 rounded-sm overflow-hidden group border-[5px] border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.02]"
                        >
                            <Image
                                src={client.src}
                                alt={client.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#061E13]/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
