import { NextResponse } from "next/server";
import { getOrders, updateOrderStatus, deleteOrder, addOrder } from "@/lib/orderStore";

// Check if request is authorized with admin passkey
function isAuthenticated(req: Request): boolean {
    const authHeader = req.headers.get("x-admin-key") || req.headers.get("authorization");
    const expectedKey = process.env.ADMIN_PASSWORD || "1327admin";
    
    if (!authHeader) return false;
    const cleanKey = authHeader.replace(/^Bearer\s+/i, "").trim();
    return cleanKey === expectedKey;
}

// GET /api/admin/orders — Retrieve all orders
export async function GET(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized. Invalid Admin Passkey." }, { status: 401 });
    }
    const orders = getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
}

// PATCH /api/admin/orders — Update status of an order
export async function PATCH(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized. Invalid Admin Passkey." }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: "orderId and status are required" }, { status: 400 });
        }

        const updated = updateOrderStatus(orderId, status);
        if (!updated) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order: updated });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}

// DELETE /api/admin/orders — Remove an order record
export async function DELETE(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized. Invalid Admin Passkey." }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            return NextResponse.json({ error: "orderId query parameter is required" }, { status: 400 });
        }

        const deleted = deleteOrder(orderId);
        if (!deleted) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Order #${orderId} deleted successfully` });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
