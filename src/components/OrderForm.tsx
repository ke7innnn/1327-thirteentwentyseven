"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, ShieldCheck, Ruler, ArrowRight, X, MessageSquare, Truck, Package } from "lucide-react";
import SectionMarker from "./ui/SectionMarker";

const SIZE_CHART_DATA = [
    { size: "S", width: "18.8\"", length: "26\"" },
    { size: "M", width: "19.8\"", length: "27\"" },
    { size: "L", width: "20.8\"", length: "28\"" },
    { size: "XL", width: "21.8\"", length: "29\"" },
    { size: "XXL", width: "22.8\"", length: "30\"" },
];

export default function OrderForm() {
    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [selectedSize, setSelectedSize] = useState<string>("M");

    // UI state
    const [showSizeChartModal, setShowSizeChartModal] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [orderId, setOrderId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !email || !mobile || !address || !selectedSize) {
            alert("Please complete all required fields.");
            return;
        }

        setStatus("submitting");
        const generatedId = `1327-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(generatedId);

        try {
            // Submit through Next.js Server API route (/api/order) — bypasses browser adblockers & CORS blocks
            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    mobile,
                    address,
                    selectedSize,
                    orderId: generatedId,
                }),
            });

            if (!res.ok) {
                console.warn("Server API returned status:", res.status);
            }
        } catch (err) {
            console.error("Order dispatch error:", err);
        }

        setStatus("success");
    };

    return (
        <section
            id="order"
            aria-labelledby="order-headline"
            className="relative bg-[#0D1712] text-[#F7F5F0] py-16 lg:py-24 border-b border-[#F7F5F0]/15 select-none"
        >
            {/* Woven Linen Apparel Fabric Texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-multiply bg-repeat z-0"
                style={{
                    backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                    backgroundSize: "400px 400px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                {/* ─── SECTION TITLE ─────────────────────────────────────────────── */}
                <div className="flex flex-col items-start gap-4 mb-12 border-b border-[#F7F5F0]/15 pb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#105233] text-white">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                            &#123; 1327 ORDER FORM &#125;
                        </span>
                    </div>
                    <h2
                        id="order-headline"
                        className="font-heading font-black uppercase text-left leading-[0.88] tracking-[-0.02em] text-[#F7F5F0]"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
                    >
                        <span>PLACE YOUR</span>
                        <br />
                        <span className="text-[#1EA86E]">ORDER.</span>
                    </h2>
                    <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#F7F5F0]/65 font-bold">
                        PROVIDE YOUR SHIPPING DETAILS AND SIZE ACCORDING TO THE 1327 SIZE CHART.
                    </p>
                </div>

                {status === "success" ? (
                    /* ─── EMAIL SUCCESS SCREEN ──────────────────────────────────────────── */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#14140F] border border-[#1EA86E]/40 p-8 sm:p-12 text-center max-w-2xl mx-auto flex flex-col items-center gap-6 shadow-2xl"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1EA86E]/20 text-[#1EA86E] flex items-center justify-center border border-[#1EA86E]/40">
                            <CheckCircle2 size={36} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs font-bold text-[#1EA86E] tracking-[0.25em] uppercase">
                                ORDER SUBMITTED VIA EMAIL
                            </span>
                            <h3 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase">
                                THANK YOU, {firstName.toUpperCase()}!
                            </h3>
                            <p className="font-mono text-xs text-[#F7F5F0]/70 tracking-widest mt-1">
                                REF ID: <span className="text-[#1EA86E] font-bold">#{orderId}</span>
                            </p>
                        </div>

                        <div className="w-full bg-[#0D1712] border border-[#F7F5F0]/15 p-5 text-left flex flex-col gap-3 font-mono text-xs">
                            <div className="flex justify-between border-b border-[#F7F5F0]/10 pb-2">
                                <span className="text-[#F7F5F0]/60">CUSTOMER</span>
                                <span className="font-bold text-white">{firstName} {lastName}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#F7F5F0]/10 pb-2">
                                <span className="text-[#F7F5F0]/60">EMAIL</span>
                                <span className="font-bold text-white">{email}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#F7F5F0]/10 pb-2">
                                <span className="text-[#F7F5F0]/60">MOBILE</span>
                                <span className="font-bold text-white">{mobile}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#F7F5F0]/10 pb-2">
                                <span className="text-[#F7F5F0]/60">SIZE SELECTED</span>
                                <span className="font-bold text-[#1EA86E]">{selectedSize} (REGULAR FIT)</span>
                            </div>
                            <div className="flex justify-between pb-1">
                                <span className="text-[#F7F5F0]/60">STATUS</span>
                                <span className="font-bold text-[#1EA86E] flex items-center gap-1">
                                    <ShieldCheck size={14} /> EMAILED TO 1327THECOMMUNITY@GMAIL.COM
                                </span>
                            </div>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-[#F7F5F0]/80 font-light leading-relaxed">
                            Your order details have been successfully emailed directly to <strong className="text-[#1EA86E]">1327thecommunity@gmail.com</strong>. We will review your request and get in touch with you shortly.
                        </p>

                        <button
                            onClick={() => {
                                setStatus("idle");
                                setFirstName("");
                                setLastName("");
                                setEmail("");
                                setMobile("");
                                setAddress("");
                            }}
                            className="w-full py-4 bg-[#1EA86E] text-[#0D1712] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors cursor-pointer"
                        >
                            SUBMIT ANOTHER ORDER
                        </button>
                    </motion.div>
                ) : (
                    /* ─── MAIN ORDER FORM ──────────────────────────────────────────── */
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* ─── LEFT COLUMN: CUSTOMER & SIZE DETAILS (7 COLS) ──────────── */}
                        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 bg-[#14140F] p-4 sm:p-10 border border-[#F7F5F0]/15">
                            <div className="flex items-center justify-between border-b border-[#F7F5F0]/15 pb-4">
                                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#1EA86E] uppercase">
                                    01 / SHIPPING &amp; CUSTOMER INFO
                                </span>
                                <span className="font-mono text-[10px] text-[#F7F5F0]/50 tracking-widest">
                                    REQUIRED *
                                </span>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#F7F5F0]/80 font-bold uppercase tracking-wider">
                                        FIRST NAME *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter first name"
                                        className="w-full bg-[#0D1712] border border-[#F7F5F0]/20 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-sans rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#F7F5F0]/80 font-bold uppercase tracking-wider">
                                        LAST NAME *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter last name"
                                        className="w-full bg-[#0D1712] border border-[#F7F5F0]/20 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-sans rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#F7F5F0]/80 font-bold uppercase tracking-wider">
                                        EMAIL ID *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-[#0D1712] border border-[#F7F5F0]/20 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-sans rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#F7F5F0]/80 font-bold uppercase tracking-wider">
                                        MOBILE NUMBER *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-[#0D1712] border border-[#F7F5F0]/20 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-sans rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-xs text-[#F7F5F0]/80 font-bold uppercase tracking-wider">
                                    SHIPPING ADDRESS &amp; PINCODE *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="House/Flat No., Building Name, Street, Landmark, City, State, Pincode"
                                    className="w-full bg-[#0D1712] border border-[#F7F5F0]/20 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-sans resize-none rounded-none"
                                />
                            </div>

                            {/* ─── SIZE SELECTION ACCORDING TO 1327 SIZE CHART ────────── */}
                            <div className="pt-4 border-t border-[#F7F5F0]/15 flex flex-col gap-4">
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <label className="font-mono text-xs font-bold text-[#1EA86E] uppercase tracking-wider flex items-center gap-2">
                                        <Ruler size={16} />
                                        SIZE ACCORDING TO 1327 SIZE CHART *
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowSizeChartModal(true)}
                                        className="font-mono text-[11px] text-[#1EA86E] underline hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                        <Info size={13} /> VIEW FULL CHART
                                    </button>
                                </div>

                                {/* Size Selector Buttons */}
                                <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                                    {SIZE_CHART_DATA.map((item) => (
                                        <button
                                            key={item.size}
                                            type="button"
                                            onClick={() => setSelectedSize(item.size)}
                                            className={`py-2.5 sm:py-3.5 px-1 flex flex-col items-center justify-center border font-mono transition-all ${
                                                selectedSize === item.size
                                                    ? "bg-[#1EA86E] border-[#1EA86E] text-[#0D1712] font-black shadow-lg"
                                                    : "bg-[#0D1712] border-[#F7F5F0]/20 text-white hover:border-[#1EA86E]/60"
                                            }`}
                                        >
                                            <span className="text-sm sm:text-lg font-bold">{item.size}</span>
                                            <span className="text-[8px] sm:text-[9px] opacity-80 mt-0.5">{item.width} W</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Inline Mini Size Chart Table */}
                                <div className="bg-[#0D1712] border border-[#F7F5F0]/10 p-4 mt-1">
                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#F7F5F0]/10">
                                        <span className="font-mono text-[10px] font-bold text-[#F7F5F0]/70 uppercase tracking-widest">
                                            1327 REGULAR FIT T-SHIRTS (INCHES)
                                        </span>
                                        <span className="font-mono text-[10px] text-[#1EA86E] font-bold">
                                            SELECTED: {selectedSize}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 text-center font-mono text-xs py-1 font-bold text-[#1EA86E] uppercase border-b border-[#F7F5F0]/10">
                                        <span>SIZE</span>
                                        <span>WIDTH</span>
                                        <span>LENGTH</span>
                                    </div>
                                    {SIZE_CHART_DATA.map((r) => (
                                        <div
                                            key={r.size}
                                            className={`grid grid-cols-3 text-center font-mono text-xs py-1.5 border-b border-[#F7F5F0]/5 transition-colors ${
                                                selectedSize === r.size
                                                    ? "bg-[#1EA86E]/20 text-[#1EA86E] font-bold"
                                                    : "text-[#F7F5F0]/70"
                                            }`}
                                        >
                                            <span>{r.size}</span>
                                            <span>{r.width}</span>
                                            <span>{r.length}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ─── RIGHT COLUMN: ORDER SUMMARY & SUBMIT (5 COLS) ────────── */}
                        <div className="lg:col-span-5 flex flex-col gap-6 bg-[#14140F] p-6 sm:p-8 border border-[#F7F5F0]/15">
                            <div className="flex items-center justify-between border-b border-[#F7F5F0]/15 pb-4">
                                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#1EA86E] uppercase">
                                    02 / ORDER SUMMARY
                                </span>
                                <span className="font-mono text-[10px] text-[#F7F5F0]/50 tracking-widest">
                                    CONFIRMATION
                                </span>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-[#0D1712] border border-[#1EA86E]/40 p-5 flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#1EA86E] animate-pulse" />
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#1EA86E] uppercase">
                                        ATELIER CRAFTED APPAREL
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-y border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60">GARMENT FIT:</span>
                                    <span className="font-bold text-white uppercase">REGULAR FIT T-SHIRT</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60">SELECTED SIZE:</span>
                                    <span className="font-bold text-[#1EA86E] text-base">{selectedSize}</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60 flex items-center gap-1">
                                        <Truck size={14} /> TURNAROUND:
                                    </span>
                                    <span className="font-bold text-white">14–21 DAYS (PAN-INDIA)</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60 flex items-center gap-1">
                                        <Package size={14} /> FABRIC SPEC:
                                    </span>
                                    <span className="font-bold text-[#1EA86E]">320+ GSM COMBED COTTON</span>
                                </div>

                                <div className="p-3 bg-[#105233]/30 border border-[#1EA86E]/50 text-[11px] font-mono text-[#F7F5F0]/90 leading-relaxed rounded-none">
                                    Submitting this form will dispatch your custom order details directly to our 1327 Malad production desk (<span className="text-[#1EA86E] font-bold">1327thecommunity@gmail.com</span>).
                                </div>
                            </div>

                            {/* Submit Order Button */}
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full py-4 px-6 bg-[#1EA86E] text-[#0D1712] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-[#1EA86E] transition-all hover:bg-white hover:border-white shadow-lg cursor-pointer disabled:opacity-50 mt-2 active:scale-[0.98] touch-manipulation min-h-[48px]"
                            >
                                {status === "submitting" ? (
                                    <span>GENERATING ORDER...</span>
                                ) : (
                                    <>
                                        <span>CONFIRM &amp; SUBMIT ORDER</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* ─── SIZE CHART MODAL POPUP ────────────────────────────────────────── */}
            <AnimatePresence>
                {showSizeChartModal && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSizeChartModal(false)}
                            className="fixed inset-0 bg-black/90 z-0"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative z-10 bg-[#0D1712] border border-[#1EA86E]/40 w-full max-w-xl p-6 sm:p-8 text-white shadow-2xl my-auto"
                        >
                            <div className="flex justify-between items-center border-b border-[#F7F5F0]/15 pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#1EA86E]" />
                                    <span className="font-heading font-black text-xl uppercase">
                                        1327 OFFICIAL SIZE CHART
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowSizeChartModal(false)}
                                    className="p-1 text-white/60 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="relative w-full aspect-[4/3] bg-black border border-[#F7F5F0]/10 mb-6 overflow-hidden">
                                <Image
                                    src="/order/size-chart.png"
                                    alt="1327 Regular Fit T-Shirts Size Chart"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <button
                                onClick={() => setShowSizeChartModal(false)}
                                className="w-full py-3 bg-[#1EA86E] text-[#0D1712] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                CLOSE SIZE CHART
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
