"use client";

import { useEffect } from "react";

const INITIAL_PRELOAD = [
    "/logo/1327_logo_v2.png",
    "/sequence/ezgif-frame-001.webp",
    "/sequence/ezgif-frame-002.webp",
    "/sequence/ezgif-frame-003.webp",
    "/sequence/ezgif-frame-004.webp",
    "/sequence/ezgif-frame-005.webp",
];

const IDLE_IMAGES = [
    "/servicepics/newovwersized.webp",
    "/servicepics/straightfit.webp",
    "/servicepics/newpolo.webp",
    "/servicepics/hoodie.webp",
    "/clients/client-1.webp",
    "/clients/client-2.webp",
    "/clients/client-3.webp",
    "/clients/client-4.webp",
];

export default function ImagePreloader() {
    useEffect(() => {
        // Immediate preload of only critical initial assets
        INITIAL_PRELOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        // Background idle preloading — does not compete with critical rendering
        const loadIdleAssets = () => {
            let i = 0;
            const interval = setInterval(() => {
                if (i >= IDLE_IMAGES.length) {
                    clearInterval(interval);
                    return;
                }
                const img = new Image();
                img.src = IDLE_IMAGES[i];
                i++;
            }, 250);
        };

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadIdleAssets);
        } else {
            const timer = setTimeout(loadIdleAssets, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    return null;
}
