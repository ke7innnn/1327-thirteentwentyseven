"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch-primary devices (phones/tablets)
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        setIsTouchDevice(isTouch);
    }, []);

    // On touch devices, skip Lenis entirely — native mobile scroll is smooth
    // and Lenis's momentum interpolation causes reverse-scroll glitches
    if (isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.12,
                duration: 1.0,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
