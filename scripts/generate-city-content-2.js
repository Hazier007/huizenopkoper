const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://edqmhrwtzggsfpunfrlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcW1ocnd0emdnc2ZwdW5mcmx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTc2NDY5MywiZXhwIjoyMDg1MzQwNjkzfQ.rbcGd_9QW9nzvz4V8cOhyvBRXt-as75pPJCPuwAiYJI'
);

const cityContent = {
  'aalst': {
    sales_content: `Aalst ligt strategisch tussen Brussel en Gent, wat de stad tot een ideale woonplaats maakt voor pendelaars. Bekend om haar legendarisch carnaval en rijke industriële geschiedenis, biedt Aalst een mix van stedelijke voorzieningen en Vlaamse gezelligheid.

De vastgoedmarkt in Aalst is toegankelijk met prijzen onder die van de grote steden. De stad kent een actieve renovatiemarkt en trekt jonge gezinnen aan die waarde zoeken. De binnenstad wordt gerevitaliseerd met nieuwe projecten en groene ruimtes.

Met goede treinverbindingen naar Brussel (25 min) en Gent (20 min) is Aalst perfect voor wie centraal wil wonen zonder hoofdstedelijke prijzen te betalen.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historisch hart met Grote Markt en carnavalssfeer' },
      { name: 'Erembodegem', description: 'Residentiële deelgemeente met goede bereikbaarheid' },
      { name: 'Hofstade', description: 'Rustige woonwijk met groen karakter' }
    ],
    amenities: {
      transport: ['Station Aalst', '25 min Brussel', 'E40 aansluiting'],
      schools: ['HOGENT campus', 'Breed scholenaanbod'],
      shopping: ['Nieuwstraat', 'Lokale markten'],
      leisure: ['Carnaval Aalst', 'Osbroek natuurgebied']
    },
    market_appeal: 'Aalst biedt uitstekende value for money op de as Brussel-Gent. Betaalbare prijzen, goede verbindingen en Vlaamse gezelligheid maken het aantrekkelijk voor jonge kopers.'
  },
  'roeselare': {
    sales_content: `Roeselare is het economische hart van de Westhoek – een ondernemende stad met sterke roots in landbouw en voedingsindustrie. De stad heeft zich ontwikkeld tot een modern regionaal centrum met uitstekende voorzieningen.

De vastgoedmarkt is gezond en betaalbaar. Roeselare trekt gezinnen aan die ruimte zoeken in een dynamische omgeving. De stad investeert in sport (Club Brugge Vrouwen, jeugdwerking) en cultuur.

De nabijheid van de E403 en goede treinverbindingen maken Roeselare goed bereikbaar vanuit heel West-Vlaanderen.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Compact stadscentrum met winkels en horeca' },
      { name: 'Rumbeke', description: 'Groene deelgemeente met kasteeldomein' },
      { name: 'Beveren', description: 'Residentiële wijk met gezinswoningen' }
    ],
    amenities: {
      transport: ['Station Roeselare', 'E403 aansluiting', 'Goede busverbindingen'],
      schools: ['VIVES campus', 'Breed scholenaanbod'],
      shopping: ['Ooststraat', 'Roeselare Shopping'],
      leisure: ['Schiervelde sportcomplex', 'Sterrebos']
    },
    market_appeal: 'Roeselare biedt West-Vlaamse degelijkheid met betaalbare vastgoedprijzen. Sterke lokale economie en goede voorzieningen maken het aantrekkelijk voor gezinnen.'
  },
  'dendermonde': {
    sales_content: `Dendermonde is een historische stad aan de samenvloeiing van Schelde en Dender. Bekend om de legendarische Ros Beiaard ommegang, biedt de stad een rijke geschiedenis gecombineerd met moderne woonkwaliteit.

Strategisch gelegen tussen Gent, Antwerpen en Brussel is Dendermonde ideaal voor pendelaars. De vastgoedmarkt is toegankelijk met een mix van historische panden en moderne gezinswoningen.

De stad investeert in de binnenstad en waterfront, wat nieuwe dynamiek brengt.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historische kern met Grote Markt en Vleeshuis' },
      { name: 'Appels', description: 'Residentiële deelgemeente langs de Schelde' },
      { name: 'Baasrode', description: 'Woonwijk met industrieel erfgoed' }
    ],
    amenities: {
      transport: ['Station Dendermonde', 'E17/N41 bereikbaarheid', 'Vlakbij Gent/Antwerpen'],
      schools: ['Breed scholenaanbod', 'Technische scholen'],
      shopping: ['Oude Vest', 'Lokale winkels'],
      leisure: ['Ros Beiaard', 'Donkmeer', 'Scheldeboorden']
    },
    market_appeal: 'Dendermonde biedt historische charme op een strategische locatie. Betaalbare prijzen en goede bereikbaarheid maken het interessant voor pendelaars naar Gent, Antwerpen en Brussel.'
  },
  'turnhout': {
    sales_content: `Turnhout is de hoofdstad van de Kempen – een groene regio met uitgestrekte bossen en heidevelden. De stad combineert stedelijke voorzieningen met directe toegang tot natuur en biedt een hoge levenskwaliteit.

Als speelkaartenstad heeft Turnhout een rijke industriële geschiedenis die nu plaats maakt voor een diverse economie. De vastgoedmarkt is betaalbaar met ruime kavels en tuinen.

De stad is het centrum van de Noorderkempen en biedt uitstekende voorzieningen voor de wijde regio.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Gezellig stadscentrum met Grote Markt en Begijnhof' },
      { name: 'Zevendonk', description: 'Moderne residentiële wijk' },
      { name: 'Schorvoort', description: 'Groene woonwijk aan de stadsrand' }
    ],
    amenities: {
      transport: ['Station Turnhout', 'E34/E313 bereikbaarheid', 'Goede busverbindingen'],
      schools: ['Thomas More campus', 'Breed scholenaanbod'],
      shopping: ['Gasthuisstraat', 'Turnova shopping'],
      leisure: ['De Warande', 'Speelkaartenmuseum', 'Kempense natuur']
    },
    market_appeal: 'Turnhout biedt Kempense rust met stedelijke voorzieningen. Betaalbare prijzen, veel groen en ruime woningen maken het ideaal voor gezinnen die natuur zoeken.'
  },
  'vilvoorde': {
    sales_content: `Vilvoorde is de poort naar Brussel – een stad in volle transformatie die profiteert van de nabijheid van de hoofdstad en de luchthaven. De oude industriestad maakt plaats voor moderne woon- en werkprojecten.

De vastgoedmarkt in Vilvoorde biedt interessante kansen. De prijzen liggen onder die van Brussel maar stijgen gestaag door de ontwikkelingen. Het kanaalgebied wordt getransformeerd tot een nieuwe stadswijk.

Met de trein ben je in 10 minuten in Brussel-Noord, wat Vilvoorde aantrekkelijk maakt voor wie in de hoofdstad werkt.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historische kern met kerk en markt' },
      { name: 'Kanaalzone', description: 'Gebied in volle transformatie met nieuwbouw' },
      { name: 'Koningslo', description: 'Residentiële wijk richting Brussel' }
    ],
    amenities: {
      transport: ['Station Vilvoorde', '10 min Brussel', 'Nabijheid luchthaven', 'Ring rond Brussel'],
      schools: ['Breed scholenaanbod', 'Meertalig onderwijs'],
      shopping: ['Leuvensestraat', 'Shopping in Brussel dichtbij'],
      leisure: ['Domein Drie Fonteinen', 'Toekomst: waterfront']
    },
    market_appeal: 'Vilvoorde biedt Brusselse nabijheid tegen lagere prijzen. De stadstransformatie creëert kansen voor waardestijging. Ideaal voor pendelaars naar Brussel.'
  },
  'lokeren': {
    sales_content: `Lokeren ligt in het hart van het Waasland, op de grens tussen Oost-Vlaanderen en Antwerpen. De stad biedt een aangename woonomgeving met goede verbindingen naar Gent, Antwerpen en Sint-Niklaas.

De vastgoedmarkt is toegankelijk en divers. Lokeren trekt gezinnen aan die ruimte zoeken in een rustige omgeving. De stad heeft een actieve handelskern en goede voorzieningen.

De Durme en omliggende natuur bieden recreatiemogelijkheden direct aan de deur.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Gezellig stadscentrum met winkels en markt' },
      { name: 'Daknam', description: 'Groene deelgemeente met landelijk karakter' },
      { name: 'Eksaarde', description: 'Rustige woonwijk aan de Moervaart' }
    ],
    amenities: {
      transport: ['Station Lokeren', 'E17 nabijheid', 'Goede busverbindingen'],
      schools: ['Breed scholenaanbod', 'Technisch onderwijs'],
      shopping: ['Kerkstraat', 'Lokale winkels'],
      leisure: ['Molsbroek natuurgebied', 'Durme-oevers', 'Lokerse Feesten']
    },
    market_appeal: 'Lokeren biedt Waaslandse rust met goede bereikbaarheid. Betaalbare prijzen en veel groen maken het aantrekkelijk voor gezinnen die rust zoeken.'
  },
  'beveren': {
    sales_content: `Beveren is de grootste gemeente van het Waasland en biedt een unieke mix van polderdorpen, natuur en nabijheid van de Antwerpse haven. De gemeente ligt strategisch tussen Antwerpen en Gent.

De vastgoedmarkt is divers: van karaktervolle dorpskernen tot moderne nieuwbouwwijken. De prijzen zijn aantrekkelijk gezien de bereikbaarheid. De Waaslandhaven biedt werkgelegenheid in de regio.

Het Waasland is een groene buffer met uitgestrekte polders en het natuurgebied Blokkersdijk.`,
    neighborhoods: [
      { name: 'Beveren-centrum', description: 'Moderne kern met voorzieningen' },
      { name: 'Kallo', description: 'Polderdorp aan de Schelde' },
      { name: 'Melsele', description: 'Residentiële deelgemeente' }
    ],
    amenities: {
      transport: ['Nabijheid E17/E34', 'Bus naar Antwerpen', 'Liefkenshoektunnel'],
      schools: ['Breed scholenaanbod', 'Campus Waasland'],
      shopping: ['Waasland Shopping Center', 'Dorpskernen'],
      leisure: ['Fort Liefkenshoek', 'Blokkersdijk', 'Poldernatuur']
    },
    market_appeal: 'Beveren biedt betaalbare ruimte op een steenworp van Antwerpen. De groene omgeving en goede bereikbaarheid maken het aantrekkelijk voor gezinnen.'
  },
  'tongeren': {
    sales_content: `Tongeren is de oudste stad van België – een plaats waar 2000 jaar geschiedenis voelbaar is. Van Romeinse overblijfselen tot middeleeuws patrimonium: Tongeren ademt cultuur en erfgoed.

De vastgoedmarkt biedt unieke kansen voor wie karaktervolle panden zoekt. De stad combineert historische charme met moderne voorzieningen. De beroemde antiekmarkt trekt bezoekers van heinde en verre.

Tongeren ligt in het glooiende Haspengouw, een vruchtbare streek met fruitboomgaarden en pittoreske dorpen.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historische kern met Basiliek en antiekmarkt' },
      { name: 'Berg', description: 'Residentiële wijk op de helling' },
      { name: 'Widooie', description: 'Groene deelgemeente met dorps karakter' }
    ],
    amenities: {
      transport: ['Station Tongeren', 'E313 nabijheid', 'Bus naar Hasselt/Maastricht'],
      schools: ['Breed scholenaanbod', 'Erfgoedonderwijs'],
      shopping: ['Maastrichterstraat', 'Antiekmarkt (zondag)'],
      leisure: ['Gallo-Romeins Museum', 'Basiliek', 'Pliniusbron', 'Ambiorixbeeld']
    },
    market_appeal: 'Tongeren biedt unieke historische charme in het groene Haspengouw. Karaktervolle panden, culturele rijkdom en rust maken het bijzonder. Interessant voor liefhebbers van erfgoed.'
  },
  'halle': {
    sales_content: `Halle is de poort naar het Pajottenland – een groene regio met glooiende heuvels en pittoreske dorpen. De stad ligt op de taalgrens en biedt uitstekende verbindingen naar Brussel.

De vastgoedmarkt in Halle is stabiel met een mix van stadse woningen en landelijke eigendommen in de omliggende dorpen. De stad trekt pendelaars aan die groen zoeken op korte afstand van de hoofdstad.

Halle is bekend om de Mariaprocessie en heeft een gezellige binnenstad met Brabantse charme.`,
    neighborhoods: [
      { name: 'Centrum', description: 'Historische kern met Basiliek en markt' },
      { name: 'Lembeek', description: 'Groene deelgemeente met industrie' },
      { name: 'Buizingen', description: 'Residentiële wijk met goede bereikbaarheid' }
    ],
    amenities: {
      transport: ['Station Halle', '15 min Brussel-Zuid', 'E19/Ring bereikbaarheid'],
      schools: ['Breed scholenaanbod', 'Tweetalige opties'],
      shopping: ['Basiliekstraat', 'Lokale winkels'],
      leisure: ['Hallerbos (blauwe boshyacinten)', 'Basiliek', 'Pajottenland fietsen']
    },
    market_appeal: 'Halle biedt groene rust op 15 minuten van Brussel. Het Pajottenland en Hallerbos liggen aan de deur. Aantrekkelijk voor wie natuur en stad wil combineren.'
  },
  'knokke-heist': {
    sales_content: `Knokke-Heist is dé premium kustgemeente van België – synoniem voor luxe, kunst en exclusiviteit. Van het mondaine Knokke tot het natuurlijke Zwin: de gemeente biedt het beste van de Belgische kust.

De vastgoedmarkt is de duurste aan de kust maar biedt waardebehoud en prestige. Appartementen aan de zeedijk zijn gewild als tweede verblijf en investering. Het Zoute is het meest exclusieve segment.

Knokke-Heist trekt een koopkrachtig publiek aan en investeert continu in kwaliteit en beleving.`,
    neighborhoods: [
      { name: 'Het Zoute', description: 'Meest exclusieve wijk met villa\'s en luxe appartementen' },
      { name: 'Knokke-centrum', description: 'Mondaine winkelstraten en kunstgalerijen' },
      { name: 'Duinbergen', description: 'Rustiger segment met familiale sfeer' },
      { name: 'Heist', description: 'Authentieke visserssfeer, toegankelijker segment' }
    ],
    amenities: {
      transport: ['Kusttram', 'E40 nabijheid', 'Nabijheid Brugge station', 'Heliport'],
      schools: ['Internationaal aanbod', 'Elitescholen'],
      shopping: ['Lippenslaan', 'Kustlaan', 'Luxe boetieks'],
      leisure: ['Zwin natuurpark', 'Casino', 'Kunstgalerijen', 'Golfclubs', 'Strand']
    },
    market_appeal: 'Knokke-Heist is de meest prestigieuze kustgemeente met bijbehorende prijzen. Investeren hier betekent waardebehoud en status. Ideaal voor wie het beste van de kust zoekt.'
  }
};

async function generateContent() {
  console.log('🤖 Generating content for additional cities...\n');

  for (const [citySlug, content] of Object.entries(cityContent)) {
    const { data: city, error: findError } = await supabase
      .from('cities')
      .select('id, name')
      .eq('slug', citySlug)
      .maybeSingle();

    if (findError || !city) {
      console.log(`⚠️  City ${citySlug} not found`);
      continue;
    }

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

  console.log('\n🎉 Done!');
}

generateContent();
