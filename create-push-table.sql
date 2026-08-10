CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lawyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  subscription jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);
