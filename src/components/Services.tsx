"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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

// ─── ROW ─────────────────────────────────────────────────────────────────────
// Four-column CSS grid: name | spec | MOQ label | MOQ value
// 60px at rest; expands to hold copy inside the green fill.
function ServiceRow({
    item,
    isActive,
    onActivate,
    activeSubId,
    onSelectSubSection,
    reduced,
    entryDelay,
}: {
    item: ServiceItem;
    isActive: boolean;
    onActivate: () => void;
    activeSubId?: string;
    onSelectSubSection?: (subId: string) => void;
    reduced: boolean;
    entryDelay: number;
}) {
    const copyRef = useRef<HTMLDivElement>(null);
    const [copyH, setCopyH] = useState(0);

    useEffect(() => {
        if (copyRef.current) setCopyH(copyRef.current.scrollHeight);
    }, [item.copy, item.subSections, activeSubId]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); }
    };

    const ROW_H = 60; // px, at rest

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-3% 0px" }}
            transition={{ duration: 0.35, ease: EASE, delay: entryDelay }}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`${item.title}${item.spec ? ` — ${item.spec}` : ""}`}
            onMouseEnter={onActivate}
            onClick={onActivate}
            onFocus={onActivate}
            onKeyDown={handleKey}
            className="relative cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1EA86E] select-none"
            style={{ minHeight: ROW_H }}
        >
            {/* hairline rule — draws scaleX 0→1 on entry */}
            <motion.div
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-3% 0px" }}
                transition={{ duration: 0.4, ease: EASE, delay: entryDelay }}
                style={{ transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-px bg-white/[0.12] pointer-events-none"
            />

            {/* green active highlight — soft corner & edge fade */}
            <motion.div
                animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0.96 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                style={{ zIndex: 0, transformOrigin: "center" }}
                className="absolute inset-x-0 inset-y-0.5 pointer-events-none rounded-lg overflow-hidden"
            >
                <div
                    className="w-full h-full rounded-lg"
                    style={{
                        background: "linear-gradient(90deg, rgba(30, 168, 110, 0.1) 0%, rgba(30, 168, 110, 0.75) 15%, rgba(30, 168, 110, 0.75) 85%, rgba(30, 168, 110, 0.1) 100%)",
                        maskImage: "radial-gradient(ellipse 96% 90% at 50% 50%, black 60%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 96% 90% at 50% 50%, black 60%, transparent 100%)",
                    }}
                />
            </motion.div>

            {/* row content — sits above the fill */}
            <div className="relative z-10">
                {/* four-column spec grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 190px 72px 56px",
                        alignItems: "center",
                        height: ROW_H,
                        gap: "0 16px",
                    }}
                >
                    {/* col 1: item name */}
                    <span
                        className="font-heading font-black uppercase tracking-tight leading-none pr-4 truncate"
                        style={{
                            fontSize: "clamp(1.125rem, 1.4vw, 1.5rem)",
                            color: isActive ? "#F2F9F4" : "#EAE6DA",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.title}
                    </span>

                    {/* col 2: technique / spec */}
                    <span
                        className="font-mono uppercase tracking-[0.14em] text-right"
                        style={{
                            fontSize: "0.6875rem",
                            fontVariantNumeric: "tabular-nums",
                            color: isActive ? "rgba(242,249,244,0.75)" : "rgba(255,255,255,0.35)",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.spec}
                    </span>

                    {/* col 3: MOQ label */}
                    <span
                        className="font-mono uppercase tracking-[0.14em] text-right"
                        style={{
                            fontSize: "0.6875rem",
                            color: isActive ? "rgba(242,249,244,0.5)" : "rgba(255,255,255,0.22)",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.moqNum ? "MOQ" : ""}
                    </span>

                    {/* col 4: MOQ value — right-aligned, tabular */}
                    <span
                        className="font-mono uppercase tracking-[0.14em] text-right"
                        style={{
                            fontSize: "0.6875rem",
                            fontVariantNumeric: "tabular-nums",
                            color: isActive ? "rgba(242,249,244,0.75)" : "rgba(255,255,255,0.35)",
                            transition: "color 0.15s",
                        }}
                    >
                        {item.moqNum}
                    </span>
                </div>

                {/* expandable copy — inside the green fill */}
                <motion.div
                    animate={{ height: isActive ? copyH : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
                    style={{ overflow: "hidden" }}
                >
                    <div
                        ref={copyRef}
                        className="pb-4 pt-0 font-sans leading-relaxed flex flex-col gap-2"
                        style={{
                            fontSize: "0.9375rem",
                            maxWidth: "52ch",
                            color: isActive ? "rgba(242,249,244,0.85)" : "rgba(255,255,255,0.6)",
                        }}
                    >
                        <p>{item.copy}</p>

                        {/* Subsections selector (Full, Half, Vest Aprons) */}
                        {item.subSections && item.subSections.length > 0 && (
                            <div
                                className="flex items-center gap-2 pt-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mr-1">
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
                                                className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded transition-all cursor-pointer ${
                                                    isSubActive
                                                        ? "bg-[#F2F9F4] text-[#105233] font-bold shadow-sm"
                                                        : "bg-black/40 text-white/80 hover:bg-black/70 hover:text-white border border-white/10"
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

            {/* bottom hairline (only when collapsed, the row's own border) */}
            {!isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.12] pointer-events-none" />
            )}
        </motion.div>
    );
}

// ─── MEDIA PANEL ─────────────────────────────────────────────────────────────
function MediaPanel({
    item,
    activeSubSection,
    globalIndex,
    reduced,
}: {
    item: ServiceItem;
    activeSubSection?: SubSection;
    globalIndex: number;
    reduced: boolean;
}) {
    const [galleryIdx, setGalleryIdx] = useState(0);
    const [prevItemId, setPrevItemId] = useState(item.id);

    if (prevItemId !== item.id) {
        setPrevItemId(item.id);
        setGalleryIdx(0);
    }

    const activeGalleryItem = item.gallery?.[galleryIdx];

    // Current display image & details (from gallery, active subSection, or main item)
    const currentView = {
        id: activeGalleryItem
            ? `${item.id}-gal-${galleryIdx}`
            : activeSubSection
            ? `${item.id}-${activeSubSection.id}`
            : item.id,
        image: activeGalleryItem
            ? activeGalleryItem.image
            : activeSubSection
            ? activeSubSection.image
            : item.image,
        caption: activeGalleryItem
            ? activeGalleryItem.caption
            : activeSubSection
            ? activeSubSection.caption
            : item.caption,
        spec: activeGalleryItem
            ? activeGalleryItem.spec
            : activeSubSection
            ? activeSubSection.spec
            : item.spec,
        specStrip: activeGalleryItem
            ? activeGalleryItem.specStrip
            : activeSubSection
            ? activeSubSection.specStrip
            : item.specStrip,
        title: item.title,
    };

    const [displayed, setDisplayed] = useState(currentView);
    const [incoming, setIncoming] = useState<typeof currentView | null>(null);
    const [imgKey, setImgKey] = useState(0);

    useEffect(() => {
        if (currentView.id === displayed.id) return;
        const raf = requestAnimationFrame(() => {
            setIncoming(currentView);
            setImgKey(k => k + 1);
        });
        const t = setTimeout(() => {
            setDisplayed(currentView);
            setIncoming(null);
        }, 380);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t);
        };
    }, [currentView.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const indexLabel =
        String(globalIndex + 1).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!item.gallery) return;
        setGalleryIdx(prev => (prev - 1 + item.gallery!.length) % item.gallery!.length);
    };

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!item.gallery) return;
        setGalleryIdx(prev => (prev + 1) % item.gallery!.length);
    };

    return (
        <div className="w-full flex flex-col">
            {/* IMAGE — bleeds edge to edge, no border, no padding */}
            <div
                className="relative w-full overflow-hidden bg-[#050c07] group select-none"
                style={{ height: "min(78vh, 720px)" }}
            >
                {/* outgoing image */}
                <motion.div
                    key={`out-${displayed.id}`}
                    initial={{ opacity: 1 }}
                    animate={incoming ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.35, ease: "linear" }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={item.gallery ? nextPhoto : undefined}
                >
                    <Image
                        src={displayed.image}
                        alt={displayed.title}
                        fill
                        sizes="(min-width: 1024px) 38vw, 0px"
                        className="object-contain p-2"
                        loading="eager"
                        priority
                    />
                </motion.div>

                {/* incoming image */}
                <AnimatePresence>
                    {incoming && (
                        <motion.div
                            key={`in-${incoming.id}-${imgKey}`}
                            initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                            className="absolute inset-0 cursor-pointer"
                            onClick={item.gallery ? nextPhoto : undefined}
                        >
                            <Image
                                src={incoming.image}
                                alt={incoming.title}
                                fill
                                sizes="(min-width: 1024px) 38vw, 0px"
                                className="object-contain p-2"
                                loading="eager"
                                priority
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* bottom gradient scrim for caption legibility */}
                <div
                    className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{
                        height: 96,
                        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                    }}
                />

                {/* Gallery Arrow Controls (if item has gallery) */}
                {item.gallery && item.gallery.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center text-sm font-mono border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                            aria-label="Previous photo"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={nextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center text-sm font-mono border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                            aria-label="Next photo"
                        >
                            ›
                        </button>

                        {/* Gallery Dots Indicator */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                            <span className="font-mono text-[9px] text-[#1EA86E] font-bold tracking-widest uppercase mr-1">
                                PHOTO {galleryIdx + 1}/{item.gallery.length}
                            </span>
                            <div className="flex gap-1">
                                {item.gallery.map((_, gIdx) => (
                                    <button
                                        key={gIdx}
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setGalleryIdx(gIdx); }}
                                        className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                            gIdx === galleryIdx ? "bg-[#1EA86E] scale-125" : "bg-white/30 hover:bg-white/60"
                                        }`}
                                        aria-label={`Go to photo ${gIdx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* caption — bottom-left, on the image */}
                <div className="absolute bottom-0 left-0 p-4 z-10 flex flex-col gap-0.5 pointer-events-none">
                    <span
                        className="font-mono uppercase tracking-[0.16em]"
                        style={{ fontSize: "0.6875rem", color: "#1EA86E" }}
                    >
                        {displayed.spec}
                    </span>
                    <span
                        className="font-mono uppercase tracking-[0.16em]"
                        style={{ fontSize: "0.625rem", color: "rgba(242,249,244,0.55)" }}
                    >
                        {displayed.caption}
                    </span>
                </div>

                {/* index readout — top-right, on the image */}
                <div className="absolute top-0 right-0 p-4 z-10 pointer-events-none">
                    <span
                        className="font-mono tracking-[0.16em]"
                        style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.28)" }}
                    >
                        {indexLabel}
                    </span>
                </div>
            </div>

            {/* SPEC STRIP — below the image, outside it */}
            {displayed.specStrip && displayed.specStrip.length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-0">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "0",
                        }}
                    >
                        {displayed.specStrip.map((row, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-0.5 py-2.5 border-b border-white/[0.08]"
                                style={{ paddingRight: i % 2 === 0 ? 20 : 0, paddingLeft: i % 2 === 1 ? 20 : 0, borderLeft: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                            >
                                <span
                                    className="font-mono uppercase tracking-[0.14em]"
                                    style={{ fontSize: "0.5625rem", color: "rgba(255,255,255,0.28)" }}
                                >
                                    {row.label}
                                </span>
                                <span
                                    className="font-mono uppercase tracking-[0.1em]"
                                    style={{ fontSize: "0.6875rem", color: "rgba(242,249,244,0.7)", fontVariantNumeric: "tabular-nums" }}
                                >
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

// ─── MOBILE SNAP TRACK ────────────────────────────────────────────────────────
function MobileTrack({ family }: { family: Family }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dot, setDot] = useState(0);
    const [mobileSubState, setMobileSubState] = useState<Record<string, string>>({});
    const [mobileGalState, setMobileGalState] = useState<Record<string, number>>({});

    const handleScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const cardW = el.firstElementChild?.clientWidth ?? 1;
        setDot(Math.round(el.scrollLeft / cardW));
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="w-full">
            <div
                ref={trackRef}
                className="flex overflow-x-auto gap-3 pl-5 pr-5 pb-1"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {family.items.map(item => {
                    const activeSubId = mobileSubState[item.id] || (item.subSections?.[0]?.id ?? "");
                    const activeSub = item.subSections?.find(s => s.id === activeSubId) ?? item.subSections?.[0];

                    const galIdx = mobileGalState[item.id] || 0;
                    const galItem = item.gallery?.[galIdx];

                    const activeImage = galItem ? galItem.image : activeSub ? activeSub.image : item.image;
                    const activeSpec = galItem ? galItem.spec : activeSub ? activeSub.spec : item.spec;

                    return (
                        <div
                            key={item.id}
                            style={{ scrollSnapAlign: "start", flex: "0 0 78vw", maxWidth: 320 }}
                            className="border border-white/10 bg-white/[0.02] flex flex-col overflow-hidden rounded-sm"
                        >
                            <div className="relative w-full bg-[#050c07]" style={{ aspectRatio: "4/3" }}>
                                <Image
                                    src={activeImage}
                                    alt={item.title}
                                    fill
                                    sizes="78vw"
                                    className="object-contain p-2 transition-opacity duration-300"
                                    unoptimized
                                />

                                {/* Mobile gallery arrows */}
                                {item.gallery && item.gallery.length > 1 && (
                                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
                                        <button
                                            type="button"
                                            onClick={() => setMobileGalState(p => ({ ...p, [item.id]: ((p[item.id] || 0) - 1 + item.gallery!.length) % item.gallery!.length }))}
                                            className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center font-mono text-xs pointer-events-auto border border-white/20"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMobileGalState(p => ({ ...p, [item.id]: ((p[item.id] || 0) + 1) % item.gallery!.length }))}
                                            className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center font-mono text-xs pointer-events-auto border border-white/20"
                                        >
                                            ›
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5 p-4">
                                <span className="font-heading font-black uppercase tracking-tight text-sm text-[#EAE6DA] leading-tight">
                                    {item.title}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono uppercase tracking-[0.14em] text-white/40" style={{ fontSize: "0.625rem", fontVariantNumeric: "tabular-nums" }}>
                                        {activeSpec}
                                    </span>
                                    {item.moqNum && (
                                        <span className="font-mono uppercase tracking-[0.14em] text-white/30" style={{ fontSize: "0.625rem" }}>
                                            MOQ {item.moqNum}
                                        </span>
                                    )}
                                </div>

                                {/* Subsections selector on mobile */}
                                {item.subSections && item.subSections.length > 0 && (
                                    <div className="flex items-center gap-1.5 pt-1.5 pb-1 flex-wrap">
                                        {item.subSections.map(sub => (
                                            <button
                                                key={sub.id}
                                                type="button"
                                                onClick={() => setMobileSubState(prev => ({ ...prev, [item.id]: sub.id }))}
                                                className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded ${
                                                    activeSubId === sub.id
                                                        ? "bg-[#1EA86E] text-black font-bold"
                                                        : "bg-white/10 text-white/70"
                                                }`}
                                            >
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Gallery dots on mobile */}
                                {item.gallery && item.gallery.length > 1 && (
                                    <div className="flex items-center gap-1 pt-1">
                                        {item.gallery.map((_, gi) => (
                                            <button
                                                key={gi}
                                                type="button"
                                                onClick={() => setMobileGalState(p => ({ ...p, [item.id]: gi }))}
                                                className={`h-1 rounded-full transition-all ${
                                                    gi === galIdx ? "w-4 bg-[#1EA86E]" : "w-1.5 bg-white/20"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                <p className="font-sans leading-relaxed text-white/50 mt-1" style={{ fontSize: "0.75rem" }}>
                                    {item.copy}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {family.items.length > 1 && (
                <div className="flex gap-2 px-5 mt-3">
                    {family.items.map((_, i) => (
                        <div
                            key={i}
                            className="h-px transition-all duration-300"
                            style={{
                                width: i === dot ? 24 : 8,
                                background: i === dot ? "#1EA86E" : "rgba(255,255,255,0.18)",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ reduced }: { reduced: boolean }) {
    return (
        <div className="mb-12 md:mb-16 flex flex-col items-start gap-4">
            {/* Glowing Glass Bubble Badge */}
            <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-[#1EA86E]/40 shadow-[0_0_20px_rgba(30,168,110,0.3)] hover:shadow-[0_0_30px_rgba(30,168,110,0.5)] transition-all duration-300"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1EA86E] animate-pulse" />
                <span
                    className="font-mono font-bold uppercase tracking-[0.2em] text-[#1EA86E]"
                    style={{ fontSize: "0.6875rem" }}
                >
                    OUR SERVICES
                </span>
            </motion.div>

            {/* Main Title & Subtitle */}
            <div className="flex flex-col gap-1">
                <div className="overflow-hidden">
                    <motion.h2
                        initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                        className="font-heading font-black uppercase leading-none tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
                    >
                        <span>What We </span>
                        <span style={{ WebkitTextStroke: "2px #1EA86E", color: "transparent" }}>Offer.</span>
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.p
                        initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
                        className="font-mono uppercase text-white/40"
                        style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
                    >
                        {TOTAL} ways to suit up
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

// ─── FAMILY HEADER ────────────────────────────────────────────────────────────
function FamilyHeader({ family }: { family: Family }) {
    return (
        <div className="sticky top-[64px] z-10 bg-black flex items-center gap-3 pt-3 pb-[24px]">
            <span
                className="font-mono uppercase tracking-[0.22em] shrink-0 text-white/35"
                style={{ fontSize: "0.6875rem" }}
            >
                {family.label}
            </span>
            <div className="flex-1 h-px bg-white/[0.12]" />
            <span
                className="font-mono tracking-[0.16em] shrink-0 text-white/25"
                style={{ fontSize: "0.6875rem" }}
            >
                ({String(family.items.length).padStart(2, "0")})
            </span>
        </div>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Services() {
    const reduced = useReducedMotion() ?? false;
    const [activeId, setActiveId] = useState(FAMILIES[0].items[0].id);
    const [subSectionState, setSubSectionState] = useState<Record<string, string>>({
        aprons: "full",
    });

    const activeItem = ALL_ITEMS.find(i => i.id === activeId) ?? ALL_ITEMS[0];
    const activeGlobalIndex = ALL_ITEMS.findIndex(i => i.id === activeId);

    const activeSubId = subSectionState[activeItem.id] || activeItem.subSections?.[0]?.id;
    const activeSubSection = activeItem.subSections?.find(s => s.id === activeSubId) ?? activeItem.subSections?.[0];

    return (
        <section
            id="services"
            className="relative z-20 bg-black text-white py-20 md:py-28 border-b border-white/10"
        >
            <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-20">

                <SectionHeader reduced={reduced} />

                {/* ── DESKTOP ── */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 items-start">

                    {/* Left index (7 cols) */}
                    <div className="lg:col-span-7">
                        {FAMILIES.map(family => (
                            <div key={family.id}>
                                <FamilyHeader family={family} />

                                {family.items.map((item, idx) => (
                                    <ServiceRow
                                        key={item.id}
                                        item={item}
                                        isActive={activeId === item.id}
                                        onActivate={() => setActiveId(item.id)}
                                        activeSubId={subSectionState[item.id] || item.subSections?.[0]?.id}
                                        onSelectSubSection={(subId) => setSubSectionState(prev => ({ ...prev, [item.id]: subId }))}
                                        reduced={reduced}
                                        entryDelay={idx * 0.04}
                                    />
                                ))}

                                {/* 72px gap between families */}
                                <div style={{ height: 72 }} />
                            </div>
                        ))}
                    </div>

                    {/* Right pinned panel (5 cols) */}
                    <div className="lg:col-span-5 sticky top-[80px] self-start">
                        <MediaPanel
                            item={activeItem}
                            activeSubSection={activeSubSection}
                            globalIndex={activeGlobalIndex}
                            reduced={reduced}
                        />
                    </div>
                </div>

                {/* ── MOBILE ── */}
                <div className="lg:hidden flex flex-col gap-10">
                    {FAMILIES.map(family => (
                        <div key={family.id}>
                            <div className="sticky top-[64px] z-10 bg-black flex items-center gap-3 py-2 mb-4">
                                <span
                                    className="font-mono uppercase tracking-[0.22em] shrink-0 text-white/35"
                                    style={{ fontSize: "0.6875rem" }}
                                >
                                    {family.label}
                                </span>
                                <div className="flex-1 h-px bg-white/[0.12]" />
                                <span
                                    className="font-mono tracking-[0.16em] shrink-0 text-white/25"
                                    style={{ fontSize: "0.6875rem" }}
                                >
                                    ({String(family.items.length).padStart(2, "0")})
                                </span>
                            </div>
                            <MobileTrack family={family} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
