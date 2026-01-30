const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://edqmhrwtzggsfpunfrlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcW1ocnd0emdnc2ZwdW5mcmx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTc2NDY5MywiZXhwIjoyMDg1MzQwNjkzfQ.rbcGd_9QW9nzvz4V8cOhyvBRXt-as75pPJCPuwAiYJI'
);

// Vlaamse provincies
const provinces = [
  { name: 'Antwerpen', slug: 'antwerpen', description: 'Woning verkopen in de provincie Antwerpen? Ontdek onze diensten in Antwerpen, Mechelen, Turnhout en alle gemeenten in de provincie.' },
  { name: 'Limburg', slug: 'limburg', description: 'Woning verkopen in Limburg? Wij kopen huizen in Hasselt, Genk, Sint-Truiden en alle Limburgse gemeenten.' },
  { name: 'Oost-Vlaanderen', slug: 'oost-vlaanderen', description: 'Woning verkopen in Oost-Vlaanderen? Actief in Gent, Aalst, Dendermonde, Sint-Niklaas en alle gemeenten.' },
  { name: 'Vlaams-Brabant', slug: 'vlaams-brabant', description: 'Woning verkopen in Vlaams-Brabant? Wij kopen huizen in Leuven, Vilvoorde, Halle en omstreken.' },
  { name: 'West-Vlaanderen', slug: 'west-vlaanderen', description: 'Woning verkopen in West-Vlaanderen? Actief in Brugge, Oostende, Kortrijk, Roeselare en alle gemeenten.' },
];

// Gemeenten per provincie (alle Vlaamse gemeenten)
const cities = {
  'antwerpen': [
    'Aartselaar', 'Antwerpen', 'Arendonk', 'Baarle-Hertog', 'Balen', 'Beerse', 'Berlaar', 'Boechout', 
    'Bonheiden', 'Boom', 'Bornem', 'Borsbeek', 'Brasschaat', 'Brecht', 'Dessel', 'Duffel', 'Edegem', 
    'Essen', 'Geel', 'Grobbendonk', 'Heist-op-den-Berg', 'Hemiksem', 'Herentals', 'Herenthout', 
    'Herselt', 'Hoogstraten', 'Hove', 'Hulshout', 'Kalmthout', 'Kapellen', 'Kasterlee', 'Kontich', 
    'Laakdal', 'Lier', 'Lille', 'Lint', 'Malle', 'Mechelen', 'Meerhout', 'Merksplas', 'Mol', 
    'Mortsel', 'Niel', 'Nijlen', 'Olen', 'Oud-Turnhout', 'Putte', 'Puurs-Sint-Amands', 'Ranst', 
    'Ravels', 'Retie', 'Rijkevorsel', 'Rumst', 'Schelle', 'Schilde', 'Schoten', 'Sint-Katelijne-Waver', 
    'Stabroek', 'Turnhout', 'Vorselaar', 'Vosselaar', 'Westerlo', 'Wijnegem', 'Willebroek', 'Wommelgem', 
    'Wuustwezel', 'Zandhoven', 'Zoersel', 'Zwijndrecht'
  ],
  'limburg': [
    'Alken', 'As', 'Beringen', 'Bilzen', 'Bocholt', 'Borgloon', 'Bree', 'Diepenbeek', 'Dilsen-Stokkem',
    'Genk', 'Gingelom', 'Halen', 'Ham', 'Hamont-Achel', 'Hasselt', 'Hechtel-Eksel', 'Heers', 
    'Herk-de-Stad', 'Herstappe', 'Heusden-Zolder', 'Hoeselt', 'Houthalen-Helchteren', 'Kinrooi', 
    'Kortessem', 'Lanaken', 'Leopoldsburg', 'Lommel', 'Lummen', 'Maaseik', 'Maasmechelen', 
    'Nieuwerkerken', 'Oudsbergen', 'Peer', 'Pelt', 'Riemst', 'Sint-Truiden', 'Tessenderlo', 
    'Tongeren', 'Voeren', 'Wellen', 'Zonhoven', 'Zutendaal'
  ],
  'oost-vlaanderen': [
    'Aalst', 'Aalter', 'Assenede', 'Berlare', 'Beveren', 'Brakel', 'Buggenhout', 'Deinze', 
    'Denderleeuw', 'Dendermonde', 'Destelbergen', 'Eeklo', 'Erpe-Mere', 'Evergem', 'Gavere', 
    'Gent', 'Geraardsbergen', 'Haaltert', 'Hamme', 'Herzele', 'Horebeke', 'Kaprijke', 'Kluisbergen', 
    'Kruibeke', 'Kruisem', 'Laarne', 'Lebbeke', 'Lede', 'Lierde', 'Lochristi', 'Lokeren', 
    'Lievegem', 'Maarkedal', 'Maldegem', 'Melle', 'Merelbeke', 'Moerbeke', 'Nazareth', 'Ninove', 
    'Oosterzele', 'Oudenaarde', 'Ronse', 'Sint-Gillis-Waas', 'Sint-Lievens-Houtem', 'Sint-Niklaas', 
    'Stekene', 'Temse', 'Waasmunster', 'Wachtebeke', 'Wetteren', 'Wichelen', 'Wortegem-Petegem', 
    'Zele', 'Zelzate', 'Zottegem', 'Zulte', 'Zwalm'
  ],
  'vlaams-brabant': [
    'Aarschot', 'Affligem', 'Asse', 'Beersel', 'Begijnendijk', 'Bekkevoort', 'Bertem', 'Bever', 
    'Bierbeek', 'Boortmeerbeek', 'Boutersem', 'Diest', 'Dilbeek', 'Drogenbos', 'Galmaarden', 
    'Geetbets', 'Glabbeek', 'Gooik', 'Grimbergen', 'Haacht', 'Halle', 'Herent', 'Herne', 
    'Hoegaarden', 'Hoeilaart', 'Holsbeek', 'Huldenberg', 'Kampenhout', 'Kapelle-op-den-Bos', 
    'Keerbergen', 'Kortenaken', 'Kortenberg', 'Kraainem', 'Landen', 'Lennik', 'Leuven', 
    'Liedekerke', 'Linkebeek', 'Linter', 'Londerzeel', 'Lubbeek', 'Machelen', 'Meise', 
    'Merchtem', 'Opwijk', 'Oud-Heverlee', 'Overijse', 'Pepingen', 'Rotselaar', 'Scherpenheuvel-Zichem', 
    'Sint-Genesius-Rode', 'Sint-Pieters-Leeuw', 'Steenokkerzeel', 'Ternat', 'Tervuren', 
    'Tielt-Winge', 'Tienen', 'Tremelo', 'Vilvoorde', 'Wemmel', 'Wezembeek-Oppem', 'Zaventem', 
    'Zemst', 'Zoutleeuw'
  ],
  'west-vlaanderen': [
    'Aalter', 'Anzegem', 'Ardooie', 'Avelgem', 'Beernem', 'Blankenberge', 'Bredene', 'Brugge', 
    'Damme', 'De Haan', 'De Panne', 'Deerlijk', 'Dentergem', 'Diksmuide', 'Harelbeke', 'Heuvelland', 
    'Hooglede', 'Houthulst', 'Ichtegem', 'Ieper', 'Ingelmunster', 'Izegem', 'Jabbeke', 'Knokke-Heist', 
    'Koekelare', 'Koksijde', 'Kortemark', 'Kortrijk', 'Kuurne', 'Langemark-Poelkapelle', 'Ledegem', 
    'Lendelede', 'Lichtervelde', 'Lo-Reninge', 'Menen', 'Mesen', 'Meulebeke', 'Middelkerke', 
    'Moorslede', 'Nieuwpoort', 'Oostende', 'Oostkamp', 'Oostrozebeke', 'Oudenburg', 'Pittem', 
    'Poperinge', 'Roeselare', 'Ruiselede', 'Spiere-Helkijn', 'Staden', 'Tielt', 'Torhout', 
    'Veurne', 'Vleteren', 'Waregem', 'Wervik', 'Wevelgem', 'Wielsbeke', 'Wingene', 'Zedelgem', 
    'Zonnebeke', 'Zuienkerke', 'Zwevegem'
  ]
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function seed() {
  console.log('🌱 Seeding database...\n');

  // Insert provinces
  console.log('📍 Adding provinces...');
  const { data: insertedProvinces, error: provError } = await supabase
    .from('provinces')
    .upsert(provinces, { onConflict: 'slug' })
    .select();

  if (provError) {
    console.error('Error inserting provinces:', provError);
    return;
  }
  console.log(`   ✅ ${insertedProvinces.length} provinces added\n`);

  // Create province lookup
  const provinceLookup = {};
  insertedProvinces.forEach(p => {
    provinceLookup[p.slug] = p.id;
  });

  // Insert cities
  console.log('🏘️  Adding cities...');
  let totalCities = 0;

  for (const [provinceSlug, cityNames] of Object.entries(cities)) {
    const provinceId = provinceLookup[provinceSlug];
    if (!provinceId) {
      console.log(`   ⚠️  Province ${provinceSlug} not found, skipping cities`);
      continue;
    }

    const cityRecords = cityNames.map(name => ({
      province_id: provinceId,
      name: name,
      slug: slugify(name),
      description: `Woning verkopen in ${name}? Wij kopen uw huis of appartement in ${name}. Snel, discreet en zonder makelaarskosten.`
    }));

    const { data: insertedCities, error: cityError } = await supabase
      .from('cities')
      .upsert(cityRecords, { onConflict: 'province_id,slug' })
      .select();

    if (cityError) {
      console.error(`   Error inserting cities for ${provinceSlug}:`, cityError);
    } else {
      console.log(`   ✅ ${provinceSlug}: ${insertedCities.length} cities`);
      totalCities += insertedCities.length;
    }
  }

  console.log(`\n🎉 Done! Added ${insertedProvinces.length} provinces and ${totalCities} cities`);
}

seed();
