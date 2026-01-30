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
/*
  # Add AI-Generated Content Fields to Provinces and Cities

  ## Changes to provinces table
    - `sales_content` (text) - Main sales-oriented content block (700-1000 words)
    - `market_highlights` (jsonb) - Array of key selling points
    - `area_features` (jsonb) - Features of the region (connectivity, economy, etc.)
    - `content_generated_at` (timestamptz) - Timestamp for tracking when content was generated

  ## Changes to cities table
    - `sales_content` (text) - Main sales-oriented content block (700-1000 words)
    - `neighborhoods` (jsonb) - Popular neighborhoods with descriptions
    - `amenities` (jsonb) - Amenities (schools, transport, shops)
    - `market_appeal` (text) - Why houses sell well here
    - `content_generated_at` (timestamptz) - Timestamp for tracking when content was generated

  ## Notes
    - All fields are nullable to allow gradual content generation
    - JSONB format allows flexible structured data storage
    - Timestamps enable content refresh tracking
*/

-- Add content fields to provinces table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'provinces' AND column_name = 'sales_content'
  ) THEN
    ALTER TABLE provinces ADD COLUMN sales_content text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'provinces' AND column_name = 'market_highlights'
  ) THEN
    ALTER TABLE provinces ADD COLUMN market_highlights jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'provinces' AND column_name = 'area_features'
  ) THEN
    ALTER TABLE provinces ADD COLUMN area_features jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'provinces' AND column_name = 'content_generated_at'
  ) THEN
    ALTER TABLE provinces ADD COLUMN content_generated_at timestamptz;
  END IF;
END $$;

-- Add content fields to cities table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cities' AND column_name = 'sales_content'
  ) THEN
    ALTER TABLE cities ADD COLUMN sales_content text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cities' AND column_name = 'neighborhoods'
  ) THEN
    ALTER TABLE cities ADD COLUMN neighborhoods jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cities' AND column_name = 'amenities'
  ) THEN
    ALTER TABLE cities ADD COLUMN amenities jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cities' AND column_name = 'market_appeal'
  ) THEN
    ALTER TABLE cities ADD COLUMN market_appeal text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cities' AND column_name = 'content_generated_at'
  ) THEN
    ALTER TABLE cities ADD COLUMN content_generated_at timestamptz;
  END IF;
END $$;
/*
  # Credit-Based Lead Marketplace System

  ## Overview
  This migration extends the existing lead system to support a credit-based marketplace
  where buyers can claim and unlock leads using credits.

  ## Changes

  ### 1. Extended lead_status enum
  - Added: 'available', 'claimed', 'expired' to support marketplace workflow

  ### 2. Extended buyers table
  Added credit system and region filtering:
  - credits_balance: Current credit balance
  - low_credit_threshold: Threshold for low credit warnings
  - regions_provinces: JSONB array of province slugs
  - regions_cities: JSONB array of city slugs
  - last_low_credit_email_at: Timestamp of last low credit notification

  ### 3. Extended leads table
  Added claim and teaser functionality:
  - teaser_summary: Public teaser without PII (server-generated)
  - claimed_by_buyer_id: FK to buyer who claimed the lead
  - claimed_at: Timestamp when lead was claimed
  - claim_expires_at: Expiration timestamp (e.g., 48h after creation)

  ### 4. New lead_claims table
  Tracks all claim attempts (successful and failed):
  - lead_id: FK to leads
  - buyer_id: FK to buyers
  - status: success/failed_already_claimed/failed_no_credits/failed_expired
  - created_at: Timestamp of claim attempt

  ### 5. New credit_transactions table
  Complete audit trail of all credit movements:
  - buyer_id: FK to buyers
  - type: purchase/spend/admin_adjust
  - credits_delta: Amount (positive or negative)
  - reference: External reference (stripe_session_id, lead_id, admin_note)

  ## RPC Functions

  ### claim_lead(p_lead_id uuid, p_buyer_id uuid)
  Atomically claims a lead for a buyer:
  - Checks lead is available and not expired
  - Checks buyer has sufficient credits
  - Updates lead status and buyer credits
  - Creates transaction records
  - Returns JSON with success/error status

  ## Security (RLS Policies)

  ### leads table:
  - Public INSERT: Yes (anonymous submission)
  - Public SELECT: No (only teasers via service role)

  ### buyers table:
  - Authenticated buyers can read/update their own profile
  - Claims must use service role for atomicity

  ### lead_claims & credit_transactions:
  - Buyers can read their own records
  - No public write access (only via RPC/service role)
*/

-- Create enum for claim status
DO $$ BEGIN
  CREATE TYPE claim_status AS ENUM (
    'success',
    'failed_already_claimed',
    'failed_no_credits',
    'failed_expired'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create enum for credit transaction type
DO $$ BEGIN
  CREATE TYPE credit_transaction_type AS ENUM (
    'purchase',
    'spend',
    'admin_adjust'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Extend buyers table with credit system
DO $$
BEGIN
  -- Add credits_balance if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'credits_balance'
  ) THEN
    ALTER TABLE buyers ADD COLUMN credits_balance int DEFAULT 0 NOT NULL;
  END IF;

  -- Add low_credit_threshold if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'low_credit_threshold'
  ) THEN
    ALTER TABLE buyers ADD COLUMN low_credit_threshold int DEFAULT 2 NOT NULL;
  END IF;

  -- Add regions_provinces if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'regions_provinces'
  ) THEN
    ALTER TABLE buyers ADD COLUMN regions_provinces jsonb DEFAULT '[]'::jsonb NOT NULL;
  END IF;

  -- Add regions_cities if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'regions_cities'
  ) THEN
    ALTER TABLE buyers ADD COLUMN regions_cities jsonb DEFAULT '[]'::jsonb NOT NULL;
  END IF;

  -- Add last_low_credit_email_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'last_low_credit_email_at'
  ) THEN
    ALTER TABLE buyers ADD COLUMN last_low_credit_email_at timestamptz;
  END IF;

  -- Modify is_active default to false (marketplace buyers need activation)
  ALTER TABLE buyers ALTER COLUMN is_active SET DEFAULT false;
END $$;

-- Extend leads table with claim and teaser functionality
DO $$
BEGIN
  -- Add teaser_summary if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'teaser_summary'
  ) THEN
    ALTER TABLE leads ADD COLUMN teaser_summary text;
  END IF;

  -- Add claimed_by_buyer_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'claimed_by_buyer_id'
  ) THEN
    ALTER TABLE leads ADD COLUMN claimed_by_buyer_id uuid REFERENCES buyers(id) ON DELETE SET NULL;
  END IF;

  -- Add claimed_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'claimed_at'
  ) THEN
    ALTER TABLE leads ADD COLUMN claimed_at timestamptz;
  END IF;

  -- Add claim_expires_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'claim_expires_at'
  ) THEN
    ALTER TABLE leads ADD COLUMN claim_expires_at timestamptz;
  END IF;
END $$;

-- Create lead_claims table for tracking all claim attempts
CREATE TABLE IF NOT EXISTS lead_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  status claim_status NOT NULL
);

-- Create credit_transactions table for audit trail
CREATE TABLE IF NOT EXISTS credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  type credit_transaction_type NOT NULL,
  credits_delta int NOT NULL,
  reference text,

  -- Constraint to ensure delta is not zero
  CONSTRAINT non_zero_delta CHECK (credits_delta != 0)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_claimed_by ON leads(claimed_by_buyer_id);
CREATE INDEX IF NOT EXISTS idx_leads_claim_expires_at ON leads(claim_expires_at);
CREATE INDEX IF NOT EXISTS idx_lead_claims_lead_id ON lead_claims(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_claims_buyer_id ON lead_claims(buyer_id);
CREATE INDEX IF NOT EXISTS idx_lead_claims_created_at ON lead_claims(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_buyer_id ON credit_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_buyers_credits_balance ON buyers(credits_balance);

-- Enable Row Level Security
ALTER TABLE lead_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for buyers table (authenticated buyers can manage own profile)
CREATE POLICY "Buyers can view own profile"
  ON buyers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Buyers can update own profile"
  ON buyers
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- RLS Policies for lead_claims (buyers can view own claims)
CREATE POLICY "Buyers can view own claims"
  ON lead_claims
  FOR SELECT
  TO authenticated
  USING (buyer_id::text = auth.uid()::text);

-- RLS Policies for credit_transactions (buyers can view own transactions)
CREATE POLICY "Buyers can view own transactions"
  ON credit_transactions
  FOR SELECT
  TO authenticated
  USING (buyer_id::text = auth.uid()::text);

-- Add helpful comments
COMMENT ON COLUMN buyers.credits_balance IS 'Current credit balance for claiming leads';
COMMENT ON COLUMN buyers.low_credit_threshold IS 'Threshold below which low credit warnings are sent';
COMMENT ON COLUMN buyers.regions_provinces IS 'JSONB array of province slugs the buyer is interested in';
COMMENT ON COLUMN buyers.regions_cities IS 'JSONB array of city slugs the buyer is interested in';
COMMENT ON COLUMN buyers.last_low_credit_email_at IS 'Timestamp of last low credit notification email';
COMMENT ON COLUMN leads.teaser_summary IS 'Public teaser summary without PII (server-generated)';
COMMENT ON COLUMN leads.claimed_by_buyer_id IS 'Buyer who claimed this lead';
COMMENT ON COLUMN leads.claimed_at IS 'Timestamp when lead was claimed';
COMMENT ON COLUMN leads.claim_expires_at IS 'Expiration timestamp (e.g., 48h after creation)';
COMMENT ON TABLE lead_claims IS 'Tracks all lead claim attempts (successful and failed)';
COMMENT ON TABLE credit_transactions IS 'Complete audit trail of all credit movements';
/*
  # Add Lead Status Values

  ## Overview
  Extends lead_status enum with marketplace status values.

  ## Changes
  - Added: 'available' - Lead is available for claiming
  - Added: 'claimed' - Lead has been claimed by a buyer
  - Added: 'expired' - Lead has expired and can no longer be claimed
*/

-- Add 'available' value to lead_status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'available' AND enumtypid = 'lead_status'::regtype) THEN
    ALTER TYPE lead_status ADD VALUE 'available';
  END IF;
END $$;

-- Add 'claimed' value to lead_status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'claimed' AND enumtypid = 'lead_status'::regtype) THEN
    ALTER TYPE lead_status ADD VALUE 'claimed';
  END IF;
END $$;

-- Add 'expired' value to lead_status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'expired' AND enumtypid = 'lead_status'::regtype) THEN
    ALTER TYPE lead_status ADD VALUE 'expired';
  END IF;
END $$;
/*
  # Add Claim Function and Performance Index

  ## Overview
  Creates the atomic claim_lead RPC function and performance index for available leads.

  ## Changes

  ### 1. Create performance index
  - idx_leads_status_available: Partial index for quickly finding available leads

  ### 2. Create claim_lead RPC function
  Atomically claims a lead for a buyer:
  - Validates lead is available and not expired
  - Checks buyer has sufficient credits
  - Updates lead status and buyer credits atomically
  - Creates complete audit trail
  - Returns JSON with success/error status
*/

-- Create index for available leads
CREATE INDEX IF NOT EXISTS idx_leads_status_available ON leads(status) WHERE status = 'available';

-- Create RPC function for atomic lead claiming
CREATE OR REPLACE FUNCTION claim_lead(
  p_lead_id uuid,
  p_buyer_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lead_status lead_status;
  v_lead_claimed_by uuid;
  v_claim_expires_at timestamptz;
  v_buyer_credits int;
  v_result jsonb;
  v_claim_status claim_status;
BEGIN
  -- Check if lead exists and get current status
  SELECT status, claimed_by_buyer_id, claim_expires_at
  INTO v_lead_status, v_lead_claimed_by, v_claim_expires_at
  FROM leads
  WHERE id = p_lead_id
  FOR UPDATE; -- Lock the row

  -- Check if lead was found
  IF NOT FOUND THEN
    v_claim_status := 'failed_expired';
    INSERT INTO lead_claims (lead_id, buyer_id, status)
    VALUES (p_lead_id, p_buyer_id, v_claim_status);

    RETURN jsonb_build_object(
      'success', false,
      'error', 'lead_not_found',
      'message', 'Lead does not exist'
    );
  END IF;

  -- Check if lead is already claimed
  IF v_lead_status = 'claimed' AND v_lead_claimed_by IS NOT NULL THEN
    v_claim_status := 'failed_already_claimed';
    INSERT INTO lead_claims (lead_id, buyer_id, status)
    VALUES (p_lead_id, p_buyer_id, v_claim_status);

    RETURN jsonb_build_object(
      'success', false,
      'error', 'already_claimed',
      'message', 'This lead has already been claimed by another buyer'
    );
  END IF;

  -- Check if lead is expired
  IF v_claim_expires_at IS NOT NULL AND v_claim_expires_at < now() THEN
    -- Update lead status to expired
    UPDATE leads
    SET status = 'expired'
    WHERE id = p_lead_id;

    v_claim_status := 'failed_expired';
    INSERT INTO lead_claims (lead_id, buyer_id, status)
    VALUES (p_lead_id, p_buyer_id, v_claim_status);

    RETURN jsonb_build_object(
      'success', false,
      'error', 'expired',
      'message', 'This lead has expired and can no longer be claimed'
    );
  END IF;

  -- Check if lead is available
  IF v_lead_status != 'available' THEN
    v_claim_status := 'failed_expired';
    INSERT INTO lead_claims (lead_id, buyer_id, status)
    VALUES (p_lead_id, p_buyer_id, v_claim_status);

    RETURN jsonb_build_object(
      'success', false,
      'error', 'not_available',
      'message', 'This lead is not available for claiming'
    );
  END IF;

  -- Check buyer credits
  SELECT credits_balance
  INTO v_buyer_credits
  FROM buyers
  WHERE id = p_buyer_id
  FOR UPDATE; -- Lock the buyer row

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'buyer_not_found',
      'message', 'Buyer does not exist'
    );
  END IF;

  IF v_buyer_credits < 1 THEN
    v_claim_status := 'failed_no_credits';
    INSERT INTO lead_claims (lead_id, buyer_id, status)
    VALUES (p_lead_id, p_buyer_id, v_claim_status);

    RETURN jsonb_build_object(
      'success', false,
      'error', 'insufficient_credits',
      'message', 'Insufficient credits to claim this lead'
    );
  END IF;

  -- All checks passed - claim the lead!

  -- Update lead
  UPDATE leads
  SET
    status = 'claimed',
    claimed_by_buyer_id = p_buyer_id,
    claimed_at = now()
  WHERE id = p_lead_id;

  -- Decrement buyer credits
  UPDATE buyers
  SET credits_balance = credits_balance - 1
  WHERE id = p_buyer_id;

  -- Record credit transaction
  INSERT INTO credit_transactions (buyer_id, type, credits_delta, reference)
  VALUES (p_buyer_id, 'spend', -1, 'lead_claim:' || p_lead_id::text);

  -- Record successful claim
  v_claim_status := 'success';
  INSERT INTO lead_claims (lead_id, buyer_id, status)
  VALUES (p_lead_id, p_buyer_id, v_claim_status);

  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'lead_id', p_lead_id,
    'buyer_id', p_buyer_id,
    'remaining_credits', v_buyer_credits - 1
  );

EXCEPTION
  WHEN OTHERS THEN
    -- Log error and return failure
    RAISE WARNING 'Error in claim_lead: %', SQLERRM;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'internal_error',
      'message', 'An error occurred while claiming the lead'
    );
END;
$$;

-- Add comment
COMMENT ON FUNCTION claim_lead IS 'Atomically claims a lead for a buyer with credit deduction and full validation';
/*
  # Buyer Authentication System

  ## Overview
  Extends the buyers table to integrate with Supabase Auth and adds additional buyer profile fields.

  ## Changes

  ### 1. Extend buyers table
  - auth_user_id: Links buyer to auth.users (one-to-one)
  - company_name: Company/business name
  - property_types: JSONB array of preferred property types
  - created_at: Account creation timestamp
  - updated_at: Last profile update timestamp

  ### 2. Security
  - RLS policies for authenticated buyers
  - Trigger for automatic buyer creation on auth signup

  ### 3. Helper Functions
  - Function to create buyer profile on user signup
*/

-- Add auth integration and profile fields to buyers table
DO $$
BEGIN
  -- Add auth_user_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'auth_user_id'
  ) THEN
    ALTER TABLE buyers ADD COLUMN auth_user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_buyers_auth_user_id ON buyers(auth_user_id);
  END IF;

  -- Add company_name if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE buyers ADD COLUMN company_name text;
  END IF;

  -- Add property_types if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'property_types'
  ) THEN
    ALTER TABLE buyers ADD COLUMN property_types jsonb DEFAULT '[]'::jsonb NOT NULL;
  END IF;

  -- Add created_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE buyers ADD COLUMN created_at timestamptz DEFAULT now() NOT NULL;
  END IF;

  -- Add updated_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE buyers ADD COLUMN updated_at timestamptz DEFAULT now() NOT NULL;
  END IF;
END $$;

-- Create function to automatically create buyer profile on user signup
CREATE OR REPLACE FUNCTION create_buyer_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.buyers (
    id,
    auth_user_id,
    email,
    credits_balance,
    low_credit_threshold,
    is_active,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    NEW.id,
    NEW.email,
    0,
    2,
    true,
    now(),
    now()
  );
  RETURN NEW;
END;
$$;

-- Create trigger to call function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_buyer_profile();

-- Update RLS policies for buyers table using auth_user_id
DROP POLICY IF EXISTS "Buyers can view own profile" ON buyers;
DROP POLICY IF EXISTS "Buyers can update own profile" ON buyers;

CREATE POLICY "Buyers can view own profile"
  ON buyers
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "Buyers can update own profile"
  ON buyers
  FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_buyers_updated_at ON buyers;
CREATE TRIGGER update_buyers_updated_at
  BEFORE UPDATE ON buyers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update RLS policies for lead_claims
DROP POLICY IF EXISTS "Buyers can view own claims" ON lead_claims;
CREATE POLICY "Buyers can view own claims"
  ON lead_claims
  FOR SELECT
  TO authenticated
  USING (
    buyer_id IN (
      SELECT id FROM buyers WHERE auth_user_id = auth.uid()
    )
  );

-- Update RLS policies for credit_transactions
DROP POLICY IF EXISTS "Buyers can view own transactions" ON credit_transactions;
CREATE POLICY "Buyers can view own transactions"
  ON credit_transactions
  FOR SELECT
  TO authenticated
  USING (
    buyer_id IN (
      SELECT id FROM buyers WHERE auth_user_id = auth.uid()
    )
  );

-- Add RLS policy for leads (buyers can see available leads in their regions)
DROP POLICY IF EXISTS "Buyers can view available leads in their regions" ON leads;
CREATE POLICY "Buyers can view available leads in their regions"
  ON leads
  FOR SELECT
  TO authenticated
  USING (
    status IN ('available', 'claimed') AND
    (
      -- Lead matches buyer's selected cities (match on city text)
      city IN (
        SELECT c.name
        FROM cities c
        WHERE c.slug IN (
          SELECT jsonb_array_elements_text(regions_cities)
          FROM buyers
          WHERE auth_user_id = auth.uid()
        )
      )
      OR
      -- Lead matches buyer's selected provinces (match on province text)
      province IN (
        SELECT p.name
        FROM provinces p
        WHERE p.slug IN (
          SELECT jsonb_array_elements_text(regions_provinces)
          FROM buyers
          WHERE auth_user_id = auth.uid()
        )
      )
      OR
      -- Lead was claimed by this buyer
      claimed_by_buyer_id IN (
        SELECT id FROM buyers WHERE auth_user_id = auth.uid()
      )
    )
  );

-- Add helpful comments
COMMENT ON COLUMN buyers.auth_user_id IS 'Links buyer to Supabase auth.users (one-to-one)';
COMMENT ON COLUMN buyers.company_name IS 'Company or business name of the buyer';
COMMENT ON COLUMN buyers.property_types IS 'JSONB array of preferred property types';
COMMENT ON FUNCTION create_buyer_profile IS 'Automatically creates a buyer profile when a user signs up via Supabase Auth';
/*
  # Buyer Invite Token System

  ## Overview
  Creates a secure token system for inviting and onboarding new buyers with time-limited access to teasers.

  ## Changes

  ### 1. Add contact_name to buyers table
  - contact_name: Primary contact person name

  ### 2. Create buyer_invite_tokens table
  Tracks time-limited invite tokens for buyer onboarding:
  - token: Unique secure token (UUID)
  - buyer_id: FK to buyers
  - lead_id: Optional FK to leads (for lead-specific invites)
  - expires_at: Token expiration timestamp
  - used_at: Timestamp when token was used (activated)
  - created_at: Token creation timestamp

  ### 3. Security
  - RLS policies for token access
  - Automatic token expiration
  - Single-use token validation

  ### 4. Helper Functions
  - Function to generate secure tokens
  - Function to validate and consume tokens
*/

-- Add contact_name to buyers table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'contact_name'
  ) THEN
    ALTER TABLE buyers ADD COLUMN contact_name text;
  END IF;
END $$;

-- Create buyer_invite_tokens table
CREATE TABLE IF NOT EXISTS buyer_invite_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,

  CONSTRAINT valid_expiration CHECK (expires_at > created_at)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_buyer_invite_tokens_token ON buyer_invite_tokens(token);
CREATE INDEX IF NOT EXISTS idx_buyer_invite_tokens_buyer_id ON buyer_invite_tokens(buyer_id);
CREATE INDEX IF NOT EXISTS idx_buyer_invite_tokens_expires_at ON buyer_invite_tokens(expires_at);

-- Enable RLS
ALTER TABLE buyer_invite_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can validate tokens (needed for public access)
CREATE POLICY "Anyone can validate tokens"
  ON buyer_invite_tokens
  FOR SELECT
  USING (
    expires_at > now() AND used_at IS NULL
  );

-- Function to generate invite token for buyer
CREATE OR REPLACE FUNCTION generate_buyer_invite_token(
  p_buyer_id uuid,
  p_lead_id uuid DEFAULT NULL,
  p_days_valid int DEFAULT 7
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token uuid;
  v_expires_at timestamptz;
BEGIN
  -- Generate token
  v_token := gen_random_uuid();
  v_expires_at := now() + (p_days_valid || ' days')::interval;

  -- Insert token
  INSERT INTO buyer_invite_tokens (token, buyer_id, lead_id, expires_at)
  VALUES (v_token, p_buyer_id, p_lead_id, v_expires_at);

  -- Return token info
  RETURN jsonb_build_object(
    'success', true,
    'token', v_token,
    'expires_at', v_expires_at
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'token_generation_failed',
      'message', SQLERRM
    );
END;
$$;

-- Function to validate and optionally consume token
CREATE OR REPLACE FUNCTION validate_buyer_token(
  p_token uuid,
  p_consume boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token_record RECORD;
  v_buyer_record RECORD;
BEGIN
  -- Get token with buyer info
  SELECT 
    t.*,
    b.email as buyer_email,
    b.company_name,
    b.is_active as buyer_is_active,
    b.auth_user_id
  INTO v_token_record
  FROM buyer_invite_tokens t
  JOIN buyers b ON b.id = t.buyer_id
  WHERE t.token = p_token
  FOR UPDATE;

  -- Check if token exists
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'token_not_found',
      'message', 'Token not found'
    );
  END IF;

  -- Check if token is expired
  IF v_token_record.expires_at < now() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'token_expired',
      'message', 'Token has expired'
    );
  END IF;

  -- Check if token is already used
  IF v_token_record.used_at IS NOT NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'token_already_used',
      'message', 'Token has already been used'
    );
  END IF;

  -- Check if buyer already has auth account
  IF v_token_record.auth_user_id IS NOT NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'buyer_already_activated',
      'message', 'This buyer account is already activated'
    );
  END IF;

  -- Mark token as used if requested
  IF p_consume THEN
    UPDATE buyer_invite_tokens
    SET used_at = now()
    WHERE token = p_token;
  END IF;

  -- Return success with buyer and token info
  RETURN jsonb_build_object(
    'success', true,
    'buyer_id', v_token_record.buyer_id,
    'buyer_email', v_token_record.buyer_email,
    'company_name', v_token_record.company_name,
    'lead_id', v_token_record.lead_id,
    'expires_at', v_token_record.expires_at
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'validation_failed',
      'message', SQLERRM
    );
END;
$$;

-- Comments
COMMENT ON COLUMN buyers.contact_name IS 'Primary contact person name for the buyer company';
COMMENT ON TABLE buyer_invite_tokens IS 'Time-limited tokens for buyer onboarding and lead teaser access';
COMMENT ON FUNCTION generate_buyer_invite_token IS 'Generates a secure invite token for buyer onboarding';
COMMENT ON FUNCTION validate_buyer_token IS 'Validates and optionally consumes a buyer invite token';
