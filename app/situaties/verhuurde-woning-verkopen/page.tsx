import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, FileText, Clock, Shield, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Verhuurde Woning Verkopen | Met of Zonder Huurder',
  description: 'Verhuurde woning verkopen? Wij kopen met of zonder zittende huurder. Juridisch correct afgehandeld, binnen 7 dagen een eerlijk bod.',
  keywords: 'verhuurde woning verkopen, huurwoning verkopen, woning verkopen met huurder, beleggingspand verkopen België',
  openGraph: {
    title: 'Verhuurde Woning Verkopen - Met of Zonder Huurder',
    description: 'Verhuurde woning verkopen? Wij kopen met zittende huurder of na opzegging. Juridisch correct, snel proces.',
  },
};

export default function VerhuurdeWoningVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Verhuurde Woning Verkopen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Verhuurde Woning Snel Verkopen
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Verhuurde woning verkopen? Wij kopen met of zonder zittende huurder. Juridisch correct afgehandeld via de notaris, binnen 7 dagen een eerlijk bod.
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
                  Waarom Een Verhuurde Woning Verkopen Complex Kan Zijn
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Het verkopen van een verhuurde woning brengt extra uitdagingen met zich mee. U moet rekening houden met de rechten van de huurder, huurcontracten, opzegtermijnen, en mogelijke bezichtigingen terwijl de huurder nog in de woning woont. Dit maakt het proces ingewikkelder en langer dan een standaard verkoop.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Veel potentiële kopers zijn niet geïnteresseerd in een woning met een zittende huurder, omdat ze er zelf willen gaan wonen. Dit beperkt uw doelgroep aanzienlijk. Beleggers die wel geïnteresseerd zijn, onderhandelen vaak hard over de prijs en willen gedetailleerde informatie over de huurovereenkomst en het rendement.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Oplossing: Flexibel en Juridisch Correct
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij zijn gespecialiseerd in het overnemen van verhuurde woningen. We bieden twee opties:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Users className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Met Zittende Huurder</h3>
                      <p className="text-gray-600">
                        Wij nemen de woning over inclusief het huurcontract. De huurder blijft gewoon wonen en u hoeft geen opzegging te doen.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Na Opzegging Huurcontract</h3>
                      <p className="text-gray-600">
                        Liever eerst de huurder eruit? Wij wachten tot het contract beëindigd is en kopen dan de leegstaande woning.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Shield className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Juridisch Correct</h3>
                      <p className="text-gray-600">
                        Alle huurrechten worden gerespecteerd. De notaris zorgt voor correcte overdracht van het huurcontract.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <FileText className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Transparant Proces</h3>
                      <p className="text-gray-600">
                        Wij bekijken het huurcontract, de huurprijs, en de staat van het pand om tot een eerlijk bod te komen.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welke Informatie Hebben Wij Nodig?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Om een correct bod te kunnen doen op een verhuurde woning, hebben wij de volgende informatie nodig:
                </p>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Huurcontract Gegevens</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Type huurcontract (9 jaar, korte duur, studenten, enz.)</li>
                    <li>• Startdatum van het huurcontract</li>
                    <li>• Huidige huurprijs per maand</li>
                    <li>• Eventuele indexeringen</li>
                    <li>• Waarborg bedrag</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Huurder Informatie</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Betaalgedrag (betaalt de huurder op tijd?)</li>
                    <li>• Eventuele huurachterstanden</li>
                    <li>• Onderhoud van de woning door huurder</li>
                    <li>• Zijn er klachten of problemen geweest?</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Woning Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Algemene staat van de woning</li>
                    <li>• Laatste renovaties of onderhoud</li>
                    <li>• Eventuele gebreken of achterstallig onderhoud</li>
                    <li>• EPC-certificaat</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Hoe Bepalen Wij De Prijs Bij Een Verhuurde Woning?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Voor een verhuurde woning kijken wij naar verschillende factoren:
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <strong className="text-gray-900">Huurrendement:</strong>
                      <span className="text-gray-700"> De verhouding tussen de huurprijs en de waarde van het pand. Een goede huurprijs verhoogt de waarde.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <strong className="text-gray-900">Kwaliteit Huurder:</strong>
                      <span className="text-gray-700"> Een betrouwbare huurder met goed betaalgedrag is waardevol. Achterstallige betalingen verlagen de waarde.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <strong className="text-gray-900">Resterende Looptijd:</strong>
                      <span className="text-gray-700"> Bij een 9-jarig contract kijken we naar hoeveel jaar er nog resteert.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <strong className="text-gray-900">Staat Van Het Pand:</strong>
                      <span className="text-gray-700"> Ook bij verhuurde woningen bekijken we de conditie en eventuele renovatiebehoeften.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10">
                  <p className="text-lg text-gray-800">
                    <strong>Let op:</strong> Bij verkoop met zittende huurder ligt het bod vaak lager dan bij een lege woning, omdat wij minder flexibiliteit hebben om het pand aan te passen of snel door te verkopen. Dit is marktconform en vergelijkbaar met andere beleggers.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Het Proces: Stap Voor Stap
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag en Documentatie</h3>
                      <p className="text-gray-700">
                        U dient een aanvraag in en deelt het huurcontract en andere relevante documenten met ons.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Inspectie (Indien Mogelijk)</h3>
                      <p className="text-gray-700">
                        Wij plannen een inspectie, indien de huurder hiermee akkoord gaat. Dit kan ook na overdracht van het contract.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Bod Op Basis Van Rendement</h3>
                      <p className="text-gray-700">
                        Binnen 7 dagen ontvangt u een bod dat gebaseerd is op het huurrendement, de kwaliteit van de huurder, en de staat van het pand.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris en Contractoverdracht</h3>
                      <p className="text-gray-700">
                        De notaris zorgt voor correcte overdracht van eigendom én huurcontract. De huurder wordt op de hoogte gebracht van de eigendomswissel.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Uitbetaling en Overdracht</h3>
                      <p className="text-gray-700">
                        Na ondertekening ontvangt u uw geld en wij worden de nieuwe verhuurder. Alle rechten en plichten gaan over.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg my-10">
                  <h3 className="text-xl font-bold mb-4">Actief in Alle Provincies</h3>
                  <p className="text-gray-700 mb-4">
                    Wij kopen verhuurde woningen in heel België, van <Link href="/provincie/antwerpen" className="text-blue-600 hover:underline">Antwerpen</Link> tot <Link href="/provincie/luik" className="text-blue-600 hover:underline">Luik</Link>. Of het nu gaat om een appartement in de stad of een huis op het platteland, wij zijn geïnteresseerd.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Verhuurde Woningen Verkopen
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Moet de huurder toestemming geven voor de verkoop?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Nee, u heeft geen toestemming van de huurder nodig om uw eigendom te verkopen. Wel moet de huurder op de hoogte worden gebracht van de eigendomswissel. Het huurcontract blijft gewoon doorlopen met de nieuwe eigenaar (ons). De notaris regelt deze communicatie correct.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Wat gebeurt er met de waarborg?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      De waarborg blijft staan op de geblokkeerde rekening. Bij de notarisakte wordt geregeld dat wij als nieuwe eigenaar de rechten op de waarborg overnemen. De huurder merkt hier niets van en de waarborg blijft veilig staan tot het einde van het huurcontract.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Kan ik een verhuurde woning ook leeg verkopen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, als u liever wacht tot het huurcontract beëindigd is, kunnen wij ook de leegstaande woning kopen. In dat geval moet u wel zelf het contract opzeggen volgens de wettelijke termijnen. Wij kunnen alvast een bod doen en wachten tot de woning leeg is voordat we de notarisakte passeren.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Wat als de huurder achterstallige betalingen heeft?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Huurachterstanden verlagen de waarde van het pand, omdat wij het risico overnemen van niet-betalende huurders. Wij bekijken de situatie en maken een bod rekening houdend met dit risico. In sommige gevallen is het beter om eerst het huurcontract te beëindigen voordat u verkoopt.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook studentenwoningen of appartementen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, wij zijn geïnteresseerd in alle soorten verhuurde woningen: appartementen, huizen, studentenkamers, enz. Elk type heeft zijn eigen karakteristieken en huurregels, waar wij rekening mee houden in ons bod.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om uw verhuurde woning snel te verkopen? Vraag vandaag nog een vrijblijvende waardering aan.
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
