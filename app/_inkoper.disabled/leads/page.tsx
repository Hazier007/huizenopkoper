import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getBuyerProfile } from '@/lib/auth/buyer-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Home,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/server';

export default async function LeadsListPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const profile = await getBuyerProfile();

  if (!profile) {
    redirect('/inkoper/login');
  }

  const { buyer } = profile;

  const { data: availableLeadsData } = await supabase
    .from('leads')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  const { data: claimedLeadsData } = await supabase
    .from('leads')
    .select('*')
    .eq('claimed_by_buyer_id', buyer.id)
    .order('claimed_at', { ascending: false });

  const availableLeads = (availableLeadsData || []) as any[];
  const claimedLeads = (claimedLeadsData || []) as any[];

  const activeTab = searchParams.tab || 'available';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-600 mt-1">
          Bekijk beschikbare leads en je geclaimde leads
        </p>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="available">
            Beschikbaar ({availableLeads?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="claimed">
            Mijn Leads ({claimedLeads?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Beschikbare Leads</CardTitle>
              <CardDescription>
                Leads die je kunt claimen met je credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableLeads && availableLeads.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/inkoper/leads/${lead.id}`}
                      className="block border rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-blue-600 border-blue-300">
                            Beschikbaar
                          </Badge>
                          <Badge className="bg-gray-900">
                            1 credit
                          </Badge>
                        </div>

                        <div>
                          <div className="font-semibold text-lg">{lead.property_type}</div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lead.city}, {lead.province}
                          </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          {lead.living_area_m2 && (
                            <div className="flex items-center">
                              <Home className="h-3 w-3 mr-1" />
                              {lead.living_area_m2}m² woonoppervlak
                            </div>
                          )}
                          {lead.timeline && (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Timing: {lead.timeline}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(lead.created_at).toLocaleDateString('nl-NL')}
                          </div>
                        </div>

                        {lead.teaser_summary && (
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {lead.teaser_summary}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium text-blue-600">
                            Bekijk details
                          </span>
                          <ArrowRight className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Geen beschikbare leads</h3>
                  <p className="text-sm">
                    Controleer later opnieuw of pas je regio voorkeuren aan
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claimed">
          <Card>
            <CardHeader>
              <CardTitle>Mijn Geclaimde Leads</CardTitle>
              <CardDescription>
                Leads die je hebt geclaimd en volledige toegang tot hebt
              </CardDescription>
            </CardHeader>
            <CardContent>
              {claimedLeads && claimedLeads.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {claimedLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/inkoper/leads/${lead.id}`}
                      className="block border rounded-lg p-4 hover:shadow-md transition-all hover:border-green-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Geclaimd
                          </Badge>
                        </div>

                        <div>
                          <div className="font-semibold text-lg">{lead.property_type}</div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lead.city}, {lead.province}
                          </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          {lead.living_area_m2 && (
                            <div className="flex items-center">
                              <Home className="h-3 w-3 mr-1" />
                              {lead.living_area_m2}m² woonoppervlak
                            </div>
                          )}
                          {lead.timeline && (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {lead.timeline}
                            </div>
                          )}
                          {lead.contact_name && (
                            <div className="font-medium text-gray-900">
                              Contact: {lead.contact_name}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium text-green-600">
                            Bekijk volledige details
                          </span>
                          <ArrowRight className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Geen geclaimde leads</h3>
                  <p className="text-sm">
                    Je hebt nog geen leads geclaimd. Bekijk de beschikbare leads om te starten.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
