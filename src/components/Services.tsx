"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceItem {
    id: string;
    num: string;
    title: string;
    badge: string;
    description: string;
    defaultImage: string;
    placeholder: string;
}

const serviceItems: ServiceItem[] = [
    {
        id: "relaxed",
        num: "/01",
        title: "Relaxed Fit T-Shirts",
        badge: "240-270 GSM",
        description: "Heavyweight, drop-shoulder blanks that hold their shape wash after wash. Built to carry print and embroidery — and to get borrowed, not returned.",
        defaultImage: "/servicepics/newovwersized.jpg",
        placeholder: "Drop relaxed fit design"
    },
    {
        id: "polo",
        num: "/02",
        title: "Polo T-Shirts",
        badge: "190-200 GSM",
        description: "Crisp piqué polos for front-of-house teams — collar-sharp, breathable and comfortable through the longest shifts.",
        defaultImage: "/servicepics/polo.png",
        placeholder: "Drop polo design"
    },
    {
        id: "aprons",
        num: "/03",
        title: "Aprons",
        badge: "CUSTOM EMBROIDERY",
        description: "From butcher-stripe to full canvas — cut for real kitchens, finished with your mark in tight, dense stitchwork.",
        defaultImage: "/servicepics/apron.png",
        placeholder: "Drop apron design"
    },
    {
        id: "straight",
        num: "/04",
        title: "Straight Fit T-Shirts",
        badge: "140-180 GSM",
        description: "Clean, lightweight staples for full-crew rollouts — easy to wear, easy to scale, sharp in any colourway.",
        defaultImage: "/servicepics/straightfit.png",
        placeholder: "Drop straight fit design"
    },
    {
        id: "caps",
        num: "/05",
        title: "Caps",
        badge: "3D EMBROIDERY",
        description: "Premium structured or unstructured caps to match your brand's style. Customisation : Embroidery.",
        defaultImage: "/servicepics/newcap.png",
        placeholder: "Drop cap logo design"
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("_svcActive");
            return saved ? parseInt(saved, 10) : 0;
        }
        return 0;
    });

    const handleSetActive = (index: number) => {
        setActiveIndex(index);
        if (typeof window !== "undefined") {
            sessionStorage.setItem("_svcActive", index.toString());
        }
    };

    const svcTags = [
        "/01 — RELAXED FIT T-SHIRTS",
        "/02 — POLO T-SHIRTS",
        "/03 — APRONS",
        "/04 — STRAIGHT FIT T-SHIRTS",
        "/05 — CAPS"
    ];

    return (
        <section id="services" className="relative z-20 bg-black text-white py-24 md:py-32 border-b border-white/10">
            <div className="container mx-auto px-6 md:px-16 lg:px-24">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1EA86E] block mb-2 font-mono">
                            / Our Services
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter font-heading uppercase leading-none">
                            <span>What We </span>
                            <span style={{ WebkitTextStroke: "2px #1EA86E", color: "transparent" }}>Offer.</span>
                        </h2>
                    </div>
                    <div className="text-white/40 text-xs md:text-sm font-mono tracking-widest uppercase self-end">
                        Five ways to suit up
                    </div>
                </motion.div>

                {/* Two Columns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Column: Interactive Linked List (7 cols) */}
                    <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-10% 0px" }}
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                        className="lg:col-span-7 flex flex-col border-t border-white/10"
                    >
                        {serviceItems.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <motion.div
                                    key={item.id}
                                    data-svc-row={index}
                                    tabIndex={0}
                                    onMouseEnter={() => handleSetActive(index)}
                                    onClick={() => handleSetActive(index)}
                                    onFocus={() => handleSetActive(index)}
                                    variants={{
                                        initial: { opacity: 0, y: 40 },
                                        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    className="flex flex-col py-8 border-b border-white/10 cursor-pointer transition-all duration-500 ease-out focus:outline-none select-none"
                                    style={{ paddingLeft: isActive ? "16px" : "0px" }}
                                >
                                    {/* Row Header Info */}
                                    <div className="flex items-center justify-between w-full gap-4">
                                        <div className="flex items-center gap-6">
                                            <span 
                                                className="font-mono text-xs md:text-sm font-bold transition-colors duration-500"
                                                style={{ color: isActive ? "#1EA86E" : "#888888" }}
                                            >
                                                {item.num}
                                            </span>
                                            <h3 
                                                data-svc-title={index}
                                                className="text-2xl sm:text-4xl md:text-5xl font-black uppercase font-heading tracking-tight leading-none transition-colors duration-500"
                                                style={{ color: isActive ? "#1EA86E" : "#EAE6DA" }}
                                            >
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div>
                                            <span className="inline-block px-2.5 py-1 text-[10px] md:text-xs font-mono font-bold border border-white/20 text-white/60 tracking-wider uppercase rounded-sm">
                                                {item.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expandable Description */}
                                    <div
                                        data-svc-desc={index}
                                        className="text-white/70 text-sm md:text-base leading-relaxed font-light font-sans text-left transition-all duration-500 ease-in-out"
                                        style={{
                                            maxHeight: isActive ? "220px" : "0px",
                                            opacity: isActive ? 1 : 0,
                                            paddingTop: isActive ? "14px" : "0px",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {item.description}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Right Column: Sticky Stacked Swatch Cards (5 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="lg:col-span-5 sticky top-[110px] flex flex-col items-center gap-6 self-start w-full"
                    >
                        <div className="relative w-full aspect-[3/4] max-w-[420px] h-auto">
                            {serviceItems.map((item, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <div
                                        key={item.id}
                                        data-svc-img={index}
                                        className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 rounded-sm bg-gradient-to-br from-[#0c3c26] to-[#062013] border border-white/10 shadow-2xl shadow-black/80"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            transform: isActive ? "scale(1)" : "scale(1.07)",
                                            zIndex: isActive ? 2 : 1,
                                            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                            pointerEvents: isActive ? "auto" : "none"
                                        }}
                                    >
                                        {/* Dashed Border Box */}
                                        <div className="relative w-full h-[80%] border border-dashed border-white/20 rounded-sm flex items-center justify-center overflow-hidden bg-black/10">
                                            {/* Giant Swatch Number watermark */}
                                            <span className="absolute text-[12rem] md:text-[14rem] font-bold font-heading text-[#eae6df]/5 select-none z-0">
                                                {item.num.replace("/", "")}
                                            </span>
                                            {/* Product Image */}
                                            <div className="relative w-[85%] h-[85%] z-10">
                                                <Image
                                                    src={item.defaultImage}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-1 transition-transform duration-700 hover:scale-105"
                                                    unoptimized
                                                />
                                            </div>
                                        </div>

                                        {/* Swatch Labels at bottom */}
                                        <div className="flex flex-col items-start gap-1 mt-4 text-left">
                                            <span className="text-xs font-mono font-bold text-[#1EA86E] tracking-wider">
                                                {item.badge}
                                            </span>
                                            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                                                1327 — SAMPLE SWATCH
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Live Caption Tag */}
                        <div 
                            data-svc-tag=""
                            className="text-xs md:text-sm font-mono tracking-[0.20em] uppercase text-white/50 border border-white/10 px-4 py-2 rounded-sm bg-white/[0.02]"
                        >
                            {svcTags[activeIndex]}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
