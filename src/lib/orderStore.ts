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

// Default initial demo order records for immediate testing
const INITIAL_ORDERS: OrderItem[] = [
    {
        orderId: "1327-ORD-892104",
        createdAt: new Date().toISOString(),
        firstName: "Rohit",
        lastName: "Sharma",
        email: "rohit.sharma@example.com",
        mobile: "+91 98200 13270",
        address: "Flat 402, Orlem Park, Link Road, Malad West, Mumbai, MH 400064",
        selectedProduct: "T-Shirt + Cap Combo",
        selectedSize: "L (T-Shirt) + One Size (Cap)",
        orderPrice: "₹1,298",
        status: "IN PRODUCTION",
    },
    {
        orderId: "1327-ORD-573912",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        firstName: "Priya",
        lastName: "Mehta",
        email: "priya.mehta@example.com",
        mobile: "+91 98190 54321",
        address: "12 Bandra Reclamation, Opp. Salt Water Cafe, Bandra West, Mumbai 400050",
        selectedProduct: "1327 Crew T-Shirt Only",
        selectedSize: "M (Regular Fit)",
        orderPrice: "₹799",
        status: "PENDING",
    },
];

// Server-side in-memory cache to persist orders during application runtime
let memoryOrders: OrderItem[] = [...INITIAL_ORDERS];

export function getOrders(): OrderItem[] {
    return memoryOrders;
}

export function addOrder(newOrder: OrderItem): OrderItem {
    // Check if order already exists to prevent duplication
    const existingIndex = memoryOrders.findIndex(o => o.orderId === newOrder.orderId);
    if (existingIndex >= 0) {
        memoryOrders[existingIndex] = { ...memoryOrders[existingIndex], ...newOrder };
        return memoryOrders[existingIndex];
    }
    
    memoryOrders.unshift(newOrder);
    return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderItem["status"]): OrderItem | null {
    const order = memoryOrders.find(o => o.orderId === orderId);
    if (order) {
        order.status = status;
        return order;
    }
    return null;
}

export function deleteOrder(orderId: string): boolean {
    const initialLength = memoryOrders.length;
    memoryOrders = memoryOrders.filter(o => o.orderId !== orderId);
    return memoryOrders.length < initialLength;
}
