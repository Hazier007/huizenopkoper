import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookiebeleid | Huizenopkoper.be',
  description: 'Het cookiebeleid van Huizenopkoper.be. Lees hoe wij cookies gebruiken op onze website.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookiebeleid</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-8">
              Laatste update: januari 2026
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Wat zijn cookies?
            </h2>
            <p>
              Cookies zijn kleine tekstbestanden die op uw computer of mobiel apparaat worden
              geplaatst wanneer u een website bezoekt. Cookies worden veel gebruikt om websites
              te laten werken of om ze efficiënter te laten werken, en om informatie te
              verstrekken aan de eigenaren van de site.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Welke cookies gebruiken wij?
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              2.1 Noodzakelijke cookies
            </h3>
            <p>
              Deze cookies zijn essentieel voor het functioneren van onze website. Zonder deze
              cookies kan de website niet goed functioneren. Deze cookies slaan bijvoorbeeld
              geen persoonlijk identificeerbare informatie op.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              2.2 Functionele cookies
            </h3>
            <p>
              Deze cookies stellen de website in staat om verbeterde functionaliteit en
              personalisatie te bieden. Ze kunnen worden ingesteld door ons of door externe
              providers waarvan wij de diensten op onze pagina's hebben toegevoegd.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              2.3 Analytische cookies
            </h3>
            <p>
              Deze cookies helpen ons te begrijpen hoe bezoekers omgaan met onze website door
              anoniem informatie te verzamelen en te rapporteren. Deze informatie helpt ons
              onze website te verbeteren.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Cookies van derden
            </h2>
            <p>
              Sommige cookies op onze website worden geplaatst door diensten van derden die
              op onze pagina's verschijnen. Deze cookies zijn nodig voor het goed functioneren
              van bepaalde functies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Hoe lang blijven cookies op mijn apparaat?
            </h2>
            <p>
              De bewaartermijn van cookies verschilt per type cookie:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Sessiecookies:</strong> Deze cookies vervallen zodra u uw browser sluit
              </li>
              <li>
                <strong>Permanente cookies:</strong> Deze cookies blijven op uw apparaat staan
                totdat ze verlopen of totdat u ze verwijdert
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Cookies beheren
            </h2>
            <p>
              De meeste browsers accepteren cookies automatisch. U kunt uw browser echter
              instellen om cookies te weigeren of u te waarschuwen wanneer een cookie wordt
              verstuurd. Houd er rekening mee dat als u cookies uitschakelt, sommige functies
              van onze website mogelijk niet correct werken.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Cookies verwijderen
            </h3>
            <p>
              U kunt cookies die al op uw apparaat zijn geplaatst op elk moment verwijderen.
              De manier waarop u dit doet, hangt af van uw browser. Raadpleeg de helpfunctie
              van uw browser voor meer informatie.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Wijzigingen in ons cookiebeleid
            </h2>
            <p>
              Wij kunnen dit cookiebeleid van tijd tot tijd wijzigen. Wij raden u aan om deze
              pagina regelmatig te raadplegen voor eventuele wijzigingen. Wijzigingen in dit
              cookiebeleid zijn van kracht wanneer zij op deze pagina zijn gepubliceerd.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Contact
            </h2>
            <p>
              Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op via:
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
