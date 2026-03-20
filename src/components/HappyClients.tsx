"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

// Duplicate for seamless CSS loop
const marqueeClients = [...clients, ...clients];

export default function HappyClients() {
    return (
        <section id="clients" aria-label="Happy Clients of 1327" className="relative z-30 py-32 bg-[#105233] text-white overflow-hidden border-b border-white/10">
            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                {/* One-shot entrance — no continuous scroll tracking */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#fdfbcf] mb-4 font-heading">
                        Trusted By
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <h3 className="text-4xl md:text-6xl font-thin tracking-tighter text-white font-heading">
                        OUR HAPPY CLIENTS
                    </h3>
                </motion.div>

                {/* Brand Logo Carousel */}
                <div className="mt-12 mb-8">
                    <BrandCarousel />
                </div>
            </div>

            {/* Marquee — pure CSS animation, zero JS scroll tracking */}
            <div className="relative w-full overflow-hidden flex py-8">
                <div
                    className="flex gap-4 md:gap-8 items-center animate-infinite-scroll will-change-transform"
                    style={{ width: "max-content" }}
                >
                    {marqueeClients.map((client, index) => (
                        <div
                            key={index}
                            className="relative w-[220px] h-[300px] md:w-[300px] md:h-[400px] flex-shrink-0 rounded-sm overflow-hidden border-[3px] md:border-[5px] border-white/90 shadow-lg md:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            <Image
                                src={client.src}
                                alt={client.alt}
                                fill
                                sizes="(max-width: 768px) 220px, 300px"
                                className="object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#061E13]/20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
