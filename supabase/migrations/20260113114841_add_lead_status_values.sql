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
