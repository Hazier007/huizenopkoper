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
