"use client";

import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-[#0D1712] text-[#F7F5F0] relative overflow-x-hidden pt-16 sm:pt-20">
            {/* Dedicated Full Page Order Form Section */}
            <OrderForm />

            {/* Footer */}
            <Footer />
        </main>
    );
}
