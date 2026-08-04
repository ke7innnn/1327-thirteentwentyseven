import { SECTIONS } from "@/config/sections";

interface SectionMarkerProps {
    sectionKey: keyof typeof SECTIONS;
    className?: string;
    align?: "left" | "center" | "right";
}

export default function SectionMarker({ sectionKey, className = "", align = "left" }: SectionMarkerProps) {
    const section = SECTIONS[sectionKey] || SECTIONS.mission;
    const alignClass =
        align === "center"
            ? "justify-center text-center"
            : align === "right"
            ? "justify-end text-right"
            : "justify-start text-left";

    return (
        <div className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#105233] ${alignClass} ${className}`}>
            <span className="text-[#105233] font-bold">{section.marker}</span>
            <span>/ {section.kicker}</span>
        </div>
    );
}
