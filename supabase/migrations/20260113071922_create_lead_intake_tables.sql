/*
  # Lead Intake System Tables

  ## Overview
  This migration creates the complete database schema for the lead intake system,
  including tables for leads, buyers, and lead matching functionality.

  ## Tables Created

  ### 1. leads
  Stores property submissions from potential sellers.
  
  **Columns:**
  - id: Unique identifier (UUID)
  - created_at: Timestamp of submission
  - status: Lead status (new/qualified/sent/closed)
  - property_type: Type of property
  - address_street: Street name (optional)
  - address_number: Street number (optional)
  - postal_code: Postal code
  - city: City name
  - province: Province name
  - living_area_m2: Living area in square meters (optional)
  - plot_area_m2: Plot area in square meters (optional)
  - bedrooms: Number of bedrooms (optional)
  - condition: Property condition (nieuw/goed/op te frissen/te renoveren)
  - occupancy: Occupancy status (vrij/verhuurd/te bespreken)
  - timeline: Sale timeline (asap/1-3 maanden/3-6 maanden/flexibel)
  - asking_price_hint: Indicative asking price (optional)
  - description: Additional property description (optional)
  - contact_name: Contact person name
  - contact_email: Contact email address
  - contact_phone: Contact phone number
  - gdpr_consent: GDPR consent flag
  - source_page: Page from which lead was submitted (optional)
  - photos: JSONB array with storage paths and metadata

  ### 2. buyers
  Stores information about potential property buyers.
  
  **Columns:**
  - id: Unique identifier (UUID)
  - created_at: Timestamp of registration
  - company_name: Buyer company name
  - contact_name: Contact person name
  - email: Contact email
  - phone: Contact phone number
  - regions: JSONB array of provincie slugs and/or stad slugs
  - property_types: JSONB array of interested property types
  - is_active: Whether buyer is currently active

  ### 3. lead_matches
  Tracks matching between leads and buyers.
  
  **Columns:**
  - id: Unique identifier (UUID)
  - lead_id: Foreign key to leads table
  - buyer_id: Foreign key to buyers table
  - created_at: Timestamp of match creation
  - status: Match status (sent/opened/interested/not_interested)

  ## Security (RLS Policies)

  ### leads table:
  - Public INSERT: Anyone can submit a lead (anonymous submission)
  - No public SELECT: Leads are not publicly readable
  - Admin access via service role key for reading/updating

  ### buyers table:
  - No public access
  - Admin-only access via service role key

  ### lead_matches table:
  - No public access
  - Admin-only access via service role key

  ## Important Notes
  - All tables use UUID primary keys with automatic generation
  - Timestamps default to current time
  - JSONB is used for flexible arrays (photos, regions, property_types)
  - Status fields use CHECK constraints for data validation
  - Foreign keys ensure referential integrity
*/

-- Create custom types for status enums
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'qualified', 'sent', 'closed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE match_status AS ENUM ('sent', 'opened', 'interested', 'not_interested');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  status lead_status DEFAULT 'new' NOT NULL,
  property_type text NOT NULL,
  address_street text,
  address_number text,
  postal_code text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  living_area_m2 int,
  plot_area_m2 int,
  bedrooms int,
  condition text NOT NULL,
  occupancy text NOT NULL,
  timeline text NOT NULL,
  asking_price_hint int,
  description text,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  gdpr_consent boolean DEFAULT false NOT NULL,
  source_page text,
  photos jsonb DEFAULT '[]'::jsonb NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_condition CHECK (condition IN ('nieuw', 'goed', 'op te frissen', 'te renoveren')),
  CONSTRAINT valid_occupancy CHECK (occupancy IN ('vrij', 'verhuurd', 'te bespreken')),
  CONSTRAINT valid_timeline CHECK (timeline IN ('asap', '1-3 maanden', '3-6 maanden', 'flexibel')),
  CONSTRAINT valid_email CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create buyers table
CREATE TABLE IF NOT EXISTS buyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  regions jsonb DEFAULT '[]'::jsonb NOT NULL,
  property_types jsonb DEFAULT '[]'::jsonb NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_buyer_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create lead_matches table
CREATE TABLE IF NOT EXISTS lead_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  status match_status DEFAULT 'sent' NOT NULL,
  
  -- Constraints
  CONSTRAINT unique_lead_buyer UNIQUE (lead_id, buyer_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_province ON leads(province);
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);
CREATE INDEX IF NOT EXISTS idx_lead_matches_lead_id ON lead_matches(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_matches_buyer_id ON lead_matches(buyer_id);
CREATE INDEX IF NOT EXISTS idx_buyers_is_active ON buyers(is_active);

-- Enable Row Level Security on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads table
-- Allow anonymous INSERT (public submission)
CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No public SELECT policy - leads are only readable via service role
-- This means admins must use the service role key to read leads

-- RLS Policies for buyers table
-- No public policies - admin-only access via service role

-- RLS Policies for lead_matches table
-- No public policies - admin-only access via service role

-- Add helpful comments
COMMENT ON TABLE leads IS 'Stores property submissions from potential sellers';
COMMENT ON TABLE buyers IS 'Stores information about potential property buyers';
COMMENT ON TABLE lead_matches IS 'Tracks matching between leads and buyers';
COMMENT ON COLUMN leads.photos IS 'JSONB array containing storage paths and metadata for uploaded photos';
COMMENT ON COLUMN buyers.regions IS 'JSONB array of provincie slugs and/or stad slugs the buyer is interested in';
COMMENT ON COLUMN buyers.property_types IS 'JSONB array of property types the buyer is interested in';
