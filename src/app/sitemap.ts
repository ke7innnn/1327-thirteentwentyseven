import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://1327thirteentwentyseven.com",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
    ];
}
