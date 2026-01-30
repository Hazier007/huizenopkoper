/*
  # Create database schema for huizenopkoper.be

  ## New Tables
  
  ### `provinces`
  - `id` (uuid, primary key)
  - `name` (text) - Province name (e.g., "Antwerpen", "Vlaams-Brabant")
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - SEO description
  - `created_at` (timestamptz)
  
  ### `cities`
  - `id` (uuid, primary key)
  - `province_id` (uuid, foreign key to provinces)
  - `name` (text) - City name
  - `slug` (text) - URL-friendly slug
  - `description` (text) - SEO description
  - `created_at` (timestamptz)
  - Unique constraint on (province_id, slug)
  
  ### `property_leads`
  - `id` (uuid, primary key)
  - `contact_name` (text) - Contact person name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `address` (text) - Property address
  - `city` (text) - Property city
  - `province` (text) - Property province
  - `postal_code` (text) - Postal code
  - `property_type` (text) - Type (huis, appartement, etc.)
  - `description` (text) - Additional info
  - `asking_price` (text, nullable) - Desired price
  - `photo_urls` (jsonb) - Array of photo URLs in storage
  - `status` (text) - Lead status (new, contacted, closed)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access to provinces and cities
  - Admin only access to property_leads
*/

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

-- Property leads: Anyone can insert (for form submissions)
CREATE POLICY "Anyone can create property leads"
  ON property_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Property leads: Only authenticated users can read (admins)
CREATE POLICY "Authenticated users can read property leads"
  ON property_leads FOR SELECT
  TO authenticated
  USING (true);

-- Property leads: Only authenticated users can update
CREATE POLICY "Authenticated users can update property leads"
  ON property_leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cities_province_id ON cities(province_id);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
CREATE INDEX IF NOT EXISTS idx_provinces_slug ON provinces(slug);
CREATE INDEX IF NOT EXISTS idx_property_leads_status ON property_leads(status);
CREATE INDEX IF NOT EXISTS idx_property_leads_created_at ON property_leads(created_at DESC);