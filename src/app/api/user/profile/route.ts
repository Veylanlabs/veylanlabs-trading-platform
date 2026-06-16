import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { grantTradingViewAccess } from '@/lib/tradingview';
import { generateInviteLink } from '@/lib/telegram';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    // Primary lookup: by Clerk user ID
    const { data } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
    const isAdmin = email ? adminEmails.includes(email.toLowerCase()) : false;

    if (data) return NextResponse.json({ ...data, isAdmin });

    // Fallback: look up by email (handles guest checkout → then login flow)
    if (email) {
      const { data: emailUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (emailUser) {
        // Re-link the record to this Clerk user ID
        await supabaseAdmin
          .from('users')
          .update({ id: userId })
          .eq('email', email);

        return NextResponse.json({ ...emailUser, id: userId, isAdmin });
      }
    }

    return NextResponse.json({ subscription_status: 'none', isAdmin });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { tradingview_username, telegram_username } = body;

    // Basic input validation
    if (tradingview_username !== undefined) {
      if (typeof tradingview_username !== 'string' || tradingview_username.length < 3 || !/^[a-zA-Z0-9_-]+$/.test(tradingview_username)) {
        return new NextResponse('Invalid tradingview_username format', { status: 400 });
      }
    }
    if (telegram_username !== undefined) {
      if (typeof telegram_username !== 'string' || telegram_username.length < 5 || !/^[a-zA-Z0-9_]+$/.test(telegram_username)) {
        return new NextResponse('Invalid telegram_username format', { status: 400 });
      }
    }

    // Fetch existing user to check subscription status and existence
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (!user) {
      // If row is missing (e.g. signup without webhook trigger), insert it.
      const clerkUser = await currentUser();
      const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
      
      const { error: insertError } = await supabaseAdmin.from('users').insert({
        id: userId,
        email: email || '',
        tradingview_username: tradingview_username || null,
        telegram_username: telegram_username || null,
        subscription_status: 'none'
      });

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        return new NextResponse(insertError.message, { status: 500 });
      }
    } else {
      // Update existing record
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({
          tradingview_username: tradingview_username ?? user.tradingview_username,
          telegram_username: telegram_username ?? user.telegram_username,
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return new NextResponse(updateError.message, { status: 500 });
      }
    }

    // Only grant access if the user has an active subscription
    // Assuming 'active' or 'trialing' are valid statuses. 
    // If the user was just created, `user` is null, meaning no subscription.
    const hasActiveSubscription = user?.subscription_status === 'active' || user?.subscription_status === 'trialing';

    let tgInviteLink = null;
    
    if (hasActiveSubscription) {
      // Trigger TradingView automation
      if (tradingview_username) {
        await grantTradingViewAccess(tradingview_username);
      }

      // Generate Telegram invite link
      if (telegram_username) {
        tgInviteLink = await generateInviteLink(process.env.TELEGRAM_MAIN_GROUP_ID as string);
      }
    }

    return NextResponse.json({ success: true, tgInviteLink });
  } catch (error) {
    console.error('Error saving profile:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
