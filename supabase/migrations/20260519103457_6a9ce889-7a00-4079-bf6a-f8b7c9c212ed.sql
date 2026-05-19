
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS attachment_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-attachments', 'booking-attachments', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload booking attachments"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'booking-attachments');

CREATE POLICY "Admins can read booking attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'booking-attachments'
  AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
);

CREATE POLICY "Admins can delete booking attachments"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'booking-attachments'
  AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
);
