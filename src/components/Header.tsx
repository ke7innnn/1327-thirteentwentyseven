"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/motion";
import ContactModal from "./ContactModal";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest < 50) {
            setHidden(false);
        } else if (latest > previous && latest > 150) {
            // Scrolling DOWN -> hide navbar
            setHidden(true);
        } else if (latest < previous) {
            // Scrolling UP (opposite scroll direction) -> show navbar
            setHidden(false);
        }
    });

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: "Mission", href: "#mission" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Clients", href: "#clients" },
        { label: "Location", href: "#location" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" }
                }}
                animate={hidden && !isOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#105233]/95 backdrop-blur-md border-b border-[#1EA86E]/40 shadow-md px-6 py-2 flex items-center justify-between h-16 transform-gpu"
            >

                {/* Left: MENU Text Button - Wrapped in Width Container for Balance */}
                <div className="w-24 flex justify-start">
                    <motion.button
                        onClick={toggleMenu}
                        className="relative z-50 text-white hover:text-white/80 transition-colors focus:outline-none text-sm font-mono tracking-[0.2em] font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: EASING }}
                    >
                        {isOpen ? "CLOSE" : "MENU"}
                    </motion.button>
                </div>

                {/* Center: Logo (Flexbox Centering) - Thinner Profile */}
                <div className="flex-1 flex justify-center h-full items-center overflow-hidden">
                    <Link href="/" className="block relative h-full flex items-center justify-center">
                        <Image
                            src="/logo/1327_logo_v2.png"
                            alt="1327 Logo"
                            width={48}
                            height={48}
                            className="w-auto h-[48px] object-contain"
                            unoptimized
                            priority
                        />
                    </Link>
                </div>

                {/* Right: Reach Out Symbol & Permanent Button */}
                <div className="w-auto flex justify-end">
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="flex items-center gap-2.5 relative z-50 text-white hover:text-white/80 transition-all duration-180 ease-out focus:outline-none group cursor-pointer hover:translate-x-1"
                        aria-label="Reach Out"
                    >
                        <span className="hidden sm:block text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white transition-colors">
                            REACH OUT
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-180 ease-out">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </button>
                </div>
            </motion.header>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            {/* Menu Drawer & Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-black/60"
                        />

                        {/* Left Sidebar Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: DURATION.slow, ease: EASING }}
                            className="fixed top-0 left-0 bottom-0 w-full md:w-[400px] z-50 bg-[#0a0a0a] border-r border-white/10 flex flex-col justify-center px-12"
                        >
                            <nav className="flex flex-col gap-8">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: DURATION.normal,
                                            ease: EASING,
                                            delay: STAGGER.normal * index
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => {
                                                if (item.href === "#contact") {
                                                    e.preventDefault();
                                                    setIsOpen(false);
                                                    setIsContactOpen(true);
                                                } else {
                                                    toggleMenu();
                                                }
                                            }}
                                            className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white hover:text-[#1EA86E] transition-transform duration-180 ease-out hover:translate-x-3 block"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
