import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Bodoni_Moda, Plus_Jakarta_Sans, Archivo } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CinematicGrain from "@/components/ui/CinematicGrain";
import DynamicTitle from "@/components/DynamicTitle";
import ImagePreloader from "@/components/ImagePreloader";

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

const premiumMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-space-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
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
  metadataBase: new URL("https://www.1327.in"),

  title: "1327 — Custom T-Shirts & Uniforms | Mumbai",
  description:
    "1327 crafts custom t-shirts, caps, aprons & uniforms for businesses in Mumbai. Embroidery & printing. MOQ 50 pcs. Born in Malad.",

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
    url: "https://www.1327.in",
    siteName: "1327 — Thirteen Twenty Seven",
    title: "1327 — Custom T-Shirts & Uniforms | Mumbai",
    description:
      "Premium custom t-shirts, polo shirts, caps, aprons & uniforms for businesses. Embroidery & printing specialists in Malad, Mumbai.",
    images: [
      {
        url: "/logo/1327_logo_v2.png",
        width: 1200,
        height: 630,
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

  // Verification
  verification: {
    google: "aH2PVpnwXFPh1TH88SLFuvRJFUu1Y0YWa2u1TahyHVs",
  },

  alternates: {
    canonical: "https://www.1327.in",
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
    url: "https://www.1327.in",
    logo: "https://www.1327.in/logo/1327_logo_v2.png",
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
      email: "hello@1327.in",
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
    "@id": "https://www.1327.in/#localbusiness",
    name: "1327 — Thirteen Twenty Seven",
    image: "https://www.1327.in/logo/1327_logo_v2.png",
    description:
      "Custom t-shirts, polo shirts, caps, aprons and uniforms manufacturer in Malad West, Mumbai. Embroidery and printing specialists.",
    telephone: "+91-8082845721",
    email: "hello@1327.in",
    url: "https://www.1327.in",
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
    sameAs: [
      "https://www.instagram.com/1327_thirteentwentyseven/",
      "https://www.youtube.com/@1327-thirteentwentyseven",
    ],
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
    url: "https://www.1327.in",
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
      provider: { "@id": "https://www.1327.in/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Polo T-Shirts",
      description:
        "Polo neck T-shirts combining comfort with a dressier look, 190-200 GSM. Custom embroidery and printing.",
      provider: { "@id": "https://www.1327.in/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Aprons",
      description:
        "Customised aprons — cut, shape, stitching and embroidery as per requirement. MOQ 30 pcs.",
      provider: { "@id": "https://www.1327.in/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Straight Fit T-Shirts",
      description:
        "Regular everyday straight fit T-shirts. Light weight, breathable, nothing too fancy, 140-180 GSM.",
      provider: { "@id": "https://www.1327.in/#localbusiness" },
      areaServed: "Mumbai",
      serviceType: "Custom Apparel Manufacturing",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Caps",
      description:
        "Custom embroidered caps to match your brand's style. Bulk orders starting at 30 pcs.",
      provider: { "@id": "https://www.1327.in/#localbusiness" },
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
        {/* Preload hero frame 1 for instant 0ms initial render */}
        <link rel="preload" href="/sequence/ezgif-frame-001.jpg" as="image" fetchPriority="high" />
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body
        className={clsx(
          sugo.variable,
          bodoni.variable,
          premiumMono.variable,
          archivo.variable,
          "antialiased text-white selection:bg-white selection:text-black font-body bg-black"
        )}
      >
        <ImagePreloader />
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
