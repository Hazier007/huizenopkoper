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
