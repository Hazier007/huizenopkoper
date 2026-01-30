import { FAQ } from '@/components/FAQSection';

export const provinceFAQs: FAQ[] = [
  {
    question: 'Hoe lang duurt het voordat ik een bod ontvang?',
    answer: 'Binnen 48 uur na het indienen van uw aanvraag nemen wij contact met u op. Na een eventuele bezichtiging ontvangt u doorgaans binnen enkele dagen een concreet bod op uw woning.',
  },
  {
    question: 'Welke kosten moet ik betalen?',
    answer: 'U betaalt geen enkele kosten. Geen makelaarskosten, geen advertentiekosten. Het bod dat wij u geven is het bedrag dat u ontvangt. Alle kosten voor de afhandeling nemen wij voor onze rekening.',
  },
  {
    question: 'Kopen jullie ook woningen die opknapwerk nodig hebben?',
    answer: 'Ja, absoluut. Wij kopen woningen in elke staat. Of uw woning nu instapklaar is of ingrijpende renovaties nodig heeft, wij zijn geïnteresseerd. U hoeft niets te investeren in verbouwingen.',
  },
  {
    question: 'Is het bod vrijblijvend?',
    answer: 'Ja, ons bod is 100% vrijblijvend. U beslist volledig zelf of u ons bod accepteert. Er zitten geen verplichtingen aan vast en u kunt op elk moment stoppen met het verkoopproces.',
  },
  {
    question: 'Hoe snel kan de verkoop afgerond worden?',
    answer: 'Als u akkoord gaat met ons bod, kunnen we de verkoop binnen 3 tot 4 weken afronden via de notaris. In urgente gevallen is een nog snellere afhandeling mogelijk. Dit bespreken we graag met u.',
  },
];

export const cityFAQs = (cityName: string, provinceName: string): FAQ[] => [
  {
    question: `Welke types woningen kopen jullie in ${cityName}?`,
    answer: `Wij kopen alle types woningen in ${cityName}: eengezinswoningen, appartementen, studio's, bungalows, villa's en rijwoningen. Of uw woning nu groot of klein is, modern of klassiek, wij zijn geïnteresseerd.`,
  },
  {
    question: `Hoe wordt de waarde van mijn woning in ${cityName} bepaald?`,
    answer: `De waarde wordt bepaald op basis van verschillende factoren: de locatie in ${cityName}, de grootte, de staat van het pand, recente verkoopprijzen in de buurt en de huidige marktomstandigheden in ${provinceName}. Na een bezichtiging maken we een eerlijke inschatting.`,
  },
  {
    question: `Moet ik mijn woning in ${cityName} eerst opknappen?`,
    answer: `Nee, dat hoeft absoluut niet. Wij kopen woningen in elke staat. U hoeft geen geld te investeren in renovaties of opknapwerk. Wij nemen de woning over zoals deze is en houden rekening met eventuele werkzaamheden in ons bod.`,
  },
  {
    question: `Wat als ik snel mijn woning in ${cityName} moet verkopen?`,
    answer: `Dat is precies waar wij voor zorgen. Door een traditionele verkoop via een makelaar kan het maanden duren. Wij kunnen het proces versnellen: binnen 48 uur contact, binnen een week een bod, en binnen 3-4 weken de verkoop afronden bij de notaris.`,
  },
  {
    question: `Komen jullie ook kijken naar mijn woning in ${cityName}?`,
    answer: `Ja, in de meeste gevallen plannen we een bezichtiging in om een goede inschatting te kunnen maken. Dit is echter geen verplichting. In sommige gevallen kunnen we ook op basis van foto's en documenten een eerste indicatie geven.`,
  },
  {
    question: `Wat gebeurt er na acceptatie van het bod?`,
    answer: `Na acceptatie van ons bod regelen wij een afspraak bij de notaris. De notaris verzorgt alle juridische zaken en de eigendomsoverdracht. U ontvangt het volledige bedrag op het moment van de notariële akte, en de sleutels worden overgedragen.`,
  },
];
