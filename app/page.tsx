import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import {
  Clock,
  CheckCircle2,
  Euro,
  Shield,
  FileText,
  MessageSquare,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import LiquidEther from '@/components/effects/LiquidEther';

export const revalidate = 3600;

interface Province {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

async function getProvinces(): Promise<Province[]> {
  const { data: provinces } = await supabase
    .from('provinces')
    .select('*')
    .order('name');

  return provinces || [];
}

export default async function HomePage() {
  const provinces = await getProvinces();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#2563eb', '#60a5fa', '#3b82f6', '#1e40af']}
            mouseForce={25}
            cursorSize={120}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={1.8}
            autoResumeDelay={3000}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <span>Snel, transparant en betrouwbaar</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Uw woning verkopen?{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Wij kopen het.
              </span>
            </h1>
            <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ontvang binnen 48 uur een eerlijk en vrijblijvend bod. Geen makelaarskosten,
              geen gedoe. Wij maken het verschil.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl shadow-blue-500/50 text-lg px-8 py-6 h-auto font-semibold"
              >
                <Link href="/verkopen">Pand indienen →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-lg px-8 py-6 h-auto"
              >
                <Link href="/werking">Hoe werkt het?</Link>
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">48u</div>
                  <div className="text-sm text-blue-200">Snelle reactie</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-blue-200">Vrijblijvend</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">0€</div>
                  <div className="text-sm text-blue-200">Geen kosten</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Waarom kiezen voor ons?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Betrouwbaar, transparant en snel
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group relative overflow-hidden border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <CardContent className="relative pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Snelle afhandeling
                </h3>
                <p className="mt-2 text-gray-600">
                  Ontvang binnen 48 uur een eerlijk bod op uw woning.
                  Geen weken wachten.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <CardContent className="relative pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
                  <Euro className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Eerlijke prijs
                </h3>
                <p className="mt-2 text-gray-600">
                  Wij bieden een reële marktprijs voor uw pand.
                  Transparant en eerlijk.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <CardContent className="relative pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Geen kosten
                </h3>
                <p className="mt-2 text-gray-600">
                  Geen makelaarskosten, geen verborgen kosten.
                  Wat u ziet is wat u krijgt.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <CardContent className="relative pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  100% vrijblijvend
                </h3>
                <p className="mt-2 text-gray-600">
                  Ons bod is volledig vrijblijvend.
                  Geen verplichtingen, geen druk.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Hoe werkt het?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              In 4 eenvoudige stappen naar een verkocht pand
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  1
                </div>
                <FileText className="mt-4 h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Dien uw pand in
                </h3>
                <p className="mt-2 text-gray-600">
                  Vul ons online formulier in met de details van uw woning
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  2
                </div>
                <MessageSquare className="mt-4 h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Wij nemen contact op
                </h3>
                <p className="mt-2 text-gray-600">
                  Binnen 48 uur nemen wij contact met u op voor meer info
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  3
                </div>
                <TrendingUp className="mt-4 h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  U ontvangt een bod
                </h3>
                <p className="mt-2 text-gray-600">
                  Wij maken een eerlijk en vrijblijvend bod op uw woning
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  4
                </div>
                <CheckCircle2 className="mt-4 h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Snelle afhandeling
                </h3>
                <p className="mt-2 text-gray-600">
                  Akkoord? Dan regelen wij een snelle en discrete afhandeling
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Actief in heel België
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Wij kopen woningen in alle provincies
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {provinces.map((province) => (
              <Link
                key={province.id}
                href={`/provincie/${province.slug}`}
                className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-blue-600 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {province.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Bekijk steden →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
