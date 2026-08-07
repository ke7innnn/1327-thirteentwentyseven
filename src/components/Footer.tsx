"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_URL } from "@/config/constants";

const WHATSAPP_FOOTER_URL =
    WHATSAPP_URL ||
    "https://wa.me/919819001327?text=Hi%201327%2C%20I%27m%20looking%20to%20place%20an%20order%20for%20custom%20uniforms.";

const CLIENT_LOGOS = [
    { name: "Berlin Brew", src: "/client logo/BERLIN BREW LOGO-1.png" },
    { name: "East", src: "/client logo/east.png" },
    { name: "Home", src: "/client logo/home.png" },
    { name: "Katha", src: "/client logo/katha.png" },
    { name: "Magari", src: "/client logo/magari.png" },
    { name: "Nana", src: "/client logo/nana.png" },
    { name: "Unscripted", src: "/client logo/unscripted.png" },
    { name: "Benne", src: "/client logo/benne.png" },
    { name: "Jaago", src: "/client logo/jaago.png" },
    { name: "Nadda", src: "/client logo/nadda.png" },
    { name: "Tiger", src: "/client logo/tiger.png" },
];

const PAGES_LINKS = [
    { label: "HOME", href: "#mission" },
    { label: "SERVICES", href: "#services" },
    { label: "THE CODE", href: "#about" },
    { label: "CLIENTS", href: "#clients" },
];

const SOCIAL_LINKS = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/1327_thirteentwentyseven/" },
    { label: "YOUTUBE", href: "https://www.youtube.com/@1327-thirteentwentyseven" },
    { label: "WHATSAPP", href: WHATSAPP_FOOTER_URL },
];

// ─── KEITH SHAH SIGNATURE VECTOR OVERLAY ───────────────────────────────────────
function KeithShahSignature({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 120"
            fill="none"
            stroke="#F7F5F0"
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

// ─── MAIN CLOSING FOOTER COMPONENT ────────────────────────────────────────────
export default function Footer() {
    const reduced = useReducedMotion() ?? false;
    const [policyModal, setPolicyModal] = useState<string | null>(null);

    return (
        <footer
            id="footer"
            aria-label="Closing Footer — 1327 Thirteen Twenty Seven"
            className="relative w-full bg-[#F2EFE8] select-none rounded-none"
        >
            {/* ─── MAIN GREEN FIELD (#105233) WITH STEPPED NOTCH ─────────────────────── */}
            <div
                className="relative w-full bg-[#105233] text-[#F7F5F0] pt-16 md:pt-20 pb-20 md:pb-28 overflow-hidden rounded-none"
                style={{
                    clipPath:
                        "polygon(0 0, calc(50% - 140px) 0, calc(50% - 140px) 32px, calc(50% + 140px) 32px, calc(50% + 140px) 0, 100% 0, 100% 100%, 0 100%)",
                }}
            >
                {/* LAYER 0: Topographic Contour SVG Pattern Background */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply">
                    <Image
                        src="/footer/contour_pattern.svg"
                        alt=""
                        fill
                        className="object-cover"
                        priority={false}
                    />
                </div>

                <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10">

                    {/* ─── LAYER 30: OVERSIZED BRAND STATEMENT + SIGNATURE ──────────────── */}
                    <div className="relative z-30 pt-8 sm:pt-12 mb-10 md:mb-16 flex flex-col items-center">
                        
                        {/* Keith Shah Signature Overlay */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 0.85, scale: 1 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                            className="hidden sm:block absolute -top-2 left-1/2 -translate-x-1/2 md:-translate-x-3/4 w-64 md:w-80 h-24 z-40 pointer-events-none -rotate-6"
                        >
                            <KeithShahSignature className="w-full h-full text-[#F7F5F0]" />
                        </motion.div>

                        <h2 className="font-heading font-black uppercase text-center leading-[0.82] tracking-[-0.02em] text-[#F7F5F0]">
                            {/* Desktop/Tablet: 2-line offset composition */}
                            <div className="hidden md:flex flex-col items-center w-full">
                                {/* Line 1: DESIGNED (solid) FOR (outlined) */}
                                <motion.div
                                    initial={reduced ? false : { opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-3 sm:gap-6 text-[clamp(3.5rem,10vw,11rem)]"
                                >
                                    <span className="text-[#F7F5F0]">DESIGNED</span>
                                    <span
                                        className="text-transparent"
                                        style={{
                                            WebkitTextStroke: "2px #F7F5F0",
                                        }}
                                    >
                                        FOR
                                    </span>
                                </motion.div>

                                {/* Line 2: THE (solid) BOLD. (outlined) — offset right ~8% */}
                                <motion.div
                                    initial={reduced ? false : { opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-3 sm:gap-6 text-[clamp(3.5rem,10vw,11rem)] translate-x-[4%] lg:translate-x-[7%]"
                                >
                                    <span className="text-[#F7F5F0]">THE</span>
                                    <span
                                        className="text-transparent"
                                        style={{
                                            WebkitTextStroke: "2px #F7F5F0",
                                        }}
                                    >
                                        BOLD.
                                    </span>
                                </motion.div>
                            </div>

                            {/* Mobile (<768px): 3 stacked left-aligned lines */}
                            <div className="md:hidden flex flex-col items-start text-left w-full pl-2 text-5xl sm:text-6xl font-black gap-1">
                                <span>DESIGNED FOR</span>
                                <span>THE</span>
                                <span
                                    className="text-transparent"
                                    style={{ WebkitTextStroke: "1.5px #F7F5F0" }}
                                >
                                    BOLD.
                                </span>
                            </div>
                        </h2>
                    </div>

                    {/* ─── MIDDLE CONTENT SECTION: NAV COLUMNS + CUTOUT FIGURE ────────── */}
                    <div className="relative min-h-[420px] md:min-h-[500px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
                        
                        {/* ─── LAYER 10: DYNAMIC INFINITE MOVING CLIENT LOGO MARQUEE (BEHIND FIGURE) ──────────────── */}
                        <div
                            aria-label="Client partners"
                            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-screen z-10 pointer-events-auto overflow-hidden py-4"
                            style={{
                                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                            }}
                        >
                            <div
                                className="flex items-center gap-12 sm:gap-16 md:gap-24 animate-infinite-scroll will-change-transform opacity-75 hover:opacity-100 transition-opacity duration-300"
                                style={{ width: "max-content" }}
                            >
                                {/* Track 1 */}
                                <div className="flex items-center gap-12 sm:gap-16 md:gap-24 grayscale invert">
                                    {CLIENT_LOGOS.map((logo, idx) => (
                                        <div key={`logo-1-${idx}`} className="relative flex-shrink-0 w-32 sm:w-44 md:w-56 lg:w-64 h-12 sm:h-16 md:h-20 lg:h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                            <Image
                                                src={logo.src}
                                                alt={logo.name}
                                                fill
                                                sizes="(max-width: 768px) 180px, 260px"
                                                loading="lazy"
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Track 2 (Duplicate for seamless loop) */}
                                <div className="flex items-center gap-12 sm:gap-16 md:gap-24 grayscale invert" aria-hidden="true">
                                    {CLIENT_LOGOS.map((logo, idx) => (
                                        <div key={`logo-2-${idx}`} className="relative flex-shrink-0 w-32 sm:w-44 md:w-56 lg:w-64 h-12 sm:h-16 md:h-20 lg:h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                            <Image
                                                src={logo.src}
                                                alt=""
                                                fill
                                                sizes="(max-width: 768px) 180px, 260px"
                                                loading="lazy"
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ─── LAYER 00: GIANT STITCHED SIGNATURE WATERMARK BACKGROUND ──────────────── */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 0.15, scale: 1 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[85vw] md:w-[600px] h-[180px] pointer-events-none select-none opacity-15"
                            aria-hidden="true"
                        >
                            <KeithShahSignature className="w-full h-full text-[#F7F5F0]" />
                        </motion.div>

                        {/* ─── LAYER 20: CUT-OUT HOODIE FIGURE (DEAD CENTRE) ───────────── */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[80vw] sm:w-[50vw] md:w-[400px] lg:w-[480px] aspect-[4/5] pointer-events-none"
                            aria-hidden="true"
                        >
                            <Image
                                src="/footer/hooded_figure.png"
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 70vw, 34vw"
                                quality={85}
                                className="object-contain object-bottom"
                                priority={false}
                            />
                        </motion.div>

                        {/* ─── LAYER 40: NAV COLUMNS (FLANKING THE FIGURE) ─────────────── */}
                        
                        {/* Left Column — Right-Aligned (PAGES) */}
                        <nav
                            aria-label="Footer pages"
                            className="relative z-40 w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right gap-4 self-start md:self-center"
                        >
                            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#F7F5F0]/55 font-bold">
                                PAGES
                            </span>
                            <div className="flex flex-col gap-2 font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F7F5F0]">
                                {PAGES_LINKS.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        className="transition-transform duration-180 ease-out hover:translate-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#105233]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            {/* Emphasized GET A QUOTE link */}
                            <div className="pt-3 mt-2 border-t border-[#F7F5F0]/20 w-full max-w-[200px] text-left md:text-right">
                                <a
                                    href={WHATSAPP_FOOTER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#F7F5F0] hover:text-white border-b border-[#F7F5F0] pb-0.5 inline-block transition-transform duration-180 ease-out hover:translate-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
                                >
                                    GET A QUOTE
                                </a>
                            </div>
                        </nav>

                        {/* Right Column — Left-Aligned (FOLLOW ON) */}
                        <nav
                            aria-label="Social links"
                            className="relative z-40 w-full md:w-1/3 flex flex-col items-start text-left gap-4 self-start md:self-center"
                        >
                            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#F7F5F0]/55 font-bold">
                                FOLLOW ON
                            </span>
                            <div className="flex flex-col gap-2 font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F7F5F0]">
                                {SOCIAL_LINKS.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-transform duration-180 ease-out hover:-translate-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#105233]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </nav>

                    </div>

                    {/* ─── LAYER 40: PRIMARY CTA BUTTON (DEAD CENTRE OVERLAPPING FIGURE) ──── */}
                    <div className="relative z-40 mt-12 md:mt-16 flex justify-center w-full">
                        <a
                            href={WHATSAPP_FOOTER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full sm:w-[300px] h-[60px] sm:h-[64px] bg-[#F7F5F0] text-[#105233] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 border border-[#F7F5F0] transition-all duration-200 ease-out hover:bg-[#105233] hover:text-[#F7F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#105233]"
                        >
                            <span>START AN ORDER</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                                ↗
                            </span>
                        </a>
                    </div>

                </div>
            </div>

            {/* ─── LEGAL BAR (BONE GROUND #F2EFE8 OUTSIDE GREEN FIELD) ───────────────────── */}
            <div className="w-full bg-[#F2EFE8] text-[#105233] border-t border-[#105233]/20 py-4 px-5 sm:px-8 md:px-16 lg:px-20 min-h-[56px] flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left font-mono text-xs uppercase tracking-wider font-semibold rounded-none">
                {/* Left: Copyright */}
                <div>
                    © 2026 1327 — ALL RIGHTS RESERVED
                </div>

                {/* Centre: Coordinates (Bookend to Location section) */}
                <div className="hidden md:block text-[#105233]/70 font-bold tracking-[0.2em]">
                    19.1871° N / 72.8488° E
                </div>

                {/* Right: Privacy & Terms links */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setPolicyModal("Privacy Policy")}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#105233]"
                    >
                        PRIVACY POLICY
                    </button>
                    <span>·</span>
                    <button
                        type="button"
                        onClick={() => setPolicyModal("Terms & Conditions")}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#105233]"
                    >
                        TERMS
                    </button>
                </div>
            </div>

            {/* Policy Modal Placeholder */}
            {policyModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
                    <div className="bg-[#F2EFE8] text-[#105233] p-8 max-w-lg w-full border border-[#105233] font-mono flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-[#105233]/20 pb-3">
                            <h3 className="font-heading font-black text-xl uppercase">{policyModal}</h3>
                            <button
                                type="button"
                                onClick={() => setPolicyModal(null)}
                                className="font-bold text-lg px-2 py-0.5 border border-[#105233] hover:bg-[#105233] hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-xs leading-relaxed font-sans text-[#105233]/90">
                            1327 Thirteen Twenty Seven operates in Bombay, Malad West. All custom orders, apparel production, client specifications, and transactions are governed under standard Indian commercial apparel manufacturing guidelines. Contact us directly via WhatsApp or Phone for detailed terms.
                        </p>
                        <button
                            type="button"
                            onClick={() => setPolicyModal(null)}
                            className="bg-[#105233] text-[#F7F5F0] py-2 text-xs uppercase tracking-widest font-bold mt-2"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
}
