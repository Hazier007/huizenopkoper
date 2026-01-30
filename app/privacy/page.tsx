import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid | Huizenopkoper.be',
  description: 'Het privacybeleid van Huizenopkoper.be. Lees hoe wij omgaan met uw persoonlijke gegevens.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacybeleid</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-8">
              Laatste update: januari 2026
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Inleiding
            </h2>
            <p>
              Huizenopkoper.be hecht veel waarde aan de bescherming van uw persoonsgegevens.
              In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij
              deze verzamelen en hoe wij deze gebruiken.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Welke gegevens verzamelen wij?
            </h2>
            <p>Wij verzamelen de volgende persoonsgegevens:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
              <li>Adresgegevens van het te verkopen pand</li>
              <li>Informatie over uw woning (type, omschrijving, foto's)</li>
              <li>Communicatie tussen u en Huizenopkoper.be</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Waarvoor gebruiken wij uw gegevens?
            </h2>
            <p>Wij gebruiken uw persoonsgegevens voor de volgende doeleinden:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Het behandelen van uw aanvraag tot verkoop van uw woning</li>
              <li>Contact opnemen met u over uw aanvraag</li>
              <li>Het opstellen en versturen van een bod</li>
              <li>Het verwerken van de verkoop indien u ons bod accepteert</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Hoe lang bewaren wij uw gegevens?
            </h2>
            <p>
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden
              waarvoor zij zijn verzameld. Na afloop van een transactie bewaren wij uw gegevens
              voor de wettelijk verplichte termijn.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Delen wij uw gegevens met derden?
            </h2>
            <p>
              Wij delen uw persoonsgegevens niet met derden, behalve wanneer dit noodzakelijk
              is voor het uitvoeren van de overeenkomst (bijvoorbeeld met een notaris) of
              wanneer wij hiertoe wettelijk verplicht zijn.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Beveiliging
            </h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw
              persoonsgegevens te beschermen tegen verlies, misbruik, ongeautoriseerde
              toegang en ongewenste openbaarmaking.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Uw rechten
            </h2>
            <p>U heeft het recht om:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Inzage te vragen in uw persoonsgegevens</li>
              <li>Uw persoonsgegevens te laten corrigeren of aanvullen</li>
              <li>Uw persoonsgegevens te laten verwijderen</li>
              <li>Bezwaar te maken tegen de verwerking van uw gegevens</li>
              <li>Uw gegevens over te dragen naar een andere partij</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Contact
            </h2>
            <p>
              Heeft u vragen over ons privacybeleid of wilt u gebruik maken van uw rechten?
              Neem dan contact met ons op via:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>E-mail: info@huizenopkoper.be</li>
              <li>Telefoon: +32 123 45 67 89</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Wijzigingen
            </h2>
            <p>
              Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De laatste versie
              is altijd te vinden op deze pagina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
