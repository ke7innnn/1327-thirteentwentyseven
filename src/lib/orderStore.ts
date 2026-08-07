import { Redis } from "@upstash/redis";

export interface OrderItem {
    orderId: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    selectedProduct: string;
    selectedSize: string;
    orderPrice: string;
    status: "PENDING" | "IN PRODUCTION" | "DISPATCHED" | "COMPLETED";
}

// ─── Upstash Redis Client (auto-configured via Vercel Upstash integration) ──
// When KV_REST_API_URL and KV_REST_API_TOKEN are set (auto-added by Vercel),
// orders persist permanently in the cloud forever.
// Falls back to in-memory store if not configured (local dev / missing env).
let redis: Redis | null = null;

try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        redis = new Redis({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
        });
    }
} catch (e) {
    console.warn("Upstash Redis not configured, using in-memory fallback.");
}

const REDIS_KEY = "1327:orders";

// ─── In-memory fallback store ───────────────────────────────────────────────
let memoryOrders: OrderItem[] = [];

// ─── Core helpers ────────────────────────────────────────────────────────────

export async function getOrders(): Promise<OrderItem[]> {
    if (redis) {
        try {
            const raw = await redis.get<OrderItem[]>(REDIS_KEY);
            return raw || [];
        } catch (e) {
            console.error("Redis getOrders failed, falling back to memory:", e);
        }
    }
    return memoryOrders;
}

export async function addOrder(newOrder: OrderItem): Promise<OrderItem> {
    if (redis) {
        try {
            const existing = await redis.get<OrderItem[]>(REDIS_KEY) || [];
            const existingIndex = existing.findIndex(o => o.orderId === newOrder.orderId);
            if (existingIndex >= 0) {
                existing[existingIndex] = { ...existing[existingIndex], ...newOrder };
            } else {
                existing.unshift(newOrder);
            }
            await redis.set(REDIS_KEY, existing);
            return newOrder;
        } catch (e) {
            console.error("Redis addOrder failed, falling back to memory:", e);
        }
    }

    // In-memory fallback
    const existingIndex = memoryOrders.findIndex(o => o.orderId === newOrder.orderId);
    if (existingIndex >= 0) {
        memoryOrders[existingIndex] = { ...memoryOrders[existingIndex], ...newOrder };
    } else {
        memoryOrders.unshift(newOrder);
    }
    return newOrder;
}

export async function updateOrderStatus(orderId: string, status: OrderItem["status"]): Promise<OrderItem | null> {
    if (redis) {
        try {
            const existing = await redis.get<OrderItem[]>(REDIS_KEY) || [];
            const order = existing.find(o => o.orderId === orderId);
            if (order) {
                order.status = status;
                await redis.set(REDIS_KEY, existing);
                return order;
            }
            return null;
        } catch (e) {
            console.error("Redis updateOrderStatus failed:", e);
        }
    }

    const order = memoryOrders.find(o => o.orderId === orderId);
    if (order) {
        order.status = status;
        return order;
    }
    return null;
}

export async function deleteOrder(orderId: string): Promise<boolean> {
    if (redis) {
        try {
            const existing = await redis.get<OrderItem[]>(REDIS_KEY) || [];
            const filtered = existing.filter(o => o.orderId !== orderId);
            if (filtered.length < existing.length) {
                await redis.set(REDIS_KEY, filtered);
                return true;
            }
            return false;
        } catch (e) {
            console.error("Redis deleteOrder failed:", e);
        }
    }

    const initialLength = memoryOrders.length;
    memoryOrders = memoryOrders.filter(o => o.orderId !== orderId);
    return memoryOrders.length < initialLength;
}
