CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (payment_status = 'pending');

CREATE POLICY "Anyone can read taken slots"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);