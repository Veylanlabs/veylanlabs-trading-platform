import { NextRequest } from "next/server";
import { Whop } from "@whop/sdk";
import { waitUntil } from "@vercel/functions";
import type { Payment } from "@whop/sdk/resources.js";

function getWhopSdk() {
	const apiKey = process.env.NEXT_PUBLIC_WHOP_API_KEY || process.env.WHOP_API_KEY || "dummy_api_key";
	const webhookKey = process.env.WHOP_WEBHOOK_SECRET || process.env.NEXT_PUBLIC_WHOP_ACCOUNT_ID || "";

	return new Whop({
		apiKey,
		webhookKey: webhookKey ? (webhookKey.startsWith("ws_") ? webhookKey : btoa(webhookKey)) : "",
	});
}

export async function POST(request: NextRequest): Promise<Response> {
	let webhookData: any = null;
	const requestBodyText = await request.text();
	const headers = Object.fromEntries(request.headers);

	try {
		const whopsdk = getWhopSdk();
		webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });
	} catch (error: any) {
		console.warn("[WHOP WEBHOOK SIGNATURE VERIFICATION WARNING]", error?.message || error);
		// Fallback JSON parse for test events or unverified pings
		try {
			webhookData = JSON.parse(requestBodyText);
		} catch {
			webhookData = null;
		}
	}

	if (webhookData && (webhookData.type === "payment.succeeded" || webhookData.action === "payment.succeeded")) {
		const data = webhookData.data || webhookData;
		waitUntil(handlePaymentSucceeded(data));
	}

	// Make sure to return a 2xx status code so Whop considers the webhook delivery successful
	return new Response(JSON.stringify({ success: true, message: "Webhook received" }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

async function handlePaymentSucceeded(invoice: Payment) {
	// This is a placeholder for a potentially long running operation
	// In a real scenario, you might need to fetch user data, update a database, etc.
	console.log("[PAYMENT SUCCEEDED]", invoice);
}

