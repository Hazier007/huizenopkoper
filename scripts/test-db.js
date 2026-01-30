const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://edqmhrwtzggsfpunfrlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcW1ocnd0emdnc2ZwdW5mcmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjQ2OTMsImV4cCI6MjA4NTM0MDY5M30.ybHSUd2mTCU5bcQGtSeHnygIONIQ7S2emvLwQ0vEZKk'
);

async function test() {
  // Test connection
  console.log('🔌 Testing Supabase connection...\n');
  
  // Check if provinces table exists
  const { data: provinces, error: provError } = await supabase
    .from('provinces')
    .select('*')
    .limit(5);
  
  if (provError) {
    console.log('❌ Provinces table error:', provError.message);
    console.log('\n→ Tabellen moeten nog aangemaakt worden via SQL Editor in Supabase dashboard');
  } else {
    console.log('✅ Provinces table exists');
    console.log(`   Found ${provinces.length} provinces`);
  }
  
  // Check cities
  const { data: cities, error: cityError } = await supabase
    .from('cities')
    .select('*')
    .limit(5);
  
  if (cityError) {
    console.log('❌ Cities table error:', cityError.message);
  } else {
    console.log('✅ Cities table exists');
    console.log(`   Found ${cities.length} cities`);
  }
}

test();
