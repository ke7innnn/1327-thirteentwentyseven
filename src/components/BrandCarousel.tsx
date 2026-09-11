"use client";

import Image from "next/image";

const logos = [
    { src: "/client logo/BERLIN BREW LOGO-1.webp", alt: "Berlin Brew — 1327 custom apparel client" },
    { src: "/client logo/east.webp", alt: "East — 1327 custom uniforms client" },
    { src: "/client logo/home.webp", alt: "Home — 1327 custom t-shirts client" },
    { src: "/client logo/katha.webp", alt: "Katha — 1327 branded apparel client" },
    { src: "/client logo/magari.webp", alt: "Magari — 1327 custom merchandise client" },
    { src: "/client logo/nana.webp", alt: "Nana — 1327 embroidered apparel client" },
    { src: "/client logo/unscripted.webp", alt: "Unscripted — 1327 custom t-shirts client" },
    { src: "/client logo/benne.webp", alt: "Benne — 1327 custom uniforms client" },
    { src: "/client logo/jaago.webp", alt: "Jaago — 1327 custom apparel client Mumbai" },
    { src: "/client logo/nadda.webp", alt: "Nadda — 1327 branded uniforms client" },
    { src: "/client logo/tiger.webp", alt: "Tiger — 1327 custom merchandise client" },
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
            <div
                className="flex items-center gap-8 md:gap-16 animate-infinite-scroll will-change-transform"
                style={{ width: "max-content" }}
            >
                {/* Primary track for screen readers */}
                <div className="flex items-center gap-8 md:gap-16">
                    {logos.map((logo, index) => (
                        <div
                            key={`primary-${index}`}
                            className="relative flex-shrink-0 w-[120px] h-[70px] md:w-[200px] md:h-[110px]"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                sizes="(max-width: 768px) 120px, 200px"
                                quality={80}
                                className="object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicate track for continuous marquee — hidden from screen readers */}
                <div className="flex items-center gap-8 md:gap-16" aria-hidden="true">
                    {logos.map((logo, index) => (
                        <div
                            key={`duplicate-${index}`}
                            className="relative flex-shrink-0 w-[120px] h-[70px] md:w-[200px] md:h-[110px]"
                        >
                            <Image
                                src={logo.src}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 120px, 200px"
                                quality={80}
                                className="object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

