-- Supabase Schema for VeylanLabs
-- Run this in the Supabase SQL Editor

-- Create users table (id maps to Clerk user IDs)
CREATE TABLE IF NOT EXISTS public.users (
  id text PRIMARY KEY,
  email text NOT NULL,
  tradingview_username text,
  telegram_username text,
  telegram_user_id bigint,          -- Numeric Telegram user ID (needed for reliable kick)
  subscription_status text DEFAULT 'none',
  stripe_customer_id text,
  stripe_subscription_id text,
  tradingview_access_granted boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Auto-update the updated_at timestamp on any row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_users_updated_at ON public.users;
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add telegram_user_id column if upgrading an existing table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS telegram_user_id bigint;

-- Note: We use the Supabase Service Role Key in all API routes (bypasses RLS).
-- If you want to add RLS for extra safety, enable it and add appropriate policies.
