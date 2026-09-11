"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
    useEffect(() => {
        const originalTitle = "1327 — Custom T-Shirts & Uniforms | Mumbai";
        const altTitle = "🔥 Don't forget to reach out — 1327";

        const handleVisibilityChange = () => {
            document.title = document.hidden ? altTitle : originalTitle;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.title = originalTitle;
        };
    }, []);

    return null; // This component renders nothing visually
}
