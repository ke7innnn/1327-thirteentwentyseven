"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionMarker from "./ui/SectionMarker";

// ─── EASING ──────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── DATA ─────────────────────────────────────────────────────────────────────
export interface SubSection {
    id: string;
    label: string;
    spec: string;
    image: string;
    caption: string;
    specStrip: { label: string; value: string }[];
}

export interface GalleryItem {
    image: string;
    caption: string;
    spec?: string;
    specStrip?: { label: string; value: string }[];
}

interface ServiceItem {
    id: string;
    title: string;
    spec: string;
    moqNum: string;
    copy: string;
    image: string;
    caption: string;
    specStrip?: { label: string; value: string }[];
    subSections?: SubSection[];
    gallery?: GalleryItem[];
    priority?: boolean;
}

interface Family {
    id: string;
    label: string;
    items: ServiceItem[];
}

const FAMILIES: Family[] = [
    {
        id: "apparel",
        label: "Apparel",
        items: [
            {
                id: "relaxed",
                title: "Relaxed Fit T-Shirts",
                spec: "240–270 GSM",
                moqNum: "50",
                copy: "Heavyweight, drop-shoulder blanks that hold their shape wash after wash. Built to carry print and embroidery — and to get borrowed, not returned.",
                image: "/servicepics/newovwersized.jpg",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Weight", value: "240–270 GSM" },
                    { label: "Fit", value: "Drop Shoulder" },
                    { label: "Technique", value: "Screen Print · Embroidery" },
                    { label: "MOQ", value: "50 pcs" },
                ],
                priority: true,
            },
            {
                id: "straight",
                title: "Straight Fit T-Shirts",
                spec: "140–180 GSM",
                moqNum: "50",
                copy: "Clean, lightweight staples for full-crew rollouts — easy to wear, easy to scale, sharp in any colourway.",
                image: "/servicepics/straightfit.png",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Weight", value: "140–180 GSM" },
                    { label: "Fit", value: "Straight" },
                    { label: "Technique", value: "Screen Print · Embroidery" },
                    { label: "MOQ", value: "50 pcs" },
                ],
            },
            {
                id: "polo",
                title: "Polo T-Shirts",
                spec: "190–200 GSM",
                moqNum: "50",
                copy: "Crisp piqué polos for front-of-house teams — collar-sharp, breathable and comfortable through the longest shifts.",
                image: "/servicepics/newpolo.png",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Weight", value: "190–200 GSM" },
                    { label: "Collar", value: "Piqué Polo" },
                    { label: "Technique", value: "Embroidery · Print" },
                    { label: "MOQ", value: "50 pcs" },
                ],
            },
            {
                id: "hoodies",
                title: "Hoodies",
                spec: "320–380 GSM",
                moqNum: "50",
                copy: "Thick-weight fleece hoodies built to last. Screen-printed or embroidered — made for the ones who stay late and show up early.",
                image: "/servicepics/hoodie.png",
                caption: "1327 — HEAVYWEIGHT HOODIE",
                specStrip: [
                    { label: "Weight", value: "320–380 GSM" },
                    { label: "Fabric", value: "Heavyweight Cotton Fleece" },
                    { label: "Technique", value: "3D Embroidery" },
                    { label: "MOQ", value: "50 pcs" },
                ],
            },
        ],
    },
    {
        id: "workwear",
        label: "Workwear",
        items: [
            {
                id: "aprons",
                title: "Aprons",
                spec: "Custom Embroidery",
                moqNum: "30",
                copy: "Full, half and vest cuts for real kitchens — finished with your mark in tight, dense stitchwork that survives every service.",
                image: "/servicepics/apron-full.jpg",
                caption: "BISOU BISOU — FULL APRON",
                specStrip: [
                    { label: "Cut Type", value: "Full Bib Cut" },
                    { label: "Client", value: "Bisou Bisou" },
                    { label: "Technique", value: "Custom Embroidery" },
                    { label: "MOQ", value: "30 pcs" },
                ],
                subSections: [
                    {
                        id: "full",
                        label: "Full Apron",
                        spec: "FULL BIB CUT",
                        image: "/servicepics/apron-full.jpg",
                        caption: "BISOU BISOU — FULL APRON",
                        specStrip: [
                            { label: "Cut Type", value: "Full Bib Cut" },
                            { label: "Client", value: "Bisou Bisou" },
                            { label: "Technique", value: "Custom Embroidery" },
                            { label: "MOQ", value: "30 pcs" },
                        ],
                    },
                    {
                        id: "half",
                        label: "Half Apron",
                        spec: "WAIST WRAP",
                        image: "/servicepics/apron-half.jpg",
                        caption: "CAFÉ 578 — HALF APRON",
                        specStrip: [
                            { label: "Cut Type", value: "Half / Waist Wrap" },
                            { label: "Client", value: "Café 578" },
                            { label: "Technique", value: "Custom Embroidery" },
                            { label: "MOQ", value: "30 pcs" },
                        ],
                    },
                    {
                        id: "vest",
                        label: "Vest Apron",
                        spec: "VEST CUT",
                        image: "/servicepics/apron-vest.jpg",
                        caption: "BENNE — VEST APRON",
                        specStrip: [
                            { label: "Cut Type", value: "Vest Apron" },
                            { label: "Client", value: "Benne — Heritage Dosa" },
                            { label: "Technique", value: "Custom Embroidery" },
                            { label: "MOQ", value: "30 pcs" },
                        ],
                    },
                ],
            },
            {
                id: "denims",
                title: "Denims & Trousers",
                spec: "Custom Cut",
                moqNum: "100",
                copy: "Bottom wear built for crews on their feet — cut to your spec, stitched to last, no off-the-shelf compromises.",
                image: "/servicepics/straightfit.png",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Technique", value: "Custom Cut & Sew" },
                    { label: "MOQ", value: "100 pcs" },
                ],
            },
        ],
    },
    {
        id: "accessories",
        label: "Accessories",
        items: [
            {
                id: "caps",
                title: "Caps",
                spec: "3D Embroidery",
                moqNum: "30",
                copy: "Structured or unstructured, snapback or fitted. The brand goes on the front; the quality goes into how it sits.",
                image: "/servicepics/newcap.png",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Style", value: "Structured · Unstructured" },
                    { label: "Technique", value: "3D Embroidery" },
                    { label: "MOQ", value: "30 pcs" },
                ],
            },
            {
                id: "totebags",
                title: "Tote Bags",
                spec: "Canvas Print",
                moqNum: "50",
                copy: "Natural canvas tote bags. Screen-printed flat or all-over in any colourway — they carry your brand everywhere they go.",
                image: "/servicepics/totebag.png",
                caption: "1327 — SAMPLE SWATCH",
                specStrip: [
                    { label: "Material", value: "Natural Canvas" },
                    { label: "Technique", value: "Screen Print" },
                    { label: "MOQ", value: "50 pcs" },
                ],
            },
            {
                id: "veganleather",
                title: "Vegan Leather Products",
                spec: "Custom Emboss",
                moqNum: "25",
                copy: "Plant-based leather hospitality accessories — placemats, cutlery pouches, coasters, bill folders and menu covers. Debossed, embossed or foil-stamped with your mark.",
                image: "/servicepics/veganleather-main.jpg",
                caption: "SMERA — TABLEWARE SET",
                specStrip: [
                    { label: "Material", value: "Plant-Based Leather" },
                    { label: "Range", value: "Placemats · Pouches · Coasters" },
                    { label: "Technique", value: "Custom Logo Debossing" },
                    { label: "MOQ", value: "25 pcs" },
                ],
                gallery: [
                    {
                        image: "/servicepics/veganleather-main.jpg",
                        caption: "SMERA — TABLEWARE & COASTER SET",
                        spec: "TABLEWARE SET",
                        specStrip: [
                            { label: "Item", value: "Round Placemat & Coaster Set" },
                            { label: "Material", value: "Plant-Based Leather" },
                            { label: "Technique", value: "Custom Logo Deboss" },
                            { label: "Finish", value: "Perimeter Stitching" },
                        ],
                    },
                    {
                        image: "/servicepics/veganleather-pouches.jpg",
                        caption: "PISCO / MONSERRY — CUTLERY POUCHES",
                        spec: "CUTLERY POUCH",
                        specStrip: [
                            { label: "Item", value: "Hospitality Cutlery Pouch" },
                            { label: "Clients", value: "Pisco · Monstery · Fabur" },
                            { label: "Technique", value: "Hot Foil / Blind Deboss" },
                            { label: "Craft", value: "Precision Cut & Stitch" },
                        ],
                    },
                    {
                        image: "/servicepics/veganleather-coasters.jpg",
                        caption: "BEVERAGE COASTER SETS — MULTI-COLOUR",
                        spec: "COASTER SETS",
                        specStrip: [
                            { label: "Item", value: "Round & Square Coasters" },
                            { label: "Colours", value: "Tan · Navy · Ochre · Red · Black" },
                            { label: "Technique", value: "Custom Logo Stamping" },
                            { label: "Storage", value: "Matching Leather Holder" },
                        ],
                    },
                    {
                        image: "/servicepics/veganleather-sleeves.jpg",
                        caption: "DINING BILL & MENU HOLDERS",
                        spec: "BILL FOLDERS",
                        specStrip: [
                            { label: "Item", value: "Bill Folders & Table Sleeves" },
                            { label: "Craft", value: "Dual-Tone Leatherette" },
                            { label: "Technique", value: "Custom Brand Stamp" },
                            { label: "Usage", value: "Table Service & Check Presenters" },
                        ],
                    },
                    {
                        image: "/servicepics/veganleather-placemats.jpg",
                        caption: "ROUND PLACEMAT & CUTLERY HOLDER",
                        spec: "PLACEMAT SET",
                        specStrip: [
                            { label: "Item", value: "Round Placemat & Sleeve" },
                            { label: "Material", value: "Plant-Based Leather" },
                            { label: "Technique", value: "Custom Logo Deboss" },
                            { label: "Finish", value: "Stitched Edge" },
                        ],
                    },
                ],
            },
        ],
    },
];

const ALL_ITEMS: ServiceItem[] = FAMILIES.flatMap(f => f.items);
const TOTAL = ALL_ITEMS.length;

// Pre-computed image views stack for instant zero-blank preloading
interface PreloadedView {
    key: string;
    itemId: string;
    image: string;
    title: string;
    isPriority?: boolean;
}

const ALL_VIEWS: PreloadedView[] = ALL_ITEMS.flatMap(item => {
    if (item.gallery && item.gallery.length > 0) {
        return item.gallery.map((gItem, gIdx) => ({
            key: `${item.id}-gal-${gIdx}`,
            itemId: item.id,
            image: gItem.image,
            title: item.title,
            isPriority: item.priority && gIdx === 0,
        }));
    }
    if (item.subSections && item.subSections.length > 0) {
        return item.subSections.map(sItem => ({
            key: `${item.id}-${sItem.id}`,
            itemId: item.id,
            image: sItem.image,
            title: item.title,
            isPriority: item.priority,
        }));
    }
    return [{
        key: item.id,
        itemId: item.id,
        image: item.image,
        title: item.title,
        isPriority: item.priority,
    }];
});

// ─── DESKTOP SERVICE ROW ──────────────────────────────────────────────────────
function ServiceRow({
    item,
    isActive,
    onActivate,
    onHover,
    activeSubId,
    onSelectSubSection,
    reduced,
}: {
    item: ServiceItem;
    isActive: boolean;
    onActivate: () => void;
    onHover: () => void;
    activeSubId?: string;
    onSelectSubSection?: (subId: string) => void;
    reduced: boolean;
}) {
    const copyRef = useRef<HTMLDivElement>(null);
    const [copyH, setCopyH] = useState(0);

    useEffect(() => {
        if (copyRef.current) setCopyH(copyRef.current.scrollHeight);
    }, [item.copy, item.subSections, activeSubId]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate();
        }
    };

    const ROW_H = 60; // px at rest

    return (
        <div
            data-product-id={item.id}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`${item.title}${item.spec ? ` — ${item.spec}` : ""}`}
            onMouseEnter={onHover}
            onClick={onActivate}
            onFocus={onHover}
            onKeyDown={handleKey}
            className="js-product-row relative cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white select-none"
            style={{ minHeight: ROW_H }}
        >
            {/* Top hairline rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/15 pointer-events-none" />

            {/* Active highlight fill */}
            <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                style={{ zIndex: 0 }}
                className="absolute inset-x-0 inset-y-0.5 pointer-events-none rounded-none bg-white/15 border-l-2 border-white transform-gpu"
            />

            {/* Row Content */}
            <div className="relative z-10 px-4 sm:px-6 py-1 transition-all duration-300">
                {/* Flexible Spec Grid — Ensures title NEVER truncates */}
                <div
                    className="flex items-center justify-between gap-4"
                    style={{ height: ROW_H }}
                >
                    {/* Item title — flex-1 to take all available space, zero truncation */}
                    <span
                        className="font-heading font-black uppercase tracking-tight leading-snug flex-1 min-w-0 pr-2"
                        style={{
                            fontSize: "clamp(1.125rem, 1.35vw, 1.5rem)",
                            color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.8)",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.title}
                    </span>

                    {/* Technique / Spec — hides on narrow desktop screens if space is tight */}
                    <span
                        className="font-mono uppercase tracking-[0.14em] text-right hidden xl:block shrink-0"
                        style={{
                            fontSize: "0.6875rem",
                            fontVariantNumeric: "tabular-nums",
                            color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.spec}
                    </span>

                    {/* MOQ Badge */}
                    {item.moqNum && (
                        <div className="font-mono uppercase tracking-[0.14em] text-right shrink-0 flex items-center gap-1.5">
                            <span style={{ fontSize: "0.6875rem", color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>
                                MOQ
                            </span>
                            <span style={{ fontSize: "0.6875rem", color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                                {item.moqNum}
                            </span>
                        </div>
                    )}
                </div>

                {/* Expandable Copy */}
                <motion.div
                    animate={{ height: isActive ? copyH : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                >
                    <div
                        ref={copyRef}
                        className="pb-5 pt-1 font-sans leading-relaxed flex flex-col gap-3.5 pl-2 sm:pl-4 text-white"
                        style={{
                            fontSize: "0.9375rem",
                            maxWidth: "52ch",
                        }}
                    >
                        <p className="text-white/90">{item.copy}</p>

                        {/* Subsections selector (Full, Half, Vest Aprons) */}
                        {item.subSections && item.subSections.length > 0 && (
                            <div
                                className="flex items-center gap-2 pt-1.5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase mr-1">
                                    Cuts:
                                </span>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {item.subSections.map((sub) => {
                                        const isSubActive = (activeSubId || item.subSections![0].id) === sub.id;
                                        return (
                                            <button
                                                key={sub.id}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectSubSection?.(sub.id);
                                                }}
                                                onMouseEnter={() => onSelectSubSection?.(sub.id)}
                                                className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-none transition-all cursor-pointer ${
                                                    isSubActive
                                                        ? "bg-white text-[#105233] font-bold"
                                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                                }`}
                                            >
                                                {sub.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Bottom hairline rule (when collapsed) */}
            {!isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15 pointer-events-none" />
            )}
        </div>
    );
}

// ─── DESKTOP MEDIA PANEL (STICKY + SCROLL LINKED) ───────────────────────────
function MediaPanel({
    activeItem,
    activeSubSection,
    globalIndex,
    reduced,
}: {
    activeItem: ServiceItem;
    activeSubSection?: SubSection;
    globalIndex: number;
    reduced: boolean;
}) {
    const [galleryIdx, setGalleryIdx] = useState(0);

    // Reset gallery index when active product changes
    useEffect(() => {
        setGalleryIdx(0);
    }, [activeItem.id]);

    const activeGalleryItem = activeItem.gallery?.[galleryIdx];

    // Current view key
    const currentViewKey = activeGalleryItem
        ? `${activeItem.id}-gal-${galleryIdx}`
        : activeSubSection
        ? `${activeItem.id}-${activeSubSection.id}`
        : activeItem.id;

    // Current spec info
    const currentSpec = activeGalleryItem?.spec || activeSubSection?.spec || activeItem.spec;
    const currentCaption = activeGalleryItem?.caption || activeSubSection?.caption || activeItem.caption;
    const currentSpecStrip = activeGalleryItem?.specStrip || activeSubSection?.specStrip || activeItem.specStrip;

    const indexLabel = `${String(globalIndex + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!activeItem.gallery) return;
        setGalleryIdx(prev => (prev - 1 + activeItem.gallery!.length) % activeItem.gallery!.length);
    };

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!activeItem.gallery) return;
        setGalleryIdx(prev => (prev + 1) % activeItem.gallery!.length);
    };

    return (
        <div className="w-full flex flex-col h-full max-h-full">
            {/* IMAGE CONTAINER — 4:5 Aspect ratio, absorbs flex space */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-none border border-white/20 bg-black/40 shadow-none group select-none flex-1 min-h-0">
                {/* PRELOADED IMAGE STACK */}
                {ALL_VIEWS.map((view) => {
                    const isActive = view.key === currentViewKey;
                    return (
                        <div
                            key={view.key}
                            className="absolute inset-0 transition-opacity ease-out"
                            style={{
                                opacity: isActive ? 1 : 0,
                                transitionDuration: reduced ? "0ms" : "200ms",
                                pointerEvents: isActive ? "auto" : "none",
                                zIndex: isActive ? 10 : 0,
                            }}
                        >
                            <Image
                                src={view.image}
                                alt={view.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                quality={80}
                                className="object-cover rounded-none"
                                priority={view.isPriority || view.key === ALL_VIEWS[0].key}
                                loading={view.isPriority || view.key === ALL_VIEWS[0].key ? "eager" : "lazy"}
                            />
                        </div>
                    );
                })}

                {/* Bottom gradient scrim for caption readability */}
                <div
                    className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
                    style={{
                        height: 96,
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    }}
                />

                {/* Gallery Arrow Controls */}
                {activeItem.gallery && activeItem.gallery.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 px-2.5 py-1 rounded-none bg-black/80 hover:bg-black text-white font-mono text-xs border border-white/20 transition-all cursor-pointer"
                            aria-label="Previous photo"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={nextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 px-2.5 py-1 rounded-none bg-black/80 hover:bg-black text-white font-mono text-xs border border-white/20 transition-all cursor-pointer"
                            aria-label="Next photo"
                        >
                            ›
                        </button>

                        {/* Gallery Indicator */}
                        <div className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-black/80 px-2.5 py-1 rounded-none border border-white/20">
                            <span className="font-mono text-[9px] text-[#1EA86E] font-bold tracking-widest uppercase">
                                PHOTO {galleryIdx + 1}/{activeItem.gallery.length}
                            </span>
                        </div>
                    </>
                )}

                {/* Caption — Bottom Left */}
                <div className="absolute bottom-0 left-0 p-4 z-20 flex flex-col gap-0.5 pointer-events-none">
                    <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-[#1EA86E] font-bold">
                        {currentSpec}
                    </span>
                    <span className="font-mono uppercase tracking-[0.16em] text-[10px] text-white/80">
                        {currentCaption}
                    </span>
                </div>

                {/* Index Readout — Top Right */}
                <div className="absolute top-0 right-0 p-3.5 z-20 pointer-events-none">
                    <span className="font-mono tracking-[0.16em] text-[11px] text-white/70 font-bold bg-black/50 px-2 py-0.5 border border-white/10">
                        {indexLabel}
                    </span>
                </div>
            </div>

            {/* SPEC STRIP — Fixed at bottom of panel (flex-none) */}
            {currentSpecStrip && currentSpecStrip.length > 0 && (
                <div className="border-t border-white/20 pt-3 mt-3 flex-none">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {currentSpecStrip.map((row, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-0.5 py-1.5 border-b border-white/10"
                            >
                                <span className="font-mono uppercase tracking-[0.14em] text-[9px] text-white/60">
                                    {row.label}
                                </span>
                                <span className="font-mono uppercase tracking-[0.1em] text-xs text-white font-semibold tabular-nums">
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── MOBILE SERVICE ROW (INLINE IMAGE & SPECS ON MOBILE) ─────────────────────
function MobileServiceRow({
    item,
    activeSubId,
    onSelectSubSection,
}: {
    item: ServiceItem;
    activeSubId?: string;
    onSelectSubSection?: (subId: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mobileGalIdx, setMobileGalIdx] = useState(0);

    const activeSub = item.subSections?.find(s => s.id === (activeSubId || item.subSections?.[0]?.id));
    const activeGal = item.gallery?.[mobileGalIdx];

    const activeImage = activeGal?.image || activeSub?.image || item.image;
    const activeSpec = activeGal?.spec || activeSub?.spec || item.spec;
    const activeCaption = activeGal?.caption || activeSub?.caption || item.caption;
    const activeSpecStrip = activeGal?.specStrip || activeSub?.specStrip || item.specStrip;

    return (
        <div className="border-t border-white/15 py-3">
            {/* Header Button */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-left py-1 focus:outline-none"
            >
                <div className="flex flex-col gap-0.5 pr-2">
                    <span className="font-heading font-black uppercase text-lg text-white leading-tight">
                        {item.title}
                    </span>
                    <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                        {item.spec} {item.moqNum ? `· MOQ ${item.moqNum}` : ""}
                    </span>
                </div>
                <span className="font-mono text-xs text-white/70 border border-white/20 px-2 py-0.5 rounded-none shrink-0">
                    {isExpanded ? "−" : "+"}
                </span>
            </button>

            {/* Inline Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden pt-3 flex flex-col gap-4"
                    >
                        {/* Description */}
                        <p className="font-sans text-xs text-white/85 leading-relaxed">
                            {item.copy}
                        </p>

                        {/* Cuts selector (if aprons) */}
                        {item.subSections && item.subSections.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 mr-1">
                                    Cuts:
                                </span>
                                {item.subSections.map(sub => (
                                    <button
                                        key={sub.id}
                                        type="button"
                                        onClick={() => onSelectSubSection?.(sub.id)}
                                        className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-none transition-all ${
                                            (activeSubId || item.subSections![0].id) === sub.id
                                                ? "bg-white text-[#105233] font-bold"
                                                : "bg-white/10 text-white border border-white/20"
                                        }`}
                                    >
                                        {sub.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 4:5 Full Width Product Image */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-none border border-white/20 bg-black/40">
                            <Image
                                src={activeImage}
                                alt={item.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            {/* Overlay Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 to-transparent flex flex-col gap-0.5 pointer-events-none">
                                <span className="font-mono text-[10px] text-[#1EA86E] uppercase tracking-widest font-bold">
                                    {activeSpec}
                                </span>
                                <span className="font-mono text-[9px] text-white/80 uppercase tracking-widest">
                                    {activeCaption}
                                </span>
                            </div>

                            {/* Mobile Gallery Controls */}
                            {item.gallery && item.gallery.length > 1 && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 border border-white/20">
                                    <button
                                        type="button"
                                        onClick={() => setMobileGalIdx(p => (p - 1 + item.gallery!.length) % item.gallery!.length)}
                                        className="font-mono text-xs text-white px-1"
                                    >
                                        ‹
                                    </button>
                                    <span className="font-mono text-[9px] text-white/80">
                                        {mobileGalIdx + 1}/{item.gallery.length}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setMobileGalIdx(p => (p + 1) % item.gallery!.length)}
                                        className="font-mono text-xs text-white px-1"
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Two-Column Specs Table */}
                        {activeSpecStrip && activeSpecStrip.length > 0 && (
                            <div className="border-t border-white/20 pt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                                {activeSpecStrip.map((row, i) => (
                                    <div key={i} className="flex flex-col gap-0.5 border-b border-white/10 pb-1.5">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
                                            {row.label}
                                        </span>
                                        <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                                            {row.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ reduced }: { reduced: boolean }) {
    return (
        <div className="mb-8 md:mb-10 flex flex-col items-start gap-3 relative">
            {/* Anchor Slot 2: Cards / Products */}
            <div
                className="anchor pointer-events-none opacity-0 select-none absolute right-4 sm:right-16 top-2 w-32 h-32 sm:w-44 sm:h-44"
                data-anchor="cards"
                aria-hidden="true"
            >
                <div className="md:hidden relative w-full h-full opacity-100">
                    <Image src="/tee-printed.png" alt="" fill className="object-contain rotate-2 opacity-60" />
                </div>
            </div>
            {/* Canonical Section Marker 02 */}
            <motion.div
                initial={reduced ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, ease: EASE }}
            >
                <SectionMarker sectionKey="services" className="!text-white" />
            </motion.div>

            {/* Main Title & Subtitle */}
            <div className="flex flex-col gap-1">
                <div className="overflow-hidden">
                    <motion.h2
                        initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                        className="font-heading font-black uppercase leading-none tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white"
                    >
                        <span>What We </span>
                        <span className="text-white">Offer.</span>
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.p
                        initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
                        className="font-mono uppercase text-white/60"
                        style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
                    >
                        {TOTAL} ways to suit up
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

// ─── FAMILY ACCORDION HEADER ───────────────────────────────────────────────────
function FamilyAccordionHeader({
    family,
    index,
    isExpanded,
    onToggle,
}: {
    family: Family;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="bg-[#105233] py-1">
            <button
                type="button"
                onClick={onToggle}
                className="w-full text-left focus:outline-none group cursor-pointer py-3.5 px-4 rounded-none bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center justify-between shadow-none"
            >
                <div className="flex items-center gap-3.5 sm:gap-5">
                    <span className="font-mono text-xs sm:text-sm text-white font-bold tracking-wider">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading font-black uppercase text-xl sm:text-2xl md:text-3xl tracking-tight text-white group-hover:text-white transition-colors">
                        {family.label}
                    </h3>
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-none bg-white/15 text-white font-medium border border-white/25 group-hover:border-white transition-all">
                        {String(family.items.length).padStart(2, "0")} Items
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/80 border border-white/20 px-2.5 py-1 rounded-none group-hover:bg-white/10 transition-colors">
                        {isExpanded ? "HIDE ↗" : "EXPLORE ↘"}
                    </span>
                </div>
            </button>
        </div>
    );
}

// ─── BRAND ACCENT CARD (Fills empty space when all categories are closed) ─────
function BrandAccentCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="overflow-hidden mt-4"
        >
            <div className="relative w-full rounded-none border border-white/20 bg-[#0d4028] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-none">
                {/* Woven Cloth / Fabric Texture Background */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply bg-repeat pointer-events-none"
                    style={{
                        backgroundImage: "url('/bg/notes_fabric_bg.png')",
                        backgroundSize: "400px 400px",
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 95% 95% at 50% 50%, rgba(30,168,110,0.15) 0%, rgba(5,30,18,0.5) 100%)",
                    }}
                />

                {/* Background Watermark 1327 Logo / Monogram */}
                <div className="absolute -right-6 -bottom-8 pointer-events-none opacity-15 select-none">
                    <span className="font-heading font-black text-8xl sm:text-9xl md:text-[11rem] tracking-tighter text-white">
                        1327
                    </span>
                </div>

                <div className="flex flex-col gap-2.5 relative z-10 max-w-md">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        / 1327 — BRAND ATELIER
                    </div>

                    <h4 className="font-heading font-black uppercase text-xl sm:text-2xl text-white tracking-tight leading-tight">
                        CRAFTED FOR CREWS &amp; BRANDS
                    </h4>

                    <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                        Explore our complete catalogue of heavyweight blanks, custom aprons, headwear &amp; plant-based leather goods.
                    </p>
                </div>

                {/* Bottom Call to Action hint */}
                <div className="mt-6 pt-3 border-t border-white/15 w-full flex items-center justify-between relative z-10">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white font-bold flex items-center gap-1.5">
                        <span className="animate-bounce">↑</span> Select a category above to view items
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {TOTAL} WAYS TO SUIT UP
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const scrollLineScaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

    const [scrollActiveId, setScrollActiveId] = useState<string>(FAMILIES[0].items[0].id);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const [expandedFamilies, setExpandedFamilies] = useState<Record<string, boolean>>({
        apparel: true,
        workwear: false,
        accessories: false,
    });

    const [subSectionState, setSubSectionState] = useState<Record<string, string>>({
        aprons: "full",
    });

    // Hover > Scroll Position
    const activeId = hoveredId || scrollActiveId;

    const activeItem = ALL_ITEMS.find(i => i.id === activeId) ?? ALL_ITEMS[0];
    const activeGlobalIndex = ALL_ITEMS.findIndex(i => i.id === activeId);

    const activeSubId = subSectionState[activeItem.id] || activeItem.subSections?.[0]?.id;
    const activeSubSection = activeItem.subSections?.find(s => s.id === activeSubId) ?? activeItem.subSections?.[0];

    const anyCategoryOpen = Object.values(expandedFamilies).some(Boolean);

    // Scroll Observer — Tracks row nearest to center line
    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateActiveFromScroll = (entries: IntersectionObserverEntry[]) => {
            const viewportCentre = window.innerHeight / 2;
            const candidates = entries
                .filter((e) => e.isIntersecting)
                .map((e) => {
                    const r = e.target.getBoundingClientRect();
                    return {
                        id: (e.target as HTMLElement).dataset.productId,
                        distance: Math.abs(r.top + r.height / 2 - viewportCentre),
                    };
                })
                .filter((c): c is { id: string; distance: number } => Boolean(c.id));

            if (candidates.length === 0) return;
            candidates.sort((a, b) => a.distance - b.distance);
            setScrollActiveId(candidates[0].id);
        };

        const observer = new IntersectionObserver(updateActiveFromScroll, {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        });

        const timer = setTimeout(() => {
            const rows = document.querySelectorAll(".js-product-row");
            rows.forEach((row) => observer.observe(row));
        }, 150);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [expandedFamilies]);

    const toggleFamily = (familyId: string) => {
        setExpandedFamilies(prev => {
            const nextState = !prev[familyId];
            const updated = { ...prev, [familyId]: nextState };
            if (nextState) {
                const fam = FAMILIES.find(f => f.id === familyId);
                if (fam && fam.items.length > 0) {
                    setScrollActiveId(fam.items[0].id);
                }
            }
            return updated;
        });
    };

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative z-20 bg-[#105233] text-white py-14 md:py-20 border-b border-white/10"
        >
            {/* Scroll progress side accent bar */}
            <motion.div
                style={{ scaleY: scrollLineScaleY, transformOrigin: "top" }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-white z-30"
            />

            {/* 1327 Brand Green Apparel Craftsmanship Fabric Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#105233]">
                <div
                    className="absolute inset-0 opacity-[0.35] mix-blend-multiply bg-repeat"
                    style={{
                        backgroundImage: "url('/bg/notes_fabric_bg.png')",
                        backgroundSize: "450px 450px",
                    }}
                />
                {/* Studio Radial Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 85% 85% at 50% 15%, rgba(30,168,110,0.22) 0%, rgba(12,60,37,0.65) 100%)",
                    }}
                />
            </div>

            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20 relative z-10">

                <SectionHeader reduced={reduced} />

                {/* ── DESKTOP (lg+) ── */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 items-start">

                    {/* Left Column (7 cols): Accordion List */}
                    <div
                        className="lg:col-span-7"
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {FAMILIES.map((family, fIdx) => {
                            const isExpanded = !!expandedFamilies[family.id];
                            return (
                                <div key={family.id} className="mb-4">
                                    <FamilyAccordionHeader
                                        family={family}
                                        index={fIdx}
                                        isExpanded={isExpanded}
                                        onToggle={() => toggleFamily(family.id)}
                                    />

                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.42, ease: EASE }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-1.5 pb-2">
                                                    {family.items.map((item) => (
                                                        <ServiceRow
                                                            key={item.id}
                                                            item={item}
                                                            isActive={activeId === item.id}
                                                            onActivate={() => setScrollActiveId(item.id)}
                                                            onHover={() => setHoveredId(item.id)}
                                                            activeSubId={subSectionState[item.id] || item.subSections?.[0]?.id}
                                                            onSelectSubSection={(subId) => setSubSectionState(prev => ({ ...prev, [item.id]: subId }))}
                                                            reduced={reduced}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}

                        <AnimatePresence>
                            {!anyCategoryOpen && <BrandAccentCard />}
                        </AnimatePresence>
                    </div>

                    {/* Right Column (5 cols): Sticky Media Panel */}
                    <aside className="hidden lg:block lg:col-span-5 sticky top-24 self-start max-h-[calc(100vh-7rem)] flex flex-col">
                        <MediaPanel
                            activeItem={activeItem}
                            activeSubSection={activeSubSection}
                            globalIndex={activeGlobalIndex}
                            reduced={reduced}
                        />
                    </aside>
                </div>

                {/* ── MOBILE / TABLET (< lg) ── */}
                <div className="lg:hidden flex flex-col gap-4">
                    {FAMILIES.map((family, fIdx) => {
                        const isExpanded = !!expandedFamilies[family.id];
                        return (
                            <div key={family.id}>
                                <FamilyAccordionHeader
                                    family={family}
                                    index={fIdx}
                                    isExpanded={isExpanded}
                                    onToggle={() => toggleFamily(family.id)}
                                />

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.42, ease: EASE }}
                                            className="overflow-hidden pt-2 pb-3"
                                        >
                                            {family.items.map((item) => (
                                                <MobileServiceRow
                                                    key={item.id}
                                                    item={item}
                                                    activeSubId={subSectionState[item.id] || item.subSections?.[0]?.id}
                                                    onSelectSubSection={(subId) => setSubSectionState(prev => ({ ...prev, [item.id]: subId }))}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}

                    <AnimatePresence>
                        {!anyCategoryOpen && <BrandAccentCard />}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
