"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <footer id="contact" aria-label="Contact 1327 Thirteen Twenty Seven" className="relative z-10 bg-black text-white py-24 border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 flex flex-col gap-16 md:gap-24">
                
                {/* Top Section: CTA Title and Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase font-heading tracking-tight leading-[0.95] text-left text-white max-w-2xl">
                        <span className="block">Have A Crew</span>
                        <span className="block text-[#1EA86E]">To Dress?</span>
                    </h2>
                    
                    <button 
                        onClick={() => setIsContactOpen(true)}
                        className="bg-[#1EA86E] hover:bg-[#168a57] text-black font-mono text-xs md:text-sm font-bold tracking-widest px-8 py-4 rounded-sm flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap self-start md:self-center"
                    >
                        START A CONVERSATION ↗
                    </button>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10" />

                {/* Info Grid (4 Columns) */}
                <motion.div 
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-5% 0px" }}
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 w-full text-left relative z-10"
                >
                    {/* Contact */}
                    <motion.div 
                        variants={{
                            initial: { opacity: 0, y: 30 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="flex flex-col gap-6"
                    >
                        <h3 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/40 font-bold">Contact</h3>
                        <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-white/60 tracking-wider">
                            <a href="tel:+918082845721" className="hover:text-[#1EA86E] transition-colors">+91 80828 45721</a>
                            <a href="mailto:1327thecommunity@gmail.com" className="hover:text-[#1EA86E] transition-colors break-all">1327thecommunity@gmail.com</a>
                        </div>
                    </motion.div>

                    {/* Social */}
                    <motion.div 
                        variants={{
                            initial: { opacity: 0, y: 30 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="flex flex-col gap-6"
                    >
                        <h3 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/40 font-bold">Social</h3>
                        <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-white/60 tracking-wider">
                            <a href="https://www.instagram.com/1327_thirteentwentyseven/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1EA86E] transition-colors">Instagram — @1327_thirteentwentyseven</a>
                            <a href="https://www.youtube.com/@1327-thirteentwentyseven" target="_blank" rel="noopener noreferrer" className="hover:text-[#1EA86E] transition-colors">YouTube — @1327-thirteentwentyseven</a>
                        </div>
                    </motion.div>

                    {/* Menu */}
                    <motion.div 
                        variants={{
                            initial: { opacity: 0, y: 30 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="flex flex-col gap-6"
                    >
                        <h3 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/40 font-bold">Menu</h3>
                        <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-white/60 tracking-wider">
                            <a href="#mission" className="hover:text-[#1EA86E] transition-colors">Our Mission</a>
                            <a href="#about" className="hover:text-[#1EA86E] transition-colors">About Us</a>
                            <a href="#services" className="hover:text-[#1EA86E] transition-colors">What We Offer</a>
                            <a href="#clients" className="hover:text-[#1EA86E] transition-colors">Clients</a>
                            <a href="#notes" className="hover:text-[#1EA86E] transition-colors">Orders &amp; MOQ</a>
                        </div>
                    </motion.div>

                    {/* Studio */}
                    <motion.div 
                        variants={{
                            initial: { opacity: 0, y: 30 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="flex flex-col gap-6"
                    >
                        <h3 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/40 font-bold">Studio</h3>
                        <div className="flex flex-col gap-1 font-mono text-xs md:text-sm text-white/60 tracking-wider">
                            <p>Malad West, Mumbai</p>
                            <p>Maharashtra, India</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar: Copyright and Tagline */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] md:text-xs font-mono tracking-[0.15em] text-white/40 border-t border-white/5 pt-8 w-full relative z-10">
                    <span className="text-left font-sans">© 2026 1327 - THIRTEEN TWENTY SEVEN</span>
                    <span className="text-right">DESIGNED FOR THE BOLD  ·  MADE IN MALAD WEST</span>
                </div>

            </div>

            {/* Giant Outlined Logo Background Watermark */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-auto select-none pointer-events-none z-0 flex justify-center items-end overflow-hidden"
            >
                <span 
                    className="text-[25vw] font-bold leading-none tracking-tighter font-heading text-white whitespace-nowrap select-none"
                    style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}
                >
                    1327
                </span>
            </motion.div>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </footer>
    );
}
