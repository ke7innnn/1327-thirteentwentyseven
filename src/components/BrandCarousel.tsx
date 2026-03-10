"use client";

import Image from "next/image";

const logos = [
    { src: "/client logo/BERLIN BREW LOGO-1.png", alt: "Berlin Brew — 1327 custom apparel client" },
    { src: "/client logo/east.png", alt: "East — 1327 custom uniforms client" },
    { src: "/client logo/home.png", alt: "Home — 1327 custom t-shirts client" },
    { src: "/client logo/katha.png", alt: "Katha — 1327 branded apparel client" },
    { src: "/client logo/magari.png", alt: "Magari — 1327 custom merchandise client" },
    { src: "/client logo/nana.png", alt: "Nana — 1327 embroidered apparel client" },
    { src: "/client logo/unscripted.png", alt: "Unscripted — 1327 custom t-shirts client" },
    { src: "/client logo/benne.png", alt: "Benne — 1327 custom uniforms client" },
    { src: "/client logo/jaago.png", alt: "Jaago — 1327 custom apparel client Mumbai" },
    { src: "/client logo/nadda.png", alt: "Nadda — 1327 branded uniforms client" },
    { src: "/client logo/tiger.png", alt: "Tiger — 1327 custom merchandise client" },
];

// Duplicate logos for seamless loop
const allLogos = [...logos, ...logos];

export default function BrandCarousel() {
    return (
        <div
            className="w-full overflow-hidden py-8 relative z-20"
            style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
        >
            {/* CSS animation instead of framer-motion animate */}
            <div
                className="flex items-center gap-12 md:gap-16 animate-infinite-scroll"
                style={{ width: "max-content" }}
            >
                {allLogos.map((logo, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0"
                        style={{ width: "200px", height: "110px" }}
                    >
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            fill
                            className="object-contain"
                            loading="lazy"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
