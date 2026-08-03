"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, MessageSquare, Phone, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requirements: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-xl z-0"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 bg-[#0a0a0a] border border-white/20 w-full max-w-lg rounded-md shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto text-white"
                    >
                        {/* Header bar */}
                        <div className="p-6 sm:p-8 pb-0 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-[#1EA86E] animate-pulse" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1EA86E] font-bold">
                                        MALAD WEST · MUMBAI
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight uppercase">
                                    REACH OUT
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 sm:p-8 pt-4">
                            <p className="text-white/60 text-xs sm:text-sm font-mono mb-6 leading-relaxed text-left">
                                Tell us about your crew, custom apparel, or uniform requirements.
                            </p>

                            {/* Direct Quick Channels */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <a
                                    href="https://wa.me/918082845721?text=Hi%201327!%20I%20want%20to%20inquire%20about%20custom%20apparel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/35 border border-[#25D366]/50 text-[#25D366] py-3 px-3 rounded-sm font-mono text-xs font-bold tracking-wider transition-all"
                                >
                                    <MessageSquare size={16} />
                                    <span>WHATSAPP</span>
                                </a>
                                <a
                                    href="tel:+918082845721"
                                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-3 rounded-sm font-mono text-xs font-bold tracking-wider transition-all"
                                >
                                    <Phone size={16} className="text-[#1EA86E]" />
                                    <span>CALL DIRECT</span>
                                </a>
                            </div>

                            <div className="relative flex items-center justify-center mb-6">
                                <div className="w-full h-px bg-white/15" />
                                <span className="absolute bg-[#0a0a0a] px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                                    OR SEND US AN INQUIRY
                                </span>
                            </div>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-10 flex flex-col items-center justify-center text-center gap-3"
                                >
                                    <CheckCircle2 size={52} className="text-[#1EA86E]" />
                                    <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">INQUIRY READY!</h3>
                                    <p className="font-mono text-xs text-white/70 max-w-xs leading-relaxed">
                                        Opening your mail app with pre-filled inquiry details...
                                    </p>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const { firstName, lastName, email, phone, requirements } = formData;
                                        const subject = encodeURIComponent(`Inquiry from ${firstName} ${lastName} - 1327 Website`);
                                        const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nRequirements:\n${requirements}`);

                                        setIsSubmitted(true);
                                        setTimeout(() => {
                                            window.location.href = `mailto:1327thecommunity@gmail.com?subject=${subject}&body=${body}`;
                                        }, 300);

                                        setTimeout(() => {
                                            setIsSubmitted(false);
                                            setFormData({ firstName: "", lastName: "", email: "", phone: "", requirements: "" });
                                            onClose();
                                        }, 2200);
                                    }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1 text-left">
                                            <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold block">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full bg-black/60 border border-white/20 rounded-sm p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                            />
                                        </div>
                                        <div className="space-y-1 text-left">
                                            <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold block">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full bg-black/60 border border-white/20 rounded-sm p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1 text-left">
                                            <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold block">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-black/60 border border-white/20 rounded-sm p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                placeholder="crew@domain.com"
                                            />
                                        </div>

                                        <div className="space-y-1 text-left">
                                            <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold block">Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-black/60 border border-white/20 rounded-sm p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                placeholder="+91..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-left">
                                        <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold block">Requirements *</label>
                                        <textarea
                                            name="requirements"
                                            required
                                            value={formData.requirements}
                                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                            rows={3}
                                            className="w-full bg-black/60 border border-white/20 rounded-sm p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans resize-none"
                                            placeholder="Custom t-shirts, uniforms, aprons, MOQ details..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#1EA86E] hover:bg-[#168a57] text-black font-mono text-xs font-bold uppercase tracking-widest py-4 mt-2 flex items-center justify-center gap-2 transition-all rounded-sm group cursor-pointer"
                                    >
                                        <span>SEND INQUIRY</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
