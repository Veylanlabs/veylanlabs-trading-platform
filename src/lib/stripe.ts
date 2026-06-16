import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_to_prevent_build_errors', {
  apiVersion: '2026-05-27.dahlia' as any,
  appInfo: {
    name: 'VeylanLabs',
    version: '0.1.0',
  },
});

