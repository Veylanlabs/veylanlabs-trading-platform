import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch the user's Stripe Customer ID from Supabase
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!user || !user.stripe_customer_id) {
      return new NextResponse('No active subscription found. You must purchase a plan first.', { status: 400 });
    }

    // Determine the base URL for the return path
    const url = new URL(req.url);
    const returnUrl = `${url.protocol}//${url.host}/dashboard`;

    // Create the Stripe Customer Portal Session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
  }
}
