import { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Huizenopkoper.be',
  description: 'Neem contact op met Huizenopkoper.be. Wij staan klaar om al uw vragen te beantwoorden over de verkoop van uw woning.',
  openGraph: {
    title: 'Contact | Huizenopkoper.be',
    description: 'Neem contact op met Huizenopkoper.be voor al uw vragen over woningverkoop.',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Neem contact op
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Heeft u vragen? Wij helpen u graag verder.
              Neem gerust contact met ons op.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    E-mail
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stuur ons een e-mail en wij reageren binnen 24 uur.
                  </p>
                  <a
                    href="mailto:info@huizenopkoper.be"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    info@huizenopkoper.be
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Telefoon
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bel ons voor een vrijblijvend gesprek.
                  </p>
                  <a
                    href="tel:+32123456789"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    +32 123 45 67 89
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Openingsuren
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Ma - Vr: 9:00 - 18:00</p>
                    <p>Za: 10:00 - 16:00</p>
                    <p>Zo: Gesloten</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Werkgebied
                    </h3>
                    <p className="text-gray-600">
                      Wij zijn actief in heel België. Van Antwerpen tot Luxemburg,
                      van West-Vlaanderen tot Limburg. Overal waar u een woning
                      wilt verkopen, zijn wij er voor u.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Veelgestelde vragen
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Hoe snel ontvang ik een bod?
                  </h3>
                  <p className="text-gray-600">
                    Na het indienen van uw pand nemen wij binnen 48 uur contact
                    met u op. Na een eventuele bezichtiging ontvangt u direct
                    ons bod.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Zijn er kosten verbonden aan jullie diensten?
                  </h3>
                  <p className="text-gray-600">
                    Nee, onze diensten zijn volledig gratis. Er zijn geen
                    makelaarskosten, geen advertentiekosten en geen verborgen
                    kosten. Het bod dat u ontvangt is het bedrag dat u ontvangt.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Moet ik jullie bod accepteren?
                  </h3>
                  <p className="text-gray-600">
                    Nee, ons bod is 100% vrijblijvend. U beslist zelf of u ons
                    bod accepteert. Er is geen druk en geen verplichting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welke types panden kopen jullie?
                  </h3>
                  <p className="text-gray-600">
                    Wij kopen alle types vastgoed: eengezinswoningen,
                    appartementen, bouwgrond, commerciële panden en meer.
                    Ook panden in slechte staat of met problemen zijn welkom.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    In welke regio's zijn jullie actief?
                  </h3>
                  <p className="text-gray-600">
                    Wij zijn actief in heel België. Van Antwerpen tot Namen,
                    van Brugge tot Luik. Waar u ook bent, wij komen graag
                    uw pand bekijken.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Liever direct een bod ontvangen?"
        description="Dien uw pand in via ons online formulier en ontvang binnen 48 uur een vrijblijvend bod."
      />
    </>
  );
}
