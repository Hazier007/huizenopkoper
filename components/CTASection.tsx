import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTASection({
  title = 'Klaar om uw pand te verkopen?',
  description = 'Ontvang binnen 48 uur een eerlijk bod op uw woning. Geen verplichtingen, volledig vrijblijvend.',
  buttonText = 'Pand indienen',
  buttonHref = '/verkopen',
}: CTASectionProps) {
  return (
    <section className="bg-blue-600 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            {description}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href={buttonHref}>
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
