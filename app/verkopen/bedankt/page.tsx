import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Mail, Phone, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bedankt voor uw inzending | Huizenopkoper.be',
  description: 'Uw pand is succesvol ingediend. We nemen binnen 48 uur contact met u op.',
};

export default function BedanktPage({
  searchParams,
}: {
  searchParams: { leadId?: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12 animate-in fade-in duration-700">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6 animate-in zoom-in duration-500 delay-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Bedankt voor uw inzending!
              </h1>
              <p className="text-lg text-gray-600">
                Uw pand is succesvol ingediend. We gaan direct aan de slag om
                geschikte kopers voor u te vinden.
              </p>
              {searchParams.leadId && (
                <p className="mt-4 text-sm text-gray-500">
                  Referentienummer: <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">{searchParams.leadId.slice(0, 8)}</span>
                </p>
              )}
            </div>

            <Card className="mb-8 animate-in slide-in-from-bottom duration-700 delay-200">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Wat gebeurt er nu?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Binnen 2 uur - Bevestiging
                      </h3>
                      <p className="text-gray-600">
                        U ontvangt een bevestigingsmail met de details van uw inzending.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Binnen 24 uur - Beoordeling
                      </h3>
                      <p className="text-gray-600">
                        Onze experts beoordelen uw pand en selecteren de meest
                        geschikte kopers uit ons netwerk.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Binnen 48 uur - Contact & Aanbod
                      </h3>
                      <p className="text-gray-600">
                        We nemen contact met u op om uw pand te bespreken en u te
                        informeren over de volgende stappen en eventuele aanbiedingen.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-blue-50 border-blue-200 animate-in slide-in-from-bottom duration-700 delay-300">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Vragen of opmerkingen?
                </h2>
                <p className="text-gray-600 mb-4">
                  Aarzel niet om contact met ons op te nemen. We staan klaar om al
                  uw vragen te beantwoorden.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <a
                      href="mailto:info@huizenopkoper.be"
                      className="hover:text-blue-600 transition-colors"
                    >
                      info@huizenopkoper.be
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <a
                      href="tel:+3212345678"
                      className="hover:text-blue-600 transition-colors"
                    >
                      +32 123 45 67 89
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-700 delay-400">
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Terug naar home
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <Link href="/werking">
                  Hoe werkt het?
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
