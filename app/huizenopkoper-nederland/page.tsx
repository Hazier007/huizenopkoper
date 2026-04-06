import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, MapPinned, MessageSquare, Shield, TimerReset } from 'lucide-react';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    question: 'Kopen jullie ook woningen in Nederland?',
    answer:
      'Onze focus ligt vandaag op België. Aanvragen uit Nederland kunnen we wel bekijken en, indien passend, verder bespreken. We communiceren dus bewust geen algemene koopgarantie voor Nederland.',
  },
  {
    question: 'Kan ik vrijblijvend informatie doorsturen?',
    answer:
      'Ja. Je kan je woning of situatie vrijblijvend indienen. We bekijken eerst of jouw dossier binnen onze huidige aanpak past en nemen daarna contact op.',
  },
  {
    question: 'Voor welke situaties is deze pagina bedoeld?',
    answer:
      'Voor eigenaars die snel duidelijkheid willen over een mogelijke verkoop, bijvoorbeeld bij tijdsdruk, erfenis, renovatie, verhuurde woning of een dossier dat moeilijk via klassieke makelaars verloopt.',
  },
];

export const metadata: Metadata = {
  title: 'Huizenopkoper Nederland? Dien vrijblijvend je woning in',
  description:
    'NL zoekintentie testen op huizenopkoper.be. Lees hoe we aanvragen uit Nederland beoordelen, welke verwachtingen realistisch zijn en hoe je vrijblijvend contact opneemt.',
  alternates: {
    canonical: 'https://huizenopkoper.be/huizenopkoper-nederland',
  },
  openGraph: {
    title: 'Huizenopkoper Nederland | Huizenopkoper.be',
    description:
      'Voor eigenaars met NL zoekintentie die snel duidelijkheid willen. Focus blijft België, maar passende aanvragen kunnen besproken worden.',
    type: 'article',
    url: 'https://huizenopkoper.be/huizenopkoper-nederland',
  },
};

export default function HuizenopkoperNederlandPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
              <MapPinned className="h-4 w-4" />
              NL-validatiepagina op bestaand merk
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Huizenopkoper Nederland?
              <span className="block bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Eerst helderheid, dan pas verwachtingen.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100/90">
              We zijn primair actief in België. Toch krijgen we ook zoekverkeer en aanvragen met Nederlandse intentie.
              Via deze pagina kan je vrijblijvend je situatie doorgeven, waarna we bekijken of jouw dossier binnen onze huidige werking past.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold">
                <Link href="/verkopen">Woning vrijblijvend indienen</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 h-auto">
                <Link href="/werking">Bekijk onze werkwijze</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3">
          {[
            {
              icon: <Shield className="h-6 w-6 text-white" />,
              title: 'Geen misleidende claims',
              body: 'We beloven niet dat we elk Nederlands pand aankopen. We screenen eerst of er een realistische match is.',
            },
            {
              icon: <TimerReset className="h-6 w-6 text-white" />,
              title: 'Snelle eerste inschatting',
              body: 'Je kan snel laten weten wat je situatie is. Daarna bekijken we intern of opvolging zinvol is.',
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-white" />,
              title: 'Duidelijke communicatie',
              body: 'Geen vage beloftes. Wel een heldere terugkoppeling over wat mogelijk is en wat niet.',
            },
          ].map((item) => (
            <Card key={item.title} className="border-blue-100">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
                  {item.icon}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="mt-2 text-gray-600">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Wanneer is deze pagina relevant?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Vooral wanneer snelheid, eenvoud en een directe eerste beoordeling belangrijker zijn dan een klassiek verkooptraject.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              'Je wil snel duidelijkheid over verkoopbaarheid en mogelijke vervolgstappen.',
              'Je dossier is complexer door renovatie, tijdsdruk of verhuur.',
              'Je wil eerst discreet aftoetsen of directe interesse mogelijk is.',
              'Je wil geen lange opstart via meerdere tussenpartijen.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Hoe verloopt een aanvraag?</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Dien je woning in',
                  body: 'Gebruik onze bestaande verkoopflow en geef de basisinfo zo concreet mogelijk mee.',
                },
                {
                  step: '2',
                  title: 'Wij screenen de fit',
                  body: 'We bekijken of jouw locatie, situatie en timing aansluiten op onze huidige werking.',
                },
                {
                  step: '3',
                  title: 'Je krijgt een heldere update',
                  body: 'Als er potentieel is, volgt verdere bespreking. Zo niet, weet je dat ook snel en duidelijk.',
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl bg-gray-50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/verkopen" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Start aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/situaties/renovatie-woning-verkopen" className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50">
                Bekijk relevante situatiepagina
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Veelgestelde vragen</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
