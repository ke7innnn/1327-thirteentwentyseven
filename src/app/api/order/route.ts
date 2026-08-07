import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobile, address, selectedSize, orderId } = body;

        if (!firstName || !email || !mobile || !address || !selectedSize) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // FormSubmit API — Live endpoint targeting 1327thecommunity@gmail.com
        const res = await fetch("https://formsubmit.co/ajax/1327thecommunity@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                _subject: `🛒 NEW 1327 APPAREL ORDER #${orderId} - ${firstName} ${lastName}`,
                _template: "table",
                _captcha: "false",
                "Order Ref": `#${orderId}`,
                "Customer Name": `${firstName} ${lastName}`,
                "Email": email,
                "Mobile Number": mobile,
                "Selected Size": `${selectedSize} (Regular Fit)`,
                "Shipping Address": address,
            }),
        });

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error("Order submit API error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit order email" }, { status: 500 });
    }
}
