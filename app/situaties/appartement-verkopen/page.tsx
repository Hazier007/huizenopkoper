import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building2, Clock, FileCheck, Coins, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Appartement Verkopen | Snelle Verkoop Zonder Makelaar',
  description: 'Appartement verkopen? Wij kopen uw appartement snel en zonder makelaar. Binnen 7 dagen een eerlijk bod, ook bij hoge syndicus kosten of renovatie.',
  keywords: 'appartement verkopen, flat verkopen, appartement verkopen zonder makelaar België, snelle verkoop appartement',
  openGraph: {
    title: 'Appartement Verkopen - Snel & Zonder Makelaar',
    description: 'Appartement snel verkopen? Binnen 7 dagen een bod, geen makelaar nodig. Ook bij hoge syndicus kosten.',
  },
};

export default function AppartementVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Appartement Verkopen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Appartement Snel Verkopen Zonder Makelaar
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Appartement verkopen zonder gedoe? Wij kopen uw flat direct, ook bij hoge syndicus kosten of renovatiebehoefte. Binnen 7 dagen een eerlijk bod.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/verkopen">
                    Gratis Waardering Aanvragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="/werking">Hoe Het Werkt</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Waarom Appartementen Soms Lastig Te Verkopen Zijn
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Een appartement verkopen kan complexer zijn dan een huis. U heeft te maken met een vereniging van mede-eigenaars (VME), syndicus kosten, gemeenschappelijke delen, en regelgeving binnen het gebouw. Potentiële kopers zijn vaak kritisch op deze aspecten en schrikken snel terug bij hoge reserveringen of achterstallig onderhoud aan het gebouw.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Daarnaast speelt de ligging binnen het gebouw een grote rol. Een appartement op een lagere verdieping zonder lift, met uitzicht op een binnenplaats, of met geluidsoverlast van buren kan maanden op de markt blijven staan, zelfs met een makelaar.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Oplossing: Directe Aankoop Van Appartementen
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij zijn gespecialiseerd in het kopen van appartementen, ook in situaties die traditionele kopers afschrikken:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Coins className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Ook Bij Hoge Syndicus Kosten</h3>
                      <p className="text-gray-600">
                        Hoge maandelijkse kosten of grote reserveringen? Wij houden hier rekening mee in ons bod en schrikken niet terug.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Building2 className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Elke Ligging Welkom</h3>
                      <p className="text-gray-600">
                        Gelijkvloers zonder lift? Geen probleem. Noord-gericht? Ook goed. Wij kopen appartementen in elke conditie en ligging.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Snelle Afhandeling</h3>
                      <p className="text-gray-600">
                        Binnen 7 dagen een bod, binnen 3-6 weken volledig afgehandeld. Geen maandenlange onzekerheid.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <FileCheck className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">VME Regeling Correct</h3>
                      <p className="text-gray-600">
                        Wij regelen alle administratie met de syndicus en VME. U hoeft zich nergens zorgen over te maken.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welke Appartementen Kopen Wij?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij zijn geïnteresseerd in alle soorten appartementen:
                </p>

                <div className="space-y-4 mb-10">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Studio's en Kleine Appartementen</h3>
                    <p className="text-gray-700">
                      Ook compacte woningen zoals studio's zijn interessant voor ons. Of ze nu verhuurd worden, leeg staan, of opgeknapt moeten worden.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Standaard 2 of 3 Slaapkamer Appartementen</h3>
                    <p className="text-gray-700">
                      De meest voorkomende appartementen. In elke verdieping, met of zonder lift, met of zonder terras of tuin.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Penthouses en Grotere Appartementen</h3>
                    <p className="text-gray-700">
                      Luxe appartementen met meerdere verdiepingen of extra grote oppervlaktes. Ook deze nemen wij over.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Appartementen Met Problemen</h3>
                    <p className="text-gray-700">
                      Conflicten met VME? Achterstallig onderhoud aan gemeenschappelijke delen? Hoge reserveringen? Lawaaiige buren? Wij bekijken elke situatie.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Waar Letten Wij Op Bij Appartementen?
                </h2>

                <div className="space-y-4 mb-10">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <strong className="text-gray-900">Syndicus Kosten en Reserveringen:</strong>
                      <span className="text-gray-700"> De maandelijkse kosten en de hoogte van de reserves voor groot onderhoud beïnvloeden de waarde.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <strong className="text-gray-900">VME Situatie:</strong>
                      <span className="text-gray-700"> Is er veel achterstallig onderhoud? Zijn er grote werken gepland? Dit nemen we mee in onze beoordeling.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <strong className="text-gray-900">Ligging in Het Gebouw:</strong>
                      <span className="text-gray-700"> Verdieping, aanwezigheid van lift, oriëntatie, uitzicht, en geluidsniveau zijn belangrijk.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <strong className="text-gray-900">Staat Van Het Appartement Zelf:</strong>
                      <span className="text-gray-700"> Keuken, badkamer, vloeren, ramen, enz. Ook bij renovatiebehoefte zijn we geïnteresseerd.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
                    <div>
                      <strong className="text-gray-900">Locatie en Bereikbaarheid:</strong>
                      <span className="text-gray-700"> Nabijheid van winkels, openbaar vervoer, scholen en voorzieningen.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10">
                  <p className="text-lg text-gray-800">
                    <strong>Transparant:</strong> Wij geven een gedetailleerde toelichting bij ons bod, waarin we uitleggen hoe we rekening houden met de syndicus kosten, de VME situatie, en de staat van het appartement.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Het Proces Bij Appartementen
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag Met VME Info</h3>
                      <p className="text-gray-700">
                        Vul ons formulier in. Deel indien mogelijk de laatste syndicus afrekening en het huishoudelijk reglement van de VME.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Bezichtiging Appartement</h3>
                      <p className="text-gray-700">
                        Wij komen langs voor een inspectie van het appartement en bekijken ook de gemeenschappelijke delen en het gebouw.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Analyse VME Documenten</h3>
                      <p className="text-gray-700">
                        Wij bestuderen de financiële situatie van de VME, geplande werken, en eventuele problemen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Bod Binnen 7 Dagen</h3>
                      <p className="text-gray-700">
                        U ontvangt een transparant bod met toelichting op alle aspecten die we hebben meegenomen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris en Syndicus Afhandeling</h3>
                      <p className="text-gray-700">
                        De notaris regelt de eigendomsoverdracht. Wij informeren de syndicus over de wijziging van eigenaar en regelen alle administratie.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg my-10">
                  <h3 className="text-xl font-bold mb-4">In Heel België</h3>
                  <p className="text-gray-700 mb-4">
                    Wij kopen appartementen in alle steden en gemeenten. Of het nu gaat om een flat in het centrum van <Link href="/provincie/antwerpen/antwerpen" className="text-blue-600 hover:underline">Antwerpen</Link>, een appartement in <Link href="/provincie/oost-vlaanderen/gent" className="text-blue-600 hover:underline">Gent</Link>, of een studio in een kleinere gemeente, wij zijn geïnteresseerd.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Appartementen Verkopen
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook appartementen met zeer hoge syndicus kosten?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, wij kopen ook appartementen met hoge maandelijkse kosten. Dit beïnvloedt natuurlijk wel de waarde van het appartement, omdat toekomstige kopers ook met deze kosten te maken krijgen. Wij houden hier realistisch rekening mee in ons bod.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Wat als er grote werken gepland zijn in het gebouw?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Als er grote werken gepland zijn (bijvoorbeeld dakvernieuwing, gevelrenovatie), dan zal dit de verkoopprijs beïnvloeden. Wij bekijken de kostenraming en nemen dit mee in onze berekening. Het is belangrijk dat u ons hierover informeert tijdens het proces.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Moet ik het appartement eerst renoveren?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Nee, dat is niet nodig. Net zoals bij huizen kopen wij appartementen in de huidige staat. Of het nu gaat om een verouderde keuken, badkamer, of vloerbedekking, wij nemen het over zoals het is en regelen zelf eventuele renovaties.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Hoe werkt het met de parkeerplaats en/of kelder?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Als uw appartement een eigen parkeerplaats, garagebox, of kelderberging heeft, dan wordt dit meegenomen in de waardebepaling en gaat dit mee over bij de verkoop. Dit wordt allemaal correct geregeld via de notaris.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook appartementen die verhuurd zijn?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, wij kopen ook verhuurde appartementen. In dat geval nemen we het huurcontract over en blijft de huurder gewoon wonen. Zie ook onze pagina over <Link href="/situaties/verhuurde-woning-verkopen" className="text-blue-600 hover:underline">verhuurde woningen verkopen</Link> voor meer informatie.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om uw appartement snel te verkopen? Vraag vandaag nog een vrijblijvende waardering aan.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/verkopen">
                    Gratis Waardering Aanvragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
