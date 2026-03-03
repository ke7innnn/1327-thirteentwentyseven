"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorSize = 20;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isTouch, setIsTouch] = useState(false);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const isHoveringRef = useRef(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    useEffect(() => {
        // Detect touch device and bail out
        const isTouchDevice = window.matchMedia("(hover: none)").matches;
        if (isTouchDevice) {
            setIsTouch(true);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hovering = !!target.closest("a, button, [role='button']");
            if (hovering !== isHoveringRef.current) {
                isHoveringRef.current = hovering;
                setIsHoveringLink(hovering);
            }
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    // Don't render on touch devices
    if (isTouch) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
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
                    backgroundColor: isHoveringLink ? "#fdfbcf" : "#ffffff",
                }}
                className="w-full h-full rounded-full"
                style={{
                    backgroundColor: "#ffffff",
                }}
            />
        </motion.div>
    );
}
