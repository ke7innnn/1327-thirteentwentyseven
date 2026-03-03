"use client";

import Image from "next/image";

const logos = [
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
                {allLogos.map((src, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0"
                        style={{ width: "200px", height: "110px" }}
                    >
                        <Image
                            src={src}
                            alt="Brand Logo"
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
