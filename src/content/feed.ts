/**
 * Curated Instagram Feed Posts for { 04 } WORN EVERY SHIFT
 * Drop new images into /public/feed/, update entries, refresh monthly.
 */
export interface FeedPost {
    id: string;
    image: string;
    alt: string;
    href: string;
}

export const feedPosts: FeedPost[] = [
    {
        id: "feed-01",
        image: "/feed/feed-01.jpg",
        alt: "Café staff member in custom 1327 olive green embroidered shirt",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-02",
        image: "/feed/feed-02.jpg",
        alt: "Brown cotton cap with custom Devanagari 1327 embroidery",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-03",
        image: "/feed/feed-03.jpg",
        alt: "Masa Bakery crew member in custom printed black back-graphic tee and cap",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-04",
        image: "/feed/feed-04.jpg", // Strongest center image — gold Devanagari logo detail on shirt
        alt: "Custom embroidered shirt detail with gold Devanagari logo embroidery",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-05",
        image: "/feed/feed-05.jpg",
        alt: "Plant-based leather beverage coasters & hospitality accessories set",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-06",
        image: "/feed/feed-06.jpg",
        alt: "1327 heavyweight oversized blank t-shirt sample swatch",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
    {
        id: "feed-07",
        image: "/feed/feed-07.jpg",
        alt: "Bisou Bisou full bib apron with custom crew logo embroidery",
        href: "https://www.instagram.com/1327_thirteentwentyseven/",
    },
];
