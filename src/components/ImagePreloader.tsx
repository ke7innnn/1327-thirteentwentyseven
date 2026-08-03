"use client";

import { useEffect } from "react";

const HERO_PRELOAD_FRAMES = Array.from({ length: 30 }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `/sequence/ezgif-frame-${num}.jpg`;
});

const CRITICAL_IMAGES = [
    ...HERO_PRELOAD_FRAMES,
    // Service pictures
    "/servicepics/newovwersized.jpg",
    "/servicepics/straightfit.png",
    "/servicepics/newpolo.png",
    "/servicepics/hoodie.png",
    "/servicepics/apron-full.jpg",
    "/servicepics/apron-half.jpg",
    "/servicepics/apron-vest.jpg",
    "/servicepics/newcap.png",
    "/servicepics/totebag.png",
    "/servicepics/veganleather-main.jpg",
    "/servicepics/veganleather-pouches.jpg",
    "/servicepics/veganleather-coasters.jpg",
    "/servicepics/veganleather-sleeves.jpg",
    "/servicepics/veganleather-placemats.jpg",
    // About us
    "/aboutus/about-1.png",
    "/aboutus/about-2.png",
    "/aboutus/about-3.png",
    "/aboutus/about-4.png",
    // Clients
    "/clients/client-1.png",
    "/clients/client-2.png",
    "/clients/client-3.jpeg",
    "/clients/client-4.jpeg",
    "/clients/client-5.jpeg",
    "/clients/client-6.jpeg",
    "/clients/client-7.jpeg",
    // Client logos
    "/client logo/BERLIN BREW LOGO-1.png",
    "/client logo/east.png",
    "/client logo/home.png",
    "/client logo/katha.png",
    "/client logo/magari.png",
    "/client logo/nana.png",
    "/client logo/unscripted.png",
    "/client logo/benne.png",
    "/client logo/jaago.png",
    "/client logo/nadda.png",
    "/client logo/tiger.png",
    // Backgrounds & logo
    "/bg/craftsmanship_bg.png",
    "/logo/1327_logo_v2.png",
];

export default function ImagePreloader() {
    useEffect(() => {
        // Preload all critical images asynchronously into browser HTTP cache
        CRITICAL_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null;
}
