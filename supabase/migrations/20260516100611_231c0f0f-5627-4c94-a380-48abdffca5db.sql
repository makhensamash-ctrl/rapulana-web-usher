DROP POLICY "Anyone can read taken slots" ON public.bookings;

CREATE OR REPLACE FUNCTION public.get_taken_slots(_from timestamptz, _to timestamptz)
RETURNS TABLE(starts_at timestamptz, ends_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT starts_at, ends_at FROM public.bookings
  WHERE payment_status IN ('pending','paid')
    AND starts_at >= _from AND starts_at < _to
$$;

REVOKE EXECUTE ON FUNCTION public.get_taken_slots(timestamptz, timestamptz) FROM public;
GRANT EXECUTE ON FUNCTION public.get_taken_slots(timestamptz, timestamptz) TO anon, authenticated;