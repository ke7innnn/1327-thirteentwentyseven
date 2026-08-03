"use client";

import { ReactLenis } from "lenis/react";
import { useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouchDevice] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

    // On touch devices, skip Lenis entirely — native mobile scroll is smooth
    // and Lenis's momentum interpolation causes reverse-scroll glitches
    if (isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.14,
                smoothWheel: true,
                wheelMultiplier: 1.0,
            }}
        >
            {children}
        </ReactLenis>
    );
}
