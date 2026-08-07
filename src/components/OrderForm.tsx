"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, ShieldCheck, Ruler, ArrowRight, X, MessageSquare, Truck, Package, Shirt, Tag, Layers, ZoomIn } from "lucide-react";
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
    const [selectedProduct, setSelectedProduct] = useState<"tshirt" | "cap" | "both">("tshirt");
    const [selectedSize, setSelectedSize] = useState<string>("M");

    // UI state
    const [showSizeChartModal, setShowSizeChartModal] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; price: string } | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [orderId, setOrderId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !email || !mobile || !address) {
            alert("Please complete all required fields.");
            return;
        }

        setStatus("submitting");
        const generatedId = `1327-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(generatedId);

        const productLabel = selectedProduct === "tshirt" ? "T-Shirt Only" : selectedProduct === "cap" ? "Custom Crew Cap Only" : "T-Shirt + Cap Combo";
        const sizeLabel = selectedProduct === "cap" ? "One Size (Adjustable Strap)" : selectedProduct === "both" ? `${selectedSize} (T-Shirt) + One Size (Cap)` : `${selectedSize} (Regular Fit)`;

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
                    selectedProduct: productLabel,
                    selectedSize: sizeLabel,
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
                                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white uppercase flex items-center gap-2">
                                    <span className="text-[#1EA86E]">01 /</span> SHIPPING &amp; CUSTOMER INFO
                                </span>
                                <span className="font-mono text-[10px] text-[#1EA86E] tracking-widest font-bold">
                                    REQUIRED *
                                </span>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#1EA86E] font-bold uppercase tracking-[0.15em]">
                                        FIRST NAME *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter first name"
                                        className="w-full bg-[#080E0A] border border-[#1EA86E]/30 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-mono tracking-wide placeholder:text-[#F7F5F0]/30 rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#1EA86E] font-bold uppercase tracking-[0.15em]">
                                        LAST NAME *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter last name"
                                        className="w-full bg-[#080E0A] border border-[#1EA86E]/30 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-mono tracking-wide placeholder:text-[#F7F5F0]/30 rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#1EA86E] font-bold uppercase tracking-[0.15em]">
                                        EMAIL ID *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-[#080E0A] border border-[#1EA86E]/30 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-mono tracking-wide placeholder:text-[#F7F5F0]/30 rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-[#1EA86E] font-bold uppercase tracking-[0.15em]">
                                        MOBILE NUMBER *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-[#080E0A] border border-[#1EA86E]/30 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-mono tracking-wide placeholder:text-[#F7F5F0]/30 rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-xs text-[#1EA86E] font-bold uppercase tracking-[0.15em]">
                                    SHIPPING ADDRESS &amp; PINCODE *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="House/Flat No., Building Name, Street, Landmark, City, State, Pincode"
                                    className="w-full bg-[#080E0A] border border-[#1EA86E]/30 px-3.5 sm:px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors font-mono tracking-wide placeholder:text-[#F7F5F0]/30 resize-none rounded-none"
                                />
                            </div>

                            {/* ─── PRODUCT SELECTION CARDS WITH IMAGES & PRICES ────────── */}
                            <div className="pt-4 border-t border-[#F7F5F0]/15 flex flex-col gap-3">
                                <label className="font-mono text-xs font-bold text-[#1EA86E] uppercase tracking-wider flex items-center gap-2">
                                    <Package size={16} />
                                    SELECT ITEM &amp; VIEW PRICING *
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {/* T-Shirt Card */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProduct("tshirt")}
                                        className={`group relative p-2.5 flex flex-col items-center border transition-all text-left overflow-hidden cursor-pointer ${
                                            selectedProduct === "tshirt"
                                                ? "bg-[#105233]/40 border-[#1EA86E] text-white shadow-xl ring-1 ring-[#1EA86E]"
                                                : "bg-[#0D1712] border-[#F7F5F0]/20 text-[#F7F5F0]/70 hover:border-[#1EA86E]/60"
                                        }`}
                                    >
                                        <div className="relative w-full aspect-[4/5] mb-2.5 overflow-hidden border border-[#F7F5F0]/15 rounded-none bg-[#0a0a0a]">
                                            <Image
                                                src="/cap/tshirt.webp"
                                                alt="1327 Crew T-Shirt"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                priority
                                            />
                                            <span className="absolute top-2 right-2 bg-[#1EA86E] text-[#0D1712] font-mono text-[11px] font-black px-2 py-0.5 shadow-md">
                                                ₹799
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLightboxImage({ src: "/cap/tshirt.webp", title: "1327 CREW T-SHIRT", price: "₹799" });
                                                }}
                                                className="absolute bottom-2 left-2 bg-black/80 hover:bg-[#1EA86E] text-white hover:text-[#0D1712] p-1.5 backdrop-blur-md transition-all rounded-none border border-white/20 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold"
                                                title="View Full Size Image"
                                            >
                                                <ZoomIn size={12} />
                                                <span>FULL IMAGE</span>
                                            </button>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider w-full flex items-center justify-center gap-1.5">
                                            <Shirt size={14} className="text-[#1EA86E]" />
                                            <span>CREW T-SHIRT</span>
                                        </span>
                                        <span className="font-mono text-[10px] text-[#1EA86E] font-bold mt-0.5">
                                            ₹799 INCL. TAXES
                                        </span>
                                    </button>

                                    {/* Cap Card */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProduct("cap")}
                                        className={`group relative p-2.5 flex flex-col items-center border transition-all text-left overflow-hidden cursor-pointer ${
                                            selectedProduct === "cap"
                                                ? "bg-[#105233]/40 border-[#1EA86E] text-white shadow-xl ring-1 ring-[#1EA86E]"
                                                : "bg-[#0D1712] border-[#F7F5F0]/20 text-[#F7F5F0]/70 hover:border-[#1EA86E]/60"
                                        }`}
                                    >
                                        <div className="relative w-full aspect-[4/5] mb-2.5 overflow-hidden border border-[#F7F5F0]/15 rounded-none bg-[#0a0a0a]">
                                            <Image
                                                src="/cap/cap.webp"
                                                alt="1327 Crew Cap"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                priority
                                            />
                                            <span className="absolute top-2 right-2 bg-[#1EA86E] text-[#0D1712] font-mono text-[11px] font-black px-2 py-0.5 shadow-md">
                                                ₹499
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLightboxImage({ src: "/cap/cap.webp", title: "1327 CREW CAP", price: "₹499" });
                                                }}
                                                className="absolute bottom-2 left-2 bg-black/80 hover:bg-[#1EA86E] text-white hover:text-[#0D1712] p-1.5 backdrop-blur-md transition-all rounded-none border border-white/20 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold"
                                                title="View Full Size Image"
                                            >
                                                <ZoomIn size={12} />
                                                <span>FULL IMAGE</span>
                                            </button>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider w-full flex items-center justify-center gap-1.5">
                                            <Tag size={14} className="text-[#1EA86E]" />
                                            <span>CREW CAP</span>
                                        </span>
                                        <span className="font-mono text-[10px] text-[#1EA86E] font-bold mt-0.5">
                                            ₹499 INCL. TAXES
                                        </span>
                                    </button>

                                    {/* Both Combo Card */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProduct("both")}
                                        className={`group relative p-2.5 flex flex-col items-center border transition-all text-left overflow-hidden cursor-pointer ${
                                            selectedProduct === "both"
                                                ? "bg-[#105233]/40 border-[#1EA86E] text-white shadow-xl ring-1 ring-[#1EA86E]"
                                                : "bg-[#0D1712] border-[#F7F5F0]/20 text-[#F7F5F0]/70 hover:border-[#1EA86E]/60"
                                        }`}
                                    >
                                        <div className="relative w-full aspect-[4/5] mb-2.5 overflow-hidden border border-[#F7F5F0]/15 rounded-none flex items-center justify-center bg-[#0a0a0a]">
                                            <div className="relative w-1/2 h-full border-r border-[#F7F5F0]/10">
                                                <Image src="/cap/tshirt.webp" alt="T-Shirt" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="relative w-1/2 h-full">
                                                <Image src="/cap/cap.webp" alt="Cap" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <span className="absolute top-2 right-2 bg-[#1EA86E] text-[#0D1712] font-mono text-[11px] font-black px-2 py-0.5 shadow-md z-10">
                                                ₹1,298
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLightboxImage({ src: "/cap/tshirt.webp", title: "1327 T-SHIRT + CAP COMBO", price: "₹1,298" });
                                                }}
                                                className="absolute bottom-2 left-2 bg-black/80 hover:bg-[#1EA86E] text-white hover:text-[#0D1712] p-1.5 backdrop-blur-md transition-all rounded-none border border-white/20 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold z-10"
                                                title="View Full Size Image"
                                            >
                                                <ZoomIn size={12} />
                                                <span>FULL IMAGE</span>
                                            </button>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider w-full flex items-center justify-center gap-1.5">
                                            <Layers size={14} className="text-[#1EA86E]" />
                                            <span>T-SHIRT + CAP</span>
                                        </span>
                                        <span className="font-mono text-[10px] text-[#1EA86E] font-bold mt-0.5">
                                            ₹1,298 (COMBO PACK)
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* ─── CONDITIONAL SIZE SELECTION (T-SHIRT VS CAP) ────────── */}
                            {selectedProduct === "cap" ? (
                                /* CAP ONLY — NO SIZE CHART NEEDED (UNIVERSAL ADJUSTABLE FIT) */
                                <div className="bg-[#0D1712] border border-[#1EA86E]/40 p-4 sm:p-5 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-bold text-[#1EA86E] uppercase tracking-wider flex items-center gap-2">
                                            🧢 1327 CREW CAP SIZING
                                        </span>
                                        <span className="font-mono text-[10px] font-black bg-[#1EA86E] text-[#0D1712] px-2 py-0.5 uppercase tracking-wider">
                                            ONE SIZE FITS ALL
                                        </span>
                                    </div>
                                    <p className="font-mono text-xs text-[#F7F5F0]/80 leading-relaxed pt-1">
                                        Custom embroidered 1327 Crew Caps come in one universal adjustable fit with an ergonomic metal back strap. No size chart required.
                                    </p>
                                </div>
                            ) : (
                                /* T-SHIRT OR T-SHIRT + CAP COMBO — SIZE CHART SELECTOR */
                                <div className="pt-2 flex flex-col gap-4">
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <label className="font-mono text-xs font-bold text-[#1EA86E] uppercase tracking-wider flex items-center gap-2">
                                            <Ruler size={16} />
                                            {selectedProduct === "both" ? "SELECT T-SHIRT SIZE *" : "SIZE ACCORDING TO 1327 SIZE CHART *"}
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

                                    {selectedProduct === "both" && (
                                        <div className="bg-[#105233]/30 border border-[#1EA86E]/40 px-3.5 py-2 text-xs font-mono text-[#1EA86E] flex items-center gap-2">
                                            <span>🧢</span>
                                            <span><strong>CAP INCLUDED:</strong> One Size Adjustable Strap (Universal Fit)</span>
                                        </div>
                                    )}

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
                            )}
                        </div>

                        {/* ─── RIGHT COLUMN: ORDER SUMMARY & SUBMIT (5 COLS) ────────── */}
                        <div className="lg:col-span-5 flex flex-col gap-6 bg-[#14140F] p-6 sm:p-8 border border-[#F7F5F0]/15">
                            <div className="flex items-center justify-between border-b border-[#F7F5F0]/15 pb-4">
                                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white uppercase flex items-center gap-2">
                                    <span className="text-[#1EA86E]">02 /</span> ORDER SUMMARY
                                </span>
                                <span className="font-mono text-[10px] text-[#1EA86E] tracking-widest font-bold">
                                    CONFIRMATION
                                </span>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-[#0D1712] border border-[#1EA86E]/40 p-5 flex flex-col gap-4">
                                <div className="flex items-center gap-3 border-b border-[#F7F5F0]/10 pb-3">
                                    <div className="relative w-16 h-16 bg-black border border-[#1EA86E]/40 overflow-hidden shrink-0">
                                        <Image
                                            src={selectedProduct === "cap" ? "/cap/cap.webp" : "/cap/tshirt.webp"}
                                            alt="Selected Item Preview"
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs font-bold tracking-widest text-[#1EA86E] uppercase">
                                            {selectedProduct === "tshirt" ? "1327 CREW T-SHIRT" : selectedProduct === "cap" ? "1327 CREW CAP" : "T-SHIRT + CAP COMBO"}
                                        </span>
                                        <span className="font-heading font-black text-2xl text-white mt-0.5">
                                            {selectedProduct === "tshirt" ? "₹799" : selectedProduct === "cap" ? "₹499" : "₹1,298"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60">ITEM SELECTION:</span>
                                    <span className="font-bold text-white uppercase">
                                        {selectedProduct === "tshirt" ? "T-SHIRT ONLY (₹799)" : selectedProduct === "cap" ? "CREW CAP (₹499)" : "T-SHIRT + CAP (₹1,298)"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60">SELECTED SIZE:</span>
                                    <span className="font-bold text-[#1EA86E] text-sm">
                                        {selectedProduct === "cap" ? "ONE SIZE (ADJUSTABLE)" : selectedProduct === "both" ? `${selectedSize} (T-Shirt) + One Size (Cap)` : `${selectedSize} (Regular Fit)`}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                    <span className="text-[#F7F5F0]/60 flex items-center gap-1">
                                        <Truck size={14} /> TURNAROUND:
                                    </span>
                                    <span className="font-bold text-white">6–7 DAYS (PAN-INDIA)</span>
                                </div>

                                {selectedProduct !== "cap" && (
                                    <div className="flex justify-between items-center py-2 border-b border-[#F7F5F0]/10 font-mono text-xs">
                                        <span className="text-[#F7F5F0]/60 flex items-center gap-1">
                                            <Package size={14} /> FABRIC SPEC:
                                        </span>
                                        <span className="font-bold text-[#1EA86E]">220 GSM SINGLE JERSEY COTTON</span>
                                    </div>
                                )}

                                <div className="p-3 bg-[#105233]/30 border border-[#1EA86E]/50 text-[11px] font-mono text-[#F7F5F0]/90 leading-relaxed rounded-none">
                                    Submitting this form will dispatch your custom order details directly to our 1327 Malad production desk (<span className="text-[#1EA86E] font-bold">1327thecommunity@gmail.com</span>).
                                </div>
                            </div>

                            {/* Submit Order Button */}
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full py-4 px-6 bg-[#1EA86E] text-[#0D1712] font-heading font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 border border-[#1EA86E] transition-all hover:bg-white hover:border-white shadow-lg cursor-pointer disabled:opacity-50 mt-2 active:scale-[0.98] touch-manipulation min-h-[48px]"
                            >
                                {status === "submitting" ? (
                                    <span>GENERATING ORDER...</span>
                                ) : (
                                    <>
                                        <span>CONFIRM &amp; SUBMIT ORDER</span>
                                        <ArrowRight size={18} />
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

            {/* ─── FULL SIZE IMAGE LIGHTBOX MODAL ────────────────────────────────── */}
            <AnimatePresence>
                {lightboxImage && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightboxImage(null)}
                            className="fixed inset-0 bg-black/95 backdrop-blur-md z-0"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 bg-[#0D1712] border border-[#1EA86E]/50 w-full max-w-3xl p-4 sm:p-6 text-white shadow-2xl my-auto"
                        >
                            <div className="flex justify-between items-center border-b border-[#F7F5F0]/15 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#1EA86E] animate-pulse" />
                                    <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                                        {lightboxImage.title}
                                    </span>
                                    <span className="font-mono text-xs font-black bg-[#1EA86E] text-[#0D1712] px-2.5 py-0.5 ml-2">
                                        {lightboxImage.price}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setLightboxImage(null)}
                                    className="p-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer rounded-full"
                                    aria-label="Close image preview"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="relative w-full aspect-[4/5] max-h-[75vh] bg-black border border-[#F7F5F0]/10 mb-4 overflow-hidden rounded-sm">
                                <Image
                                    src={lightboxImage.src}
                                    alt={lightboxImage.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <button
                                onClick={() => setLightboxImage(null)}
                                className="w-full py-3 bg-[#1EA86E] text-[#0D1712] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                            >
                                CLOSE FULL IMAGE PREVIEW
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
