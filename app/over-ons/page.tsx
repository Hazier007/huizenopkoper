import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  Award,
  MapPin,
  Phone,
  Mail,
  Home
} from 'lucide-react';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Over Ons | Huizenopkoper.be - Betrouwbare Woningopkoop in België',
  description: 'Leer meer over Huizenopkoper.be. Wij zijn een betrouwbaar Belgisch bedrijf gespecialiseerd in snelle en eerlijke woningaankoop. Transparant, discreet en zonder verrassingen.',
  alternates: {
    canonical: 'https://huizenopkoper.be/over-ons',
  },
};

export default function OverOnsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Building2 className="w-3 h-3 mr-1" />
              Over Huizenopkoper.be
            </Badge>

            <h1 className="text-4xl font-bold text-white md:text-6xl mb-6 leading-tight">
              Uw betrouwbare partner voor woningverkoop
            </h1>

            <p className="mt-6 text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              Wij zijn een Belgisch bedrijf gespecialiseerd in de snelle en eerlijke aankoop van woningen. 
              Transparant, discreet en altijd met respect voor uw situatie.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Onze Missie */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-700">
                  Onze Missie
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-6">
                  Woningverkoop zonder stress
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Wij geloven dat het verkopen van uw woning niet ingewikkeld hoeft te zijn. 
                  Daarom bieden wij een alternatief voor de traditionele makelaar: snel, eerlijk en zonder verrassingen.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Of u nu snel wilt verkopen door een scheiding, erfenis, financiële redenen of gewoon 
                  omdat u geen zin heeft in maandenlange onzekerheid – wij staan voor u klaar.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Geen makelaarskosten</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Geen eindeloze bezichtigingen</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Geen onzekerheid over de verkoop</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-green-600 mb-2">48u</div>
                    <div className="text-sm text-gray-600">Reactietijd</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600">Vrijblijvend</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-green-600 mb-2">€0</div>
                    <div className="text-sm text-gray-600">Kosten voor u</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-green-600 mb-2">3-4w</div>
                    <div className="text-sm text-gray-600">Tot verkoop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Waarden */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-700">
                Onze Waarden
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Waar wij voor staan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Onze kernwaarden bepalen hoe wij werken en hoe wij met u omgaan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Transparantie</h3>
                  <p className="text-gray-600">
                    Geen verborgen kosten, geen kleine lettertjes. Wat wij bieden, is wat u krijgt. 
                    Wij leggen alles helder uit.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Respect</h3>
                  <p className="text-gray-600">
                    Wij begrijpen dat het verkopen van een woning emotioneel kan zijn. 
                    Wij behandelen elke situatie met respect en discretie.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Eerlijkheid</h3>
                  <p className="text-gray-600">
                    Wij geven eerlijke biedingen gebaseerd op de werkelijke marktwaarde. 
                    Geen druk, geen verplichtingen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Werkgebied */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-700">
                <MapPin className="w-3 h-3 mr-1" />
                Werkgebied
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Actief in heel Vlaanderen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Wij kopen woningen in alle Vlaamse provincies en gemeenten.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Antwerpen', 'Limburg', 'Oost-Vlaanderen', 'Vlaams-Brabant', 'West-Vlaanderen'].map((provincie) => (
                <Link 
                  key={provincie}
                  href={`/provincie/${provincie.toLowerCase().replace(' ', '-').replace('oost-', 'oost-').replace('west-', 'west-').replace('vlaams-', 'vlaams-')}`}
                  className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-100 hover:border-green-500 transition-all text-center hover:shadow-lg"
                >
                  <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-900">{provincie}</span>
                </Link>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8">
              Van grote steden als Antwerpen, Gent en Brugge tot kleinere gemeenten – wij komen overal.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-700">
                Contact
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Neem contact met ons op
              </h2>
              <p className="text-lg text-gray-600">
                Heeft u vragen? Wij helpen u graag verder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Direct contact</h3>
                  <div className="space-y-4">
                    <a href="tel:+32XXXXXXXXX" className="flex items-center gap-4 text-gray-600 hover:text-green-600 transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Telefoon</div>
                        <div>+32 XXX XX XX XX</div>
                      </div>
                    </a>
                    <a href="mailto:info@huizenopkoper.be" className="flex items-center gap-4 text-gray-600 hover:text-green-600 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">E-mail</div>
                        <div>info@huizenopkoper.be</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-green-600 to-green-700 text-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Liever direct een bod?</h3>
                  <p className="text-green-100 mb-6">
                    Dien uw woning in via ons formulier en ontvang binnen 48 uur een vrijblijvend bod.
                  </p>
                  <Button asChild size="lg" variant="secondary" className="w-full">
                    <Link href="/verkopen">
                      <Home className="w-5 h-5 mr-2" />
                      Pand indienen
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Klaar om uw woning te verkopen?"
        description="Dien uw pand in en ontvang binnen 48 uur een vrijblijvend bod."
      />
    </>
  );
}
