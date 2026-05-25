ALTER TABLE public.bookings ALTER COLUMN amount_cents SET DEFAULT 200000;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS yoco_checkout_id TEXT;