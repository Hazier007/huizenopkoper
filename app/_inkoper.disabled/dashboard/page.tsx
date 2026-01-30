import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getBuyerProfile } from '@/lib/auth/buyer-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CreditCard,
  MapPin,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/server';

export default async function BuyerDashboardPage() {
  const profile = await getBuyerProfile();

  if (!profile) {
    redirect('/inkoper/login');
  }

  const { buyer } = profile;

  const { data: availableLeads } = await supabase
    .from('leads')
    .select('id, city, province, property_type, created_at, claim_expires_at')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: claimedLeads } = await supabase
    .from('leads')
    .select('id, city, province, property_type, claimed_at')
    .eq('claimed_by_buyer_id', buyer.id)
    .order('claimed_at', { ascending: false })
    .limit(5);

  const { data: recentClaims } = await supabase
    .from('lead_claims')
    .select('id, status, created_at, lead_id')
    .eq('buyer_id', buyer.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const isLowCredit = buyer.credits_balance <= buyer.low_credit_threshold;
  const hasRegions =
    (buyer.regions_provinces as string[]).length > 0 ||
    (buyer.regions_cities as string[]).length > 0;

  const successfulClaims = recentClaims?.filter((c: any) => c.status === 'success').length || 0;
  const failedClaims = recentClaims?.filter((c: any) => c.status !== 'success').length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welkom terug, {buyer.company_name || buyer.email}
        </p>
      </div>

      {isLowCredit && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Lage credit balance</AlertTitle>
          <AlertDescription>
            Je hebt nog maar {buyer.credits_balance} credit{buyer.credits_balance !== 1 ? 's' : ''} over.
            Neem contact op om je credit balance aan te vullen.
          </AlertDescription>
        </Alert>
      )}

      {!hasRegions && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <MapPin className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">Stel je regio voorkeuren in</AlertTitle>
          <AlertDescription className="text-blue-800">
            Je hebt nog geen regio voorkeuren ingesteld. Ga naar je profiel om steden of provincies te selecteren.
            <Link href="/inkoper/profiel">
              <Button variant="link" className="p-0 h-auto ml-2 text-blue-600">
                Ga naar profiel →
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyer.credits_balance}</div>
            <p className="text-xs text-gray-500 mt-1">
              Beschikbaar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regio's</CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(buyer.regions_provinces as string[]).length + (buyer.regions_cities as string[]).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Geselecteerd
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geclaimd</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulClaims}</div>
            <p className="text-xs text-gray-500 mt-1">
              Laatste 10 pogingen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beschikbaar</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableLeads?.length || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              Nieuwe leads
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recente Beschikbare Leads</span>
              <Link href="/inkoper/leads">
                <Button variant="ghost" size="sm">
                  Bekijk alle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>
              De nieuwste leads die je kunt claimen
            </CardDescription>
          </CardHeader>
          <CardContent>
            {availableLeads && availableLeads.length > 0 ? (
              <div className="space-y-3">
                {availableLeads.map((lead: any) => (
                  <Link
                    key={lead.id}
                    href={`/inkoper/leads/${lead.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{lead.property_type}</div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {lead.city}, {lead.province}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(lead.created_at).toLocaleDateString('nl-NL')}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        Nieuw
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Geen beschikbare leads op dit moment</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mijn Geclaimde Leads</CardTitle>
            <CardDescription>
              Leads die je hebt geclaimd
            </CardDescription>
          </CardHeader>
          <CardContent>
            {claimedLeads && claimedLeads.length > 0 ? (
              <div className="space-y-3">
                {claimedLeads.map((lead: any) => (
                  <Link
                    key={lead.id}
                    href={`/inkoper/leads/${lead.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{lead.property_type}</div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {lead.city}, {lead.province}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Geclaimd op {new Date(lead.claimed_at!).toLocaleDateString('nl-NL')}
                        </div>
                      </div>
                      <Badge className="bg-green-500">
                        Geclaimd
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Je hebt nog geen leads geclaimd</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
