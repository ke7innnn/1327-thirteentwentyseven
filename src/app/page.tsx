"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";


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
