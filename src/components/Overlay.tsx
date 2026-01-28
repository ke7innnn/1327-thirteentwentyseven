"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import { useMotionValue } from "framer-motion";
import clsx from "clsx";

export default function Overlay() {
    const renderIndex = useMotionValue(0);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            {/* Section 1: Center */}
            {/* Section 1: Center */}
            <Section
                minFrame={0}
                maxFrame={60}
                renderIndex={renderIndex}
                className="items-center justify-center text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    className="text-6xl md:text-9xl font-thin tracking-tighter text-white mix-blend-difference mb-4"
                >
                    NEW <span className="text-[#fdfbcf]">SEASON</span>
                </motion.h1>
                <motion.p className="text-xs md:text-sm uppercase tracking-[0.5em] text-gray-400">
                    Designed for the bold
                </motion.p>
            </Section>

            {/* Section 2: Left */}
            <Section
                minFrame={70}
                maxFrame={130}
                renderIndex={renderIndex}
                className="items-center justify-start pl-10 md:pl-24"
            >
                <div className="max-w-lg">
                    <h2 className="text-4xl md:text-8xl font-light text-white leading-[0.9]">
                        SCULPTED<br />SILHOUETTES
                    </h2>
                    <p className="mt-6 text-sm text-gray-400 font-mono tracking-widest">
                        PRECISION CUT. PREMIUM FABRICS.
                    </p>
                </div>
            </Section>

            {/* Section 3: Right */}
            <Section
                minFrame={140}
                maxFrame={205}
                renderIndex={renderIndex}
                className="items-center justify-end pr-10 md:pr-24 text-right"
            >
                <div className="max-w-lg ml-auto">
                    <h2 className="text-4xl md:text-8xl font-light text-white leading-[0.9]">
                        STREET<br />MEETS LUXURY
                    </h2>
                    <p className="mt-6 text-sm text-gray-400 font-mono tracking-widest">
                        LIMITED EDITION.
                    </p>
                </div>
            </Section>
        </div>
    );
}

interface SectionProps {
    children: React.ReactNode;
    minFrame: number;
    maxFrame: number;
    renderIndex: MotionValue<number>;
    className?: string;
}

function Section({ children, minFrame, maxFrame, renderIndex, className }: SectionProps) {
    const range = maxFrame - minFrame;
    const fadeInEnd = minFrame + range * 0.2;
    const fadeOutStart = maxFrame - range * 0.2;

    const opacity = useTransform(
        renderIndex,
        [minFrame, fadeInEnd, fadeOutStart, maxFrame],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        renderIndex,
        [minFrame, maxFrame],
        [50, -50]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={clsx("absolute inset-0 flex w-full h-full", className)}
        >
            {children}
        </motion.div>
    );
}
