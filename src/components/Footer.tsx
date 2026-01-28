"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER, viewportConfig, staggerContainer, staggerItem } from "@/lib/motion";

import ScrollReveal from "./ScrollReveal";

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <ScrollReveal offset={["start end", "center center"]}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-40">

                        {/* Contact Section */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#fdfbcf] mb-8">
                                Contact
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Founder</p>
                                    <p className="text-xl font-light">Keith Shah</p>
                                    <a href="tel:+918082845721" className="text-lg text-gray-300 hover:text-[#fdfbcf] transition-colors font-heading mt-1 block">
                                        +91 8082845721
                                    </a>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:1327thecommunity@gmail.com" className="text-lg text-gray-300 hover:text-[#fdfbcf] transition-colors font-mono">
                                        1327thecommunity@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Socials Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#fdfbcf] mb-8">
                                Follow Us
                            </h3>

                            <div className="flex flex-col space-y-4">
                                <SocialLink
                                    href="https://www.instagram.com/1327_thirteentwentyseven/"
                                    label="Instagram"
                                    handle="@1327_thirteentwentyseven"
                                />
                                <SocialLink
                                    href="https://www.youtube.com/@1327-thirteentwentyseven"
                                    label="YouTube"
                                    handle="@1327-thirteentwentyseven"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Copyright */}
                    <div className="mt-20 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
                        <p>© <span className="font-heading">2026</span> <span className="font-heading">1327</span> Community. All Rights Reserved.</p>
                        <p className="mt-2 md:mt-0">Designed for the Bold</p>
                    </div>
                </ScrollReveal>
            </div>
        </footer>
    );
}

function SocialLink({ href, label, handle }: { href: string, label: string, handle: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-[#fdfbcf] transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="text-2xl font-thin group-hover:text-[#fdfbcf] transition-colors duration-300">{label}</span>
            <motion.span
                className="text-xs text-gray-500 font-mono group-hover:text-[#fdfbcf] transition-colors flex items-center gap-2"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
            >
                {handle}
                <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    →
                </motion.span>
            </motion.span>
        </motion.a>
    )
}
