/**
 * Daily City Refresh Script
 * Updates one city per day to signal freshness to Google
 * Run via cron: node scripts/daily-city-refresh.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://edqmhrwtzggsfpunfrlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcW1ocnd0emdnc2ZwdW5mcmx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTc2NDY5MywiZXhwIjoyMDg1MzQwNjkzfQ.rbcGd_9QW9nzvz4V8cOhyvBRXt-as75pPJCPuwAiYJI'
);

async function refreshOldestCity() {
  console.log('🔄 Daily city refresh starting...\n');

  // Get the city with oldest content_generated_at (or null = never updated)
  const { data: city, error: fetchError } = await supabase
    .from('cities')
    .select('id, name, slug, province_id, content_generated_at')
    .order('content_generated_at', { ascending: true, nullsFirst: true })
    .limit(1)
    .single();

  if (fetchError || !city) {
    console.error('Error fetching city:', fetchError?.message);
    return;
  }

  // Get province name for context
  const { data: province } = await supabase
    .from('provinces')
    .select('name')
    .eq('id', city.province_id)
    .single();

  const provinceName = province?.name || 'Vlaanderen';

  // Generate fresh description with slight variation
  const variations = [
    `Woning verkopen in ${city.name}? Wij kopen uw huis of appartement in ${city.name}, ${provinceName}. Snel, discreet en zonder makelaarskosten. Ontvang binnen 48 uur een vrijblijvend bod.`,
    `Op zoek naar een huizenopkoper in ${city.name}? Wij bieden een snelle en eerlijke verkoop van uw woning in ${provinceName}. Geen makelaarskosten, geen verplichtingen.`,
    `Uw woning verkopen in ${city.name}, ${provinceName}? Wij zijn actief in heel ${provinceName} en kopen alle types woningen. Vraag vandaag nog een vrijblijvend bod aan.`,
    `Huizen opkoper ${city.name} - wij kopen uw woning snel en discreet. Geen lange wachttijden, geen makelaarskosten. Binnen 48 uur een eerlijk bod.`,
    `Verkoop uw huis in ${city.name} zonder stress. Wij zijn gespecialiseerd in snelle woningverkoop in ${provinceName}. Vrijblijvend en transparant.`
  ];

  const randomDescription = variations[Math.floor(Math.random() * variations.length)];

  // Update the city
  const { error: updateError } = await supabase
    .from('cities')
    .update({
      description: randomDescription,
      content_generated_at: new Date().toISOString()
    })
    .eq('id', city.id);

  if (updateError) {
    console.error(`❌ Error updating ${city.name}:`, updateError.message);
  } else {
    const lastUpdate = city.content_generated_at 
      ? new Date(city.content_generated_at).toLocaleDateString('nl-BE')
      : 'nooit';
    console.log(`✅ Refreshed: ${city.name} (${provinceName})`);
    console.log(`   Last update: ${lastUpdate}`);
    console.log(`   New timestamp: ${new Date().toISOString()}`);
  }

  console.log('\n🎉 Daily refresh complete!');
}

refreshOldestCity();
