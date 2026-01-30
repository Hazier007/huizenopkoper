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
