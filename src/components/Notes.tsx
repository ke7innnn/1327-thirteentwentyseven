"use client";

import { motion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";
import { EASING, DURATION, viewportConfig, staggerContainer, staggerItem } from "@/lib/motion";
import { WHATSAPP_URL, PHONE_NUMBER, CONTACT_EMAIL } from "@/config/constants";

export default function Notes() {
    return (
        <section id="notes" aria-label="Orders, MOQ and Brand Film" className="relative z-10 py-20 md:py-28 bg-[#eae6df] text-[#0a0a0a] overflow-hidden border-b border-black/15 select-none rounded-none">
            {/* 1327 Brand Apparel Craftsmanship Fabric Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply bg-repeat">
                <div
                    className="absolute inset-0 bg-repeat"
                    style={{
                        backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                        backgroundSize: "450px 450px",
                    }}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
                <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-14">

                    {/* Order Guidelines Card (Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, ease: EASING }}
                        className="w-full md:w-1/2 relative z-20 flex flex-col justify-between"
                    >
                        <div className="bg-[#edebe3] text-[#0a0a0a] p-6 sm:p-8 md:p-10 rounded-none border border-black/15 relative overflow-hidden flex flex-col justify-between h-full">
                            {/* Top Header Tag */}
                            <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-6">
                                <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#105233] text-white">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                                        &#123; 03 &#125; ORDER GUIDELINES
                                    </span>
                                </div>
                                <span className="font-mono text-xs text-[#105233] font-bold tracking-widest uppercase">
                                    ATELIER SPEC
                                </span>
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={{ duration: DURATION.normal, ease: EASING }}
                                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-[#0a0a0a] uppercase mb-6"
                            >
                                ORDER GUIDELINES
                            </motion.h2>

                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                viewport={viewportConfig}
                                className="flex flex-col gap-5 text-left"
                            >
                                <motion.p
                                    variants={staggerItem}
                                    className="font-sans text-base sm:text-lg font-normal leading-relaxed text-[#0a0a0a]/85"
                                >
                                    We have a minimum order quantity of{" "}
                                    <span className="inline-flex items-center px-2 py-0.5 bg-[#105233]/10 border border-[#105233]/25 font-mono text-sm font-bold text-[#105233] tabular-nums mx-1">
                                        &#123; 50 PCS &#125;
                                    </span>{" "}
                                    for T-shirts and{" "}
                                    <span className="inline-flex items-center px-2 py-0.5 bg-[#105233]/10 border border-[#105233]/25 font-mono text-sm font-bold text-[#105233] tabular-nums mx-1">
                                        &#123; 30 PCS &#125;
                                    </span>{" "}
                                    for aprons &amp; caps. For a quote, send us your artwork and requirements.
                                </motion.p>

                                <motion.p
                                    variants={staggerItem}
                                    className="font-sans text-base sm:text-lg font-normal leading-relaxed text-[#0a0a0a]/85"
                                >
                                    We also do denims and trousers with an MOQ of{" "}
                                    <span className="inline-flex items-center px-2 py-0.5 bg-[#105233]/10 border border-[#105233]/25 font-mono text-sm font-bold text-[#105233] tabular-nums mx-1">
                                        &#123; 100 PCS &#125;
                                    </span>.
                                </motion.p>

                                {/* Contact Callout */}
                                <motion.div
                                    variants={staggerItem}
                                    className="pt-6 border-t border-black/15 flex flex-col gap-3"
                                >
                                    <div className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#105233]">
                                        &#123; PLACE AN ORDER &#125;
                                    </div>
                                    <p className="font-sans text-sm sm:text-base font-light text-[#0a0a0a]/80 leading-relaxed">
                                        To place your order or for inquiries, feel free to{" "}
                                        <a href={`tel:${PHONE_NUMBER}`} className="font-bold text-[#105233] underline hover:text-[#4FB47E] transition-colors">
                                            Call
                                        </a>{" "}
                                        or{" "}
                                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#105233] underline hover:text-[#4FB47E] transition-colors">
                                            WhatsApp us
                                        </a>{" "}
                                        on{" "}
                                        <span className="font-mono font-bold text-[#105233]">{PHONE_NUMBER}</span>{" "}
                                        or email{" "}
                                        <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono font-bold text-[#105233] underline hover:text-[#4FB47E] transition-colors">
                                            {CONTACT_EMAIL}
                                        </a>.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Video Column (Right) — Continuous Floating & Levitation Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: EASING, delay: 0.1 }}
                        className="w-full md:w-1/2 relative mt-6 md:mt-0 flex flex-col justify-center"
                    >
                        <motion.div
                            animate={{
                                y: [-10, 10, -10],
                                rotateZ: [-0.75, 0.75, -0.75],
                            }}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                scale: 1.03,
                                y: -14,
                                rotateZ: 0,
                            }}
                            className="w-full relative group transition-shadow duration-500"
                        >
                            {/* TAKE A LOOK Label */}
                            <div id="film" className="flex items-center gap-3 mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#105233] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#105233]"></span>
                                </span>
                                <span className="text-sm font-bold tracking-[0.2em] text-[#105233] font-heading">TAKE A LOOK</span>
                            </div>

                            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-black/15 shadow-2xl shadow-[#105233]/10 group-hover:shadow-[0_20px_40px_rgba(16,82,51,0.25)] transition-shadow duration-500">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/wW5xMjM0rNk?si=JixVJUilbeboumbv"
                                    title="1327 Thirteen Twenty Seven — Custom T-Shirts and Uniforms Showcase"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>

                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#105233]/40 to-transparent pointer-events-none mix-blend-overlay"></div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
