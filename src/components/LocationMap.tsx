"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, viewportConfig } from "@/lib/motion";

export default function LocationMap() {
    return (
        <motion.section
            className="relative w-full h-[50vh] min-h-[400px] overflow-hidden group cursor-pointer border-t border-b border-white/10"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: EASING }}
        >
            <a
                href="https://www.google.com/maps/dir/19.3691648,72.82688/Our+Lady+of+Lourdes+Church,+Orlem,+Marve+Road,+Malad+-+Marve+Rd,+Orlem,+Malad+West,+Mumbai,+Maharashtra+400064/@19.2972529,72.7817948,26303m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3be7b6e8311491bd:0xc73ae05a3d1e8022!2m2!1d72.8375031!2d19.1951765?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
            >
                {/* Map Iframe Background */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out scale-105 group-hover:scale-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6659714887355!2d72.83688897595677!3d19.18664398204068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ecd037aa2b%3A0xe58b0f9486743952!2sOur%20Lady%20Of%20Lourdes%20Church%20Orlem%20Malad%20West!5e0!3m2!1sen!2sin!4v1706300000000!5m2!1sen!2sin&maptype=satellite"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full pointer-events-none grayscale invert contrast-125 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 transition-all duration-700"
                    ></iframe>
                    {/* Dark overlay for text contrast - Lighter on dark map, darker on light map? 
                         Reference image is very dark. Inverted map is dark. 
                         Let's keep a subtle overlay that fades out or adjusts.
                     */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-700"></div>
                </div>

                {/* Overlaid Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: DURATION.slow, ease: EASING }}
                        className="text-4xl md:text-7xl font-thin tracking-tighter text-white font-heading mix-blend-overlay group-hover:mix-blend-normal transition-all duration-700"
                    >
                        BORN IN MALAD
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={viewportConfig}
                        transition={{ duration: DURATION.normal, ease: EASING, delay: 0.2 }}
                        className="h-[1px] bg-[#fdfbcf] mt-6 group-hover:w-[200px] transition-all duration-700"
                    ></motion.div>
                </div>
            </a>
        </motion.section>
    );
}
