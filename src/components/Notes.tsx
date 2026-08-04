"use client";

import { motion } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";
import { EASING, DURATION, viewportConfig, staggerContainer, staggerItem } from "@/lib/motion";
import { WHATSAPP_URL, PHONE_NUMBER, CONTACT_EMAIL } from "@/config/constants";

export default function Notes() {
    return (
        <section id="notes" aria-label="Orders, MOQ and Brand Film" className="relative z-10 py-20 md:py-32 bg-[#105233] text-white overflow-hidden border-b border-white/10">
            {/* 1327 Brand Green Apparel Craftsmanship Fabric Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#105233]">
                <div
                    className="absolute inset-0 opacity-[0.35] mix-blend-multiply bg-repeat"
                    style={{
                        backgroundImage: "url('/bg/notes_fabric_bg.png')",
                        backgroundSize: "450px 450px",
                    }}
                />
                {/* Atelier Lighting Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(30,168,110,0.22) 0%, rgba(12,60,37,0.65) 100%)",
                    }}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24">

                    {/* Text Column (Left) — Yellow Note Paper */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, ease: EASING }}
                        className="w-full md:w-1/2 relative z-20"
                    >
                        <div className="mb-4">
                            <SectionMarker sectionKey="orders" className="!text-white" />
                        </div>

                        <div className="relative max-w-xl mx-auto transform -rotate-1 group">
                            {/* Tape Effect */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-white/40 shadow-sm rotate-2 z-20 pointer-events-none transform origin-center border-l-2 border-r-2 border-white/20 skew-y-1"></div>

                            {/* Note Paper */}
                            <div className="bg-[#fdfbcf] text-[#103010] p-6 sm:p-8 md:p-12 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-[#E6D5B8] relative overflow-hidden">

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
                                        We have a minimum order quantity of <span className="inline-block px-2 py-0.5 bg-[#E6D5B8]/30 rounded font-bold text-[#D64933] text-2xl -rotate-2 mx-1">50</span> pcs for T-shirts and <span className="inline-block px-2 py-0.5 bg-[#E6D5B8]/30 rounded font-bold text-[#D64933] text-2xl rotate-2 mx-1">30</span> pcs for aprons &amp; caps.
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
                                        To place your order or for more inquiries you can <a href={`tel:${PHONE_NUMBER}`} className="underline hover:text-[#105233]">Call</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#105233]">WhatsApp us</a> on <span className="whitespace-nowrap">{PHONE_NUMBER}</span> or email <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-[#105233]">{CONTACT_EMAIL}</a>.
                                    </motion.p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Video Column (Right) — Exact Original YouTube Embed */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: EASING, delay: 0.1 }}
                        className="w-full md:w-1/2 relative mt-6 md:mt-0"
                    >
                        {/* TAKE A LOOK Label */}
                        <div id="film" className="flex items-center gap-3 mb-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdfbcf] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fdfbcf]"></span>
                            </span>
                            <span className="text-sm font-bold tracking-[0.2em] text-[#fdfbcf] font-heading">TAKE A LOOK</span>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 group shadow-2xl shadow-[#fdfbcf]/10">
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

                </div>
            </div>
        </section>
    );
}
