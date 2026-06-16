import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    // ─── checkout.session.completed ─────────────────────────────────────────
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode === 'subscription' && session.subscription) {
        let subscription: Stripe.Subscription;
        try {
          subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
        } catch (error: any) {
          console.error('[Stripe Webhook] Stripe subscription retrieval failed:', error.message);
          throw error;
        }

        // client_reference_id holds the Clerk user ID when the user was already signed in.
        // customer_email is a fallback for guest checkouts.
        const clerkId = session.client_reference_id;
        const email =
          session.customer_email ||
          session.customer_details?.email ||
          '';

        if (clerkId) {
          // Ideal path: user was signed in during checkout — link by Clerk ID directly.
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('id', clerkId)
            .single();

          if (existingUser) {
            await supabaseAdmin.from('users').update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              subscription_status: subscription.status,
            }).eq('id', clerkId);
          } else {
            // Account not created yet but we have their Clerk ID — insert with it.
            await supabaseAdmin.from('users').insert({
              id: clerkId,
              email: email,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              subscription_status: subscription.status,
            });
          }
          console.log(`Linked subscription for Clerk ID ${clerkId}`);
        } else if (email) {
          // Fallback path: guest checkout — link by email.
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

          if (existingUser) {
            await supabaseAdmin.from('users').update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              subscription_status: subscription.status,
            }).eq('id', existingUser.id);
          } else {
            // Guest checkout before account creation — use pending ID.
            await supabaseAdmin.from('users').insert({
              id: `pending_${session.customer as string}`,
              email: email,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              subscription_status: subscription.status,
            });
          }
          console.log(`Linked subscription for email ${email}`);
        }
      }
    }

    // ─── customer.subscription.updated / deleted ─────────────────────────────
    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const subscription = event.data.object as Stripe.Subscription;

      // Find the user by stripe_customer_id
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('stripe_customer_id', subscription.customer as string)
        .single();

      if (userData) {
        await supabaseAdmin.from('users').update({
          subscription_status: subscription.status,
        }).eq('id', userData.id);

        const isRevoked =
          subscription.status === 'canceled' ||
          subscription.status === 'unpaid' ||
          subscription.status === 'past_due';

        if (isRevoked) {
          if (userData.tradingview_username) {
            const { revokeTradingViewAccess } = await import('@/lib/tradingview');
            await revokeTradingViewAccess(userData.tradingview_username);
            await supabaseAdmin
              .from('users')
              .update({ tradingview_access_granted: false })
              .eq('id', userData.id);
          }

          // Kick by stored telegram_user_id (numeric) for reliable removal
          const tgId = (userData as any).telegram_user_id;
          if (tgId) {
            const { kickUser } = await import('@/lib/telegram');
            await kickUser(process.env.TELEGRAM_MAIN_GROUP_ID || '', tgId);
            await kickUser(process.env.TELEGRAM_CHART_GROUP_ID || '', tgId);
          } else if (userData.telegram_username) {
            // Fallback: best-effort kick by username — works if bot has cached chat member
            const { kickUser } = await import('@/lib/telegram');
            await kickUser(process.env.TELEGRAM_MAIN_GROUP_ID || '', userData.telegram_username);
            await kickUser(process.env.TELEGRAM_CHART_GROUP_ID || '', userData.telegram_username);
          }
          console.log(`Revoked access for user ${userData.id} (status: ${subscription.status})`);
        } else {
          console.log(`Updated subscription status for user ${userData.id} → ${subscription.status}`);
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
