import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Clock, CheckCircle, TrendingUp, Award, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { FAQSection } from '@/components/FAQSection';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import { provinceFAQs } from '@/data/faq-data';
import SalesContentSection from '@/components/content/SalesContentSection';
import HighlightsList from '@/components/content/HighlightsList';

export const revalidate = 3600;

interface Province {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sales_content: string | null;
  market_highlights: string[] | null;
  area_features: Record<string, string[]> | null;
}

interface City {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

async function getProvince(slug: string): Promise<Province | null> {
  const { data } = await supabase
    .from('provinces')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  return data;
}

async function getCities(provinceId: string): Promise<City[]> {
  const { data } = await supabase
    .from('cities')
    .select('*')
    .eq('province_id', provinceId)
    .order('name');

  return data || [];
}

export async function generateMetadata({
  params,
}: {
  params: { provincieSlug: string };
}): Promise<Metadata> {
  const province = await getProvince(params.provincieSlug);

  if (!province) {
    return {
      title: 'Provincie niet gevonden',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huizenopkoper.be';
  const canonicalUrl = `${siteUrl}/provincie/${params.provincieSlug}`;

  return {
    title: `Huizen opkoper in ${province.name} | Vrijblijvend bod binnen 48 uur`,
    description: province.description || `Woning verkopen in ${province.name}? Wij kopen huizen en appartementen in alle steden van ${province.name}. Snelle afhandeling zonder makelaarskosten. Ontvang binnen 48 uur een eerlijk en vrijblijvend bod.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Huizen opkoper in ${province.name} | Vrijblijvend bod binnen 48 uur`,
      description: province.description || `Woning verkopen in ${province.name}? Snelle afhandeling zonder makelaarskosten.`,
      url: canonicalUrl,
      siteName: 'Huizenopkoper.be',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const { data: provinces } = await supabase
    .from('provinces')
    .select('slug');

  return (provinces || []).map((province: { slug: string }) => ({
    provincieSlug: province.slug,
  }));
}

export default async function ProvinciePage({
  params,
}: {
  params: { provincieSlug: string };
}) {
  const province = await getProvince(params.provincieSlug);

  if (!province) {
    notFound();
  }

  const cities = await getCities(province.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huizenopkoper.be';

  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: province.name, url: `${siteUrl}/provincie/${params.provincieSlug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd faqs={provinceFAQs} />

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <MapPin className="w-3 h-3 mr-1" />
              {province.name}
            </Badge>

            <h1 className="text-4xl font-bold text-white md:text-6xl mb-6 leading-tight">
              Huizen opkoper in {province.name}
            </h1>

            <p className="mt-6 text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed">
              {province.description || `Wij kopen uw woning in ${province.name}. Ontvang binnen 48 uur een eerlijk en vrijblijvend bod.`}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Link
                href="/verkopen"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Pand indienen
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact opnemen
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">48 uur</div>
                <div className="text-sm text-blue-100 mt-1">Snelle reactie</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <CheckCircle className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-blue-100 mt-1">Vrijblijvend</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">Geen kosten</div>
                <div className="text-sm text-blue-100 mt-1">Voor u</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Actief in {cities.length} steden
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
                Steden in {province.name}
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Wij zijn actief in alle steden en gemeenten. Klik op uw stad voor meer informatie.
              </p>
            </div>

            {cities.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/provincie/${params.provincieSlug}/${city.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-blue-500 bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg truncate">
                              {city.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 group-hover:text-blue-600 transition-colors flex items-center gap-1">
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
            ) : (
              <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-dashed">
                <CardContent className="py-16 text-center">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    Er zijn nog geen steden toegevoegd voor deze provincie.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
                Waarom kiezen voor ons in {province.name}?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                De voordelen van verkopen via Huizenopkoper.be
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Snel en zonder gedoe
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Bij een traditionele verkoop via een makelaar kan het maanden duren. Wij doen het anders: binnen 48 uur na uw aanvraag nemen wij contact met u op en ontvangt u een eerlijk bod.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Geen kosten
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Bij een verkoop via een makelaar betaalt u vaak hoge commissiekosten. Bij ons niet! Ons bod is het bedrag dat u daadwerkelijk ontvangt. Geen makelaarskosten, geen advertentiekosten.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Alle types woningen
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Of u nu een eengezinswoning, appartement of bungalow wilt verkopen in {province.name}, wij zijn geïnteresseerd. Ook woningen die opknapwerk nodig hebben zijn welkom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {province.sales_content && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  Wonen in {province.name}
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
                  Wonen en leven in {province.name}
                </h2>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                <SalesContentSection content={province.sales_content} />
              </div>

              {province.market_highlights && province.market_highlights.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 md:p-12 border-2 border-blue-100">
                  <HighlightsList
                    highlights={province.market_highlights}
                    title="Belangrijkste voordelen"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <FAQSection
        faqs={provinceFAQs}
        title="Veelgestelde vragen"
        description="Hier vindt u antwoorden op de meest gestelde vragen over het verkopen van uw woning."
      />

      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
              Meer informatie
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Ontdek meer over onze diensten en werkwijze
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/verkopen"
                className="group p-8 bg-white rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-white border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors">
                  <Home className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Pand indienen</h3>
                <p className="text-sm text-gray-600">
                  Start nu met het indienen van uw pand
                </p>
              </Link>
              <Link
                href="/werking"
                className="group p-8 bg-white rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-white border-2 border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Hoe werkt het?</h3>
                <p className="text-sm text-gray-600">
                  Lees meer over ons proces
                </p>
              </Link>
              <Link
                href="/contact"
                className="group p-8 bg-white rounded-xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-white border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors">
                  <Phone className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Contact</h3>
                <p className="text-sm text-gray-600">
                  Neem contact met ons op
                </p>
              </Link>
              <Link
                href="/disclaimer"
                className="group p-8 bg-white rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-white border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-500 rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors">
                  <Award className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Disclaimer</h3>
                <p className="text-sm text-gray-600">
                  Lees onze voorwaarden
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Uw woning in ${province.name} verkopen?`}
        description="Dien uw pand in en ontvang binnen 48 uur een vrijblijvend bod."
      />
    </>
  );
}
