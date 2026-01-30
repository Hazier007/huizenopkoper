export interface ProvinceContentPromptData {
  name: string;
  cities?: string[];
}

export interface CityContentPromptData {
  name: string;
  province: string;
}

export function getProvinceContentPrompt(data: ProvinceContentPromptData): string {
  const citiesList = data.cities && data.cities.length > 0
    ? `Belangrijkste steden in deze provincie: ${data.cities.join(', ')}.`
    : '';

  return `Je bent een expert vastgoedmarketeer die overtuigende sales content schrijft voor een huizenopkoopbedrijf in Nederland.

Schrijf een overtuigende, sales-gerichte pagina over de provincie ${data.name}. ${citiesList}

De content moet:
- Tussen 700-1000 woorden zijn
- Uitleggen waarom woningen in deze provincie goed verkopen
- Belangrijke steden en hun karakteristieken beschrijven
- Transport en verbindingen naar andere regio's benadrukken
- Economische activiteit en werkgelegenheid vermelden
- Leefbaarheid en voorzieningen in de provincie bespreken
- Types kopers die geïnteresseerd zijn beschrijven
- Natuurlijke keyword integratie zoals "woning verkopen ${data.name}", "huis verkopen ${data.name}"

Gebruik HTML formatting:
- <h2> voor hoofdsecties
- <h3> voor subsecties
- <strong> voor belangrijke punten en voordelen
- <em> voor subtiele nadruk
- <ul> en <li> voor bullet points
- <ol> en <li> voor genummerde lijsten
- <p> voor paragrafen

Schrijf in een professionele maar toegankelijke toon, in het Nederlands. Maak het overtuigend en sales-gericht zonder overdreven te zijn.`;
}

export function getCityContentPrompt(data: CityContentPromptData): string {
  return `Je bent een expert vastgoedmarketeer die overtuigende sales content schrijft voor een huizenopkoopbedrijf in Nederland.

Schrijf een overtuigende, sales-gerichte pagina over de stad ${data.name} in provincie ${data.province}.

De content moet:
- Tussen 700-1000 woorden zijn
- Uitleggen waarom woningen in ${data.name} aantrekkelijk zijn voor kopers
- Unieke kenmerken van de stad beschrijven
- Populaire wijken en buurten bespreken
- Scholen en onderwijsmogelijkheden vermelden
- Winkels, restaurants en uitgaansgelegenheden beschrijven
- Openbaar vervoer en bereikbaarheid benadrukken
- Types woningen en doelgroepen bespreken
- Natuurlijke keyword integratie zoals "woning verkopen ${data.name}", "huis verkopen ${data.name}"

Gebruik HTML formatting:
- <h2> voor hoofdsecties
- <h3> voor subsecties
- <strong> voor belangrijke punten en voordelen
- <em> voor subtiele nadruk
- <ul> en <li> voor bullet points
- <ol> en <li> voor genummerde lijsten
- <p> voor paragrafen

Schrijf in een professionele maar toegankelijke toon, in het Nederlands. Maak het overtuigend en sales-gericht zonder overdreven te zijn.`;
}

export function getHighlightsPrompt(location: string, type: 'province' | 'city'): string {
  return `Geef 5-7 belangrijke selling points voor ${location} als ${type === 'province' ? 'provincie' : 'stad'}.

Retourneer alleen een JSON array van strings, bijvoorbeeld:
["Uitstekende bereikbaarheid via A2 en A12", "Sterke arbeidsmarkt in technologie en logistiek", "Populaire woonlocatie voor jonge gezinnen"]

Geen extra tekst, alleen de JSON array.`;
}

export function getNeighborhoodsPrompt(cityName: string): string {
  return `Geef 4-6 populaire wijken of buurten in ${cityName} met korte beschrijvingen.

Retourneer alleen een JSON array van objecten in dit formaat:
[
  {"name": "Wijknaam", "description": "Korte beschrijving van de wijk"}
]

Geen extra tekst, alleen de JSON array.`;
}

export function getAmenitiesPrompt(cityName: string): string {
  return `Geef belangrijke voorzieningen in ${cityName}, georganiseerd in categorieën.

Retourneer alleen een JSON object in dit formaat:
{
  "schools": ["School naam 1", "School naam 2"],
  "transport": ["Transport optie 1", "Transport optie 2"],
  "shopping": ["Winkel gebied 1", "Winkel gebied 2"],
  "leisure": ["Recreatie optie 1", "Recreatie optie 2"]
}

Geen extra tekst, alleen het JSON object.`;
}
