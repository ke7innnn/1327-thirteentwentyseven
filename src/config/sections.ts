export interface SectionConfig {
    id: string;
    number: number;
    marker: string;
    kicker: string;
    title: string;
}

export const SECTIONS: Record<string, SectionConfig> = {
    mission: {
        id: "mission",
        number: 0,
        marker: "{ 00 }",
        kicker: "OUR MISSION",
        title: "HERO",
    },
    manifesto: {
        id: "manifesto",
        number: 1,
        marker: "{ 01 }",
        kicker: "ON THE RECORD",
        title: "THE MANIFESTO",
    },
    origin: {
        id: "about",
        number: 2,
        marker: "{ 02 }",
        kicker: "OUR ORIGIN",
        title: "IT RUNS ON FAMILY",
    },
    services: {
        id: "services",
        number: 3,
        marker: "{ 03 }",
        kicker: "WHAT WE OFFER",
        title: "SERVICES",
    },
    process: {
        id: "process",
        number: 4,
        marker: "{ 04 }",
        kicker: "HOW WE WORK",
        title: "THE PROCESS",
    },
    feed: {
        id: "feed",
        number: 5,
        marker: "{ 05 }",
        kicker: "ON THE FEED",
        title: "WORN EVERY SHIFT",
    },
    clients: {
        id: "clients",
        number: 6,
        marker: "{ 06 }",
        kicker: "TRUSTED BY CREWS",
        title: "OUR HAPPY CLIENTS",
    },
    orders: {
        id: "orders",
        number: 7,
        marker: "{ 07 }",
        kicker: "GUIDELINES",
        title: "ORDERS & MOQ",
    },
    location: {
        id: "location",
        number: 8,
        marker: "{ 08 }",
        kicker: "BORN IN MUMBAI",
        title: "THE ATELIER",
    },
};

export function getSectionMarker(key: keyof typeof SECTIONS): string {
    const sec = SECTIONS[key];
    return sec ? sec.marker : "{ 01 }";
}
