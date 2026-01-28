"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollyCanvasProps {
    numFrames?: number;
    scrollDuration?: number;
    children?: React.ReactNode;
}

export default function ScrollyCanvas({
    children,
}: ScrollyCanvasProps) {
    // Video removed as per request. Keeping section structure.

    return (
        <section className="relative z-10 py-32 bg-transparent border-b border-white/10">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#C9FF23] mb-2 font-heading">
                        Our Services
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-thin tracking-tighter text-white font-heading">
                        WHAT WE OFFER
                    </h3>
                </div>



                {children}
            </div>
        </section>
    );
}
