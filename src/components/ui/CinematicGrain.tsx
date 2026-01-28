"use client";

import { motion } from "framer-motion";

export default function CinematicGrain() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-overlay"
        >
            <div
                className="absolute inset-0 w-full h-full opacity-[0.07]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    filter: "contrast(120%) brightness(100%)",
                }}
            />
        </motion.div>
    );
}
