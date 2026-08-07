import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobile, address, selectedSize, orderId } = body;

        if (!firstName || !email || !mobile || !address || !selectedSize) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const targetEmail = process.env.ORDER_NOTIFICATION_EMAIL || "1327thecommunity@gmail.com";
        const subject = `🛒 NEW 1327 APPAREL ORDER #${orderId} - ${firstName} ${lastName}`;

        // Option A: If RESEND_API_KEY environment variable is configured in Vercel
        if (process.env.RESEND_API_KEY) {
            try {
                const resendRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "1327 Apparel <orders@1327.in>",
                        to: [targetEmail],
                        subject: subject,
                        html: `
                            <div style="font-family: monospace; background: #0D1712; color: #F7F5F0; padding: 24px; border: 1px solid #1EA86E;">
                                <h2 style="color: #1EA86E; margin-top: 0;">1327 OFFICIAL APPAREL ORDER #${orderId}</h2>
                                <hr style="border-color: #1EA86E;" />
                                <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Mobile:</strong> ${mobile}</p>
                                <p><strong>Size Selected:</strong> <span style="color: #1EA86E; font-size: 16px;">${selectedSize}</span></p>
                                <p><strong>Shipping Address:</strong> ${address}</p>
                            </div>
                        `,
                    }),
                });

                if (resendRes.ok) {
                    return NextResponse.json({ success: true, provider: "Resend", orderId });
                }
            } catch (e) {
                console.error("Resend delivery failed, falling back:", e);
            }
        }

        // Option B: Server-side FormSubmit dispatch targeting 1327thecommunity@gmail.com
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Origin: "https://www.1327.in",
                Referer: "https://www.1327.in/order",
            },
            body: JSON.stringify({
                _subject: subject,
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

        const formSubmitData = await formSubmitRes.json();

        return NextResponse.json({
            success: true,
            provider: "FormSubmit",
            data: formSubmitData,
            orderId,
        });
    } catch (error) {
        console.error("Order submit API error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit order email" }, { status: 500 });
    }
}
