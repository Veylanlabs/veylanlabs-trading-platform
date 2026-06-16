import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  let evt: WebhookEvent

  if (!WEBHOOK_SECRET) {
    console.warn('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    return new Response('Webhook secret missing', { status: 500 })
  }

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const email = evt.data.email_addresses?.[0]?.email_address;

    if (email && id) {
      // Check if a pending record exists from Stripe webhook
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        if (existingUser.id.startsWith('pending_')) {
          // Update the temporary ID with the real Clerk user ID
          await supabaseAdmin.from('users').update({
            id: id as string
          }).eq('id', existingUser.id);
          console.log(`Linked existing pending subscription for ${email} to Clerk ID ${id}`);
        } else if (existingUser.id !== id) {
          // Edge case: User deleted their Clerk account and re-registered with the same email.
          // Update their old DB record to match their new Clerk ID.
          await supabaseAdmin.from('users').update({
            id: id as string
          }).eq('email', email);
          console.log(`Updated returning user ${email} to new Clerk ID ${id}`);
        }
      } else {
        // Create new user record
        await supabaseAdmin.from('users').insert({
          id: id as string,
          email: email,
        });
        console.log(`Created new user record for ${email}`);
      }
    }
  }

  return new Response('OK', { status: 200 })
}
