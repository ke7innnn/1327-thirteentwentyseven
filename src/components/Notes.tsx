"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASING, DURATION, viewportConfig, staggerContainer, staggerItem, hoverLiftSubtle, hoverScaleSubtle } from "@/lib/motion";

export default function Notes() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"] // Finishes when center of section hits center of viewport
    });

    const yText = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const yVideo = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const rotateVideo = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 0]);
    const scaleVideo = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
    const opacityVideo = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

    const yCard = useTransform(scrollYProgress, [0, 1], [300, 0]); // Card floats up from bottom
    const rotateCard = useTransform(scrollYProgress, [0, 1], [-10, 0]); // Card rotates into place

    return (
        <section id="notes" ref={containerRef} className="relative z-10 py-32 bg-transparent text-white overflow-hidden perspective-[1500px] border-b border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Text Column (Left) */}
                    <motion.div style={{ y: yText }} className="w-full md:w-1/2 relative z-20">
                        <div className="relative max-w-xl mx-auto transform -rotate-1 group">
                            {/* Tape Effect */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 backdrop-blur-[2px] shadow-sm rotate-2 z-20 pointer-events-none transform origin-center border-l-2 border-r-2 border-white/20 skew-y-1"></div>

                            {/* Note Paper */}
                            <motion.div
                                style={{ y: yCard, rotate: rotateCard }}
                                className="bg-[#fdfbcf] text-[#103010] p-8 md:p-12 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-[#E6D5B8] relative overflow-hidden"
                            >

                                {/* Paper Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={viewportConfig}
                                    transition={{ duration: DURATION.normal, ease: EASING }}
                                    className="text-4xl md:text-5xl font-black tracking-tight mb-8 font-heading text-center text-[#2A442A] uppercase border-b-4 border-[#103010]/5 pb-4 relative z-10"
                                >
                                    NOTE
                                </motion.h2>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={viewportConfig}
                                    className="prose prose-lg text-center mx-auto relative z-10"
                                >
                                    <motion.p
                                        variants={staggerItem}
                                        className="text-lg md:text-xl font-serif font-medium leading-relaxed text-[#2F4F2F]"
                                    >
                                        We have a minimum order quantity of <span className="inline-block px-2 py-0.5 bg-[#E6D5B8]/30 rounded font-bold text-[#D64933] text-2xl -rotate-2 mx-1">50</span> pcs for T-shirts and <span className="inline-block px-2 py-0.5 bg-[#E6D5B8]/30 rounded font-bold text-[#D64933] text-2xl rotate-2 mx-1">30</span> pcs for aprons & caps.
                                        For a quote, send us your artwork and requirements.
                                    </motion.p>
                                    <motion.p
                                        variants={staggerItem}
                                        className="text-lg md:text-xl font-serif font-medium leading-relaxed text-[#2F4F2F] mt-6"
                                    >
                                        We also do denims and trousers with an MOQ of <span className="inline-block px-2 py-0.5 bg-[#E6D5B8]/30 rounded font-bold text-[#D64933] text-2xl -rotate-1 mx-1">100</span> pcs.
                                    </motion.p>
                                    <motion.p
                                        variants={staggerItem}
                                        className="text-lg md:text-xl font-bold leading-relaxed text-[#103010] mt-8 font-sans border-t border-[#103010]/10 pt-6"
                                    >
                                        To place your order or for more inquiries you can Call or WhatsApp us on the number given.
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Video Column (Right) - 3D Rotation Effect */}
                    <motion.div
                        style={{ y: yVideo, rotateY: rotateVideo, scale: scaleVideo, opacity: opacityVideo }}
                        className="w-full md:w-1/2 perspective-[2000px] relative mt-12 md:mt-0"
                    >
                        {/* WATCH Label - Re-positioned to Top Left with "Live" Pulse Effect */}
                        <div className="absolute -top-12 left-0 flex items-center gap-3 z-30">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdfbcf] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fdfbcf]"></span>
                            </span>
                            <span className="text-sm font-bold tracking-[0.2em] text-[#fdfbcf] font-heading">TAKE A LOOK</span>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 group shadow-2xl shadow-[#fdfbcf]/10 transform-style-3d">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/_6kwlJx8sCo?si=15aZgj6kFUb9rhY4"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 transition-all duration-700 hover:scale-105"
                            ></iframe>

                            {/* Glossy Overlay for 3D feel */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#105233]/40 to-transparent pointer-events-none mix-blend-overlay"></div>
                        </div>
                    </motion.div>

                </div>
            </div >
            {/* Thin Bottom Gradient for Transition to Map */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/50 pointer-events-none z-20" />
        </section >
    );
}
