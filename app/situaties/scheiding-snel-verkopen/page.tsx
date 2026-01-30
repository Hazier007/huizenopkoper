import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Shield, Users, ArrowRight, Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Woning Verkopen Bij Scheiding | Snelle & Discrete Verkoop',
  description: 'Woning verkopen bij een scheiding? Wij bieden een snelle, discrete oplossing. Binnen 7 dagen een eerlijk bod, zonder makelaar en met respect voor uw situatie.',
  keywords: 'scheiding woning verkopen, huis verkopen bij scheiding, echtscheiding woning verkopen België, snelle verkoop scheiding',
  openGraph: {
    title: 'Woning Verkopen Bij Scheiding - Snel & Discreet',
    description: 'Bij een scheiding snel uw woning verkopen? Discrete afhandeling, eerlijk bod binnen 7 dagen, zonder makelaar.',
  },
};

export default function ScheidingSnelVerkopenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Woning Verkopen Bij Scheiding
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Uw Woning Snel Verkopen Bij een Scheiding
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Een scheiding is emotioneel zwaar. Wij nemen de zorgen over de woning uit uw handen met een snelle, discrete verkoop en eerlijk bod binnen 7 dagen.
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
                  Waarom Snel Verkopen Bij Een Scheiding Belangrijk Is
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Bij een scheiding wilt u vaak zo snel mogelijk verder met uw leven. De gemeenschappelijke woning is vaak het grootste financiële obstakel in dit proces. Een traditionele verkoop via een makelaar kan maanden duren, vereist bezichtigingen die emotioneel belastend zijn, en brengt onzekerheid met zich mee over wanneer u uw geld ontvangt.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Daarnaast kan een lopende verkoopprocedure spanning veroorzaken tussen beide partners. Wie regelt de bezichtigingen? Wie betaalt voor de opknapkosten? Wie neemt welke meubels mee? Deze vragen kunnen het scheidingsproces verder vertragen en compliceren.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Onze Discrete en Snelle Oplossing
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Wij begrijpen dat u na een scheiding behoefte heeft aan rust, duidelijkheid en een snelle afsluiting. Daarom bieden wij:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Snelle Afhandeling</h3>
                      <p className="text-gray-600">
                        Binnen 7 dagen een eerlijk bod, en binnen 3-6 weken kan de volledige transactie afgerond zijn via de notaris.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Shield className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Discrete Service</h3>
                      <p className="text-gray-600">
                        Geen openbare advertenties, geen bezichtigingen met vreemden. Eén inspectie en klaar.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Users className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">Neutrale Partij</h3>
                      <p className="text-gray-600">
                        Wij werken met beide partners samen en zorgen voor een eerlijke verdeling via de notaris.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="pt-6">
                      <Heart className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">In Huidige Staat</h3>
                      <p className="text-gray-600">
                        Geen discussie over wie wat opknapt. Wij nemen de woning over zoals deze is, met of zonder meubels.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Hoe Werkt Het Bij Een Scheiding?
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Aanvraag Door Één of Beide Partners</h3>
                      <p className="text-gray-700">
                        Eén van beide partners kan contact opnemen. Wij communiceren respectvol met beide partijen en zorgen dat iedereen op de hoogte blijft.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Discrete Bezichtiging</h3>
                      <p className="text-gray-700">
                        Wij plannen één bezichtiging op een moment dat beide partners schikt, of afzonderlijk indien gewenst.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Eerlijk en Transparant Bod</h3>
                      <p className="text-gray-700">
                        Beide partners ontvangen hetzelfde transparante bod met toelichting. Geen verrassingen of verborgen kosten.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notaris Regelt de Verdeling</h3>
                      <p className="text-gray-700">
                        Bij akkoord van beide partijen gaan we naar de notaris. De notaris zorgt voor correcte verdeling van de opbrengst, rekening houdend met eventuele hypotheek en scheidingsafspraken.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Snelle Uitbetaling</h3>
                      <p className="text-gray-700">
                        Na ondertekening wordt het bedrag snel uitbetaald volgens de afspraken die gemaakt zijn in de scheiding.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10">
                  <p className="text-lg text-gray-800">
                    <strong>Belangrijk:</strong> Voor de verkoop is toestemming van beide partners nodig. Wij kunnen niet bemiddelen in scheidingsafspraken, maar werken graag samen met uw advocaat of mediator om het verkoopproces zo soepel mogelijk te laten verlopen.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelvoorkomende Situaties Bij Scheiding
                </h2>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Woning Met Resterende Hypotheek</h3>
                  <p className="text-gray-700 mb-4">
                    Heeft uw woning nog een hypotheek? De notaris zorgt ervoor dat de hypotheek eerst wordt afgelost uit de verkoopopbrengst. Het resterende bedrag wordt verdeeld volgens uw scheidingsafspraken.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Eén Partner Woont Nog in de Woning</h3>
                  <p className="text-gray-700 mb-4">
                    Woont één van beide partners nog in de woning? Wij kunnen flexibel zijn met de opleverdatum, zodat er voldoende tijd is om een nieuwe woonplek te vinden. Dit kan besproken worden tijdens het proces.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">Meningsverschil Over de Waarde</h3>
                  <p className="text-gray-700 mb-4">
                    Zijn beide partners het niet eens over de waarde van de woning? Ons transparante bod met toelichting kan helpen om tot een realistisch beeld te komen. U kunt ons bod ook gebruiken als referentie bij andere verkoopopties.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                  Voordelen Van Onze Aanpak
                </h2>

                <ul className="space-y-4 mb-10">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">✓</div>
                    <div>
                      <strong className="text-gray-900">Geen Emotionele Bezichtigingen:</strong>
                      <span className="text-gray-700"> Eén inspectie en klaar. Geen vreemden die door uw huis lopen terwijl u emotioneel kwetsbaar bent.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">✓</div>
                    <div>
                      <strong className="text-gray-900">Snelle Financiële Duidelijkheid:</strong>
                      <span className="text-gray-700"> Binnen 7 dagen weet u hoeveel de woning waard is en wanneer u uw geld kunt ontvangen.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">✓</div>
                    <div>
                      <strong className="text-gray-900">Geen Makelaar Nodig:</strong>
                      <span className="text-gray-700"> Bespaar makelaarskosten en tijdverlies. Wij regelen alles rechtstreeks.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">✓</div>
                    <div>
                      <strong className="text-gray-900">Overal in België:</strong>
                      <span className="text-gray-700"> Van <Link href="/provincie/oost-vlaanderen" className="text-blue-600 hover:underline">Oost-Vlaanderen</Link> tot <Link href="/provincie/west-vlaanderen" className="text-blue-600 hover:underline">West-Vlaanderen</Link>, wij helpen u overal.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">✓</div>
                    <div>
                      <strong className="text-gray-900">Discrete Afhandeling:</strong>
                      <span className="text-gray-700"> Geen publieke advertenties of borden voor uw deur. Volledige privacy gegarandeerd.</span>
                    </div>
                  </li>
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Veelgestelde Vragen Over Verkoop Bij Scheiding
                </h2>
              </div>

              <Accordion type="single" collapsible className="mb-12">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Moeten beide partners akkoord gaan met de verkoop?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, voor de verkoop van een gemeenschappelijke woning is toestemming van beide partners vereist. Wij communiceren transparant met beide partijen en zorgen dat iedereen op dezelfde lijn zit voordat we verder gaan met het proces.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Wat gebeurt er met de hypotheek?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Bij de notarisakte wordt eerst de eventuele resterende hypotheek afgelost uit de verkoopopbrengst. Het resterende bedrag wordt vervolgens verdeeld volgens uw scheidingsafspraken. Dit wordt allemaal correct afgehandeld door de notaris.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Kan één partner nog in de woning blijven wonen tot de verkoop?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Ja, wij kunnen flexibel zijn met de opleverdatum. Dit kan besproken worden tijdens het proces, zodat er voldoende tijd is om alternatieve woonruimte te vinden. De precieze afspraken worden vastgelegd in het verkoopcontract.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Hoe wordt de verkoopopbrengst verdeeld?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      De verdeling van de verkoopopbrengst wordt geregeld volgens uw scheidingsafspraken en wordt formeel vastgelegd bij de notaris. Wij kunnen geen bemiddeling doen in deze verdeling, maar werken graag samen met uw advocaat of mediator om alles correct af te handelen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Is uw service echt discreet?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      Absoluut. Er komen geen advertenties, geen borden voor de deur, en geen reeks bezichtigingen met vreemden. Wij doen één inspectie en verder wordt alles discreet afgehandeld via de notaris. Uw privacy staat bij ons voorop.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Klaar om snel verder te gaan met uw leven? Vraag vandaag nog een vrijblijvende waardering aan.
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
