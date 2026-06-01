
-- Set file size limit (10MB) and allowed mime types on booking-attachments
UPDATE storage.buckets
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg','image/png','image/webp'
    ]
WHERE id = 'booking-attachments';

-- Tighten INSERT policy: restrict to path prefix matching YYYY-MM-DD/<uuid>.<ext>
DROP POLICY IF EXISTS "Anyone can upload booking attachments" ON storage.objects;

CREATE POLICY "Anyone can upload scoped booking attachments"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'booking-attachments'
  AND name ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z0-9]{1,10}$'
);
