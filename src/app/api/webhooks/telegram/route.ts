import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateInviteLink } from '@/lib/telegram';

const TELEGRAM_MAIN_GROUP_ID = process.env.TELEGRAM_MAIN_GROUP_ID || '';
const TELEGRAM_CHART_GROUP_ID = process.env.TELEGRAM_CHART_GROUP_ID || '';

export async function POST(req: Request) {
  try {
    const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
    if (secretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    // Check if it's a message containing text
    if (body.message && body.message.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      const telegramUserId = body.message.from.id;

      if (text.startsWith('/start ')) {
        const clerkUserId = text.replace('/start ', '').trim();

        // Check if user exists in our DB
        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', clerkUserId)
          .single();

        if (!user || error) {
          await sendDirectMessage(chatId, "I couldn't find your VeylanLabs account. Please make sure you clicked the link from your dashboard.");
          return new NextResponse('OK', { status: 200 });
        }

        if (user.subscription_status !== 'active') {
          await sendDirectMessage(chatId, "It looks like you don't have an active subscription. Please subscribe on VeylanLabs first.");
          return new NextResponse('OK', { status: 200 });
        }

        // Save their telegram_user_id so we can kick them later if they cancel
        await supabaseAdmin
          .from('users')
          .update({ telegram_user_id: telegramUserId })
          .eq('id', clerkUserId);

        // Determine which plan they bought by fetching their exact subscription from Stripe
        let hasChartAccess = false;
        try {
          // Import Stripe dynamically since we only need it here
          const { stripe } = await import('@/lib/stripe');
          if (user.stripe_subscription_id) {
            const subscription = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
            const priceId = subscription.items.data[0].price.id;
            
            // If the price matches any of the "Inner Circle" plans, grant chart access
            if (
              priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_MONTHLY ||
              priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_QUARTERLY ||
              priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_INNER_ANNUAL
            ) {
              hasChartAccess = true;
            }
          }
        } catch (error) {
          console.error('Failed to retrieve subscription from Stripe:', error);
        }

        // Generate invite links based on access level
        const mainLink = await generateInviteLink(TELEGRAM_MAIN_GROUP_ID);
        let chartLink = null;
        
        if (hasChartAccess) {
          chartLink = await generateInviteLink(TELEGRAM_CHART_GROUP_ID);
        }

        if (mainLink?.startsWith('http')) {
          if (hasChartAccess && chartLink?.startsWith('http')) {
            // They bought Inner Circle and both links generated successfully
            const replyMsg = `Welcome to VeylanLabs, ${user.email}!\n\nHere are your exclusive, single-use invite links:\n\nMain Group: ${mainLink}\nChart Group: ${chartLink}\n\nPlease join now. These links will expire after one use.`;
            await sendDirectMessage(chatId, replyMsg);
          } else if (!hasChartAccess) {
            // They bought Member Plan, only get Main Group
            const replyMsg = `Welcome to VeylanLabs, ${user.email}!\n\nHere is your exclusive, single-use invite link to the War Room:\n\nMain Group: ${mainLink}\n\n(Note: The Chart Group is reserved for Inner Circle members).\n\nPlease join now. This link will expire after one use.`;
            await sendDirectMessage(chatId, replyMsg);
          } else {
            // Inner circle but chart link failed
            const errorMsg = `I successfully generated your Main Group link: ${mainLink}\n\nHowever, I failed to generate the Chart Group link. Error: ${chartLink}\n\nPlease join the Main Group and contact support.`;
            await sendDirectMessage(chatId, errorMsg);
          }
        } else {
          const errorMsg = `I failed to generate the links.\nMain Group Status: ${mainLink}`;
          await sendDirectMessage(chatId, errorMsg);
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('Telegram Webhook Error:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

async function sendDirectMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      disable_web_page_preview: true
    })
  });
}
