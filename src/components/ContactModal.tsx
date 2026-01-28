"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, requirements } = formData;

        const subject = `Inquiry from ${firstName} ${lastName} - 1327 Website`;
        const body = `Name: ${firstName} ${lastName}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0ARequirements:%0D%0A${requirements}`;

        window.location.href = `mailto:1327thecommunity@gmail.com?subject=${subject}&body=${body}`;
        onClose();
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
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#105233] border border-white/10 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden"
                        >
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay"></div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-[#fdfbcf] transition-colors z-20"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-10 relative z-10">
                                <h2 className="text-3xl font-heading text-white mb-2 tracking-tight">REACH OUT</h2>
                                <p className="text-white/60 text-sm mb-8 font-mono">Tell us what you're looking for.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-wider text-[#fdfbcf]/70 font-bold">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#fdfbcf] transition-colors font-light"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-wider text-[#fdfbcf]/70 font-bold">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#fdfbcf] transition-colors font-light"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-[#fdfbcf]/70 font-bold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#fdfbcf] transition-colors font-light"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-[#fdfbcf]/70 font-bold">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#fdfbcf] transition-colors font-light"
                                            placeholder="+91..."
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-[#fdfbcf]/70 font-bold">Requirements</label>
                                        <textarea
                                            name="requirements"
                                            required
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#fdfbcf] transition-colors font-light resize-none"
                                            placeholder="Tell us about your custom apparel needs..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#fdfbcf] text-[#105233] font-heading font-bold uppercase tracking-widest py-4 mt-4 flex items-center justify-center gap-2 hover:bg-white transition-colors rounded-sm group"
                                    >
                                        Send Message
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
