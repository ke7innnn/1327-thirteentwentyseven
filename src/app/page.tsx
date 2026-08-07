"use client";

import Mission from "@/components/Mission";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import SocialFeed from "@/components/SocialFeed";
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
      <p className="sr-only">1327 Thirteen Twenty Seven — Custom T-Shirts, Uniforms &amp; Apparel in Mumbai, Malad.</p>
      <Mission />
      {/* relative z-10 — creates stacking context above fixed hero (z-[1]) */}
      <div className="relative z-10">
        <AboutUs />
        <Services />
        <Process />
        <SocialFeed />
        <HappyClients />
        <Notes />
        <LocationMap />
        <Footer />
      </div>
    </main>
  );
}
