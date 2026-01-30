import Link from 'next/link';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Huizenopkoper.be</span>
            </Link>
            <p className="text-sm text-gray-600">
              Wij kopen uw woning snel en tegen een eerlijke prijs.
              Geen makelaarskosten, geen gedoe.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/werking" className="text-gray-600 hover:text-blue-600">
                  Hoe werkt het?
                </Link>
              </li>
              <li>
                <Link href="/verkopen" className="text-gray-600 hover:text-blue-600">
                  Pand verkopen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Juridisch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacybeleid
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-blue-600">
                  Cookiebeleid
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@huizenopkoper.be" className="hover:text-blue-600">
                  info@huizenopkoper.be
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <a href="tel:+32477190918" className="hover:text-blue-600">
                  +32 477 19 09 18
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  België
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Huizenopkoper.be. Alle rechten voorbehouden.</p>
          <p className="mt-1">BTW BE 0672.948.386</p>
        </div>
      </div>
    </footer>
  );
}
