"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Unlock,
    Search,
    Download,
    FileText,
    Trash2,
    RefreshCw,
    ShieldCheck,
    Truck,
    Package,
    ArrowLeft,
    CheckCircle2,
    Clock,
    DollarSign,
    Layers,
    X,
    Printer,
} from "lucide-react";
import { OrderItem } from "@/lib/orderStore";

export default function AdminOrdersPage() {
    // Auth state
    const [passkey, setPasskey] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState("");
    const [savedKey, setSavedKey] = useState("");

    // Data state
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProductFilter, setSelectedProductFilter] = useState("ALL");
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

    // Modal state for PDF receipt preview
    const [receiptOrder, setReceiptOrder] = useState<OrderItem | null>(null);

    // Auto-check stored passkey on mount
    useEffect(() => {
        const storedKey = sessionStorage.getItem("1327_admin_passkey");
        if (storedKey) {
            setSavedKey(storedKey);
            fetchOrders(storedKey);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError("");
        if (!passkey) return;

        fetchOrders(passkey);
    };

    const fetchOrders = async (key: string) => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/orders", {
                headers: { "x-admin-key": key },
            });
            const data = await res.json();

            if (res.ok && data.orders) {
                setOrders(data.orders);
                setIsAuthenticated(true);
                setSavedKey(key);
                sessionStorage.setItem("1327_admin_passkey", key);
            } else {
                setAuthError("Incorrect Admin Passkey. Please try again.");
                setIsAuthenticated(false);
            }
        } catch (err) {
            setAuthError("Server connection failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: OrderItem["status"]) => {
        try {
            const res = await fetch("/api/admin/orders", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": savedKey,
                },
                body: JSON.stringify({ orderId, status: newStatus }),
            });
            if (res.ok) {
                setOrders((prev) =>
                    prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
                );
            }
        } catch (e) {
            alert("Failed to update order status");
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm(`Are you sure you want to delete order #${orderId}?`)) return;
        try {
            const res = await fetch(`/api/admin/orders?orderId=${orderId}`, {
                method: "DELETE",
                headers: { "x-admin-key": savedKey },
            });
            if (res.ok) {
                setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
            }
        } catch (e) {
            alert("Failed to delete order");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("1327_admin_passkey");
        setIsAuthenticated(false);
        setSavedKey("");
        setPasskey("");
    };

    // CSV Excel Exporter
    const handleExportCSV = () => {
        if (filteredOrders.length === 0) return alert("No orders available to export.");

        const headers = [
            "Order Ref",
            "Date",
            "First Name",
            "Last Name",
            "Email",
            "Mobile Number",
            "Item Selection",
            "Order Price",
            "Selected Size",
            "Status",
            "Shipping Address",
        ];

        const rows = filteredOrders.map((o) => [
            `"${o.orderId}"`,
            `"${new Date(o.createdAt).toLocaleString()}"`,
            `"${o.firstName}"`,
            `"${o.lastName}"`,
            `"${o.email}"`,
            `"${o.mobile}"`,
            `"${o.selectedProduct}"`,
            `"${o.orderPrice}"`,
            `"${o.selectedSize}"`,
            `"${o.status}"`,
            `"${o.address.replace(/"/g, '""')}"`,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `1327_Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter logic
    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            const matchesSearch =
                o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${o.firstName} ${o.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.address.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesProduct =
                selectedProductFilter === "ALL" ||
                (selectedProductFilter === "TSHIRT" && o.selectedProduct.includes("T-Shirt Only")) ||
                (selectedProductFilter === "CAP" && o.selectedProduct.includes("Cap Only")) ||
                (selectedProductFilter === "COMBO" && o.selectedProduct.includes("Combo"));

            const matchesStatus =
                selectedStatusFilter === "ALL" || o.status === selectedStatusFilter;

            return matchesSearch && matchesProduct && matchesStatus;
        });
    }, [orders, searchTerm, selectedProductFilter, selectedStatusFilter]);

    // Statistics calculations
    const stats = useMemo(() => {
        const total = orders.length;
        const totalRevenue = orders.reduce((acc, curr) => {
            const val = parseInt(curr.orderPrice.replace(/[^0-9]/g, "")) || 0;
            return acc + val;
        }, 0);
        const pending = orders.filter((o) => o.status === "PENDING").length;
        const inProd = orders.filter((o) => o.status === "IN PRODUCTION").length;
        const completed = orders.filter((o) => o.status === "COMPLETED" || o.status === "DISPATCHED").length;

        return { total, totalRevenue, pending, inProd, completed };
    }, [orders]);

    return (
        <div className="min-h-screen bg-[#0A120E] text-[#F7F5F0] font-mono selection:bg-[#1EA86E] selection:text-[#0D1712] pt-6 pb-20 px-4 sm:px-8">
            {/* Header Navigation Bar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#1EA86E]/30 pb-4 mb-8">
                <div className="flex items-center gap-3">
                    <Link
                        href="/order"
                        className="p-2 bg-[#105233]/40 border border-[#1EA86E]/40 text-[#1EA86E] hover:text-white transition-colors"
                        title="Back to Order Form"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="flex flex-col">
                        <span className="font-heading font-black text-2xl tracking-tight uppercase text-white flex items-center gap-2">
                            1327 <span className="text-[#1EA86E]">ORDER DESK</span>
                        </span>
                        <span className="text-[10px] text-[#1EA86E] font-bold tracking-[0.2em] uppercase">
                            ATELIER MANAGEMENT TERMINAL
                        </span>
                    </div>
                </div>

                {isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => fetchOrders(savedKey)}
                            className="px-3 py-1.5 bg-[#105233]/40 border border-[#1EA86E]/40 text-[#1EA86E] hover:bg-[#1EA86E] hover:text-[#0D1712] font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5"
                        >
                            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                            <span>REFRESH</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5"
                        >
                            <Lock size={13} />
                            <span>LOGOUT</span>
                        </button>
                    </div>
                )}
            </div>

            {/* ─── AUTHENTICATION PASSKEY SCREEN ─────────────────────────────────── */}
            {!isAuthenticated ? (
                <div className="max-w-md mx-auto my-16 bg-[#0D1712] border border-[#1EA86E]/40 p-6 sm:p-10 shadow-2xl relative">
                    <div className="w-14 h-14 rounded-full bg-[#105233]/50 border border-[#1EA86E] text-[#1EA86E] flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <Lock size={26} />
                    </div>

                    <div className="text-center flex flex-col gap-1 mb-6">
                        <h1 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
                            ADMIN PASSKEY REQUIRED
                        </h1>
                        <p className="text-xs text-[#F7F5F0]/60 tracking-wider">
                            AUTHENTICATE TO ACCESS 1327 APPAREL ORDERS
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#1EA86E] uppercase tracking-wider">
                                ADMIN PASSKEY *
                            </label>
                            <input
                                type="password"
                                required
                                autoFocus
                                value={passkey}
                                onChange={(e) => setPasskey(e.target.value)}
                                placeholder="Enter admin passkey (e.g. 1327admin)"
                                className="w-full bg-[#080E0A] border border-[#1EA86E]/40 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1EA86E] focus:ring-1 focus:ring-[#1EA86E] transition-colors rounded-none placeholder:text-[#F7F5F0]/30"
                            />
                        </div>

                        {authError && (
                            <div className="p-3 bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-bold text-center">
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#1EA86E] text-[#0D1712] font-heading font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors mt-2 shadow-lg disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "AUTHENTICATING..." : "ACCESS ADMIN DESK"}
                        </button>
                    </form>
                </div>
            ) : (
                /* ─── MAIN ADMIN DASHBOARD PANEL ─────────────────────────────────────── */
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {/* STATS OVERVIEW CARDS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
                        <div className="bg-[#0D1712] border border-[#1EA86E]/30 p-4 sm:p-5 flex flex-col gap-1">
                            <span className="text-[10px] text-[#F7F5F0]/60 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Package size={13} className="text-[#1EA86E]" /> TOTAL ORDERS
                            </span>
                            <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                                {stats.total}
                            </span>
                        </div>

                        <div className="bg-[#0D1712] border border-[#1EA86E]/30 p-4 sm:p-5 flex flex-col gap-1">
                            <span className="text-[10px] text-[#F7F5F0]/60 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <DollarSign size={13} className="text-[#1EA86E]" /> TOTAL VALUE
                            </span>
                            <span className="font-heading font-black text-2xl sm:text-3xl text-[#1EA86E]">
                                ₹{stats.totalRevenue.toLocaleString()}
                            </span>
                        </div>

                        <div className="bg-[#0D1712] border border-[#1EA86E]/30 p-4 sm:p-5 flex flex-col gap-1">
                            <span className="text-[10px] text-[#F7F5F0]/60 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Clock size={13} className="text-amber-400" /> PENDING / IN PROD
                            </span>
                            <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
                                {stats.pending + stats.inProd}
                            </span>
                        </div>

                        <div className="bg-[#0D1712] border border-[#1EA86E]/30 p-4 sm:p-5 flex flex-col gap-1">
                            <span className="text-[10px] text-[#F7F5F0]/60 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle2 size={13} className="text-emerald-400" /> COMPLETED
                            </span>
                            <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
                                {stats.completed}
                            </span>
                        </div>
                    </div>

                    {/* SEARCH & EXPORT ACTION BAR */}
                    <div className="bg-[#0D1712] border border-[#1EA86E]/30 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1EA86E]" size={16} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by Order Ref, Name, Email, Phone or Address..."
                                className="w-full bg-[#080E0A] border border-[#1EA86E]/30 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1EA86E] placeholder:text-[#F7F5F0]/40 rounded-none"
                            />
                        </div>

                        {/* Filters & Export Button */}
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={selectedProductFilter}
                                onChange={(e) => setSelectedProductFilter(e.target.value)}
                                className="bg-[#080E0A] border border-[#1EA86E]/30 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1EA86E]"
                            >
                                <option value="ALL">ALL ITEMS</option>
                                <option value="TSHIRT">T-SHIRT ONLY</option>
                                <option value="CAP">CAP ONLY</option>
                                <option value="COMBO">COMBO PACK</option>
                            </select>

                            <select
                                value={selectedStatusFilter}
                                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                                className="bg-[#080E0A] border border-[#1EA86E]/30 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1EA86E]"
                            >
                                <option value="ALL">ALL STATUSES</option>
                                <option value="PENDING">PENDING</option>
                                <option value="IN PRODUCTION">IN PRODUCTION</option>
                                <option value="DISPATCHED">DISPATCHED</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>

                            <button
                                onClick={handleExportCSV}
                                className="px-4 py-2 bg-[#1EA86E] text-[#0D1712] font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                            >
                                <Download size={14} />
                                <span>EXPORT EXCEL (.CSV)</span>
                            </button>
                        </div>
                    </div>

                    {/* INTERACTIVE DATA TABLE */}
                    <div className="bg-[#0D1712] border border-[#1EA86E]/30 overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#105233]/40 border-b border-[#1EA86E]/40 text-[#1EA86E] font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="p-3.5">ORDER REF</th>
                                    <th className="p-3.5">DATE</th>
                                    <th className="p-3.5">CUSTOMER</th>
                                    <th className="p-3.5">ITEM &amp; PRICE</th>
                                    <th className="p-3.5">SIZE</th>
                                    <th className="p-3.5">SHIPPING ADDRESS</th>
                                    <th className="p-3.5">STATUS</th>
                                    <th className="p-3.5 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F7F5F0]/10">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="p-8 text-center text-[#F7F5F0]/50 tracking-wider">
                                            NO ORDERS FOUND MATCHING YOUR SEARCH CRITERIA.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((o) => (
                                        <tr key={o.orderId} className="hover:bg-[#105233]/20 transition-colors">
                                            <td className="p-3.5 font-bold text-white whitespace-nowrap">
                                                #{o.orderId}
                                            </td>
                                            <td className="p-3.5 text-[#F7F5F0]/70 whitespace-nowrap">
                                                {new Date(o.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="p-3.5 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white">
                                                        {o.firstName} {o.lastName}
                                                    </span>
                                                    <span className="text-[#F7F5F0]/60 text-[11px]">{o.email}</span>
                                                    <span className="text-[#1EA86E] text-[11px] font-bold">{o.mobile}</span>
                                                </div>
                                            </td>
                                            <td className="p-3.5 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white">{o.selectedProduct}</span>
                                                    <span className="text-[#1EA86E] font-black text-sm">{o.orderPrice}</span>
                                                </div>
                                            </td>
                                            <td className="p-3.5 font-bold text-[#1EA86E] whitespace-nowrap">
                                                {o.selectedSize}
                                            </td>
                                            <td className="p-3.5 text-[#F7F5F0]/80 max-w-xs truncate" title={o.address}>
                                                {o.address}
                                            </td>
                                            <td className="p-3.5 whitespace-nowrap">
                                                <select
                                                    value={o.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(o.orderId, e.target.value as any)
                                                    }
                                                    className={`px-2 py-1 text-[11px] font-bold uppercase border bg-[#080E0A] focus:outline-none cursor-pointer ${
                                                        o.status === "PENDING"
                                                            ? "text-amber-400 border-amber-400/40"
                                                            : o.status === "IN PRODUCTION"
                                                            ? "text-blue-400 border-blue-400/40"
                                                            : o.status === "DISPATCHED"
                                                            ? "text-purple-400 border-purple-400/40"
                                                            : "text-emerald-400 border-emerald-400/40"
                                                    }`}
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="IN PRODUCTION">IN PRODUCTION</option>
                                                    <option value="DISPATCHED">DISPATCHED</option>
                                                    <option value="COMPLETED">COMPLETED</option>
                                                </select>
                                            </td>
                                            <td className="p-3.5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setReceiptOrder(o)}
                                                        className="p-1.5 bg-[#105233]/40 border border-[#1EA86E]/40 text-[#1EA86E] hover:bg-[#1EA86E] hover:text-[#0D1712] transition-all cursor-pointer"
                                                        title="Print PDF Receipt & Packing Slip"
                                                    >
                                                        <FileText size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOrder(o.orderId)}
                                                        className="p-1.5 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                                        title="Delete Order Record"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ─── PRINTABLE PDF RECEIPT & PACKING SLIP MODAL ─────────────────────── */}
            <AnimatePresence>
                {receiptOrder && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setReceiptOrder(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md z-0"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative z-10 bg-white text-black p-6 sm:p-10 w-full max-w-2xl shadow-2xl my-auto font-sans"
                        >
                            {/* Close & Print Buttons */}
                            <div className="flex justify-between items-center border-b pb-4 mb-6 print:hidden">
                                <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    1327 ATELIER OFFICIAL ORDER RECEIPT
                                </span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => window.print()}
                                        className="px-4 py-2 bg-[#105233] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-black transition-colors"
                                    >
                                        <Printer size={14} />
                                        <span>PRINT / SAVE PDF</span>
                                    </button>
                                    <button
                                        onClick={() => setReceiptOrder(null)}
                                        className="p-1 text-gray-500 hover:text-black transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Printable Receipt Layout */}
                            <div className="flex flex-col gap-6 print:p-0">
                                {/* Header */}
                                <div className="flex justify-between items-start border-b border-black pb-4">
                                    <div className="flex flex-col">
                                        <h1 className="font-black text-3xl tracking-tighter">1327</h1>
                                        <span className="font-mono text-[10px] tracking-widest text-gray-600 font-bold uppercase">
                                            THIRTEEN TWENTYSEVEN ATELIER
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">Malad West, Bombay, MH 400064</span>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className="font-mono text-xs font-bold text-[#105233]">
                                            ORDER REF #{receiptOrder.orderId}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-0.5">
                                            DATE: {new Date(receiptOrder.createdAt).toLocaleDateString("en-IN")}
                                        </span>
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-black font-mono text-[10px] font-bold uppercase border border-black">
                                            {receiptOrder.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Customer & Shipping Info */}
                                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 border border-gray-200">
                                    <div className="flex flex-col text-xs gap-1">
                                        <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                            CUSTOMER DETAILS
                                        </span>
                                        <span className="font-bold text-sm">
                                            {receiptOrder.firstName} {receiptOrder.lastName}
                                        </span>
                                        <span>Email: {receiptOrder.email}</span>
                                        <span>Mobile: {receiptOrder.mobile}</span>
                                    </div>
                                    <div className="flex flex-col text-xs gap-1">
                                        <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                            SHIPPING DESTINATION
                                        </span>
                                        <span className="text-gray-800 leading-relaxed font-medium">
                                            {receiptOrder.address}
                                        </span>
                                    </div>
                                </div>

                                {/* Item Table */}
                                <div className="border border-black">
                                    <div className="grid grid-cols-4 bg-black text-white font-mono text-[11px] font-bold p-2.5 uppercase">
                                        <span className="col-span-2">ITEM DESCRIPTION</span>
                                        <span>SIZE</span>
                                        <span className="text-right">PRICE</span>
                                    </div>
                                    <div className="grid grid-cols-4 p-3 font-mono text-xs border-b border-gray-200">
                                        <div className="col-span-2 flex flex-col">
                                            <span className="font-bold">{receiptOrder.selectedProduct}</span>
                                            <span className="text-[10px] text-gray-500">
                                                Turnaround: 6–7 Days (Pan-India)
                                            </span>
                                        </div>
                                        <span className="font-bold text-[#105233]">{receiptOrder.selectedSize}</span>
                                        <span className="text-right font-black text-sm">{receiptOrder.orderPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 font-mono text-xs font-bold">
                                        <span>TOTAL AMOUNT</span>
                                        <span className="text-base text-[#105233]">{receiptOrder.orderPrice}</span>
                                    </div>
                                </div>

                                {/* Production Note */}
                                <div className="text-[11px] text-gray-600 border-t pt-4 font-mono leading-relaxed flex flex-col gap-1">
                                    <span>
                                        <strong>1327 Malad Desk Note:</strong> This document serves as the official production packing slip and order receipt.
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        Contact: hello@1327.in | WhatsApp: +91 98190 01327 | www.1327.in
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
