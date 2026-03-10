import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CinematicGrain from "@/components/ui/CinematicGrain";
import CustomCursor from "@/components/ui/CustomCursor";
import DynamicTitle from "@/components/DynamicTitle";

const sugo = localFont({
  src: "../../public/fonts/Sugo-Pro-Display-Regular-trial.ttf",
  variable: "--font-sugo",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

// ============================================================================
// SEO: Viewport
// ============================================================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#105233",
};

// ============================================================================
// SEO: Metadata — Title, Description, OG, Twitter, Keywords, Icons
// ============================================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://1327thirteentwentyseven.com"),

  title: "1327 — Custom T-Shirts & Uniforms | Mumbai",
  description:
    "1327 (Thirteen Twenty Seven) crafts premium custom t-shirts, polo shirts, caps, aprons & uniforms for businesses in Mumbai. Embroidery & printing. MOQ 50 pcs. Born in Malad.",

  keywords: [
    "1327",
    "thirteen twenty seven",
    "1327 Malad",
    "1327 Mumbai",
    "1327 custom t-shirts",
    "1327 community",
    "custom t-shirts Mumbai",
    "custom uniforms Mumbai",
    "bulk t-shirt printing Mumbai",
    "corporate uniforms Mumbai",
    "custom embroidery t-shirts",
    "custom polo t-shirts Mumbai",
    "custom caps Mumbai",
    "custom aprons Mumbai",
    "branded uniforms for business",
    "t-shirt embroidery Mumbai",
    "custom apparel Malad West",
    "t-shirt manufacturer Mumbai",
    "uniform supplier Maharashtra",
    "relaxed fit t-shirts bulk order",
    "custom t-shirts for restaurants Mumbai",
    "corporate branded uniforms Malad",
    "bulk order custom polo t-shirts India",
    "custom embroidery caps for brands",
    "t-shirt printing near Malad West",
    "custom merchandise Mumbai",
  ],

  authors: [{ name: "1327 Community" }],
  creator: "1327 Community",
  publisher: "1327 Community",

  icons: {
    icon: "/logo/1327_logo_v2.png",
    apple: "/logo/1327_logo_v2.png",
  },

  manifest: "/manifest.json",

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://1327thirteentwentyseven.com",
    siteName: "1327 — Thirteen Twenty Seven",
    title: "1327 — Custom T-Shirts & Uniforms | Mumbai",
    description:
      "Premium custom t-shirts, polo shirts, caps, aprons & uniforms for businesses. Embroidery & printing specialists in Malad, Mumbai.",
    images: [
      {
        url: "/logo/1327_logo_v2.png",
        width: 800,
        height: 800,
        alt: "1327 Thirteen Twenty Seven Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "1327 — Custom T-Shirts & Uniforms | Mumbai",
    description:
      "Premium custom t-shirts, polo shirts, caps, aprons & uniforms for businesses. Born in Malad, Mumbai.",
    images: ["/logo/1327_logo_v2.png"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification — replace with your real IDs when you have them
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_ID",
  //   other: { "msvalidate.01": "YOUR_BING_VERIFICATION_ID" },
  // },

  alternates: {
    canonical: "https://1327thirteentwentyseven.com",
  },
};

// ============================================================================
// JSON-LD Structured Data
// ============================================================================
function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "1327 — Thirteen Twenty Seven",
    alternateName: "1327 Community",
    url: "https://1327thirteentwentyseven.com",
    logo: "https://1327thirteentwentyseven.com/logo/1327_logo_v2.png",
    description:
      "Premium custom t-shirts, uniforms, caps, aprons & apparel for businesses in Mumbai. Embroidery and printing specialists.",
    founder: {
      "@type": "Person",
      name: "Keith Shah",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8082845721",
      contactType: "sales",
      email: "1327thecommunity@gmail.com",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/1327_thirteentwentyseven/",
      "https://www.youtube.com/@1327-thirteentwentyseven",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://1327thirteentwentyseven.com/#localbusiness",
    name: "1327 — Thirteen Twenty Seven",
    image: "https://1327thirteentwentyseven.com/logo/1327_logo_v2.png",
    description:
      "Custom t-shirts, polo shirts, caps, aprons and uniforms manufacturer in Malad West, Mumbai. Embroidery and printing specialists.",
    telephone: "+91-8082845721",
    email: "1327thecommunity@gmail.com",
    url: "https://1327thirteentwentyseven.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Orlem, Malad West",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400064",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.1866,
      longitude: 72.8369,
    },
    areaServed: {
      "@type": "City",
      name: "Mumbai",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "1327 — Thirteen Twenty Seven",
    url: "https://1327thirteentwentyseven.com",
    description:
      "Custom t-shirts, uniforms and apparel for businesses in Mumbai.",
  };

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Relaxed Fit T-Shirts",
      description:
        "Relaxed Fit t-shirts, 240-270 GSM. Embroidery looks richer in oversized T-shirts. Bulk orders starting at 50 pcs.",
      provider: { "@id": "https://1327thirteentwentyseven.com/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Polo T-Shirts",
      description:
        "Polo neck T-shirts combining comfort with a dressier look, 190-200 GSM. Custom embroidery and printing.",
      provider: { "@id": "https://1327thirteentwentyseven.com/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Aprons",
      description:
        "Customised aprons — cut, shape, stitching and embroidery as per requirement. MOQ 30 pcs.",
      provider: { "@id": "https://1327thirteentwentyseven.com/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Straight Fit T-Shirts",
      description:
        "Regular everyday straight fit T-shirts. Light weight, breathable, 140-180 GSM.",
      provider: { "@id": "https://1327thirteentwentyseven.com/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Caps",
      description:
        "Custom embroidered caps to match your brand's style. Bulk orders starting at 30 pcs.",
      provider: { "@id": "https://1327thirteentwentyseven.com/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// ============================================================================
// Root Layout
// ============================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body
        className={clsx(
          sugo.variable,
          bodoni.variable,
          "antialiased text-white overflow-x-hidden selection:bg-[#C9FF23] selection:text-black font-body"
        )}
      >
        <SmoothScroll>
          <CinematicGrain />
          <Header />
          <DynamicTitle />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
