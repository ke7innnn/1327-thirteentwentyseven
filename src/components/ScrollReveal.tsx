"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    yOffset?: number;
    offset?: any;
    duration?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    yOffset = 100,
    offset = ["start end", "center center"]
}: ScrollRevealProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset
    });

    const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
