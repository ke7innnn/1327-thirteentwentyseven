"use client";

import Mission from "@/components/Mission";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import HappyClients from "@/components/HappyClients";
import Notes from "@/components/Notes";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
      {/* SEO: Single H1 per page — visually hidden but accessible to crawlers */}
      <h1 className="sr-only">
        1327 Thirteen Twenty Seven — Custom T-Shirts, Uniforms &amp; Apparel in Mumbai, Malad
      </h1>
      <Mission />
      <AboutUs />
      <Services />
      <HappyClients />
      <Notes />
      <LocationMap />
      <Footer />
    </main>
  );
}
