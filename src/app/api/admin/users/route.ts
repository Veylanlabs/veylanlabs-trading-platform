import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// Helper to verify admin access
async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

  if (!userEmail || !adminEmails.includes(userEmail.toLowerCase())) {
    return false;
  }

  return true;
}

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse('Unauthorized - Admin Access Required', { status: 403 });
    }

    // Fetch all users, ordered by newest first
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users for admin:', error);
      return new NextResponse('Database Error', { status: 500 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Admin API GET Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse('Unauthorized - Admin Access Required', { status: 403 });
    }

    const body = await req.json();
    const { userId, tradingview_access_granted, subscription_status } = body;

    if (!userId) {
      return new NextResponse('Missing user ID', { status: 400 });
    }

    const updatePayload: any = {};
    if (tradingview_access_granted !== undefined) {
      updatePayload.tradingview_access_granted = tradingview_access_granted;
    }
    if (subscription_status !== undefined) {
      updatePayload.subscription_status = subscription_status;
    }

    if (Object.keys(updatePayload).length === 0) {
      return new NextResponse('Nothing to update', { status: 400 });
    }

    // Update the user's data
    const { error } = await supabaseAdmin
      .from('users')
      .update(updatePayload)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user from admin:', error);
      return new NextResponse('Database Error', { status: 500 });
    }

    // Trigger revocation logic if admin manually cancels the subscription
    if (subscription_status === 'canceled' || subscription_status === 'past_due' || subscription_status === 'none') {
      const { data: userData } = await supabaseAdmin.from('users').select('*').eq('id', userId).single();
      if (userData) {
        if (userData.tradingview_username) {
          const { revokeTradingViewAccess } = await import('@/lib/tradingview');
          await revokeTradingViewAccess(userData.tradingview_username);
          await supabaseAdmin.from('users').update({ tradingview_access_granted: false }).eq('id', userId);
        }

        const tgId = (userData as any).telegram_user_id;
        if (tgId) {
          const { kickUser } = await import('@/lib/telegram');
          await kickUser(process.env.TELEGRAM_MAIN_GROUP_ID || '', tgId);
          await kickUser(process.env.TELEGRAM_CHART_GROUP_ID || '', tgId);
        } else if (userData.telegram_username) {
          const { kickUser } = await import('@/lib/telegram');
          await kickUser(process.env.TELEGRAM_MAIN_GROUP_ID || '', userData.telegram_username);
          await kickUser(process.env.TELEGRAM_CHART_GROUP_ID || '', userData.telegram_username);
        }
      }
    }

    return NextResponse.json({ success: true, ...updatePayload });
  } catch (error) {
    console.error('Admin API PATCH Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
