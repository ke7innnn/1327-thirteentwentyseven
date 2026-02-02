"use client";

import { useScroll, useMotionValueEvent, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MissionCanvasProps {
    numFrames: number;
    scrollDuration?: number; // vh height
    children?: React.ReactNode | ((progress: any) => React.ReactNode);
}

export default function MissionCanvas({
    numFrames,
    scrollDuration = 300, // Taller for slower playback
    children,
}: MissionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= numFrames; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    // Assumes format ezgif-frame-001.jpg etc. as seen in ls output
                    const p = i.toString().padStart(3, "0");
                    img.src = `/missiovid/ezgif-frame-${p}.jpg`;
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                    loadedImages[i - 1] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setLoaded(true);
        };

        loadImages();
    }, [numFrames]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll 0-1 to frame index 0-(numFrames-1)
    const renderIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        // Clear and draw relative to viewport size since it's full screen background
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Ensure canvas matches window size
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        const img = images[index];

        // Object-fit: cover logic
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = height * imgRatio;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, width, height);
        // Fallback bg
        ctx.fillStyle = "#105233";
        ctx.fillRect(0, 0, width, height);

        // Draw image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Stylish Gradient Overlay
        // Keeps center brighter for video colors, darkens edges/top/bottom for text
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "rgba(10, 31, 10, 0.8)");   // Darker top for header
        gradient.addColorStop(0.3, "rgba(10, 31, 10, 0.4)"); // Lighter upper-mid
        gradient.addColorStop(0.7, "rgba(10, 31, 10, 0.4)"); // Lighter lower-mid
        gradient.addColorStop(1, "rgba(10, 31, 10, 0.9)");   // Dark base

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add a subtle color tint to unify with brand
        ctx.fillStyle = "rgba(201, 255, 35, 0.05)"; // Very faint brand green tint
        ctx.globalCompositeOperation = "overlay";
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over"; // Reset

    };

    useMotionValueEvent(renderIndex, "change", (latest) => {
        if (!loaded) return;
        const frameIndex = Math.min(
            numFrames - 1,
            Math.max(0, Math.floor(latest))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial render and resize
    useEffect(() => {
        const handleResize = () => {
            const currentProgress = renderIndex.get();
            const frameIndex = Math.min(numFrames - 1, Math.max(0, Math.floor(currentProgress)));
            if (loaded && images.length > 0) {
                renderFrame(frameIndex);
            }
        };
        window.addEventListener("resize", handleResize);
        // Trigger once
        if (loaded) handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded, images, renderIndex, numFrames]);

    return (
        <div ref={containerRef} className="relative z-10 p-0" style={{ height: `${scrollDuration}vh` }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {!loaded && (
                    <div className="absolute inset-0 bg-[#105233] z-0 flex items-center justify-center">
                        {/* Placeholder or loading state if needed */}
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {typeof children === "function" ? children(scrollYProgress) : children}
                </div>
            </div>
        </div>
    );
}
