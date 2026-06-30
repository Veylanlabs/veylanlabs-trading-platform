import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accountId = process.env.WHOP_ACCOUNT_ID || process.env.NEXT_PUBLIC_WHOP_ACCOUNT_ID;
    const apiKey = process.env.WHOP_API_KEY || process.env.NEXT_PUBLIC_WHOP_API_KEY;

    if (!accountId || !apiKey) {
      return NextResponse.json({ error: 'Missing API credentials' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.whop.com/api/v1/plans?account_id=${accountId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Whop API Error:', response.status, errorText);
      return NextResponse.json({ error: `Whop API Error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
