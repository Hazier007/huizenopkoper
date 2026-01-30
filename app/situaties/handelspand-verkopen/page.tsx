import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Store, TrendingDown, Clock, Scale, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Handelspand Verkopen | Snelle Overname Commercieel Vastgoed',
  description: 'Handelspand verkopen? Wij kopen commercieel vastgoed, winkels, horeca en kantoorpanden. Ook bij leegstand of verouderde panden. Binnen 7 dagen een bod.',
  keywords: 'handelspand verkopen, commercieel vastgoed verkopen, winkel verkopen, horeca pand verkopen België',
  openGraph: {
    title: 'Handelspand Verkopen - Snelle Overname Commercieel Vastgoed',
    description: 'Handelspand verkopen? Snel proces, ook bij leegstand. Binnen 7 dagen een eerlijk bod op uw commercieel vastgoed.',
  },
};

export default function HandelspandVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Handelspand Verkopen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Handelspand of Commercieel Vastgoed Snel Verkopen
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Handelspand verkopen? Wij kopen winkels, horecapanden, kantoren en ander commercieel vastgoed. Ook bij leegstand, verouderde panden of slechte ligging.
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
                  Waarom Commercieel Vastgoed Vaak Moeilijk Te Verkopen Is
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Handelspanden zijn een specifieke markt met een beperktere doelgroep dan residentieel vastgoed. Potentiële kopers zijn meestal professionals of beleggers die kritisch kijken naar rendement, ligging, zichtbaarheid, bereikbaarheid en de staat van het pand. Dit maakt de verkoop vaak langdurig en complex.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Daarnaast hebben veel handelspanden te maken met veranderende winkelstraten, online concurrentie, leegstand in de buurt, of verouderde faciliteiten. Deze factoren maken een traditionele verkoop lastig en tijdrovend. Makelaars gespecialiseerd in commercieel vastgoed rekenen bovendien vaak hoge commissies.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Oplossing: Gespecialiseerde Aankoop Van Handelspanden
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij hebben ervaring met commercieel vastgoed en begrijpen de uitdagingen. We bieden een snelle en professionele oplossing:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Store className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Alle Soorten Commercieel Vastgoed</h3>
                      <p className="text-gray-600">
                        Winkels, horecapanden, kantoren, praktijkruimtes, magazijnen. Wij kijken naar alle types commercieel vastgoed.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <TrendingDown className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Ook Bij Leegstand</h3>
                      <p className="text-gray-600">
                        Staat uw pand al maanden of jaren leeg? Wij zijn juist geïnteresseerd in panden die herbestemming nodig hebben.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Snelle Beslissing</h3>
                      <p className="text-gray-600">
                        Binnen 7 dagen een bod na grondige analyse. Geen maandenlange onderhandelingen.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Scale className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Transparante Waardering</h3>
                      <p className="text-gray-600">
                        Wij leggen uit hoe we tot onze waardering komen, rekening houdend met alle commerciële aspecten.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welke Handelspanden Kopen Wij?
                </h2>

                <div className="space-y-4 mb-10">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Winkels en Retail</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Winkelruimtes in hoofdstraten of buurten</li>
                      <li>• Leegstaande winkels</li>
                      <li>• Winkels met woonruimte erboven</li>
                      <li>• Winkelunits in winkelcentra (beperkt)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Horeca Vastgoed</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Restaurants, cafés, en bars</li>
                      <li>• Slecht lopende of gesloten horeca</li>
                      <li>• Horecapanden die herbestemming nodig hebben</li>
                      <li>• Panden met of zonder vergunningen</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Kantoren en Praktijkruimtes</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Kleine kantoorruimtes</li>
                      <li>• Praktijkruimtes (medisch, juridisch, enz.)</li>
                      <li>• Verouderde kantoorpanden</li>
                      <li>• Panden geschikt voor omvorming tot woonruimte</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Gemengde Panden</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Combinatie van commerciële ruimte met appartementen</li>
                      <li>• Panden met meerdere verdiepingen</li>
                      <li>• Woon-winkelcombinaties</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Hoe Bepalen Wij De Waarde Van Een Handelspand?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Bij commercieel vastgoed zijn andere factoren van belang dan bij residentieel vastgoed:
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <strong className="text-gray-900">Ligging en Zichtbaarheid:</strong>
                      <span className="text-gray-700"> Is het pand goed zichtbaar en bereikbaar? In een drukke winkelstraat of afgelegener?</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <strong className="text-gray-900">Potentieel Voor Herbestemming:</strong>
                      <span className="text-gray-700"> Kan het pand omgevormd worden tot woonruimte of een andere commerciële functie?</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <strong className="text-gray-900">Huidige Exploitatie:</strong>
                      <span className="text-gray-700"> Is het pand verhuurd? Wat is de huurprijs en het contract?</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <strong className="text-gray-900">Staat en Onderhoud:</strong>
                      <span className="text-gray-700"> Verouderde installaties, achterstallig onderhoud, of juist recent gerenoveerd?</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
                    <div>
                      <strong className="text-gray-900">Lokale Markt:</strong>
                      <span className="text-gray-700"> Hoe is de vraag naar commerciële ruimte in de buurt? Veel leegstand of juist populair?</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10">
                  <p className="text-lg text-gray-800">
                    <strong>Herbestemming:</strong> Veel oude winkelpanden of horecazaken kunnen omgevormd worden tot woningen. Dit kan de waarde aanzienlijk verhogen. Wij bekijken altijd deze mogelijkheden en houden hier rekening mee in ons bod.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Het Proces Bij Handelspanden
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag Met Details</h3>
                      <p className="text-gray-700">
                        Vertel ons over het type pand, de ligging, eventuele verhuur, en de staat. Foto's zijn welkom.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Uitgebreide Inspectie</h3>
                      <p className="text-gray-700">
                        Wij komen langs voor een grondige inspectie. Bij commercieel vastgoed kijken we ook naar bestemmingsplannen, vergunningen, en verbouwingsmogelijkheden.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Marktonderzoek</h3>
                      <p className="text-gray-700">
                        Wij doen onderzoek naar vergelijkbare panden in de buurt, vraag naar commerciële ruimte, en potentieel voor herbestemming.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Gedetailleerd Bod</h3>
                      <p className="text-gray-700">
                        Binnen 7 dagen ontvangt u een transparant bod met toelichting op alle commerciële aspecten die we hebben meegenomen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris en Afhandeling</h3>
                      <p className="text-gray-700">
                        Bij akkoord regelen wij de notarisafspraak. Bij verhuurde panden wordt ook het huurcontract correct overgedragen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg my-10">
                  <h3 className="text-xl font-bold mb-4">Commercieel Vastgoed in Heel België</h3>
                  <p className="text-gray-700 mb-4">
                    Wij bekijken handelspanden in alle regio's, van drukke stadscentra in <Link href="/provincie/vlaams-brabant" className="text-blue-600 hover:underline">Vlaams-Brabant</Link> tot rustiger gelegen panden in <Link href="/provincie/luxemburg" className="text-blue-600 hover:underline">Luxemburg</Link>. Ook panden in kleinere gemeenten of minder populaire locaties bekijken we.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Handelspanden Verkopen
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook panden die al jaren leegstaan?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, juist leegstaande panden zijn interessant omdat ze vaak potentieel hebben voor herbestemming. Of het nu gaat om een voormalige winkel die omgevormd kan worden tot woningen, of een oud horecapand dat geschikt is voor een nieuwe functie, wij bekijken alle mogelijkheden.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Wat als het pand nog verhuurd is?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Dat is geen probleem. Wij kunnen het pand met het huurcontract overnemen, net zoals bij verhuurde woningen. De waarde wordt dan bepaald op basis van het huurrendement en de kwaliteit van de huurder. Zie ook onze pagina over <Link href="/situaties/verhuurde-woning-verkopen" className="text-blue-600 hover:underline">verhuurde woningen verkopen</Link>.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Moet ik vergunningen of bestemmingsplannen regelen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Nee, wij kopen het pand in de huidige staat met de huidige vergunningen en bestemmingen. Als herbestemming mogelijk is, onderzoeken wij dit zelf na de aankoop. U hoeft hier niets voor te regelen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Waarom zou ik aan jullie verkopen in plaats van aan een andere belegger?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Wij bieden snelheid, duidelijkheid en een professionele afhandeling. Binnen 7 dagen heeft u een bod en binnen weken kan de transactie afgerond zijn. Andere beleggers laten u vaak maandenlang wachten, onderhandelen uitgebreid, en stellen voorwaarden. Wij werken transparant en efficiënt.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook grote commerciële complexen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ons focus ligt voornamelijk op kleinere tot middelgrote handelspanden. Zeer grote commerciële complexen of winkelcentra vallen meestal buiten ons interessegebied. Maar neem gerust contact op, we kijken altijd naar de mogelijkheden.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om uw handelspand snel te verkopen? Vraag vandaag nog een vrijblijvende waardering aan.
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
