"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorSize = 20;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isHoveringLink, setIsHoveringLink] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], iframe")) {
                setIsHoveringLink(true);
            } else {
                setIsHoveringLink(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block" // Hidden on mobile
            style={{
                x: cursorX,
                y: cursorY,
                width: cursorSize,
                height: cursorSize,
            }}
        >
            <motion.div
                animate={{
                    scale: isHoveringLink ? 2.5 : 1,
                    opacity: isHoveringLink ? 0.8 : 1,
                    backgroundColor: isHoveringLink ? "#fdfbcf" : "#ffffff", // Note Cream on hover, White normally
                }}
                className="w-full h-full rounded-full mix-blend-difference"
                style={{
                    backgroundColor: "#ffffff",
                }}
            />
        </motion.div>
    );
}
