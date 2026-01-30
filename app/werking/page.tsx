import { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, FileText, MessageSquare, TrendingUp, Home, Euro, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hoe werkt het? | Huizenopkoper.be',
  description: 'Ontdek hoe eenvoudig het is om uw woning te verkopen via Huizenopkoper.be. In 4 stappen van indienen tot verkocht.',
  openGraph: {
    title: 'Hoe werkt het? | Huizenopkoper.be',
    description: 'Ontdek hoe eenvoudig het is om uw woning te verkopen via Huizenopkoper.be.',
  },
};

export default function WerkingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Hoe werkt het?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Van pand indienen tot verkocht in 4 eenvoudige stappen.
              Geen gedoe, volledig transparant.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-12">
              <div className="flex gap-8 flex-col md:flex-row items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Dien uw pand in
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    Vul ons eenvoudig online formulier in met de basisgegevens van uw woning.
                    Upload enkele foto's en vertel ons wat meer over het pand.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Formulier invullen duurt slechts 5 minuten</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Upload foto's direct vanuit uw browser</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Volledig vrijblijvend, geen verplichtingen</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-8 flex-col md:flex-row items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Wij nemen contact op
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    Binnen 48 uur nemen wij contact met u op. Wij stellen eventueel nog enkele
                    vragen en plannen een bezichtiging in (indien nodig).
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Snelle eerste reactie binnen 48 uur</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Persoonlijk contact via telefoon of e-mail</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Flexibele bezichtiging op een moment dat u uitkomt</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-8 flex-col md:flex-row items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      U ontvangt een bod
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    Na de bezichtiging en evaluatie maken wij een eerlijk en transparant bod
                    op uw woning. Geen verrassingen, alles is duidelijk uitgelegd.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Eerlijk marktconform bod</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Volledig transparant, geen verborgen kosten</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Vrijblijvend, u beslist of u ons bod accepteert</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-8 flex-col md:flex-row items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Snelle afhandeling
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    Akkoord met ons bod? Dan regelen wij een snelle en discrete afhandeling.
                    Wij nemen alle administratie uit handen en zorgen voor een vlot verloop.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Snelle afhandeling via notaris</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Wij regelen alle administratie</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>U ontvangt het geld snel op uw rekening</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Onze voordelen
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Waarom kiezen duizenden Belgen voor Huizenopkoper.be?
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Supersnel
                </h3>
                <p className="text-gray-600">
                  Reactie binnen 48 uur. Geen maanden wachten zoals bij een traditionele verkoop.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Euro className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Geen kosten
                </h3>
                <p className="text-gray-600">
                  Geen makelaarskosten, geen advertentiekosten. Wat u ziet is wat u krijgt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Betrouwbaar
                </h3>
                <p className="text-gray-600">
                  Transparant proces met duidelijke afspraken. Geen verrassingen achteraf.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Home className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Alle types
                </h3>
                <p className="text-gray-600">
                  Wij kopen huizen, appartementen, bouwgrond en commerciële panden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vrijblijvend
                </h3>
                <p className="text-gray-600">
                  Ons bod is 100% vrijblijvend. Geen druk, u beslist zelf.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Persoonlijk contact
                </h3>
                <p className="text-gray-600">
                  Direct contact met onze specialisten. Geen callcenters of bots.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
