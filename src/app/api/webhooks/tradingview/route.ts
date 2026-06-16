import { NextResponse } from 'next/server';
import { sendMessageToGroup } from '@/lib/telegram';

const TELEGRAM_CHART_GROUP_ID = process.env.TELEGRAM_CHART_GROUP_ID || '';
const TELEGRAM_MAIN_GROUP_ID = process.env.TELEGRAM_MAIN_GROUP_ID || '';
const TRADINGVIEW_WEBHOOK_SECRET = process.env.TRADINGVIEW_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    // Basic Security: Check if secret matches query param
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    if (secret !== TRADINGVIEW_WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    
    // Example expected JSON from TradingView:
    // {
    //   "symbol": "BTCUSD",
    //   "timeframe": "1h",
    //   "action": "BUY",
    //   "price": 68500,
    //   "message": "Market structure shift confirmed.",
    //   "group": "chart" // or "main"
    // }
    
    const { symbol, action, price, message, group } = body;

    // Format the message for Telegram
    let formattedMessage = `🚨 <b>VeylanLabs Alert: ${symbol}</b>\n\n`;
    if (action) {
      formattedMessage += `<b>Signal:</b> ${action === 'BUY' || action === 'LONG' ? '🟢 LONG' : '🔴 SHORT'}\n`;
    }
    if (price) {
      formattedMessage += `<b>Price:</b> ${price}\n`;
    }
    if (message) {
      formattedMessage += `\n${message}`;
    }

    const targetGroupId = group === 'main' ? TELEGRAM_MAIN_GROUP_ID : TELEGRAM_CHART_GROUP_ID;

    // Send to Telegram
    const success = await sendMessageToGroup(targetGroupId, formattedMessage);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse('Failed to send Telegram message', { status: 500 });
    }
  } catch (error) {
    console.error('TradingView Webhook error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
