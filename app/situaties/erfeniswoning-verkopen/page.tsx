import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Home, Clock, Shield, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Erfeniswoning Verkopen in België | Snelle & Eerlijke Overname',
  description: 'Erfeniswoning verkopen? Wij nemen uw geërfde woning snel over. Geen makelaar, geen renovatie, geen gedoe. Binnen 7 dagen een eerlijk bod en snelle afhandeling.',
  keywords: 'erfeniswoning verkopen, erfenis huis verkopen, geërfde woning verkopen België, erfenis vastgoed verkopen',
  openGraph: {
    title: 'Erfeniswoning Verkopen - Snelle Overname Zonder Gedoe',
    description: 'Geërfde woning verkopen? Krijg binnen 7 dagen een eerlijk bod. Geen makelaar, geen renovatie, snelle afhandeling.',
  },
};

export default function ErfeniswoningVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Erfeniswoning Verkopen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Erfeniswoning Snel en Zorgeloos Verkopen
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Een erfenis kan emotioneel zwaar zijn. Wij nemen de zorgen over de woning uit uw handen met een eerlijk bod binnen 7 dagen en snelle afhandeling.
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
                  Waarom Een Erfeniswoning Verkopen Vaak Ingewikkeld Is
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Het erven van een woning brengt vaak meer uitdagingen met zich mee dan verwacht. Naast de emotionele belasting van een verlies, komt u voor praktische en financiële beslissingen te staan. Veel geërfde woningen hebben jarenlang geen onderhoud gehad, liggen op een ongewenste locatie, of moeten verdeeld worden tussen meerdere erfgenamen.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  De traditionele verkoop via een makelaar kan maanden duren, vereist vaak kostbare renovaties, en brengt onzekerheid met zich mee. Voor erfgenamen die snel willen afsluiten en verder willen met hun leven, is dit niet ideaal.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Oplossing: Snel en Zonder Zorgen
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij begrijpen dat u na een erfenis behoefte heeft aan duidelijkheid en snelheid. Daarom bieden wij een eenvoudige en transparante oplossing:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Bod Binnen 7 Dagen</h3>
                      <p className="text-gray-600">
                        Na een vrijblijvende bezichtiging ontvangt u binnen één week een eerlijk en transparant bod op uw erfeniswoning.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Home className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">In Huidige Staat</h3>
                      <p className="text-gray-600">
                        Geen renovaties of opknapwerk nodig. Wij kopen uw erfeniswoning precies zoals deze er nu uitziet, met alle eigendommen erin.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Shield className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Notaris Regelt Alles</h3>
                      <p className="text-gray-600">
                        Juridische zekerheid via de notaris. Alle erfgenamen worden correct betrokken en uitbetaald.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Snelle Afhandeling</h3>
                      <p className="text-gray-600">
                        Afhankelijk van de notaris en erfgenamen kan de volledige transactie binnen 3-6 weken afgerond zijn.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelvoorkomende Situaties Bij Erfeniswoningen
                </h2>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Meerdere Erfgenamen</h3>
                  <p className="text-gray-700 mb-4">
                    Wanneer een woning door meerdere erfgenamen geërfd wordt, kan het lastig zijn om tot overeenstemming te komen. De één wil verkopen, de ander wil de woning aanhouden. Wij zorgen voor een snelle en eerlijke oplossing waarbij alle erfgenamen betrokken worden via de notaris.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Woning Vereist Veel Onderhoud</h3>
                  <p className="text-gray-700 mb-4">
                    Veel erfeniswoningen hebben jarenlang geen onderhoud gehad. Vochtige kelders, verouderde installaties, of een verwaarloosde tuin. Wij nemen de woning over zoals deze is, zodat u zich geen zorgen hoeft te maken over kostbare renovaties.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Ongewenste Locatie</h3>
                  <p className="text-gray-700 mb-4">
                    Ligt de geërfde woning ver weg of in een gebied waar u niet vertrouwd mee bent? Wij hebben ervaring in heel België, van <Link href="/provincie/antwerpen" className="text-blue-600 hover:underline">Antwerpen</Link> tot <Link href="/provincie/limburg" className="text-blue-600 hover:underline">Limburg</Link>, en kunnen u overal helpen.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Hoe Werkt Het Proces?
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag Indienen</h3>
                      <p className="text-gray-700">
                        Vul ons vrijblijvend formulier in met informatie over de erfeniswoning. Vermeldt of er meerdere erfgenamen zijn.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Bezichtiging Plannen</h3>
                      <p className="text-gray-700">
                        Wij komen langs voor een inspectie. Dit duurt meestal 20-30 minuten en is geheel vrijblijvend.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Eerlijk Bod</h3>
                      <p className="text-gray-700">
                        Binnen 7 dagen ontvangt u een transparant bod. Geen verrassingen, geen verborgen kosten.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris Afspraak</h3>
                      <p className="text-gray-700">
                        Bij akkoord regelen wij een afspraak bij de notaris. Alle erfgenamen worden correct betrokken in het proces.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Uitbetaling</h3>
                      <p className="text-gray-700">
                        Na ondertekening bij de notaris wordt het bedrag snel uitbetaald aan alle erfgenamen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10">
                  <p className="text-lg text-gray-800">
                    <strong>Let op:</strong> Bij erfenissen met meerdere erfgenamen is het belangrijk dat alle partijen akkoord gaan met de verkoop. Wij kunnen u adviseren over de beste aanpak en zorgen voor transparante communicatie met alle betrokkenen.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Erfeniswoningen
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Wat als er meerdere erfgenamen zijn?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Wij hebben veel ervaring met erfenissen waarbij meerdere partijen betrokken zijn. Alle erfgenamen moeten akkoord gaan met de verkoop. De notaris zorgt ervoor dat iedereen correct betrokken wordt en zijn of haar aandeel ontvangt. Wij kunnen ook helpen bij het faciliteren van overleg tussen erfgenamen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Moet ik de woning eerst opruimen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Nee, dat hoeft niet. Wij kopen de woning inclusief alle eigendommen en inboedel. Wij regelen het ontruimen en opruimen voor u. Dit bespaart u tijd, emotionele belasting en extra kosten.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Hoe wordt de prijs bepaald bij een erfeniswoning?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Wij bekijken de locatie, staat van het pand, huidige marktwaarde, en eventuele renovatiekosten. Op basis daarvan maken we een eerlijk bod dat marktconform is. U ontvangt altijd een transparante toelichting op ons bod.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Hoelang duurt het verkoopproces?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Na akkoord op ons bod kan de volledige transactie binnen 3-6 weken afgerond zijn, afhankelijk van de beschikbaarheid van de notaris en alle erfgenamen. Dit is aanzienlijk sneller dan een traditionele verkoop via een makelaar.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Wat als de woning hypotheeklasten heeft?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Dat is geen probleem. Bij de notarisakte wordt eerst de eventuele resterende hypotheek afgelost uit de verkoopopbrengst. Het resterende bedrag wordt vervolgens verdeeld onder de erfgenamen volgens de erfregeling.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om uw erfeniswoning zorgeloos te verkopen? Vraag vandaag nog een vrijblijvende waardering aan.
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
