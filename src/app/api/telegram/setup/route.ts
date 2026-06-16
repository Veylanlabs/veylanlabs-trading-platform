import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  
  if (!token || !secret) {
    return NextResponse.json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_WEBHOOK_SECRET' });
  }

  // The public URL of the production Vercel site
  const webhookUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || 'veylanlabs.vercel.app'}/api/webhooks/telegram`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}&secret_token=${secret}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
