"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
    useEffect(() => {
        const originalTitle = "1327";
        const altTitle = "🔥 Don't forget to reach out";
        let isOriginal = true;

        const intervalId = setInterval(() => {
            document.title = isOriginal ? altTitle : originalTitle;
            isOriginal = !isOriginal;
        }, 2000);

        return () => {
            clearInterval(intervalId);
            document.title = originalTitle; // Restore on unmount
        };
    }, []);

    return null; // This component renders nothing visually
}
