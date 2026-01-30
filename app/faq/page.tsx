import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Home, Clock, FileText, Euro, Shield, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen | Huizenopkoper.be FAQ',
  description: 'Antwoorden op veelgestelde vragen over woning verkopen, het proces, prijsbepaling, juridische aspecten en meer. Alles wat u moet weten over snel uw huis verkopen.',
  keywords: 'FAQ woning verkopen, veelgestelde vragen huisverkoop, huis verkopen vragen, huizenopkoper België',
  openGraph: {
    title: 'Veelgestelde Vragen - Alles Over Snel Uw Woning Verkopen',
    description: 'Vind antwoorden op al uw vragen over woning verkopen, het proces, prijzen, juridische zaken en meer.',
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Veelgestelde Vragen
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vind snel antwoorden op al uw vragen over het verkopen van uw woning, het proces, prijsbepaling en meer.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="border-2 hover:border-blue-200 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">Algemeen</h3>
                    <p className="text-sm text-gray-600">Basis vragen over onze service</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-200 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">Proces</h3>
                    <p className="text-sm text-gray-600">Hoe het verkoopproces werkt</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-200 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <Euro className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">Prijs</h3>
                    <p className="text-sm text-gray-600">Prijsbepaling en kosten</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Home className="h-8 w-8 text-blue-600" />
                  Algemene Vragen
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      Wie zijn jullie en wat doen jullie?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Wij zijn een professionele huizenopkoper die actief is in heel België. Wij kopen woningen direct van particulieren, zonder tussenkomst van een makelaar. Dit betekent een sneller proces, minder kosten, en meer zekerheid voor u.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Wij zijn gespecialiseerd in situaties waar snelheid of gemak belangrijk is: erfenissen, scheidingen, renovatiewoningen, verhuurde panden, en meer. Bekijk onze <Link href="/werking" className="text-blue-600 hover:underline">werkwijze</Link> voor meer informatie.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      Waarom zou ik aan jullie verkopen in plaats van via een makelaar?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        <strong>Snelheid:</strong> Binnen 7 dagen een bod, binnen weken afgehandeld. Een makelaar duurt vaak maanden.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        <strong>Zekerheid:</strong> Geen risico dat kopers afhaken of financiering niet rondkrijgen. Ons bod is definitief.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        <strong>Geen kosten:</strong> Geen makelaarscommissie van 3-5%. Wij betalen alle kosten.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Geen gedoe:</strong> Geen bezichtigingen, geen opknapwerk, geen wachten. Wij kopen zoals het is.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      Is jullie service betrouwbaar en veilig?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Absoluut. Alle transacties verlopen via een officiële Belgische notaris. Dit waarborgt de juridische correctheid en veiligheid van de verkoop. De notaris controleert alle documenten en zorgt ervoor dat de eigendomsoverdracht correct verloopt.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        U ontvangt pas geld nadat alle documenten bij de notaris zijn ondertekend. Dit is dezelfde procedure als bij elke andere woningverkoop in België.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      In welke regio's zijn jullie actief?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Wij zijn actief in heel België. Van <Link href="/provincie/antwerpen" className="text-blue-600 hover:underline">Antwerpen</Link> tot <Link href="/provincie/luxemburg" className="text-blue-600 hover:underline">Luxemburg</Link>, van <Link href="/provincie/west-vlaanderen" className="text-blue-600 hover:underline">West-Vlaanderen</Link> tot <Link href="/provincie/luik" className="text-blue-600 hover:underline">Luik</Link>.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Of uw woning nu in een grote stad ligt of in een klein dorp, wij komen graag langs voor een vrijblijvende inspectie.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">
                      Welke soorten woningen kopen jullie?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Wij kopen alle soorten woningen:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Huizen (rijwoningen, vrijstaande, halfopen)</li>
                        <li>• <Link href="/situaties/appartement-verkopen" className="text-blue-600 hover:underline">Appartementen</Link> (studio's tot penthouses)</li>
                        <li>• <Link href="/situaties/renovatie-woning-verkopen" className="text-blue-600 hover:underline">Renovatiewoningen</Link> in elke staat</li>
                        <li>• <Link href="/situaties/verhuurde-woning-verkopen" className="text-blue-600 hover:underline">Verhuurde woningen</Link></li>
                        <li>• <Link href="/situaties/handelspand-verkopen" className="text-blue-600 hover:underline">Handelspanden</Link> en commercieel vastgoed</li>
                        <li>• <Link href="/situaties/erfeniswoning-verkopen" className="text-blue-600 hover:underline">Erfeniswoningen</Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  Het Proces
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="proc-1">
                    <AccordionTrigger className="text-left">
                      Hoe werkt het proces precies?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-700">
                        <div>
                          <strong>Stap 1:</strong> U vult ons <Link href="/verkopen" className="text-blue-600 hover:underline">aanvraagformulier</Link> in met informatie over uw woning.
                        </div>
                        <div>
                          <strong>Stap 2:</strong> Wij nemen contact op en plannen een vrijblijvende bezichtiging.
                        </div>
                        <div>
                          <strong>Stap 3:</strong> Na de inspectie ontvangt u binnen 7 dagen een eerlijk en transparant bod.
                        </div>
                        <div>
                          <strong>Stap 4:</strong> Bij akkoord regelen wij een afspraak bij de notaris.
                        </div>
                        <div>
                          <strong>Stap 5:</strong> Na ondertekening wordt het bedrag snel uitbetaald.
                        </div>
                        <p className="pt-2">
                          Lees meer op onze <Link href="/werking" className="text-blue-600 hover:underline">werkwijze pagina</Link>.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="proc-2">
                    <AccordionTrigger className="text-left">
                      Hoe lang duurt het hele proces?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Van aanvraag tot uitbetaling duurt het gemiddeld 3-6 weken, afhankelijk van de beschikbaarheid van de notaris en eventuele complexiteit (bijvoorbeeld meerdere erfgenamen).
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Timeline:</strong>
                      </p>
                      <ul className="space-y-2 text-gray-700 mt-2">
                        <li>• Week 1: Aanvraag, bezichtiging, bod</li>
                        <li>• Week 2-3: Akkoord, notaris afspraak plannen</li>
                        <li>• Week 4-6: Ondertekening en uitbetaling</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="proc-3">
                    <AccordionTrigger className="text-left">
                      Moet ik mijn woning eerst opknappen of opruimen?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Nee, absoluut niet. Wij kopen uw woning in de huidige staat, inclusief alle eigendommen en inboedel. U hoeft niets op te knappen, te schilderen, te renoveren of op te ruimen.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Wij regelen het ontruimen en eventuele renovaties zelf. Dit bespaart u tijd, geld en stress.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="proc-4">
                    <AccordionTrigger className="text-left">
                      Is de bezichtiging echt vrijblijvend?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Ja, volledig vrijblijvend. U bent op geen enkele manier verplicht om ons bod te accepteren. Na de bezichtiging ontvangt u een bod, en u beslist in alle rust of u dit wilt accepteren of niet. Geen verplichtingen, geen druk.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="proc-5">
                    <AccordionTrigger className="text-left">
                      Kan ik mijn woning nog bewonen tijdens het proces?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Ja, u kunt in uw woning blijven wonen tot de notarisakte is gepasseerd. Wij kunnen ook flexibel zijn met de opleverdatum als u meer tijd nodig heeft om een nieuwe woonplek te vinden. Dit kan besproken worden tijdens het proces.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Euro className="h-8 w-8 text-blue-600" />
                  Prijs en Kosten
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="price-1">
                    <AccordionTrigger className="text-left">
                      Hoe bepalen jullie de prijs van mijn woning?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Wij bekijken verschillende factoren:
                      </p>
                      <ul className="space-y-2 text-gray-700 mb-3">
                        <li>• Locatie en omgeving</li>
                        <li>• Grootte en indeling</li>
                        <li>• Staat van het pand</li>
                        <li>• Huidige marktwaarde in de regio</li>
                        <li>• Eventuele renovatiekosten</li>
                        <li>• Tijd en risico om door te verkopen</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed">
                        Wij geven altijd een transparante toelichting bij ons bod, zodat u begrijpt hoe we tot de prijs komen.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price-2">
                    <AccordionTrigger className="text-left">
                      Krijg ik minder dan via een makelaar?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Mogelijk wel, maar dit hangt af van uw situatie. Wij bieden gemak en snelheid in ruil voor een marktconforme prijs. Vergeet niet:
                      </p>
                      <ul className="space-y-2 text-gray-700 mb-3">
                        <li>• Via een makelaar betaalt u 3-5% commissie</li>
                        <li>• Vaak moet u eerst renoveren of opknappen (kosten €€€)</li>
                        <li>• Het duurt maanden langer</li>
                        <li>• Risico dat kopers afhaken</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed">
                        In veel gevallen komt u netto op hetzelfde of zelfs beter uit door aan ons te verkopen, vooral als u de tijd en stress meerekent.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price-3">
                    <AccordionTrigger className="text-left">
                      Zijn er kosten voor mij?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        De enige kosten die u heeft zijn de standaard notariskosten voor de eigendomsoverdracht. Deze zijn wettelijk vastgelegd en gelden voor elke woningverkoop in België, ongeacht of u via ons of een makelaar verkoopt.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Wij rekenen géén commissie, géén bemiddelingskosten, en géén verborgen kosten. De bezichtiging is gratis en vrijblijvend.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price-4">
                    <AccordionTrigger className="text-left">
                      Kan ik onderhandelen over het bod?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Ons bod is gebaseerd op een eerlijke en transparante analyse van uw woning. In sommige gevallen is er ruimte voor onderhandeling, bijvoorbeeld als er nieuwe informatie naar voren komt. Maar in principe doen wij direct ons beste en finale bod, zodat u snel duidelijkheid heeft.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price-5">
                    <AccordionTrigger className="text-left">
                      Wat gebeurt er met de hypotheek?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Als uw woning nog een hypotheek heeft, wordt deze automatisch afgelost uit de verkoopopbrengst bij de notaris. Het resterende bedrag ontvangt u. De notaris regelt dit correct en zorgt dat de hypotheek wordt doorgehaald.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  Juridisch en Administratief
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="legal-1">
                    <AccordionTrigger className="text-left">
                      Hoe zit het juridisch in elkaar?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Alle transacties verlopen via een officiële Belgische notaris. De notaris is een onafhankelijke en onpartijdige publieke functionaris die de juridische kant van de verkoop regelt:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Controleert eigendomsdocumenten</li>
                        <li>• Regelt hypotheekzaken</li>
                        <li>• Zorgt voor correcte eigendomsoverdracht</li>
                        <li>• Verwerkt registratierechten</li>
                        <li>• Waarborgt veilige betaling</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal-2">
                    <AccordionTrigger className="text-left">
                      Welke documenten heb ik nodig?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Voor de notarisakte heeft u nodig:
                      </p>
                      <ul className="space-y-2 text-gray-700 mb-3">
                        <li>• Identiteitsbewijs</li>
                        <li>• Eigendomsakte (titel van eigendom)</li>
                        <li>• EPC-certificaat (energieprestatiecertificaat)</li>
                        <li>• Stedenbouwkundige informatie</li>
                        <li>• Eventuele hypotheekdocumenten</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed">
                        De notaris kan u helpen met het verkrijgen van missende documenten.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal-3">
                    <AccordionTrigger className="text-left">
                      Wat is een EPC en heb ik dat nodig?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Een EPC (Energieprestatiecertificaat) is verplicht bij elke woningverkoop in België. Het toont de energie-efficiëntie van uw woning. Als u dit nog niet heeft, moet u dit laten opmaken door een erkend EPC-deskundige.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Wij kunnen u adviseren over waar u dit kunt laten opmaken. De kosten zijn meestal tussen €150 en €300, afhankelijk van de grootte van uw woning.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal-4">
                    <AccordionTrigger className="text-left">
                      Wat als er meerdere eigenaars zijn?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Als er meerdere eigenaars zijn (bijvoorbeeld bij een <Link href="/situaties/erfeniswoning-verkopen" className="text-blue-600 hover:underline">erfenis</Link> of <Link href="/situaties/scheiding-snel-verkopen" className="text-blue-600 hover:underline">scheiding</Link>), moeten alle eigenaars akkoord gaan met de verkoop. De notaris zorgt ervoor dat iedereen correct betrokken wordt en zijn/haar deel ontvangt. Wij communiceren transparant met alle betrokken partijen.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal-5">
                    <AccordionTrigger className="text-left">
                      Wat als er hypotheeklasten zijn die hoger zijn dan de verkoopprijs?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Dit heet een "onderwaterhypotheek". In dit geval moet het verschil tussen de verkoopopbrengst en de hypotheekschuld bijbetaald worden. Dit is een complexe situatie en wij adviseren altijd om dit eerst met uw bank te bespreken. In sommige gevallen kan de bank meewerken aan een schuldverlichting.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  Specifieke Situaties
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="spec-1">
                    <AccordionTrigger className="text-left">
                      Ik heb een woning geërfd, kunnen jullie helpen?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Ja, wij hebben veel ervaring met erfeniswoningen. Bekijk onze speciale pagina over <Link href="/situaties/erfeniswoning-verkopen" className="text-blue-600 hover:underline">erfeniswoning verkopen</Link> voor meer informatie.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Wij begrijpen dat een erfenis emotioneel zwaar kan zijn, en zorgen voor een respectvolle en professionele afhandeling waarbij alle erfgenamen correct betrokken worden.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="spec-2">
                    <AccordionTrigger className="text-left">
                      Ik ga scheiden, kunnen jullie de woning snel overnemen?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Ja, wij bieden een discrete en snelle oplossing bij scheiding. Bekijk onze pagina over <Link href="/situaties/scheiding-snel-verkopen" className="text-blue-600 hover:underline">woning verkopen bij scheiding</Link>.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Beide partners moeten wel akkoord gaan met de verkoop. Wij communiceren transparant met beide partijen en de notaris regelt de correcte verdeling.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="spec-3">
                    <AccordionTrigger className="text-left">
                      Mijn woning heeft veel onderhoud nodig, is dat een probleem?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Helemaal niet! Wij zijn juist gespecialiseerd in <Link href="/situaties/renovatie-woning-verkopen" className="text-blue-600 hover:underline">renovatiewoningen</Link>. Of uw woning nu kleine aanpassingen of een volledige renovatie nodig heeft, wij kopen het in de huidige staat.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        U bespaart duizenden euro's aan renovatiekosten en maanden aan werk en stress.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="spec-4">
                    <AccordionTrigger className="text-left">
                      De woning is verhuurd, kunnen jullie die nog kopen?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Ja! Wij kopen ook <Link href="/situaties/verhuurde-woning-verkopen" className="text-blue-600 hover:underline">verhuurde woningen</Link>. Wij kunnen de woning overnemen met het huurcontract, of wachten tot het contract beëindigd is.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        De huurder heeft recht op kennisgeving van eigendomswissel, maar dit regelt de notaris correct.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="spec-5">
                    <AccordionTrigger className="text-left">
                      Ik heb een appartement, kopen jullie dat ook?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">
                        Ja, wij kopen alle soorten <Link href="/situaties/appartement-verkopen" className="text-blue-600 hover:underline">appartementen</Link>. Ook bij hoge syndicus kosten, ongunstige ligging, of andere uitdagingen. Wij houden rekening met de VME situatie in onze prijsbepaling.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vraag Niet Beantwoord?
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Staat uw vraag er niet bij? Neem gerust <Link href="/contact" className="text-blue-600 hover:underline">contact</Link> met ons op. Wij helpen u graag verder met persoonlijk advies voor uw specifieke situatie.
                </p>
                <Button asChild size="lg">
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
