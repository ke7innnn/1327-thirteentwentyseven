"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 3]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -3]);

    // Exit parallax/fade
    const yExit = useTransform(scrollYProgress, [0.9, 1], [0, 300]);
    const opacityExit = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    return (
        <section
            id="about"
            ref={containerRef}
            aria-label="About 1327 Thirteen Twenty Seven"
            className="relative z-10 py-20 md:py-32 bg-transparent text-white overflow-hidden"
        >
            <motion.div
                style={{ y: yExit, opacity: opacityExit }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col md:flex-row items-start gap-24 md:gap-16 relative">

                    {/* Text Column (Left) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 relative md:sticky md:top-28 self-start z-30 flex flex-col gap-8"
                    >
                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1EA86E] block mb-2 font-mono">
                                / Why We Exist
                            </span>
                            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-heading text-white">
                                <span>It Runs On </span>
                                <span className="text-[#1EA86E] block">Family.</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6 text-white/80 font-light font-sans text-base md:text-lg leading-relaxed max-w-xl">
                            <p>
                                1327 was born in Mumbai on a code borrowed from the Fast &amp; Furious films and lived out on the street — nothing matters more than family. We don&apos;t chase orders; we build relationships that outlast trends.
                            </p>
                            <p>
                                Founded by Keith Shah, we work shoulder-to-shoulder with cafés, kitchens, studios and crews across the city — designing, stitching and embroidering uniforms their teams are proud to pull on every shift.
                            </p>
                        </div>

                        {/* Values List with Dividers & Clickable Links */}
                        <motion.div 
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-5% 0px" }}
                            variants={{
                                initial: { opacity: 0 },
                                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="flex flex-col border-t border-white/10 w-full max-w-md mt-4"
                        >
                            {[
                                { num: "01", text: "Community", slug: "community" },
                                { num: "02", text: "Trust", slug: "trust" },
                                { num: "03", text: "Respect", slug: "respect" },
                                { num: "04", text: "Loyalty", slug: "loyalty" }
                            ].map((item) => (
                                <motion.div 
                                    key={item.num} 
                                    variants={{
                                        initial: { opacity: 0, x: -20 },
                                        animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    <Link
                                        href={`/values/${item.slug}`}
                                        className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-[#1EA86E]/60 hover:bg-white/[0.04] px-3 rounded-sm transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-[#1EA86E] font-mono text-xs font-bold">{item.num}</span>
                                            <span className="uppercase text-sm sm:text-base font-bold font-heading tracking-widest text-white group-hover:text-[#1EA86E] transition-colors">
                                                {item.text}
                                            </span>
                                        </div>
                                        <span className="text-white/40 group-hover:text-[#1EA86E] group-hover:translate-x-1 font-mono text-sm transition-all">
                                            ↗
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Image Grid Column (Right) */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 relative">
                        {/* Column 1 — parallax only on md+ */}
                        <motion.div style={{ y: y1, rotate: rotate1 }} className="flex flex-col gap-3 sm:gap-6 md:gap-8">
                            <InteractiveImageCard
                                src="/aboutus/about-3.png"
                                alt="1327 team crafting uniforms in Malad West"
                                label="THE WORKSHOP"
                                tag="MALAD WEST"
                            />
                            <InteractiveImageCard
                                src="/aboutus/about-1.png"
                                alt="1327 custom branded t-shirts showcase"
                                label="THE RANGE"
                                tag="SS/26 ATELIER"
                            />
                        </motion.div>

                        {/* Column 2 — offset only on md+, flat on mobile */}
                        <motion.div style={{ y: y2, rotate: rotate2 }} className="flex flex-col gap-3 sm:gap-6 md:gap-8 md:mt-24">
                            <InteractiveImageCard
                                src="/aboutus/about-2.png"
                                alt="Custom embroidery work by 1327 Mumbai"
                                label="THE STITCH"
                                tag="EMBROIDERY"
                            />
                            <InteractiveImageCard
                                src="/aboutus/about-4.png"
                                alt="Premium custom apparel by 1327 Thirteen Twenty Seven"
                                label="THE FIT"
                                tag="ON CREW"
                            />
                        </motion.div>
                    </div>

                </div>
            </motion.div>

            {/* Smooth Transition Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
        </section>
    );
}

function InteractiveImageCard({ src, alt, label, tag = "1327 // BOMBAY" }: { src: string, alt: string, label: string, tag?: string }) {
    return (
        <div
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 hover:border-white/40 transition-all duration-500 select-none shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)] transform-gpu hover:-translate-y-1 cursor-pointer bg-black/40"
        >
            {/* Full Height Edge-to-Edge Image */}
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
            />

            {/* Subtle Studio Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 group-hover:from-black/60 transition-colors duration-500" />

            {/* Top Right: Minimal White Glass Tag */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold tracking-widest text-white uppercase shadow-sm">
                {tag}
            </div>

            {/* Bottom Left: Minimal Pure White Label Tag */}
            <div className="absolute bottom-3 left-3 pointer-events-none z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/95 text-black backdrop-blur-md border border-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:bg-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-black">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
}
