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