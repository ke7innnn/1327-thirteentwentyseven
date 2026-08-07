"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageSquare } from "lucide-react";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-[#0D1712] text-[#F7F5F0] relative overflow-x-hidden">
            {/* Top Navigation Header for Order Page */}
            <header className="sticky top-0 left-0 right-0 z-50 bg-[#105233]/95 backdrop-blur-md border-b border-[#1EA86E]/40 px-4 sm:px-6 py-3 flex items-center justify-between h-16 shadow-md relative">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white hover:text-[#1EA86E] transition-colors relative z-20"
                >
                    <ArrowLeft size={16} />
                    <span>BACK<span className="hidden xs:inline"> TO HOME</span></span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                    <Link href="/" className="block relative flex items-center justify-center">
                        <Image
                            src="/logo/1327_logo_v2.png"
                            alt="1327 Logo"
                            width={44}
                            height={44}
                            className="w-auto h-[38px] sm:h-[44px] object-contain"
                            unoptimized
                            priority
                        />
                    </Link>
                </div>

                <a
                    href="mailto:1327thecommunity@gmail.com"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 bg-[#1EA86E]/20 border border-[#1EA86E]/50 text-[#1EA86E] font-mono text-[11px] sm:text-xs font-bold tracking-wider hover:bg-[#1EA86E] hover:text-[#0D1712] transition-all relative z-20"
                >
                    <MessageSquare size={14} />
                    <span className="hidden sm:inline">EMAIL DESK</span>
                </a>
            </header>

            {/* Dedicated Full Page Order Form Section */}
            <div className="pt-4">
                <OrderForm />
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
