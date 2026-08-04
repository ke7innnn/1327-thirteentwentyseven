"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionMarker from "./ui/SectionMarker";
import { WHATSAPP_URL, PHONE_NUMBER } from "@/config/constants";
import { EASING } from "@/lib/motion";

const MOQ_SPECS = [
    { category: "T-SHIRTS & POLOS", moq: "MOQ 50 PCS", note: "Heavyweight, drop-shoulder & custom blanks" },
    { category: "APRONS & CAPS", moq: "MOQ 30 PCS", note: "Kitchen aprons, headwear & leatherette goods" },
    { category: "DENIM & TROUSERS", moq: "MOQ 100 PCS", note: "Custom workwear trousers & heavyweight denim" },
];

export default function Notes() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
        <section id="orders" aria-label="Orders, MOQ and Brand Film" className="relative z-10 py-24 md:py-32 bg-[#eae6df] text-[#0a0a0a] border-b border-black/10">
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-24">
                
                {/* ─── SECTION { 05 } ORDERS & MOQ ────────────────────────────────────────────── */}
                <div id="moq" className="flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col items-start gap-3">
                        <SectionMarker sectionKey="orders" />

                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] font-heading text-[#0a0a0a]">
                            ORDERS &amp; MOQ
                        </h2>
                        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-black/60 font-medium max-w-xl">
                            COMMITTED PRODUCTION BATCHES. ZERO SURPRISES, FULL TRANSPARENCY.
                        </p>
                    </div>

                    {/* Mono Spec Table */}
                    <div className="border-t border-b border-black/15">
                        {MOQ_SPECS.map((item, i) => (
                            <div
                                key={i}
                                className="group relative border-b border-black/15 last:border-b-0 py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-all duration-300 hover:bg-[#105233]/5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                    <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[#105233]">
                                        {item.category}
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-wider text-black/50">
                                        / {item.note}
                                    </span>
                                </div>

                                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#105233] self-start sm:self-auto">
                                    {item.moq}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Dual Action Ruled Links */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#105233] hover:text-black border-b border-[#105233] pb-1 transition-colors group"
                        >
                            <span>START A CONVERSATION VIA WHATSAPP</span>
                            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                        </a>

                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black/60 hover:text-black border-b border-black/20 pb-1 transition-colors group"
                        >
                            <span>CALL US AT {PHONE_NUMBER}</span>
                            <span className="group-hover:translate-x-1 transition-transform">↗</span>
                        </a>
                    </div>
                </div>

                {/* ─── SECTION { 06 } TAKE A LOOK / BRAND FILM ─────────────────────────────── */}
                <div id="film" className="flex flex-col gap-8 pt-12 border-t border-black/15">
                    {/* Header */}
                    <div className="flex flex-col items-start gap-3">
                        <SectionMarker sectionKey="film" />

                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] font-heading text-[#0a0a0a]">
                            TAKE A LOOK
                        </h2>
                    </div>

                    {/* Video Facade — 0 YouTube requests until clicked */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-black/15 shadow-2xl bg-black group">
                        {!isVideoLoaded ? (
                            <button
                                type="button"
                                onClick={() => setIsVideoLoaded(true)}
                                className="relative w-full h-full block text-left focus:outline-none cursor-pointer group"
                                aria-label="Play 1327 Brand Showcase Film"
                            >
                                <Image
                                    src="/aboutus/about-1.png"
                                    alt="1327 Brand Film Poster Still"
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    priority={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                                {/* Center Click Affordance in Editorial Language */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center z-10">
                                    <div className="px-5 py-2.5 bg-[#105233] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] shadow-lg group-hover:bg-[#166942] transition-colors flex items-center gap-2">
                                        <span>TAKE A LOOK</span>
                                        <span className="group-hover:translate-x-1 transition-transform">↗</span>
                                    </div>
                                    <span className="font-mono text-[10px] sm:text-xs text-white/70 uppercase tracking-widest">
                                        1327 MUMBAI — ATELIER &amp; CREW SHOWCASE FILM
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube-nocookie.com/embed/wW5xMjM0rNk?autoplay=1&rel=0"
                                title="1327 Thirteen Twenty Seven — Custom T-Shirts and Uniforms Showcase"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
