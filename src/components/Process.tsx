"use client";

import { motion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";
import { EASING } from "@/lib/motion";

const PROCESS_STEPS = [
    {
        step: "01",
        title: "ARTWORK & BRIEF",
        copy: "Send your logo, garment type and quantity. We come back with fabric options, digital mockup and a transparent quote.",
        leadTime: "24–48 HRS",
    },
    {
        step: "02",
        title: "SAMPLE & APPROVAL",
        copy: "We stitch a physical sample. You approve the fabric weight, fit and embroidery precision before anything scales.",
        leadTime: "3–5 DAYS",
    },
    {
        step: "03",
        title: "PRODUCTION",
        copy: "Precision cut, print or embroidery, hand finish and rigorous quality check. Every piece carries an authentic 1327 tag.",
        leadTime: "7–12 DAYS",
    },
    {
        step: "04",
        title: "DELIVERY",
        copy: "Packed securely and hand-delivered across Mumbai, or shipped via express dispatch anywhere in India.",
        leadTime: "2–4 DAYS",
    },
];

export default function Process() {
    return (
        <section id="process" aria-label="How We Work — The 1327 Process" className="relative z-10 py-24 md:py-32 bg-[#eae6df] text-[#0a0a0a] border-b border-black/10">
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
                
                {/* Header */}
                <div className="mb-12 flex flex-col items-start gap-3">
                    <SectionMarker sectionKey="process" />

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] font-heading text-[#0a0a0a]">
                        THE PROCESS
                    </h2>
                    <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-black/60 font-medium max-w-xl">
                        FROM INITIAL BRIEF TO FINAL HAND-DELIVERY. TRANSPARENT TIMELINES, ZERO SURPRISES.
                    </p>
                </div>

                {/* 4 Tabular Ruled Process Rows */}
                <div className="border-t border-b border-black/15">
                    {PROCESS_STEPS.map((item) => (
                        <div
                            key={item.step}
                            className="group relative border-b border-black/15 last:border-b-0 py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Hover Green Fill Wipe */}
                            <div className="absolute inset-0 bg-[#105233]/10 border-l-4 border-[#105233] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-4 md:gap-6">
                                {/* Step Index */}
                                <div className="md:col-span-2 font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-[#105233]">
                                    {item.step}
                                </div>

                                {/* Step Title */}
                                <div className="md:col-span-4 font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0a0a0a] group-hover:text-[#105233] transition-colors">
                                    {item.title}
                                </div>

                                {/* Step Copy */}
                                <div className="md:col-span-4 font-sans text-sm sm:text-base text-black/75 font-light leading-relaxed">
                                    {item.copy}
                                </div>

                                {/* Lead Time Badge */}
                                <div className="md:col-span-2 text-left md:text-right font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#105233]">
                                    {item.leadTime}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Turnaround Lead Time Note */}
                <div className="mt-8 flex justify-start items-center">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-black/60">
                        TYPICAL TURNAROUND — 14 TO 21 DAYS FROM APPROVED ARTWORK
                    </span>
                </div>

            </div>
        </section>
    );
}
