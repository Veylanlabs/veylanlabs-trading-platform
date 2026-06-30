import { NextRequest } from "next/server";
import { Whop } from "@whop/sdk";
import { waitUntil } from "@vercel/functions";
import type { Payment } from "@whop/sdk/resources.js";

export const whopsdk = new Whop({
   	apiKey: process.env.NEXT_PUBLIC_WHOP_API_KEY,
   	webhookKey: btoa(process.env.NEXT_PUBLIC_WHOP_ACCOUNT_ID || ""),
});


export async function POST(request: NextRequest): Promise<Response> {
   	// Validate the webhook to ensure it's from Whop
   	const requestBodyText = await request.text();
   	const headers = Object.fromEntries(request.headers);
   	const webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });

   	// Handle the webhook event
   	if (webhookData.type === "payment.succeeded") {
  		waitUntil(handlePaymentSucceeded(webhookData.data));
   	}

   	// Make sure to return a 2xx status code quickly. Otherwise the webhook will be retried.
   	return new Response("OK", { status: 200 });
}

async function handlePaymentSucceeded(invoice: Payment) {
   	// This is a placeholder for a potentially long running operation
   	// In a real scenario, you might need to fetch user data, update a database, etc.
   	console.log("[PAYMENT SUCCEEDED]", invoice);
}

