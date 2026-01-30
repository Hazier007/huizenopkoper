import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Hammer, Clock, PiggyBank, Home, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Renovatiewoning Verkopen | Zonder Opknappen Verkopen',
  description: 'Renovatiewoning verkopen zonder op te knappen? Wij kopen uw woning in elke staat. Geen renovatiekosten, binnen 7 dagen een eerlijk bod.',
  keywords: 'renovatiewoning verkopen, woning verkopen zonder renovatie, huis opknappen verkopen, verkoop bouwval België',
  openGraph: {
    title: 'Renovatiewoning Verkopen - Zonder Op Te Knappen',
    description: 'Renovatiewoning verkopen in de huidige staat? Geen renovatiekosten, snel proces, eerlijk bod binnen 7 dagen.',
  },
};

export default function RenovatieWoningVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Renovatiewoning Verkopen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Renovatiewoning Verkopen Zonder Op Te Knappen
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Geen tijd, geld of zin om te renoveren? Wij kopen uw woning in elke staat. Bespaar duizenden euro's aan renovatiekosten en krijg binnen 7 dagen een eerlijk bod.
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
                  Waarom Renoveren Vaak Niet Loont Voor Verkoop
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Veel woningeigenaren denken dat ze hun woning eerst moeten opknappen voordat ze kunnen verkopen. De realiteit is echter dat renoveren voor verkoop vaak veel duurder uitpakt dan verwacht, en u niet altijd uw investering terugverdient.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Een badkamerrenovatie kost al snel €10.000 tot €20.000. Een nieuwe keuken €15.000 tot €30.000. Dakwerken kunnen oplopen tot €15.000 of meer. En dan hebben we het nog niet over onverwachte problemen zoals vocht, elektriciteit of structurele gebreken die tijdens de renovatie aan het licht komen.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Daarbovenop komt de tijd en stress die een renovatie met zich meebrengt: offertes vergelijken, aannemers coördineren, materialen uitkiezen, en toezicht houden. Voor veel mensen is dit gewoon niet haalbaar of wenselijk.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Oplossing: Wij Kopen in Elke Staat
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij zijn gespecialiseerd in het overnemen van woningen die renovatie nodig hebben. Of het nu gaat om kleine aanpassingen of een volledige renovatie, wij kopen uw woning zoals deze is:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <PiggyBank className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Bespaar Renovatiekosten</h3>
                      <p className="text-gray-600">
                        Geen uitgaven aan renovaties. Wij nemen de woning over in de huidige staat en regelen alle opknapwerk zelf.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Bespaar Tijd</h3>
                      <p className="text-gray-600">
                        Geen maanden zoeken naar aannemers en wachten op renovaties. Binnen 7 dagen een bod en binnen weken afgehandeld.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Home className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Elke Staat Welkom</h3>
                      <p className="text-gray-600">
                        Vochtige kelder? Verouderde keuken? Slecht onderhouden? Geen probleem. Wij kopen woningen in elke conditie.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Hammer className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Wij Renoveren Zelf</h3>
                      <p className="text-gray-600">
                        Met ons netwerk van aannemers en ervaring kunnen wij efficiënter en goedkoper renoveren dan particulieren.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welke Woningen Kopen Wij?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij zijn geïnteresseerd in alle soorten woningen die renovatie nodig hebben:
                </p>

                <div className="space-y-4 mb-10">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Kleine Renovaties</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Verouderde keuken of badkamer</li>
                      <li>• Schilderwerk en kleine herstellingen nodig</li>
                      <li>• Verouderde vloerbedekking of tegels</li>
                      <li>• Tuin die onderhoud nodig heeft</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Middelgrote Renovaties</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Verouderde elektriciteit of leidingen</li>
                      <li>• Vochtige muren of kelders</li>
                      <li>• Oude verwarmingssystemen</li>
                      <li>• Verouderde ramen en deuren</li>
                      <li>• Algemeen onderhoud achterstallig</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Grote Renovaties</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Structurele problemen</li>
                      <li>• Dakwerken noodzakelijk</li>
                      <li>• Volledige renovatie nodig</li>
                      <li>• Woningen die jarenlang leeg hebben gestaan</li>
                      <li>• Bouwvallige woningen</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Hoe Bepalen Wij De Prijs?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Ons bod is gebaseerd op een eerlijke inschatting van de marktwaarde na renovatie, minus de renovatiekosten en onze marge. Wij zijn transparant in deze berekening:
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <h3 className="text-lg font-bold mb-3">Voorbeeld Berekening:</h3>
                  <div className="space-y-2 text-gray-800">
                    <p>Marktwaarde na renovatie: €250.000</p>
                    <p>Geschatte renovatiekosten: -€50.000</p>
                    <p>Onze marge en risico: -€30.000</p>
                    <p className="font-bold pt-2 border-t border-blue-200">Ons bod: €170.000</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">
                    Dit is een vereenvoudigd voorbeeld. Elk pand is uniek en wordt individueel beoordeeld.
                  </p>
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  Door zelf te renoveren en doorverkopen nemen wij het financiële risico op ons. Onverwachte kosten, marktschommelingen, en de tijd die het kost om te renoveren en doorverkopen zijn allemaal risico's die wij dragen, niet u.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Het Proces: Simpel en Snel
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag Indienen</h3>
                      <p className="text-gray-700">
                        Vul ons formulier in en beschrijf de staat van uw woning zo eerlijk mogelijk. Foto's zijn welkom maar niet verplicht.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Inspectie</h3>
                      <p className="text-gray-700">
                        Wij komen langs voor een grondige inspectie. We bekijken alles: van kelder tot zolder, van elektriciteit tot dakconstructie.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Transparant Bod</h3>
                      <p className="text-gray-700">
                        Binnen 7 dagen ontvangt u een gedetailleerd bod met toelichting op onze inschatting van renovatiekosten en marktwaarde.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris en Afhandeling</h3>
                      <p className="text-gray-700">
                        Bij akkoord regelen wij de notarisafspraak. U hoeft verder niets te doen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg my-10">
                  <h3 className="text-xl font-bold mb-4">Actief in Heel België</h3>
                  <p className="text-gray-700 mb-4">
                    Wij kopen renovatiewoningen in alle provincies, van <Link href="/provincie/vlaams-brabant" className="text-blue-600 hover:underline">Vlaams-Brabant</Link> tot <Link href="/provincie/limburg" className="text-blue-600 hover:underline">Limburg</Link>. Of uw woning nu in het centrum van een stad ligt of op het platteland, wij zijn geïnteresseerd.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Renovatiewoningen
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Is het niet beter om eerst te renoveren en dan te verkopen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Niet altijd. Renoveren kost veel geld vooraf, en u verdient dit vaak niet volledig terug in de verkoopprijs. Daarnaast duurt het proces maanden langer, brengt het stress met zich mee, en loopt u het risico op onverwachte kosten.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Ons bod houdt rekening met de renovatiekosten, maar u bent sneller van uw woning af en hoeft geen risico te nemen of vooraf te investeren.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Kopen jullie ook woningen die echt bouwvallig zijn?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, wij zijn geïnteresseerd in woningen in alle staten, ook als ze bouwvallig zijn of jarenlang leeg hebben gestaan. Hoe slechter de staat, hoe lager natuurlijk het bod, maar wij sluiten niets uit. Neem gerust contact op voor een vrijblijvende inspectie.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Moet ik de woning eerst opruimen of schoonmaken?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Nee, dat is niet nodig. Wij kopen de woning inclusief alle eigendommen en inboedel, tenzij u bepaalde spullen zelf wilt meenemen. Wij regelen het ontruimen en opruimen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Hoe weet ik of jullie bod eerlijk is?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Wij geven een transparante toelichting bij ons bod, waarin we uitleggen hoe we tot onze inschatting komen. U bent vrij om offertes van aannemers op te vragen om onze renovatieschatting te verifiëren. Ook kunt u ons bod vergelijken met andere opties, zoals een traditionele verkoop via een makelaar.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Wat voor soort woningen zijn jullie NIET geïnteresseerd in?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Wij zijn in principe in alle woningen geïnteresseerd, maar elk pand moet natuurlijk financieel haalbaar zijn om te renoveren en door te verkopen. Woningen met zeer specifieke beperkingen (bijvoorbeeld erfpacht met ongunstige voorwaarden, of woningen in gebieden met zeer lage vraag) kunnen soms niet aantrekkelijk genoeg zijn. Maar in de meeste gevallen kunnen we wel een oplossing vinden. Neem gerust contact op!
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om uw renovatiewoning zonder gedoe te verkopen? Vraag vandaag nog een vrijblijvende waardering aan.
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
