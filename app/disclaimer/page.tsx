import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Huizenopkoper.be',
  description: 'De disclaimer van Huizenopkoper.be. Algemene voorwaarden en aansprakelijkheid.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-8">
              Laatste update: januari 2026
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Algemeen
            </h2>
            <p>
              Deze disclaimer is van toepassing op de website www.huizenopkoper.be. Door gebruik
              te maken van deze website aanvaardt u deze disclaimer. Huizenopkoper.be behoudt
              zich het recht voor om deze disclaimer te allen tijde aan te passen.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Informatie op de website
            </h2>
            <p>
              Huizenopkoper.be streeft ernaar om de informatie op deze website zo nauwkeurig
              mogelijk te houden. Desondanks kunnen er onjuistheden voorkomen. Indien bepaalde
              informatie onjuistheden bevat, of indien bepaalde informatie op of via de site
              niet beschikbaar is, zal Huizenopkoper.be de grootst mogelijke inspanning leveren
              om dit zo snel mogelijk recht te zetten.
            </p>
            <p>
              Huizenopkoper.be kan echter niet aansprakelijk worden gesteld voor directe of
              indirecte schade die ontstaat door het gebruik van de informatie op deze website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Vrijblijvend bod
            </h2>
            <p>
              Alle biedingen door Huizenopkoper.be zijn vrijblijvend. U bent niet verplicht
              om een bod te accepteren. Een bod van Huizenopkoper.be houdt geen verplichting
              in tot aankoop zonder wederzijdse schriftelijke overeenkomst.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Prijsindicaties
            </h2>
            <p>
              Eventuele prijsindicaties op deze website zijn gebaseerd op beschikbare informatie
              en kunnen afwijken van het uiteindelijke bod. Het definitieve bod wordt opgesteld
              na volledige evaluatie van het pand.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Links naar andere websites
            </h2>
            <p>
              Deze website kan links bevatten naar andere websites. Huizenopkoper.be is niet
              verantwoordelijk voor de inhoud van deze websites en aanvaardt geen enkele
              aansprakelijkheid voor materiaal op externe websites waarnaar wordt gelinkt.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Intellectuele eigendom
            </h2>
            <p>
              Alle rechten van intellectuele eigendom met betrekking tot deze website en de
              daarop aangeboden informatie berusten bij Huizenopkoper.be. Het kopiëren,
              verspreiden en elk ander gebruik van deze materialen is niet toegestaan zonder
              schriftelijke toestemming van Huizenopkoper.be.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Aansprakelijkheid
            </h2>
            <p>
              Huizenopkoper.be is niet aansprakelijk voor enige directe of indirecte schade,
              van welke aard dan ook, die voortvloeit uit of in enig opzicht verband houdt
              met het gebruik van deze website of met de tijdelijke onmogelijkheid om deze
              website te kunnen raadplegen.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Toepasselijk recht
            </h2>
            <p>
              Op deze disclaimer is uitsluitend het Belgisch recht van toepassing. Eventuele
              geschillen die voortvloeien uit of verband houden met deze disclaimer zullen
              worden voorgelegd aan de bevoegde rechtbank in België.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Contact
            </h2>
            <p>
              Voor vragen of opmerkingen over deze disclaimer kunt u contact met ons opnemen via:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>E-mail: info@huizenopkoper.be</li>
              <li>Telefoon: +32 123 45 67 89</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
