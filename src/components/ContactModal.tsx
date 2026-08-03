"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight, MessageSquare, Phone, Mail, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requirements: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, requirements } = formData;

        const subject = encodeURIComponent(`Inquiry from ${firstName} ${lastName} - 1327 Website`);
        const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nRequirements:\n${requirements}`);

        // Set visual confirmation state
        setIsSubmitted(true);

        // Open mailto link
        setTimeout(() => {
            window.location.href = `mailto:1327thecommunity@gmail.com?subject=${subject}&body=${body}`;
        }, 300);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", requirements: "" });
            onClose();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0d0d0d] border border-white/15 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden my-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-[#1EA86E] transition-colors z-20"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-6 sm:p-8 md:p-10 relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl sm:text-3xl font-heading text-white tracking-tight uppercase">REACH OUT</h2>
                                    <span className="text-[10px] font-mono tracking-widest text-[#1EA86E] font-bold uppercase border border-[#1EA86E]/30 px-2 py-0.5 rounded-full">
                                        MUMBAI, IN
                                    </span>
                                </div>
                                <p className="text-white/60 text-xs sm:text-sm mb-6 font-mono">
                                    Start a conversation with our Malad West studio.
                                </p>

                                {/* Direct Quick Contact Buttons */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <a
                                        href="https://wa.me/918082845721?text=Hi%201327!%20I%20want%20to%20inquire%20about%20custom%20apparel"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] py-2.5 px-3 rounded-sm font-mono text-xs font-bold tracking-wider transition-all"
                                    >
                                        <MessageSquare size={16} />
                                        <span>WHATSAPP</span>
                                    </a>
                                    <a
                                        href="tel:+918082845721"
                                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white py-2.5 px-3 rounded-sm font-mono text-xs font-bold tracking-wider transition-all"
                                    >
                                        <Phone size={16} className="text-[#1EA86E]" />
                                        <span>CALL DIRECT</span>
                                    </a>
                                </div>

                                <div className="relative flex items-center justify-center mb-6">
                                    <div className="w-full h-px bg-white/10" />
                                    <span className="absolute bg-[#0d0d0d] px-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
                                        OR SEND US A MESSAGE
                                    </span>
                                </div>

                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center gap-3 text-white"
                                    >
                                        <CheckCircle2 size={48} className="text-[#1EA86E]" />
                                        <h3 className="font-heading text-xl font-bold uppercase tracking-wide">MESSAGE READY!</h3>
                                        <p className="font-mono text-xs text-white/70 max-w-xs leading-relaxed">
                                            Opening your email client with your inquiry details...
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/40 border border-white/15 rounded-sm p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/40 border border-white/15 rounded-sm p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/40 border border-white/15 rounded-sm p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                    placeholder="crew@domain.com"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/40 border border-white/15 rounded-sm p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans"
                                                    placeholder="+91..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-wider text-[#1EA86E] font-mono font-bold">Requirements</label>
                                            <textarea
                                                name="requirements"
                                                required
                                                value={formData.requirements}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-black/40 border border-white/15 rounded-sm p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] transition-colors font-sans resize-none"
                                                placeholder="Tell us about your custom apparel or uniform needs (MOQ 50 pcs for T-shirts)..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#1EA86E] hover:bg-[#168a57] text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 mt-2 flex items-center justify-center gap-2 transition-all rounded-sm group cursor-pointer"
                                        >
                                            <span>SEND INQUIRY</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
