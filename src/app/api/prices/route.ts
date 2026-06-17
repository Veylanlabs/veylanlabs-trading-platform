import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Revalidate every 5 minutes to prevent hammering Stripe API on every page load
export const revalidate = 300; 

export async function GET() {
  try {
    // Fetch all active prices and expand the product to check if it's active
    const pricesResponse = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
    });

    const prices = pricesResponse.data.filter((price) => {
      const product = price.product as Stripe.Product;
      return price.recurring && product && product.active && product.name.toLowerCase().includes('member');
    });

    let m: Stripe.Price | null = null;
    let q: Stripe.Price | null = null;
    let y: Stripe.Price | null = null;

    for (const p of prices) {
      if (!p.recurring) continue;
      
      // Match intervals
      if (p.recurring.interval === 'month' && p.recurring.interval_count === 1) {
        if (!m) m = p; // take the first active monthly price
      } else if (p.recurring.interval === 'month' && p.recurring.interval_count === 3) {
        if (!q) q = p; // take the first active quarterly price
      } else if (p.recurring.interval === 'year' && p.recurring.interval_count === 1) {
        if (!y) y = p; // take the first active yearly price
      }
    }

    // Helper to format the price
    const formatPrice = (priceObj: Stripe.Price | null) => {
      if (!priceObj || priceObj.unit_amount == null) return null;
      return {
        id: priceObj.id,
        amount: `$${(priceObj.unit_amount / 100).toFixed(0)}`,
      };
    };

    return NextResponse.json({
      m: formatPrice(m),
      q: formatPrice(q),
      y: formatPrice(y)
    });
  } catch (error) {
    console.error('Failed to fetch Stripe prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}
