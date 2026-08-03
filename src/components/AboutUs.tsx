"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 3]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -3]);

    // Exit parallax/fade
    const yExit = useTransform(scrollYProgress, [0.9, 1], [0, 300]);
    const opacityExit = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    return (
        <section
            id="about"
            ref={containerRef}
            aria-label="About 1327 Thirteen Twenty Seven"
            className="relative z-10 py-20 md:py-32 bg-transparent text-white overflow-hidden"
        >
            <motion.div
                style={{ y: yExit, opacity: opacityExit }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col md:flex-row items-start gap-24 md:gap-16 relative">

                    {/* Text Column (Left) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 relative md:sticky md:top-28 self-start z-30 flex flex-col gap-8"
                    >
                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1EA86E] block mb-2 font-mono">
                                / Why We Exist
                            </span>
                            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-heading text-white">
                                <span>It Runs On </span>
                                <span className="text-[#1EA86E] block">Family.</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6 text-white/80 font-light font-sans text-base md:text-lg leading-relaxed max-w-xl">
                            <p>
                                1327 was born in Mumbai on a code borrowed from the Fast &amp; Furious films and lived out on the street — nothing matters more than family. We don&apos;t chase orders; we build relationships that outlast trends.
                            </p>
                            <p>
                                Founded by Keith Shah, we work shoulder-to-shoulder with cafés, kitchens, studios and crews across the city — designing, stitching and embroidering uniforms their teams are proud to pull on every shift.
                            </p>
                        </div>

                        {/* Values List with Dividers */}
                        <motion.div 
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-5% 0px" }}
                            variants={{
                                initial: { opacity: 0 },
                                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="flex flex-col border-t border-white/10 w-full max-w-md mt-4"
                        >
                            {[
                                { num: "01", text: "Community" },
                                { num: "02", text: "Trust" },
                                { num: "03", text: "Respect" },
                                { num: "04", text: "Loyalty" }
                            ].map((item) => (
                                <motion.div 
                                    key={item.num} 
                                    variants={{
                                        initial: { opacity: 0, x: -20 },
                                        animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    className="flex items-center gap-4 py-4 border-b border-white/10"
                                >
                                    <span className="text-[#1EA86E] font-mono text-xs font-bold">{item.num}</span>
                                    <span className="uppercase text-sm sm:text-base font-bold font-heading tracking-widest text-white">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Image Grid Column (Right) */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 relative">
                        {/* Column 1 — parallax only on md+ */}
                        <motion.div style={{ y: y1, rotate: rotate1 }} className="flex flex-col gap-3 sm:gap-6 md:gap-8">
                            <InteractiveImageCard
                                src="/aboutus/about-3.png"
                                alt="1327 team crafting uniforms in Malad West"
                                label="THE WORKSHOP - MALAD WEST"
                                placeholder="Drop: team crafting uniforms"
                            />
                            <InteractiveImageCard
                                src="/aboutus/about-1.png"
                                alt="1327 custom branded t-shirts showcase"
                                label="THE RANGE - SS/26"
                                placeholder="Drop: apparel showcase"
                            />
                        </motion.div>

                        {/* Column 2 — offset only on md+, flat on mobile */}
                        <motion.div style={{ y: y2, rotate: rotate2 }} className="flex flex-col gap-3 sm:gap-6 md:gap-8 md:mt-24">
                            <InteractiveImageCard
                                src="/aboutus/about-2.png"
                                alt="Custom embroidery work by 1327 Mumbai"
                                label="THE STITCH - MACRO"
                                placeholder="Drop: embroidery close-up"
                            />
                            <InteractiveImageCard
                                src="/aboutus/about-4.png"
                                alt="Premium custom apparel by 1327 Thirteen Twenty Seven"
                                label="THE FIT - ON CREW"
                                placeholder="Drop: crew fitting / detail"
                            />
                        </motion.div>
                    </div>

                </div>
            </motion.div>

            {/* Smooth Transition Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
        </section>
    );
}

function InteractiveImageCard({ src, alt, label, placeholder }: { src: string, alt: string, label: string, placeholder: string }) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUploadedImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBoxClick}
            className={`group relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none bg-white/[0.02]
                ${isDragging ? "border-[#1EA86E] bg-[#1EA86E]/5 scale-[1.01]" : "hover:border-white/30 hover:bg-white/[0.04]"}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Image Preview Container */}
            <div className="relative w-full flex-1 overflow-hidden">
                <Image
                    src={uploadedImage || src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 flex flex-col items-center justify-center p-4">
                    {/* Upload icon/text overlays on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#1EA86E]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0 3.75-3.75M12 21l-3.75-3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold">{placeholder}</span>
                        <span className="text-[8px] font-mono tracking-widest uppercase opacity-60">or click to change</span>
                    </div>
                </div>
            </div>

            {/* Label Footer */}
            <div className="w-full py-3 px-4 border-t border-white/10 bg-black/90 flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold text-white/60 group-hover:text-[#1EA86E] transition-colors duration-300">
                    {label}
                </span>
            </div>
        </div>
    );
}
