import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface ValueDetail {
    slug: string;
    num: string;
    title: string;
    subtitle: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    specTitle: string;
    specs: { label: string; value: string }[];
    image: string;
    imageCaption: string;
    nextSlug: string;
    nextTitle: string;
    prevSlug: string;
    prevTitle: string;
}

const VALUES_DATA: Record<string, ValueDetail> = {
    community: {
        slug: "community",
        num: "01",
        title: "COMMUNITY",
        subtitle: "Crews That Move Like Family",
        headline: "WE DON'T CHASE ORDERS. WE BUILD RELATIONSHIPS THAT LAST.",
        paragraph1:
            "1327 was born in Mumbai on a code borrowed from street culture — nothing matters more than family. Community isn't a marketing slogan for us; it is our foundation. Born in Malad West, we work shoulder-to-shoulder with local cafés, kitchens, studios, and street crews.",
        paragraph2:
            "Every garment we craft is engineered to bring people together, creating a sense of shared pride and belonging that turns team members into family. When your crew pulls on a 1327 uniform, they move with a shared identity that commands respect.",
        specTitle: "COMMUNITY SPECIFICATIONS",
        specs: [
            { label: "HQ LOCATION", value: "Malad West — Mumbai, IN" },
            { label: "COORDINATES", value: "19.1871° N / 72.8488° E" },
            { label: "MINIMUM ORDER", value: "30-50 Pcs Custom Rollout" },
            { label: "PARTNER CREWS", value: "Cafés, Kitchens & Studios" },
        ],
        image: "/aboutus/about-3.png",
        imageCaption: "THE WORKSHOP — MALAD WEST, MUMBAI",
        nextSlug: "trust",
        nextTitle: "02 TRUST",
        prevSlug: "loyalty",
        prevTitle: "04 LOYALTY",
    },
    trust: {
        slug: "trust",
        num: "02",
        title: "TRUST",
        subtitle: "Uncompromising Quality & Transparency",
        headline: "ZERO SHORTCUTS. CUT, STITCHED & EMBROIDERED WITH PRECISION.",
        paragraph1:
            "Trust is earned stitch by stitch. We select only the highest-grade heavyweight cottons, pre-shrunk fabrics, and industrial-strength embroidery threads. We skip every shortcut because your uniform represents your reputation.",
        paragraph2:
            "From strict MOQs to bulletproof delivery timelines, we handle every detail with total transparency so you can focus on running your business. When you order from 1327, what you see is what gets delivered — every single time.",
        specTitle: "QUALITY GUARANTEE",
        specs: [
            { label: "FABRIC WEIGHT", value: "320 GSM Heavyweight Cotton" },
            { label: "STITCH COUNT", value: "14 Stitches Per Inch" },
            { label: "EMBROIDERY", value: "Industrial High-Density Thread" },
            { label: "SHRINKAGE", value: "Pre-Shrunk & Fabric Washed" },
        ],
        image: "/aboutus/about-2.png",
        imageCaption: "MACRO STITCH & EMBROIDERY DETAIL",
        nextSlug: "respect",
        nextTitle: "03 RESPECT",
        prevSlug: "community",
        prevTitle: "01 COMMUNITY",
    },
    respect: {
        slug: "respect",
        num: "03",
        title: "RESPECT",
        subtitle: "Honoring The Craft & The People",
        headline: "CRAFTED TO DEMAND RESPECT THE MOMENT YOUR CREW STEPS IN.",
        paragraph1:
            "Respect drives everything we produce — respect for the master tailors who cut and sew our garments, respect for ethical sourcing, and deep respect for your brand's vision.",
        paragraph2:
            "We design uniforms and apparel that make your people feel proud to step onto the floor every shift. When a uniform fits right and feels premium, it elevates morale and reflects the respect you have for your team.",
        specTitle: "CRAFT STANDARDS",
        specs: [
            { label: "PATTERN CUT", value: "Custom Tailored Drop-Shoulder" },
            { label: "SEAM TYPE", value: "Double-Needle Reinforced" },
            { label: "DURABILITY", value: "Tested for Heavy Wash Cycles" },
            { label: "PRODUCTION", value: "In-House Atelier Mumbai" },
        ],
        image: "/aboutus/about-1.png",
        imageCaption: "THE RANGE — SS/26 ATELIER SHOWCASE",
        nextSlug: "loyalty",
        nextTitle: "04 LOYALTY",
        prevSlug: "trust",
        prevTitle: "02 TRUST",
    },
    loyalty: {
        slug: "loyalty",
        num: "04",
        title: "LOYALTY",
        subtitle: "Relationships That Outlast Trends",
        headline: "WE DON'T CHASE ONE-OFF ORDERS. WE BUILD LIFELONG PARTNERSHIPS.",
        paragraph1:
            "Fast & Furious ethos lived out on the street — nothing matters more than loyalty. Our clients return to us season after season because we treat their brand as if it were our own.",
        paragraph2:
            "Whether expanding to new locations or refreshing your seasonal range, 1327 stands by your side as a dedicated apparel partner committed to your growth for the long haul.",
        specTitle: "PARTNERSHIP ATELIER",
        specs: [
            { label: "REPEAT CLIENTS", value: "85%+ Long-Term Retention" },
            { label: "RE-ORDER SPEED", value: "Priority Production Queue" },
            { label: "ARCHIVE", value: "Dedicated Pattern Storage" },
            { label: "SERVICE", value: "Direct Founder Consultation" },
        ],
        image: "/aboutus/about-4.png",
        imageCaption: "THE FIT — ON CREW SHOWCASE",
        nextSlug: "community",
        nextTitle: "01 COMMUNITY",
        prevSlug: "respect",
        prevTitle: "03 RESPECT",
    },
};

export async function generateStaticParams() {
    return Object.keys(VALUES_DATA).map((slug) => ({ slug }));
}

export default async function ValuePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const value = VALUES_DATA[resolvedParams.slug];

    if (!value) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#105233] text-white overflow-hidden relative">
            <Header />

            {/* 1327 Brand Woven Linen Apparel Texture Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#105233]">
                <div
                    className="absolute inset-0 opacity-[0.25] mix-blend-multiply bg-repeat"
                    style={{
                        backgroundImage: "url('/bg/clothing_fabric_bg.png')",
                        backgroundSize: "400px 400px",
                    }}
                />
                {/* Studio Radial Lighting Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 85% 85% at 50% 40%, rgba(30,168,110,0.2) 0%, rgba(12,60,37,0.7) 100%)",
                    }}
                />
            </div>

            {/* Giant Watermark 1327 Monogram */}
            <div className="absolute right-4 lg:right-16 top-1/3 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.06]">
                <span className="font-heading font-black text-[22vw] tracking-tighter text-white">
                    1327
                </span>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 pt-28 pb-20 md:pt-36 md:pb-28 container mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
                
                {/* Top Back Navigation Bar */}
                <div className="flex justify-between items-center pb-8 mb-10 border-b border-white/15">
                    <Link
                        href="/#about"
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span>BACK TO ABOUT US</span>
                    </Link>

                    <div className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
                        <span className="text-white font-bold mr-2">&#123; {value.num} &#125;</span>
                        <span>{value.title}</span>
                    </div>
                </div>

                {/* Main Hero Header */}
                <div className="flex flex-col gap-4 max-w-4xl mb-12">
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white/90">
                        / 1327 CORE VALUE {value.num}
                    </span>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none font-heading text-white">
                        {value.title}
                    </h1>
                    <p className="text-xl sm:text-2xl font-sans font-light text-white/80 tracking-wide">
                        {value.subtitle}
                    </p>
                </div>

                {/* 2-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column — Paragraphs & Specifications */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-md rounded-md border border-white/15 shadow-xl">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading uppercase text-white mb-4 tracking-tight leading-tight">
                                {value.headline}
                            </h2>
                            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light mb-6">
                                {value.paragraph1}
                            </p>
                            <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed font-light">
                                {value.paragraph2}
                            </p>
                        </div>

                        {/* Specifications Card */}
                        <div className="p-6 sm:p-8 bg-black/50 backdrop-blur-md rounded-md border border-white/20 shadow-xl">
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                <span>{value.specTitle}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {value.specs.map((spec, i) => (
                                    <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 rounded border border-white/10">
                                        <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                                            {spec.label}
                                        </span>
                                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Brand Image Card */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/20 shadow-2xl group">
                            <Image
                                src={value.image}
                                alt={value.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                            
                            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-sm bg-black/80 backdrop-blur-md border border-white/15">
                                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white block text-center">
                                    {value.imageCaption}
                                </span>
                            </div>
                        </div>

                        {/* Reach Out Direct CTA */}
                        <div className="p-6 bg-black/60 backdrop-blur-md rounded-md border border-white/15 text-center flex flex-col items-center gap-4">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
                                READY TO BUILD WITH 1327?
                            </span>
                            <Link
                                href="/#clients"
                                className="w-full bg-white hover:bg-white/90 text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-sm transition-all shadow-lg text-center"
                            >
                                SEE THE WORK ↗
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Navigation between Values */}
                <div className="mt-16 pt-8 border-t border-white/15 flex justify-between items-center font-mono text-xs font-bold tracking-widest uppercase">
                    <Link
                        href={`/values/${value.prevSlug}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span>PREV: {value.prevTitle}</span>
                    </Link>

                    <Link
                        href={`/values/${value.nextSlug}`}
                        className="text-white hover:text-white/70 transition-colors flex items-center gap-2 group"
                    >
                        <span>NEXT: {value.nextTitle}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

            </div>

            <Footer />
        </main>
    );
}
