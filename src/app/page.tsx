import { stripe } from '@/lib/stripe';
import LandingPageClient from './client-page';
import Stripe from 'stripe';

export const revalidate = 300;

export default async function Page() {
  const [monthly, quarterly, annual] = await Promise.all([
    stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_MONTHLY || "").catch(() => null),
    stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_QUARTERLY || "").catch(() => null),
    stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_PRICE_MEMBER_ANNUAL || "").catch(() => null),
  ]);

  const formatPrice = (priceObj: Stripe.Price | null) => {
    if (!priceObj || priceObj.unit_amount == null) return null;
    return {
      id: priceObj.id,
      amount: `$${(priceObj.unit_amount / 100).toFixed(0)}`,
    };
  };

  const initialPrices = {
    m: formatPrice(monthly),
    q: formatPrice(quarterly),
    y: formatPrice(annual),
  };

  return <LandingPageClient initialPrices={initialPrices} />;
}
