import { NextRequest, NextResponse } from "next/server";
import WhopAPI from "@whop/sdk";

// Initialize the Whop SDK with your API Key
const whop = new WhopAPI({
  apiKey: process.env.WHOP_API_KEY || "", // You will need to add this to your .env file
});

export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body as text for signature verification
    const bodyText = await request.text();
    
    // 2. Extract the Webhook Secret from environment variables
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("Missing WHOP_WEBHOOK_SECRET in environment variables");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // 3. Extract the Whop signature header
    const signature = request.headers.get("x-whop-signature");
    
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // 4. Verify the webhook payload (The SDK automatically validates the signature)
    // Note: ensure you are using the correct unwrap method depending on your SDK version
    // Typically it verifies the signature against the raw body text
    const event = await whop.webhooks.unwrap(bodyText, {
      headers: {
        "x-whop-signature": signature
      },
      key: webhookSecret
    }) as any;

    const action = event.action || event.type;

    // 5. Handle the specific events from Whop
    switch (action) {
      case "membership_activated":
        // Handle a new or renewed active membership
        console.log("New valid membership!", event.data);
        // You could grant additional custom access here
        break;
        
      case "membership_deactivated":
        // Handle a canceled or expired membership
        console.log("Membership ended:", event.data);
        // Revoke access here if necessary
        break;

      case "payment_succeeded":
        console.log("Payment successful:", event.data);
        break;

      default:
        console.log(`Unhandled Whop event type: ${action}`);
    }

    // 6. Return 200 OK to acknowledge receipt of the webhook to Whop
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
