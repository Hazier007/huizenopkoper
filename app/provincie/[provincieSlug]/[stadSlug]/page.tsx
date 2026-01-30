import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Home, Clock, CheckCircle, TrendingUp, Award, Phone, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { FAQSection } from '@/components/FAQSection';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import { cityFAQs } from '@/data/faq-data';
import SalesContentSection from '@/components/content/SalesContentSection';
import NeighborhoodCards from '@/components/content/NeighborhoodCards';
import AmenitiesGrid from '@/components/content/AmenitiesGrid';
import MarketInsightBox from '@/components/content/MarketInsightBox';

export const revalidate = 3600;

interface Province {
  id: string;
  name: string;
  slug: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  province_id: string;
  sales_content: string | null;
  neighborhoods: Array<{ name: string; description: string }> | null;
  amenities: {
    schools?: string[];
    transport?: string[];
    shopping?: string[];
    leisure?: string[];
  } | null;
  market_appeal: string | null;
}

async function getProvince(slug: string): Promise<Province | null> {
  const { data } = await supabase
    .from('provinces')
    .select('id, name, slug')
    .eq('slug', slug)
    .maybeSingle();

  return data;
}

async function getCity(provinceId: string, citySlug: string): Promise<City | null> {
  const { data } = await supabase
    .from('cities')
    .select('*')
    .eq('province_id', provinceId)
    .eq('slug', citySlug)
    .maybeSingle();

  return data;
}

async function getNearbyCities(provinceId: string, currentCityId: string, limit = 6): Promise<City[]> {
  const { data } = await supabase
    .from('cities')
    .select('*')
    .eq('province_id', provinceId)
    .neq('id', currentCityId)
    .limit(limit);

  return data || [];
}

export async function generateMetadata({
  params,
}: {
  params: { provincieSlug: string; stadSlug: string };
}): Promise<Metadata> {
  const province = await getProvince(params.provincieSlug);

  if (!province) {
    return { title: 'Niet gevonden' };
  }

  const city = await getCity(province.id, params.stadSlug);

  if (!city) {
    return { title: 'Stad niet gevonden' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huizenopkoper.be';
  const canonicalUrl = `${siteUrl}/provincie/${params.provincieSlug}/${params.stadSlug}`;

  return {
    title: `Huizen opkoper ${city.name} | Vrijblijvend bod binnen 48 uur`,
    description: city.description || `Woning verkopen in ${city.name}, ${province.name}? Wij kopen huizen en appartementen in ${city.name}. Snelle afhandeling, geen makelaarskosten. Ontvang binnen 48 uur een eerlijk en vrijblijvend bod.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Huizen opkoper ${city.name} | Vrijblijvend bod binnen 48 uur`,
      description: city.description || `Woning verkopen in ${city.name}? Snelle afhandeling zonder makelaarskosten.`,
      url: canonicalUrl,
      siteName: 'Huizenopkoper.be',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const { data: cities } = await supabase
    .from('cities')
    .select('slug, province_id, provinces!inner(slug)');

  return (cities || []).map((city: any) => ({
    provincieSlug: city.provinces.slug,
    stadSlug: city.slug,
  }));
}

export default async function StadPage({
  params,
}: {
  params: { provincieSlug: string; stadSlug: string };
}) {
  const province = await getProvince(params.provincieSlug);

  if (!province) {
    notFound();
  }

  const city = await getCity(province.id, params.stadSlug);

  if (!city) {
    notFound();
  }

  const nearbyCities = await getNearbyCities(province.id, city.id);
  const faqs = cityFAQs(city.name, province.name);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huizenopkoper.be';

  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: province.name, url: `${siteUrl}/provincie/${params.provincieSlug}` },
    { name: city.name, url: `${siteUrl}/provincie/${params.provincieSlug}/${params.stadSlug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd faqs={faqs} />

      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl">
            <Button asChild variant="ghost" className="mb-8 text-white hover:text-white hover:bg-white/20 border-white/30">
              <Link href={`/provincie/${params.provincieSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug naar {province.name}
              </Link>
            </Button>

            <div className="text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
                <MapPin className="w-3 h-3 mr-1" />
                {city.name}, {province.name}
              </Badge>

              <h1 className="text-4xl font-bold text-white md:text-6xl mb-6 leading-tight">
                Huizen opkoper {city.name}
              </h1>

              <p className="mt-6 text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
                {city.description || `Wij kopen uw woning in ${city.name}, ${province.name}. Ontvang binnen 48 uur een eerlijk en vrijblijvend bod.`}
              </p>

              <div className="flex flex-wrap gap-4 justify-center mt-10">
                <Link
                  href="/verkopen"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Direct een bod ontvangen
                </Link>
                <Link
                  href="/werking"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Hoe werkt het?
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                  <Clock className="w-7 h-7 text-white mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">48 uur</div>
                  <div className="text-xs text-green-100 mt-1">Reactietijd</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                  <CheckCircle className="w-7 h-7 text-white mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">Vrijblijvend</div>
                  <div className="text-xs text-green-100 mt-1">Geen verplichting</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                  <Award className="w-7 h-7 text-white mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">€0 kosten</div>
                  <div className="text-xs text-green-100 mt-1">Voor u</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                  <Building2 className="w-7 h-7 text-white mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">Alle types</div>
                  <div className="text-xs text-green-100 mt-1">Woningen</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {city.market_appeal && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <MarketInsightBox
                content={city.market_appeal}
                title={`Waarom uw woning in ${city.name} verkopen?`}
              />
            </div>
          </div>
        </section>
      )}

      {city.sales_content && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  Ontdek {city.name}
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
                  Wonen in {city.name}
                </h2>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                <SalesContentSection content={city.sales_content} />
              </div>

              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mb-12">
                  <NeighborhoodCards
                    neighborhoods={city.neighborhoods}
                    title="Populaire wijken en buurten"
                  />
                </div>
              )}

              {city.amenities && Object.keys(city.amenities).length > 0 && (
                <AmenitiesGrid
                  amenities={city.amenities}
                  title={`Voorzieningen in ${city.name}`}
                />
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
                Uw woning verkopen in {city.name}?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Bent u op zoek naar een snelle en betrouwbare manier om uw woning in {city.name} te verkopen? Wij bieden een transparante en efficiënte oplossing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl border-2 border-gray-200 mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Hoe werkt het?
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Dien uw pand in</h4>
                      <p className="text-gray-600 text-sm">
                        Vul ons online formulier in met de basisgegevens van uw woning in {city.name}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Wij nemen contact op</h4>
                      <p className="text-gray-600 text-sm">
                        Binnen 48 uur nemen wij contact met u op voor meer informatie.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">U ontvangt een bod</h4>
                      <p className="text-gray-600 text-sm">
                        Na evaluatie ontvangt u een eerlijk en transparant bod op uw woning.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Snelle afhandeling</h4>
                      <p className="text-gray-600 text-sm">
                        Akkoord? Dan regelen wij een snelle afhandeling via de notaris.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Snelle reactie</h4>
                    <p className="text-gray-600">Binnen 48 uur nemen wij contact met u op.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Geen kosten</h4>
                    <p className="text-gray-600">Geen makelaarskosten, geen advertentiekosten. Het bod dat u ontvangt is wat u krijgt.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Vrijblijvend</h4>
                    <p className="text-gray-600">Ons bod is 100% vrijblijvend. U beslist zelf of u het accepteert.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Alle types woningen</h4>
                    <p className="text-gray-600">Wij kopen huizen, appartementen, studio's en meer in {city.name}.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Elke staat</h4>
                    <p className="text-gray-600">Ook woningen die opknapwerk nodig hebben zijn welkom.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Ook in de omgeving</h4>
                    <p className="text-gray-600">Of u nu in het centrum van {city.name} woont of in een rustigere wijk daarbuiten.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <Link href="/verkopen">
                  <Home className="w-5 h-5 mr-2" />
                  Pand indienen
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">100% vrijblijvend • Geen kosten • Binnen 48 uur antwoord</p>
            </div>
          </div>
        </div>
      </section>

      {nearbyCities.length > 0 && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  Ook actief in de omgeving
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                  Actief in {city.name} en omgeving
                </h3>
                <p className="text-lg text-gray-600">
                  Bekijk ook onze diensten in nabijgelegen steden
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.id}
                    href={`/provincie/${params.provincieSlug}/${nearbyCity.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-green-500 bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg truncate">
                              {nearbyCity.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 group-hover:text-green-600 transition-colors flex items-center gap-1">
                              Bekijk details
                              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <FAQSection
        faqs={faqs}
        title={`Veelgestelde vragen over woning verkopen in ${city.name}`}
        description="Hier vindt u antwoorden op de meest gestelde vragen over het verkopen van uw woning."
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
              Gerelateerde diensten
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Ontdek meer over onze diensten en werkwijze
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/verkopen"
                className="group p-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:from-blue-100 hover:to-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-2xl">Pand indienen</h3>
                <p className="text-gray-600">
                  Start nu met het indienen van uw pand en ontvang binnen 48 uur een vrijblijvend bod
                </p>
              </Link>
              <Link
                href="/werking"
                className="group p-10 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:from-green-100 hover:to-green-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-2xl">Hoe werkt het?</h3>
                <p className="text-gray-600">
                  Lees meer over ons proces en ontdek hoe gemakkelijk het verkopen van uw woning kan zijn
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Woning verkopen in ${city.name}?`}
        description="Dien uw pand in en ontvang binnen 48 uur een vrijblijvend bod."
      />
    </>
  );
}
