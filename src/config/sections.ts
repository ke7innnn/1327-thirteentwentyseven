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
        number: 1,
        marker: "{ 01 }",
        kicker: "OUR MISSION",
        title: "THE MANIFESTO",
    },
    services: {
        id: "services",
        number: 2,
        marker: "{ 02 }",
        kicker: "WHAT WE OFFER",
        title: "SERVICES",
    },
    process: {
        id: "process",
        number: 3,
        marker: "{ 03 }",
        kicker: "HOW WE WORK",
        title: "THE PROCESS",
    },
    clients: {
        id: "clients",
        number: 4,
        marker: "{ 04 }",
        kicker: "TRUSTED BY CREWS",
        title: "OUR HAPPY CLIENTS",
    },
    orders: {
        id: "orders",
        number: 5,
        marker: "{ 05 }",
        kicker: "GUIDELINES",
        title: "ORDERS & MOQ",
    },
    film: {
        id: "film",
        number: 6,
        marker: "{ 06 }",
        kicker: "TAKE A LOOK",
        title: "BRAND FILM",
    },
    location: {
        id: "location",
        number: 7,
        marker: "{ 07 }",
        kicker: "BORN IN MUMBAI",
        title: "THE ATELIER",
    },
};

export function getSectionMarker(key: keyof typeof SECTIONS): string {
    const sec = SECTIONS[key];
    return sec ? sec.marker : "{ 01 }";
}
