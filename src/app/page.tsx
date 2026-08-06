"use client";

import { useRef } from "react";
import Mission from "@/components/Mission";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import SocialFeed from "@/components/SocialFeed";
import HappyClients from "@/components/HappyClients";
import Notes from "@/components/Notes";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import ScrollChoreography from "@/components/ScrollChoreography";

export default function Home() {
  const topSectionsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      {/* SEO: Single H1 per page — visually hidden but accessible to crawlers */}
      <h1 className="sr-only">
        1327 Thirteen Twenty Seven — Custom T-Shirts, Uniforms &amp; Apparel in Mumbai, Malad
      </h1>
      <p className="sr-only">1327 Thirteen Twenty Seven — Custom T-Shirts, Uniforms &amp; Apparel in Mumbai, Malad.</p>

      {/* Travelling Needle & Thread Scroll Choreography (Sections 1 to 3) */}
      <div ref={topSectionsRef} className="relative w-full">
        <ScrollChoreography targetRef={topSectionsRef} />
        <Mission />
        <AboutUs />
      </div>
      <Services />
      <Process />
      <SocialFeed />
      <HappyClients />
      <Notes />
      <LocationMap />
      <Footer />
    </main>
  );
}
