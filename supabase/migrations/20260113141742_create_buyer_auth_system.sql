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
