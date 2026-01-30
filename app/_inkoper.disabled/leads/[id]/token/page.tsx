import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Home,
  Calendar,
  ArrowRight,
  Ruler,
  Bed,
  Building,
  Clock,
  Mail,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/server';

interface TokenLeadPageProps {
  params: {
    id: string;
  };
  searchParams: {
    token?: string;
  };
}

export default async function TokenLeadPage({ params, searchParams }: TokenLeadPageProps) {
  const token = searchParams.token;

  if (!token) {
    notFound();
  }

  const { data: validationResult } = await supabase.rpc('validate_buyer_token', {
    p_token: token,
    p_consume: false,
  } as any);

  if (!validationResult || !(validationResult as any).success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-center text-2xl">Token Ongeldig</CardTitle>
            <CardDescription className="text-center">
              {(validationResult as any)?.error === 'token_expired'
                ? 'Deze invite link is verlopen'
                : (validationResult as any)?.error === 'buyer_already_activated'
                ? 'Je account is al geactiveerd. Log in met je email.'
                : 'Deze invite link is niet geldig of al gebruikt'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(validationResult as any)?.error === 'buyer_already_activated' ? (
              <Button asChild className="w-full">
                <Link href="/inkoper/login">Ga naar Login</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Terug naar Home</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const validToken = validationResult as any;
  const leadId = validToken.lead_id || params.id;

  const { data: leadData, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .maybeSingle();

  if (error || !leadData) {
    notFound();
  }

  const lead = leadData as any;
  const isAvailable = lead.status === 'available';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welkom bij Leads Platform</h1>
          <p className="text-gray-600">
            Je bent uitgenodigd door ons team. Bekijk de teaser en activeer je account.
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Mail className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">Account voor: {validToken.company_name}</AlertTitle>
          <AlertDescription className="text-blue-800">
            Email: {validToken.buyer_email}
            <br />
            Om volledige toegang te krijgen, activeer je account hieronder.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">{lead.property_type}</CardTitle>
                      {isAvailable ? (
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          Beschikbaar
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          Niet meer beschikbaar
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center text-base">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lead.city}, {lead.province}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Pand Kenmerken</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {lead.living_area_m2 && (
                      <div className="flex items-start gap-2">
                        <Ruler className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Woonoppervlak</div>
                          <div className="font-medium">{lead.living_area_m2}m²</div>
                        </div>
                      </div>
                    )}
                    {lead.plot_area_m2 && (
                      <div className="flex items-start gap-2">
                        <Home className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Perceel</div>
                          <div className="font-medium">{lead.plot_area_m2}m²</div>
                        </div>
                      </div>
                    )}
                    {lead.bedrooms && (
                      <div className="flex items-start gap-2">
                        <Bed className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Slaapkamers</div>
                          <div className="font-medium">{lead.bedrooms}</div>
                        </div>
                      </div>
                    )}
                    {lead.condition && (
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Staat</div>
                          <div className="font-medium">{lead.condition}</div>
                        </div>
                      </div>
                    )}
                    {lead.timeline && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Timing</div>
                          <div className="font-medium">{lead.timeline}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {lead.teaser_summary && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3">Teaser Samenvatting</h3>
                      <p className="text-gray-700">{lead.teaser_summary}</p>
                    </div>
                    <Separator />
                  </>
                )}

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Contactgegevens vergrendeld</AlertTitle>
                  <AlertDescription>
                    Activeer je account om toegang te krijgen tot volledige contactgegevens,
                    exacte adressen en foto's.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Activeren</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Activeer je account om leads te claimen en toegang te krijgen tot volledige details.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Link href={`/inkoper/login?email=${encodeURIComponent(validToken.buyer_email)}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Activeer via Magic Link
                  </Link>
                </Button>
                <div className="text-xs text-gray-500 text-center">
                  Je ontvangt een login link op {validToken.buyer_email}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credits Aanschaffen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Koop credits om leads te claimen en contactgegevens te ontvangen.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/inkoper/credits?token=${token}`}>
                    Bekijk Credits Pakketten
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Token Informatie</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>
                    Geldig tot:{' '}
                    {new Date(validToken.expires_at).toLocaleDateString('nl-NL')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
