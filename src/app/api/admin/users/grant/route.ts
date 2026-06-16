import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const email = user.emailAddresses[0]?.emailAddress;
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
    
    if (!email || !adminEmails.includes(email.toLowerCase())) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const body = await req.json();
    const { id, tradingview_access_granted } = body;

    const { error } = await supabaseAdmin
      .from('users')
      .update({ tradingview_access_granted })
      .eq('id', id);

    if (error) {
      console.error('Error updating access:', error);
      return new NextResponse(error.message, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin API error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
