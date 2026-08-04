"use client";

import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouchDevice] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
    const [isLowEndDevice, setIsLowEndDevice] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            // Check if 1-2GB RAM or low CPU core count
            const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
            const cores = navigator.hardwareConcurrency;
            if ((memory && memory <= 2) || (cores && cores <= 4)) {
                setIsLowEndDevice(true);
            }
        }
    }, []);

    // On touch devices, skip Lenis entirely — native mobile scroll is smooth
    if (isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: isLowEndDevice ? 0.18 : 0.12, // Snappier response on low-spec PCs to avoid lag
                smoothWheel: true,
                wheelMultiplier: 1.0,
                touchMultiplier: 1.2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
