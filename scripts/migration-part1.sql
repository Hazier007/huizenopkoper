-- PART 1: Basis tabellen en enums
-- Run dit EERST, dan PART 2

-- Create provinces table
CREATE TABLE IF NOT EXISTS provinces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  province_id uuid REFERENCES provinces(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(province_id, slug)
);

-- Create property_leads table
CREATE TABLE IF NOT EXISTS property_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  property_type text NOT NULL,
  description text,
  asking_price text,
  photo_urls jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_leads ENABLE ROW LEVEL SECURITY;

-- Provinces: Public read access
CREATE POLICY "Anyone can read provinces"
  ON provinces FOR SELECT
  TO anon, authenticated
  USING (true);

-- Cities: Public read access
CREATE POLICY "Anyone can read cities"
  ON cities FOR SELECT
  TO anon, authenticated
  USING (true);

-- Property leads policies
CREATE POLICY "Anyone can create property leads"
  ON property_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read property leads"
  ON property_leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update property leads"
  ON property_leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cities_province_id ON cities(province_id);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
CREATE INDEX IF NOT EXISTS idx_provinces_slug ON provinces(slug);
CREATE INDEX IF NOT EXISTS idx_property_leads_status ON property_leads(status);
CREATE INDEX IF NOT EXISTS idx_property_leads_created_at ON property_leads(created_at DESC);

-- Add content fields to provinces
ALTER TABLE provinces ADD COLUMN IF NOT EXISTS sales_content text;
ALTER TABLE provinces ADD COLUMN IF NOT EXISTS market_highlights jsonb DEFAULT '[]'::jsonb;
ALTER TABLE provinces ADD COLUMN IF NOT EXISTS area_features jsonb DEFAULT '{}'::jsonb;
ALTER TABLE provinces ADD COLUMN IF NOT EXISTS content_generated_at timestamptz;

-- Add content fields to cities
ALTER TABLE cities ADD COLUMN IF NOT EXISTS sales_content text;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS neighborhoods jsonb DEFAULT '[]'::jsonb;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS amenities jsonb DEFAULT '{}'::jsonb;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS market_appeal text;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS content_generated_at timestamptz;
