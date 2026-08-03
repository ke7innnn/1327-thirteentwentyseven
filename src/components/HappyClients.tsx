"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BrandCarousel from "./BrandCarousel";

const clients = [
    { src: "/clients/client-1.png", title: "Bisou Bisou — Bakery & Café", alt: "Happy client wearing custom 1327 branded t-shirt", tag: "Custom Crew Apparel · Embroidery" },
    { src: "/clients/client-2.png", title: "What's The Rush — Custom Rollout", alt: "Business team in custom uniforms by 1327 Mumbai", tag: "Heavyweight Printed Blanks" },
    { src: "/clients/client-3.jpeg", title: "Masa Bakery — Custom Apparel", alt: "Restaurant staff in custom 1327 embroidered aprons", tag: "Heavyweight Oversized T-Shirts" },
    { src: "/clients/client-4.jpeg", title: "Croissant Café — Front-of-House", alt: "Client showcasing custom polo t-shirts by 1327", tag: "Custom Embroidered Caps" },
    { src: "/clients/client-5.jpeg", title: "The Bandstand Pantry — Crew Uniforms", alt: "Corporate team wearing custom 1327 uniforms Mumbai", tag: "Team Hoodies & Sweatshirts" },
    { src: "/clients/client-6.jpeg", title: "Subko Coffee — Store Rollout", alt: "Custom branded caps by 1327 Thirteen Twenty Seven", tag: "Embroidered Staff Uniforms" },
    { src: "/clients/client-7.jpeg", title: "Monstery — Hospitality Merch", alt: "Happy customer with custom apparel from 1327 Malad", tag: "Custom Merchandise & Leatherette" },
];

export default function HappyClients() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const activeClient = selectedIndex !== null ? clients[selectedIndex] : null;

    const handleNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % clients.length);
    }, [selectedIndex]);

    const handlePrev = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex - 1 + clients.length) % clients.length);
    }, [selectedIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    return (
        <section id="clients" aria-label="Happy Clients of 1327" className="relative z-30 py-32 bg-[#105233] text-white overflow-hidden border-b border-white/10">
            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                {/* Entrance title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-[#1EA86E]/40 mb-4 shadow-[0_0_20px_rgba(30,168,110,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9FF23] animate-pulse" />
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C9FF23]">
                            TRUSTED BY CREWS
                        </span>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-heading uppercase">
                        OUR HAPPY CLIENTS
                    </h3>
                </motion.div>

                {/* Brand Logo Carousel */}
                <div className="mt-12 mb-8">
                    <BrandCarousel />
                </div>
            </div>

            {/* Marquee — pure CSS infinite scroll track, cards are clickable */}
            <div className="relative w-full overflow-hidden flex py-8 group">
                <div
                    className="flex gap-4 md:gap-8 items-center animate-infinite-scroll will-change-transform group-hover:[animation-play-state:paused]"
                    style={{ width: "max-content" }}
                >
                    {[...clients, ...clients].map((client, index) => {
                        const originalIdx = index % clients.length;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedIndex(originalIdx)}
                                className="relative w-[220px] h-[300px] md:w-[300px] md:h-[400px] flex-shrink-0 rounded-sm overflow-hidden border-[3px] md:border-[5px] border-white/90 shadow-lg md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-[1.03] transition-transform duration-300 group/card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9FF23]"
                                aria-label={`View photo of ${client.title}`}
                            >
                                <Image
                                    src={client.src}
                                    alt={client.alt}
                                    fill
                                    sizes="(max-width: 768px) 220px, 300px"
                                    className="object-cover"
                                    loading="eager"
                                    priority={index < 4}
                                />
                                <div className="absolute inset-0 bg-[#061E13]/20 group-hover/card:bg-black/10 transition-colors" />

                                {/* Hover overlay label */}
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9FF23] font-bold">
                                        CLICK TO PREVIEW ↗
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* WEBSITE-THEMED LIGHTBOX MODAL */}
            <AnimatePresence>
                {activeClient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedIndex(null)}
                        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 select-none"
                    >
                        {/* Header Bar */}
                        <div className="flex justify-between items-center z-10 w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#1EA86E] animate-ping" />
                                <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">
                                    1327 CLIENT SHOWCASE
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedIndex(null)}
                                className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>CLOSE</span>
                                <span className="text-[#1EA86E] font-bold">✕</span>
                            </button>
                        </div>

                        {/* Center Stage — Image View + Nav Arrows */}
                        <div className="relative flex-1 flex items-center justify-center my-4" onClick={(e) => e.stopPropagation()}>
                            {/* Prev Arrow */}
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-2 md:left-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#1EA86E] hover:text-black text-white flex items-center justify-center font-mono text-lg border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                                aria-label="Previous photo"
                            >
                                ‹
                            </button>

                            {/* Main Active Image */}
                            <motion.div
                                key={activeClient.src}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="relative max-w-4xl max-h-[72vh] w-full h-full flex items-center justify-center overflow-hidden rounded-md border border-white/15 shadow-[0_0_60px_rgba(30,168,110,0.15)] bg-black"
                            >
                                <Image
                                    src={activeClient.src}
                                    alt={activeClient.title}
                                    fill
                                    sizes="90vw"
                                    className="object-contain p-2 md:p-4"
                                    priority
                                />
                            </motion.div>

                            {/* Next Arrow */}
                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-2 md:right-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#1EA86E] hover:text-black text-white flex items-center justify-center font-mono text-lg border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                                aria-label="Next photo"
                            >
                                ›
                            </button>
                        </div>

                        {/* Footer Bar — Info & Counter */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/10 pt-4 z-10 w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col text-left">
                                <h4 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight text-[#EAE6DA]">
                                    {activeClient.title}
                                </h4>
                                <span className="font-mono text-xs uppercase tracking-widest text-[#1EA86E]">
                                    {activeClient.tag}
                                </span>
                            </div>

                            {/* Counter readout */}
                            <div className="font-mono text-xs tracking-[0.2em] text-white/50 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                                {String(selectedIndex! + 1).padStart(2, "0")} / {String(clients.length).padStart(2, "0")}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
