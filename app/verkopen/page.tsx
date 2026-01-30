import { Metadata } from 'next';
import { TwoStepLeadForm } from '@/components/TwoStepLeadForm';
import { CheckCircle2, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pand verkopen | Huizenopkoper.be',
  description: 'Verkoop uw woning snel en eerlijk. Dien uw pand in via ons online formulier en ontvang binnen 48 uur een vrijblijvend bod.',
  openGraph: {
    title: 'Pand verkopen | Huizenopkoper.be',
    description: 'Verkoop uw woning snel en eerlijk. Ontvang binnen 48 uur een bod.',
  },
};

export default function VerkopenPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Verkoop uw pand
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Vul onderstaand formulier in en ontvang binnen 48 uur een
              eerlijk en vrijblijvend bod op uw woning.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Reactie binnen 48u</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">100% vrijblijvend</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Geen kosten</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <TwoStepLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
