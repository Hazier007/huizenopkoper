const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://edqmhrwtzggsfpunfrlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcW1ocnd0emdnc2ZwdW5mcmx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTc2NDY5MywiZXhwIjoyMDg1MzQwNjkzfQ.rbcGd_9QW9nzvz4V8cOhyvBRXt-as75pPJCPuwAiYJI'
);

// Top 20 Vlaamse steden met rijke content data
const cityContent = {
  'antwerpen': {
    sales_content: `Antwerpen, de bruisende metropool aan de Schelde, is een van de meest begeerde woonlocaties in Vlaanderen. Als tweede grootste stad van België biedt Antwerpen een unieke mix van historische grandeur en moderne dynamiek. De vastgoedmarkt in Antwerpen kent een constante vraag, gedreven door de haven, de diamantsector en een bloeiende creatieve industrie.

Of u nu een karaktervol herenhuis in het Zuid bezit, een gezellig appartement in het historische centrum, of een ruime gezinswoning in de groene rand – er is altijd interesse van kopers. De diversiteit aan wijken maakt Antwerpen bijzonder: van de trendy Eilandje met zijn moderne architectuur tot het authentieke Zurenborg met zijn prachtige belle-époque gevels.

De stad trekt zowel jonge professionals als gezinnen aan, wat resulteert in een dynamische vastgoedmarkt met korte verkooptijden. Antwerpen scoort hoog op leefbaarheid met uitstekende verbindingen, culturele voorzieningen en onderwijsmogelijkheden.`,
    neighborhoods: [
      { name: 'Het Zuid', description: 'Trendy wijk met het KMSKA, hippe restaurants en karaktervolle herenhuizen' },
      { name: 'Zurenborg', description: 'Architecturaal pareltje met belle-époque woningen en gezellige sfeer' },
      { name: 'Eilandje', description: 'Modern woongebied aan het water met het MAS en hedendaagse appartementen' },
      { name: 'Borgerhout', description: 'Diverse, opkomende wijk met betaalbare woningen en multiculturele sfeer' },
      { name: 'Wilrijk', description: 'Rustige deelgemeente met veel groen, ideaal voor gezinnen' },
      { name: 'Deurne', description: 'Uitgestrekte deelgemeente met gevarieerd woningaanbod' }
    ],
    amenities: {
      transport: ['Centraal Station (internationale verbindingen)', 'Uitgebreid tramnetwerk', 'Ring rond Antwerpen', 'Haven van Antwerpen'],
      schools: ['Universiteit Antwerpen', 'AP Hogeschool', 'Internationale scholen', 'Breed aanbod basis- en middelbaar onderwijs'],
      shopping: ['Meir winkelstraat', 'Stadsfeestzaal', 'Wijnegem Shopping Center'],
      leisure: ['KMSKA', 'MAS', 'Zoo Antwerpen', 'Rivierenhof', 'Nachtleven']
    },
    market_appeal: 'Antwerpen combineert grootstedelijke voorzieningen met Vlaamse gezelligheid. De sterke economie, culturele rijkdom en uitstekende bereikbaarheid maken het een toplocatie voor vastgoed. Woningen in Antwerpen behouden hun waarde en zijn gewild bij zowel eigenaars-bewoners als investeerders.'
  },
  'gent': {
    sales_content: `Gent is de verborgen parel van Vlaanderen – een stad die authenticiteit en innovatie moeiteloos combineert. Met zijn middeleeuwse skyline, levendige studentenpopulatie en bloeiende tech-scene is Gent een van de meest gewilde woonplaatsen van België.

De vastgoedmarkt in Gent is bijzonder dynamisch. De aanwezigheid van de Universiteit Gent en talrijke hogescholen zorgt voor een constante vraag naar zowel studentenkoten als gezinswoningen. Van de pittoreske Patershol tot het hippe Dok Noord – elke wijk heeft zijn eigen karakter en aantrekkingskracht.

Gent scoort consequent hoog in leefbaarheidsrankings dankzij de compacte binnenstad, uitstekend openbaar vervoer en het uitgebreide netwerk van fietspaden. De stad investeert fors in duurzaamheid en vergroening, wat de aantrekkelijkheid voor jonge gezinnen verder verhoogt.`,
    neighborhoods: [
      { name: 'Patershol', description: 'Historisch hart met smalle straatjes, restaurants en karaktervolle woningen' },
      { name: 'Dok Noord', description: 'Opkomende creatieve wijk in voormalig havengebied' },
      { name: 'Sint-Amandsberg', description: 'Residentiële wijk met goede mix van appartementen en huizen' },
      { name: 'Gentbrugge', description: 'Groene deelgemeente langs de Schelde met familiale sfeer' },
      { name: 'Ledeberg', description: 'Diverse wijk in opkomst met betaalbare opties' },
      { name: 'Mariakerke', description: 'Rustige residentiële wijk met villa\'s en ruime tuinen' }
    ],
    amenities: {
      transport: ['Sint-Pieters station', 'Uitgebreid tramnetwerk', 'Fietsstad nummer 1', 'E40/E17 knooppunt'],
      schools: ['Universiteit Gent', 'Arteveldehogeschool', 'HoGent', 'Internationale scholen'],
      shopping: ['Veldstraat', 'Zuid', 'Dok Noord creatieve winkels'],
      leisure: ['SMAK', 'Gentse Feesten', 'Blaarmeersen', 'Overpoort uitgaansleven', 'Graslei']
    },
    market_appeal: 'Gent biedt het beste van twee werelden: de charme van een historische stad met de dynamiek van een moderne kenniseconomie. De stabiele huurmarkt (studenten) en groeiende koopmarkt maken het interessant voor diverse kopersprofielen.'
  },
  'brugge': {
    sales_content: `Brugge, het Venetië van het Noorden, is een stad waar geschiedenis en romantiek samenkomen. Als UNESCO Werelderfgoed trekt Brugge jaarlijks miljoenen bezoekers, maar het is ook een geliefde woonplaats voor wie rust en schoonheid zoekt.

De vastgoedmarkt in Brugge is uniek. Woningen binnen de historische binnenstad zijn zeldzaam en gewild, wat resulteert in stabiele tot stijgende prijzen. De strenge bouwvoorschriften zorgen voor behoud van het karakteristieke stadsbeeld, maar maken nieuwbouw schaars.

Buiten de vesten bieden wijken als Sint-Andries, Sint-Michiels en Assebroek een rustiger en betaalbaarder alternatief met behoud van de Brugse charme. De nabijheid van de kust (Zeebrugge, Knokke) maakt Brugge ook aantrekkelijk voor wie het beste van stad én zee wil combineren.`,
    neighborhoods: [
      { name: 'Historisch centrum', description: 'UNESCO werelderfgoed met iconische grachten en middeleeuwse architectuur' },
      { name: 'Sint-Andries', description: 'Levendige wijk buiten de vesten met jonge, creatieve sfeer' },
      { name: 'Sint-Michiels', description: 'Residentiële deelgemeente met moderne gezinswoningen' },
      { name: 'Assebroek', description: 'Rustige woonwijk met goede voorzieningen en groen' },
      { name: 'Sint-Kruis', description: 'Groene deelgemeente aan de rand van de stad' },
      { name: 'Zeebrugge', description: 'Kustgemeente met haven en strandappartementen' }
    ],
    amenities: {
      transport: ['Station Brugge', 'Directe trein naar Brussel/kust', 'Haven Zeebrugge', 'N31 expresweg'],
      schools: ['Howest', 'VIVES', 'Internationaal aanbod', 'Historische colleges'],
      shopping: ['Steenstraat', 'Zilverstraat', 'Lokale ambachtelijke winkels'],
      leisure: ['Groeningemuseum', 'Belfort', 'Reien', 'Nabijheid Knokke-Heist']
    },
    market_appeal: 'Brugge is een veilige investering in vastgoed. De unieke historische waarde, het toerisme en de internationale aantrekkingskracht zorgen voor een stabiele markt. Ideaal voor wie waardebehoud en levenskwaliteit combineert.'
  },
  'leuven': {
    sales_content: `Leuven is de ultieme studentenstad met een rijke academische traditie en een bruisend stadsleven. De KU Leuven, een van de oudste en meest prestigieuze universiteiten van Europa, vormt het kloppende hart van de stad en stuurt de vastgoedmarkt aan.

De combinatie van 50.000+ studenten, een bloeiende kenniseconomie (imec, onderzoeksparken) en de nabijheid van Brussel maakt Leuven tot een van de meest dynamische vastgoedmarkten van Vlaanderen. Opbrengsteigendommen zijn bijzonder gewild, maar ook gezinswoningen in de rand kennen een sterke vraag.

Leuven investeert fors in leefbaarheid: autoluwe zones, nieuwe parken en duurzame mobiliteit. De stad scoort consequent hoog op innovatie en levenskwaliteit.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Levendig hart met Oude Markt, studentenleven en historische gebouwen' },
      { name: 'Heverlee', description: 'Groene universitaire wijk met Arenberg campus en kasteel' },
      { name: 'Kessel-Lo', description: 'Populaire residentiële wijk met provinciaal domein' },
      { name: 'Wijgmaal', description: 'Rustig dorp aan de Dijle, ideaal voor gezinnen' },
      { name: 'Wilsele', description: 'Groene deelgemeente met goede bereikbaarheid' }
    ],
    amenities: {
      transport: ['Station Leuven', 'Directe trein Brussel (20 min)', 'E40/E314 knooppunt', 'Uitgebreid busnet'],
      schools: ['KU Leuven', 'UCLL', 'Imec research', 'Uitstekend lager en middelbaar onderwijs'],
      shopping: ['Bondgenotenlaan', 'Diestsestraat', 'Blauwe Boulevard'],
      leisure: ['Oude Markt (langste toog)', 'Abdij Keizersberg', 'Sportkot', 'M Leuven museum']
    },
    market_appeal: 'Leuven biedt unieke investeringskansen dankzij de stabiele studentenmarkt en groeiende tech-sector. Woningen in Leuven kennen een lage leegstand en sterke huurrendementen. De stad combineert academische prestige met Vlaamse gezelligheid.'
  },
  'mechelen': {
    sales_content: `Mechelen is de rising star van Vlaanderen – een stad die de afgelopen jaren een indrukwekkende transformatie heeft doorgemaakt. Van vergane glorie tot hippe hotspot: Mechelen combineert rijke geschiedenis met hedendaagse dynamiek.

Strategisch gelegen tussen Antwerpen en Brussel is Mechelen uitgegroeid tot een populair alternatief voor wie de drukte van de grote steden wil ontvluchten zonder aan bereikbaarheid in te boeten. De treinverbinding is uitstekend: 15 minuten naar beide steden.

De vastgoedprijzen in Mechelen zijn de afgelopen jaren fors gestegen, maar liggen nog steeds onder die van Antwerpen en Brussel. Dit maakt de stad aantrekkelijk voor jonge kopers en investeerders die waardestijging verwachten.`,
    neighborhoods: [
      { name: 'Binnenstad', description: 'Historisch centrum met Sint-Romboutstoren en autovrije pleinen' },
      { name: 'Nekkerspoel', description: 'Wijk rond het station, in volle ontwikkeling' },
      { name: 'Battel', description: 'Rustige groene wijk langs de Dijle' },
      { name: 'Leest', description: 'Landelijk deeldorp met dorpse sfeer' },
      { name: 'Heffen', description: 'Residentiële wijk met gezinswoningen' }
    ],
    amenities: {
      transport: ['Station Mechelen (IC knooppunt)', '15 min Brussel/Antwerpen', 'E19 aansluiting', 'Fietssnelwegen'],
      schools: ['Thomas More hogeschool', 'KASKA', 'Uitgebreid scholennet', 'Kinderopvang'],
      shopping: ['Bruul shopping', 'IJzerenleen', 'Lokale boetieks'],
      leisure: ['Technopolis', 'Planckendael', 'Dijlepad', 'Lamot cultuurcentrum']
    },
    market_appeal: 'Mechelen is dé stad voor wie zoekt naar waardestijging. De combinatie van historische charme, excellente bereikbaarheid en lagere instapprijzen maakt het een slimme keuze. De stad investeert fors in publieke ruimte en leefbaarheid.'
  },
  'hasselt': {
    sales_content: `Hasselt is het kloppende hart van Limburg – een provincie die vaak onderschat wordt maar veel te bieden heeft. Als hoofdstad van Limburg biedt Hasselt stedelijke voorzieningen in een groene, rustige omgeving.

De vastgoedmarkt in Hasselt is stabiel en betaalbaar vergeleken met de Vlaamse Ruit. De stad trekt jonge gezinnen aan die ruimte zoeken tegen redelijke prijzen. Het shoppingaanbod is uitstekend, de zorg (Jessa Ziekenhuis) van topniveau en de natuur (Bokrijk, Herkenrode) ligt om de hoek.

Hasselt profileert zich als smart city met investeringen in duurzaamheid en innovatie. De UHasselt en PXL zorgen voor een jonge, dynamische bevolking.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Gezellige binnenstad met Grote Markt en winkelstraten' },
      { name: 'Runkst', description: 'Residentiële wijk met goede voorzieningen' },
      { name: 'Godsheide', description: 'Groene wijk aan de rand met nieuwbouw' },
      { name: 'Kuringen', description: 'Rustig deeldorp met landelijk karakter' },
      { name: 'Sint-Lambrechts-Herk', description: 'Residentiële wijk met villa\'s' }
    ],
    amenities: {
      transport: ['Station Hasselt', 'Snelbus naar Genk/Tongeren', 'E313/E314 knooppunt', 'Spartacus tramproject'],
      schools: ['UHasselt', 'PXL Hogeschool', 'Uitgebreid scholennet'],
      shopping: ['Hoogstraat', 'Quartier Bleu', 'Shopping Hasselt'],
      leisure: ['Japanse Tuin', 'Jenevermuseum', 'Bokrijk', 'Plopsa Indoor']
    },
    market_appeal: 'Hasselt biedt uitstekende value for money. Ruime woningen tegen betaalbare prijzen, goede voorzieningen en veel groen. Ideaal voor wie zoekt naar levenskwaliteit zonder de drukte van de grote steden.'
  },
  'kortrijk': {
    sales_content: `Kortrijk is de economische motor van Zuid-West-Vlaanderen – een stad met een sterke industriële traditie die zich heeft omgevormd tot een moderne kenniseconomie. De stad is compact, goed bereikbaar en biedt een hoge levenskwaliteit.

De renovatie van de Leie-oevers en het Buda-eiland hebben Kortrijk een nieuwe dynamiek gegeven. De vastgoedmarkt profiteert van de economische veerkracht van de regio en de nabijheid van Frankrijk.

Kortrijk is ook een echte winkelstad met een uitgebreid aanbod en gezellige winkelstraten. De Hogeschool VIVES en Kulak zorgen voor een jonge bevolking.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historisch hart met Grote Markt en Belforten' },
      { name: 'Buda-eiland', description: 'Creatieve hotspot met cultuur en horeca' },
      { name: 'Marke', description: 'Residentiële deelgemeente met gezinswoningen' },
      { name: 'Heule', description: 'Rustige woonwijk met goede voorzieningen' },
      { name: 'Bissegem', description: 'Groene deelgemeente aan de rand' }
    ],
    amenities: {
      transport: ['Station Kortrijk', 'E17 aansluiting', 'Nabijheid Rijsel (30 min)', 'TGV verbinding via Rijsel'],
      schools: ['KULAK', 'Howest', 'VIVES', 'Breed onderwijsaanbod'],
      shopping: ['K in Kortrijk', 'Lange Steenstraat', 'Rijselsestraat'],
      leisure: ['Texture museum', 'Budafabriek', 'Kortrijk Xpo', 'Groeningekouter']
    },
    market_appeal: 'Kortrijk biedt een sterke economische basis en uitstekende bereikbaarheid naar Frankrijk. De vastgoedprijzen zijn redelijk en de stad investeert fors in leefbaarheid. Interessant voor wie werkt in de grensregio.'
  },
  'oostende': {
    sales_content: `Oostende is dé stad aan zee – de koningin der badsteden met een rijke geschiedenis en een eigenzinnig karakter. Van mondaine belle-époque grandeur tot moderne kunstscene: Oostende is veel meer dan een badplaats.

De vastgoedmarkt in Oostende is divers: van luxueuze zeedijkappartementen tot betaalbare woningen in de binnenstad. De stad trekt zowel permanente bewoners als tweede verblijvers aan. De nabijheid van de zee, de haven en de goede verbindingen maken het aantrekkelijk.

Oostende investeert fors in stadsvernieuwing en cultuur. Het Mu.ZEE, de renovatie van de Mercator en nieuwe woonprojecten geven de stad een nieuwe impuls.`,
    neighborhoods: [
      { name: 'Centrum/Zeedijk', description: 'Iconische boulevard met appartementen en zeezicht' },
      { name: 'Hazegras', description: 'Karaktervolle wijk achter de zeedijk' },
      { name: 'Mariakerke', description: 'Rustigere kuststrook met gezinswoningen' },
      { name: 'Stene', description: 'Groene woonwijk landinwaarts' },
      { name: 'Zandvoorde', description: 'Landelijk deeldorp aan de rand' }
    ],
    amenities: {
      transport: ['Station Oostende', 'Kusttram', 'Veerverbinding UK', 'E40 aansluiting', 'Luchthaven Oostende'],
      schools: ['Howest', 'VIVES', 'Breed scholenaanbod', 'Internationale scholen'],
      shopping: ['Kapellestraat', 'Shoppingcenter', 'Lokale winkels'],
      leisure: ['Mu.ZEE', 'Mercator', 'Strand', 'Casino', 'Watersport']
    },
    market_appeal: 'Oostende biedt een unieke combinatie van kustleven en stedelijke voorzieningen. Appartementen aan zee zijn gewild voor verhuur en eigen gebruik. De stad kent een sterke toeristische economie en investeert in vernieuwing.'
  },
  'sint-niklaas': {
    sales_content: `Sint-Niklaas is de hoofdstad van het Waasland – een regio met een sterke identiteit en een gunstige ligging tussen Antwerpen en Gent. De stad staat bekend om haar Grote Markt, de grootste van België, en haar bloeiende handelsleven.

De vastgoedmarkt in Sint-Niklaas is stabiel en betaalbaar. De stad trekt gezinnen aan die zoeken naar ruimte en rust op pendelafstand van de grote steden. De textielindustrie heeft plaatsgemaakt voor logistiek en diensten.

Sint-Niklaas investeert in stadsvernieuwing met projecten rond het station en nieuwe woonwijken. De stad biedt een goede balans tussen stedelijke voorzieningen en Waaslandse rust.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Rond de Grote Markt met winkels en horeca' },
      { name: 'Nieuwkerken-Waas', description: 'Groene deelgemeente met landelijk karakter' },
      { name: 'Belsele', description: 'Rustige woonwijk met goede voorzieningen' },
      { name: 'Sinaai', description: 'Landelijk deeldorp in het Waasland' }
    ],
    amenities: {
      transport: ['Station Sint-Niklaas', '15 min Antwerpen/Gent', 'E17 aansluiting', 'Goede busverbindingen'],
      schools: ['Hogeschool Waas', 'Breed scholenaanbod', 'Technische scholen'],
      shopping: ['Stationsstraat', 'Waasland Shopping Center', 'Donderdagmarkt'],
      leisure: ['Grote Markt', 'Huis van de Waas', 'Sinksenfoor']
    },
    market_appeal: 'Sint-Niklaas biedt uitstekende value for money op pendelafstand van Antwerpen en Gent. De stad investeert in leefbaarheid en bereikbaarheid. Aantrekkelijk voor gezinnen die ruimte zoeken.'
  },
  'genk': {
    sales_content: `Genk is de meest diverse stad van Vlaanderen – een smeltkroes van culturen die is ontstaan uit de mijngeschiedenis. Vandaag is Genk een moderne stad met een sterke economie, gedreven door automotive (Ford-site transformatie), logistiek en zorg.

De vastgoedmarkt in Genk is bijzonder betaalbaar vergeleken met andere Vlaamse steden. De stad biedt ruime woningen met tuinen tegen prijzen die elders ondenkbaar zijn. De reconversie van de mijnterreinen naar woon- en werkgebieden zorgt voor nieuwe dynamiek.

Genk investeert fors in cultuur (C-mine), sport (Limburg United) en natuur (Nationaal Park Hoge Kempen). De stad heeft een jonge bevolking en een ondernemende geest.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Modern stadscentrum met shopping en voorzieningen' },
      { name: 'Winterslag', description: 'Voormalige mijnwijk, nu in transformatie' },
      { name: 'Waterschei', description: 'Woonwijk met sportinfrastructuur' },
      { name: 'Boxbergheide', description: 'Groene wijk aan Nationaal Park' },
      { name: 'Zwartberg', description: 'Mijnpatrimonium en nieuwe ontwikkelingen' }
    ],
    amenities: {
      transport: ['Busstation Genk', 'E314 aansluiting', 'Spartacus tram (toekomst)', 'Nabijheid Hasselt station'],
      schools: ['UHasselt campus', 'UCLL', 'Breed scholenaanbod'],
      shopping: ['Shopping 1', 'Centrum winkels', 'Lokale markten'],
      leisure: ['C-mine', 'Nationaal Park Hoge Kempen', 'Sundaypark', 'Thor Park']
    },
    market_appeal: 'Genk is een onderschatte vastgoedmarkt met groeipotentieel. De combinatie van betaalbare prijzen, ruimte en economische transformatie maakt het interessant voor investeerders en jonge kopers. De natuur aan de deur is een unieke troef.'
  }
};

// Voeg meer steden toe met compactere content
const additionalCities = ['aalst', 'roeselare', 'dendermonde', 'turnhout', 'vilvoorde', 'lokeren', 'beveren', 'tongeren', 'halle', 'knokke-heist'];

async function generateContent() {
  console.log('🤖 Generating AI content for top cities...\n');

  for (const [citySlug, content] of Object.entries(cityContent)) {
    // Find the city in database
    const { data: city, error: findError } = await supabase
      .from('cities')
      .select('id, name, province_id')
      .eq('slug', citySlug)
      .maybeSingle();

    if (findError || !city) {
      console.log(`⚠️  City ${citySlug} not found, skipping`);
      continue;
    }

    // Update city with content
    const { error: updateError } = await supabase
      .from('cities')
      .update({
        sales_content: content.sales_content,
        neighborhoods: content.neighborhoods,
        amenities: content.amenities,
        market_appeal: content.market_appeal,
        content_generated_at: new Date().toISOString()
      })
      .eq('id', city.id);

    if (updateError) {
      console.log(`❌ Error updating ${city.name}:`, updateError.message);
    } else {
      console.log(`✅ ${city.name} - content added`);
    }
  }

  console.log('\n🎉 Content generation complete!');
}

generateContent();
