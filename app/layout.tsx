import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Huizenopkoper.be - Verkoop Uw Woning Snel en Eerlijk',
  description: 'Wij kopen uw woning, appartement of pand direct op. Ontvang binnen 48 uur een eerlijk bod. Geen makelaarskosten, snelle afhandeling in heel België.',
  keywords: ['huizen opkoper', 'woning verkopen', 'huis verkopen België', 'snelle verkoop', 'huis verkopen zonder makelaar'],
  authors: [{ name: 'Huizenopkoper.be' }],
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://huizenopkoper.be',
    siteName: 'Huizenopkoper.be',
    title: 'Huizenopkoper.be - Verkoop Uw Woning Snel en Eerlijk',
    description: 'Wij kopen uw woning direct op. Ontvang binnen 48 uur een eerlijk bod. Geen makelaarskosten, snelle afhandeling.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huizenopkoper.be - Verkoop Uw Woning Snel en Eerlijk',
    description: 'Wij kopen uw woning direct op. Ontvang binnen 48 uur een eerlijk bod.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
