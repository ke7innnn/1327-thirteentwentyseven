"use client";

interface SectionWrapperProps {
    children: React.ReactNode;
    zIndex?: number;
    className?: string;
}

export default function SectionWrapper({
    children,
    zIndex = 1,
    className = ""
}: SectionWrapperProps) {
    return (
        <div
            className={`sticky top-0 w-full min-h-screen ${className}`}
            style={{ zIndex }}
        >
            {children}
        </div>
    );
}
