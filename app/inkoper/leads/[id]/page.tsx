import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getBuyerProfile } from '@/lib/auth/buyer-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Home,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
  Ruler,
  Bed,
  Building,
  Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/server';
import ClaimLeadButton from './_components/ClaimLeadButton';

interface LeadDetailPageProps {
  params: {
    id: string;
  };
  searchParams: {
    token?: string;
  };
}

export default async function LeadDetailPage({ params, searchParams }: LeadDetailPageProps) {
  if (searchParams.token) {
    redirect(`/inkoper/leads/${params.id}/token?token=${searchParams.token}`);
  }

  const profile = await getBuyerProfile();

  if (!profile) {
    redirect('/inkoper/login');
  }

  const { buyer } = profile;

  const { data: leadData, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error || !leadData) {
    notFound();
  }

  const lead = leadData as any;

  const isClaimedByMe = lead.claimed_by_buyer_id === buyer.id;
  const isClaimedByOther = lead.status === 'claimed' && !isClaimedByMe;
  const isExpired = lead.status === 'expired';
  const isAvailable = lead.status === 'available';

  const canClaim = isAvailable && buyer.credits_balance >= 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/inkoper/leads"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar leads
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{lead.property_type}</CardTitle>
                    {isClaimedByMe && (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Geclaimd
                      </Badge>
                    )}
                    {isAvailable && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        Beschikbaar
                      </Badge>
                    )}
                    {isClaimedByOther && (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Niet meer beschikbaar
                      </Badge>
                    )}
                    {isExpired && (
                      <Badge variant="outline" className="text-gray-500">
                        Verlopen
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
              {isClaimedByOther && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Deze lead is niet meer beschikbaar</AlertTitle>
                  <AlertDescription>
                    Deze lead is al door een andere inkoper geclaimd.
                  </AlertDescription>
                </Alert>
              )}

              {isExpired && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Deze lead is verlopen</AlertTitle>
                  <AlertDescription>
                    Deze lead kan niet meer geclaimd worden.
                  </AlertDescription>
                </Alert>
              )}

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
                  {lead.occupancy && (
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Bewoning</div>
                        <div className="font-medium">{lead.occupancy}</div>
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
                    <h3 className="font-semibold mb-3">Samenvatting</h3>
                    <p className="text-gray-700">{lead.teaser_summary}</p>
                  </div>
                  <Separator />
                </>
              )}

              {isClaimedByMe && (
                <>
                  {lead.description && (
                    <>
                      <div>
                        <h3 className="font-semibold mb-3">Volledige Omschrijving</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{lead.description}</p>
                      </div>
                      <Separator />
                    </>
                  )}

                  {(lead.address_street || lead.postal_code) && (
                    <>
                      <div>
                        <h3 className="font-semibold mb-3">Adres</h3>
                        <div className="text-gray-700">
                          {lead.address_street && lead.address_number && (
                            <div>{lead.address_street} {lead.address_number}</div>
                          )}
                          {lead.postal_code && (
                            <div>{lead.postal_code} {lead.city}</div>
                          )}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {(lead.contact_name || lead.contact_email || lead.contact_phone) && (
                    <div>
                      <h3 className="font-semibold mb-3">Contactgegevens</h3>
                      <div className="space-y-2">
                        {lead.contact_name && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{lead.contact_name}</span>
                          </div>
                        )}
                        {lead.contact_email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a
                              href={`mailto:${lead.contact_email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {lead.contact_email}
                            </a>
                          </div>
                        )}
                        {lead.contact_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a
                              href={`tel:${lead.contact_phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {lead.contact_phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {lead.photos && Array.isArray(lead.photos) && lead.photos.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">Foto's</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {(lead.photos as string[]).map((photo, index) => (
                            <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={photo}
                                alt={`Foto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actie</CardTitle>
            </CardHeader>
            <CardContent>
              {isClaimedByMe ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Je hebt deze lead geclaimd</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Alle contactgegevens en details zijn nu zichtbaar.
                  </AlertDescription>
                </Alert>
              ) : isClaimedByOther || isExpired ? (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Niet beschikbaar</AlertTitle>
                  <AlertDescription>
                    Deze lead kan niet meer geclaimd worden.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-1">1 Credit</div>
                    <div className="text-sm text-gray-600">
                      Je hebt {buyer.credits_balance} credits beschikbaar
                    </div>
                  </div>

                  {canClaim ? (
                    <ClaimLeadButton leadId={lead.id} buyerId={buyer.id} />
                  ) : (
                    <Alert variant="destructive">
                      <AlertTitle>Onvoldoende credits</AlertTitle>
                      <AlertDescription>
                        Je hebt niet genoeg credits om deze lead te claimen. Neem contact op om credits aan te schaffen.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-xs text-gray-500 text-center">
                    Na het claimen zie je alle contactgegevens en foto's
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Lead Informatie</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-3 w-3" />
                <span>Aangemaakt: {new Date(lead.created_at).toLocaleDateString('nl-NL')}</span>
              </div>
              {lead.claimed_at && (
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Geclaimd: {new Date(lead.claimed_at).toLocaleDateString('nl-NL')}</span>
                </div>
              )}
              {lead.source_page && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="h-3 w-3" />
                  <span>Bron: {lead.source_page}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
