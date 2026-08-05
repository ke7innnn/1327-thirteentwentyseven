"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function TravellingObject() {
    const reduced = useReducedMotion() ?? false;
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [anchorsLoaded, setAnchorsLoaded] = useState<boolean>(false);

    // Raw animated values
    const [currentTransform, setCurrentTransform] = useState({
        x: 0,
        y: 0,
        width: 320,
        scale: 1.0,
        rotation: -3,
        printOpacity: 0,
    });

    const anchorRects = useRef<{ hero: Rect | null; cards: Rect | null; manifesto: Rect | null }>({
        hero: null,
        cards: null,
        manifesto: null,
    });

    // Track total page scroll progress (0..1)
    const { scrollYProgress } = useScroll();

    // Smooth inertia physics (scrub: 1 catch-up)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 24,
        restDelta: 0.0001,
    });

    // Detect mobile viewport (< 768px)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Measure anchor positions using FLIP approach (recomputes on resize and fonts ready)
    const updateAnchorRects = useCallback(() => {
        if (typeof window === "undefined") return;

        const getRect = (selector: string): Rect | null => {
            const el = document.querySelector(selector);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                width: r.width,
                height: r.height,
            };
        };

        const hero = getRect('[data-anchor="hero"]');
        const cards = getRect('[data-anchor="cards"]');
        const manifesto = getRect('[data-anchor="manifesto"]');

        if (hero || cards || manifesto) {
            anchorRects.current = { hero, cards, manifesto };
            setAnchorsLoaded(true);
        }
    }, []);

    useEffect(() => {
        updateAnchorRects();

        // Recompute on window resize & scroll
        const handleResize = () => {
            updateAnchorRects();
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("scroll", updateAnchorRects, { passive: true });

        if (typeof document !== "undefined" && document.fonts) {
            document.fonts.ready.then(updateAnchorRects);
        }

        const timer = setTimeout(updateAnchorRects, 500);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", updateAnchorRects);
            clearTimeout(timer);
        };
    }, [updateAnchorRects]);

    // Interpolate transform based on smoothProgress
    useEffect(() => {
        return smoothProgress.on("change", (p) => {
            const { hero, cards, manifesto } = anchorRects.current;
            if (!hero && !cards && !manifesto) return;

            // Fallback default rects if any anchor is temporarily unmeasured
            const defaultHero: Rect = hero || { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45, width: 340, height: 340 };
            const defaultCards: Rect = cards || { x: window.innerWidth * 0.78, y: window.innerHeight * 0.5, width: 140, height: 140 };
            const defaultManifesto: Rect = manifesto || { x: window.innerWidth * 0.5, y: window.innerHeight * 0.75, width: 110, height: 110 };

            let x = defaultHero.x;
            let y = defaultHero.y;
            let scale = 1.0;
            let rotation = -3;
            let printOpacity = 0;

            if (p <= 0.45) {
                // Segment 1: Hero -> Cards (0.00 to 0.45)
                const t = Math.max(0, Math.min(1, p / 0.45));
                // Ease curve
                const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

                x = defaultHero.x + (defaultCards.x - defaultHero.x) * easeT;
                y = defaultHero.y + (defaultCards.y - defaultHero.y) * easeT;
                scale = 1.0 + (0.34 - 1.0) * easeT;
                rotation = -3 + (2 - (-3)) * easeT;
                printOpacity = 0.4 * easeT;
            } else {
                // Segment 2: Cards -> Manifesto (0.45 to 1.00)
                const t = Math.max(0, Math.min(1, (p - 0.45) / 0.55));
                const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

                x = defaultCards.x + (defaultManifesto.x - defaultCards.x) * easeT;
                y = defaultCards.y + (defaultManifesto.y - defaultCards.y) * easeT;
                scale = 0.34 + (0.18 - 0.34) * easeT;
                rotation = 2 + (0 - 2) * easeT;
                printOpacity = 0.4 + (1.0 - 0.4) * easeT;
            }

            setCurrentTransform({
                x,
                y,
                width: defaultHero.width,
                scale,
                rotation,
                printOpacity,
            });
        });
    }, [smoothProgress]);

    // Desktop continuous travelling layer (Hidden on mobile or prefers-reduced-motion)
    if (isMobile || reduced) return null;

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 z-40 pointer-events-none will-change-transform mix-blend-multiply"
            style={{
                transform: `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0px) translate(-50%, -50%) scale(${currentTransform.scale}) rotate(${currentTransform.rotation}deg)`,
                transformOrigin: "center center",
                width: "360px",
                height: "360px",
                opacity: anchorsLoaded ? 1 : 0,
                transition: "opacity 0.4s ease-out",
            }}
        >
            <div className="relative w-full h-full">
                {/* Blank Tee */}
                <Image
                    src="/tee-blank.png"
                    alt=""
                    fill
                    priority
                    sizes="360px"
                    className="object-contain select-none"
                />

                {/* Printed Tee Overlay (In perfect register cross-fade) */}
                <div
                    className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out"
                    style={{ opacity: currentTransform.printOpacity }}
                >
                    <Image
                        src="/tee-printed.png"
                        alt=""
                        fill
                        priority
                        sizes="360px"
                        className="object-contain select-none"
                    />
                </div>
            </div>
        </div>
    );
}
