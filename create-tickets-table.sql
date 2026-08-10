-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  paralegal_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  offence_type text NOT NULL,
  court_date date,
  notes text,
  photo_url text,
  status text DEFAULT 'pending', -- pending | assigned | quoted | closed
  quote_amount numeric,
  created_at timestamptz DEFAULT now()
);

-- Storage bucket for ticket photos (run separately if needed)
-- Go to Supabase → Storage → New bucket → name: "tickets" → Public: false
