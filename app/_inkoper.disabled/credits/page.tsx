'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, CreditCard, Sparkles, Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface CreditPackage {
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  features: string[];
}

const creditPackages: CreditPackage[] = [
  {
    name: 'Starter',
    credits: 5,
    price: 99,
    features: ['5 leads claimen', 'Volledige contactgegevens', "Foto's inclusief", '30 dagen geldig'],
  },
  {
    name: 'Professional',
    credits: 15,
    price: 249,
    popular: true,
    features: ['15 leads claimen', 'Volledige contactgegevens', "Foto's inclusief", '90 dagen geldig', '15% korting'],
  },
  {
    name: 'Enterprise',
    credits: 50,
    price: 699,
    features: ['50 leads claimen', 'Volledige contactgegevens', "Foto's inclusief", '180 dagen geldig', '30% korting', 'Prioriteit support'],
  },
];

export default function CreditsPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const { data } = await supabase.rpc('validate_buyer_token', {
        p_token: token,
        p_consume: false,
      } as any);

      if (data && (data as any).success) {
        setTokenInfo(data);
      }
    } catch (error) {
      console.error('Error validating token:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link
            href={token ? `/inkoper/leads/${(tokenInfo as any)?.lead_id}/token?token=${token}` : '/inkoper/dashboard'}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credits Pakketten</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Koop credits om leads te claimen en toegang te krijgen tot volledige contactgegevens
          </p>
        </div>

        {tokenInfo && (
          <Alert className="mb-8 bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">Welkom {tokenInfo.company_name}!</AlertTitle>
            <AlertDescription className="text-blue-800">
              Na aankoop van credits kun je direct leads claimen. Activeer je account om te beginnen.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {creditPackages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${
                pkg.popular
                  ? 'border-blue-500 border-2 shadow-lg scale-105'
                  : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Meest Populair
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-5xl font-bold">€{pkg.price}</span>
                </div>
                <CardDescription className="text-lg">
                  {pkg.credits} credits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Koop Nu
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Hoe werkt het?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Koop Credits</h3>
                <p className="text-sm text-gray-600">
                  Kies een pakket dat bij jouw behoeften past
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Bekijk Leads</h3>
                <p className="text-sm text-gray-600">
                  Browse door beschikbare leads in jouw regio
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Claim & Contact</h3>
                <p className="text-sm text-gray-600">
                  Gebruik 1 credit per lead voor volledige gegevens
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Vragen over credits of pakketten?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Neem contact op
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
