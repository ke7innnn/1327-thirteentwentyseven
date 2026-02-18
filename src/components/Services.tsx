"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
    {
        title: "Relaxed Fit T-shirts",
        description: "Relaxed Fit t-shirts to give a relaxed vibe and feel 240-270 gsm. Embroidery looks richer in oversized T-shirts.",
        image: "/servicepics/newovwersized.jpg"
    },
    {
        title: "Polo T-shirts",
        description: "Polo neck T-shirts combines the comfort of a T-shirt with a slightly dressier look, 190-200 gsm.",
        image: "/new%20polo/Gemini_Generated_Image_ehjvfxehjvfxehjv.png"
    },
    {
        title: "Aprons",
        description: "In aprons we can customise cut, shape, stitching and embroidery as per requirement. For aprons embroidery is preferred over print.",
        image: "/servicepics/apron.png"
    },
    {
        title: "Straight Fit T-shirts",
        description: "The Straight fit T-shirt is our regular everyday T-shirt. Light weight, breathable, nothing too fancy, 140-180gsm.",
        image: "/servicepics/straightfit.png"
    },
    {
        title: "Caps",
        description: "to match your brand’s style. Customisation : Embroidery",
        image: "/servicepics/newcap.png"
    },
];

export default function Services() {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Range
    // Tuned to -85% to ensure the last card (now 5 items) comes fully into view
    // Shifted start to 0.1 to let the title "be there" before movement starts
    // Adjusted to end at 0.85 to allow the last card to be fully visible before fade out
    const xRaw = useTransform(scrollYProgress, [0.1, 0.85], ["1%", "-85%"]);
    const x = useSpring(xRaw, { stiffness: 80, damping: 30, mass: 0.5 });

    // Title Animation: Removed Staggered Entrance
    // User requested "Our Services" to "already be here".
    // Removed x1, x2, x3 transforms. Title is now static/standard.

    // Title is always visible - no fade out
    // No exit animation - content stays visible until user scrolls past

    return (
        <section ref={targetRef} className="relative z-20 h-[550vh] bg-[#105233] text-white">
            {/* 
                Top Gradient Extension: Creates a smooth transition from the previous section (Green)
                Extends upwards (-top-25vh) to blend the green background into BACKGROUND GREEN (#105233) before the hard edge.
                Updated to match Brand Green theme.
            */}
            <div className="absolute -top-[25vh] left-0 right-0 h-[25vh] bg-gradient-to-t from-[#105233] to-transparent pointer-events-none" />



            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Header - always visible, no fade */}
                <div className="absolute top-10 left-6 md:top-20 md:left-20 z-20 mix-blend-normal origin-left">
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#fdfbcf] mb-2 font-heading">
                        Our Services
                    </h3>
                    <h2 className="text-5xl md:text-8xl font-thin tracking-tighter text-white font-heading flex flex-col gap-0 leading-[0.85]">
                        <span className="block">WHAT</span>
                        <span className="block">WE</span>
                        <span className="block">OFFER</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[50vw] md:pl-[40vw]">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </motion.div>
            </div>


        </section>
    );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    return (
        <div className="group relative h-[450px] w-[350px] md:h-[600px] md:w-[500px] flex-shrink-0 overflow-hidden rounded-sm border border-[#105233]/20 bg-white shadow-xl">
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-100 transition-opacity duration-500"
                />
            </div>

            {/* Dark Overlay for Text Visibility on Card */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <span className="text-[#fdfbcf] font-mono text-xl mb-4">0{index + 1}</span>
                <h3 className="text-3xl md:text-5xl font-heading text-white mb-4 uppercase leading-none">
                    {service.title}
                </h3>
                <p className="text-gray-200 font-light text-lg transition-colors duration-500">
                    {service.description}
                </p>
            </div>
        </div>
    );
}
