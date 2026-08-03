"use client";

import { motion } from "framer-motion";

export default function LocationMap() {
    return (
        <section
            id="location"
            className="relative w-full overflow-hidden border-t border-white/10 py-24 md:py-32 bg-black text-white"
        >
            <div className="container mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Address and Header */}
                <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 flex flex-col items-start w-full"
                >
                    {/* Top Bar Header */}
                    <div className="flex justify-between items-center text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/50 border-b border-white/10 pb-4 mb-8 w-full">
                        <div>
                            <span className="text-[#1EA86E] font-bold mr-2">&#123; 07 &#125;</span>
                            <span>Location</span>
                        </div>
                        <span>Malad West, Mumbai</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase font-heading tracking-tight leading-[0.95] text-left text-white mb-8">
                        <span className="block">Born In</span>
                        <span className="block text-[#1EA86E]">Mumbai.</span>
                    </h2>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/10 my-4" />

                    {/* Studio Info */}
                    <div className="text-left font-mono text-xs md:text-sm tracking-widest leading-relaxed text-white/50 space-y-1 mt-6">
                        <p className="text-white font-bold font-sans tracking-wide text-sm md:text-base mb-2">1327 — Thirteen Twenty Seven</p>
                        <p>Malad West, Mumbai</p>
                        <p>Maharashtra, India</p>
                    </div>

                    {/* Directions Link */}
                    <div className="mt-8 text-left">
                        <a 
                            href="https://www.google.com/maps/dir/19.3691648,72.82688/Our+Lady+of+Lourdes+Church,+Orlem,+Marve+Road,+Malad+-+Marve+Rd,+Orlem,+Malad+West,+Mumbai,+Maharashtra+400064/@19.2972529,72.7817948,26303m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3be7b6e8311491bd:0xc73ae05a3d1e8022!2m2!1d72.8375031!2d19.1951765?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#1EA86E] hover:text-[#168a57] font-mono text-xs tracking-[0.2em] font-bold uppercase transition-colors"
                        >
                            GET DIRECTIONS ↗
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Google Maps Iframe */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="lg:col-span-6 w-full"
                >
                    <div 
                        className="relative w-full aspect-video md:aspect-[4/3] h-[300px] md:h-[400px] rounded-sm overflow-hidden border border-white/10 group cursor-pointer bg-black isolate transform-gpu"
                        style={{ contain: "paint layout" }}
                    >
                        <a
                            href="https://www.google.com/maps/dir/19.3691648,72.82688/Our+Lady+of+Lourdes+Church,+Orlem,+Marve+Road,+Malad+-+Marve+Rd,+Orlem,+Malad+West,+Mumbai,+Maharashtra+400064/@19.2972529,72.7817948,26303m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3be7b6e8311491bd:0xc73ae05a3d1e8022!2m2!1d72.8375031!2d19.1951765?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full relative"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6659714887355!2d72.83688897595677!3d19.18664398204068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ecd037aa2b%3A0xe58b0f9486743952!2sOur%20Lady%20Of%20Lourdes%20Church%20Orlem%20Malad%20West!5e0!3m2!1sen!2sin!4v1706300000000!5m2!1sen!2sin&maptype=satellite"
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    willChange: "filter, transform",
                                    transform: "translateZ(0)",
                                    WebkitBackfaceVisibility: "hidden",
                                    backfaceVisibility: "hidden",
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full pointer-events-none grayscale invert opacity-75 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none"></div>
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
