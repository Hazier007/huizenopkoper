'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Mail, Edit, Loader2, Users, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Buyer {
  id: string;
  email: string;
  company_name: string | null;
  contact_name: string | null;
  is_active: boolean;
  credits_balance: number;
  regions_cities: string[];
  auth_user_id: string | null;
  created_at: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendingInvite, setSendingInvite] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    contact_name: '',
    is_active: false,
    credits_balance: 0,
    selectedCities: [] as string[],
  });

  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [buyersRes, citiesRes] = await Promise.all([
        supabase.from('buyers').select('*').order('created_at', { ascending: false }),
        supabase.from('cities').select('id, name, slug').order('name'),
      ]);

      if (buyersRes.data) setBuyers(buyersRes.data as any);
      if (citiesRes.data) setCities(citiesRes.data);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Fout bij laden van gegevens');
      setLoading(false);
    }
  };

  const handleCreateBuyer = async () => {
    if (!formData.email || !formData.company_name) {
      toast.error('Email en bedrijfsnaam zijn verplicht');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('buyers')
        .insert({
          email: formData.email,
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          is_active: formData.is_active,
          credits_balance: formData.credits_balance,
          regions_cities: formData.selectedCities,
          regions_provinces: [],
          property_types: [],
        } as any)
        .select()
        .single();

      if (error) throw error;

      toast.success('Buyer succesvol aangemaakt');
      setDialogOpen(false);
      setFormData({
        email: '',
        company_name: '',
        contact_name: '',
        is_active: false,
        credits_balance: 0,
        selectedCities: [],
      });
      loadData();
    } catch (error: any) {
      console.error('Error creating buyer:', error);
      toast.error(error.message || 'Fout bij aanmaken buyer');
    }
  };

  const handleSendInvite = async (buyer: Buyer) => {
    setSendingInvite(buyer.id);

    try {
      const response = await fetch('/api/admin/buyers/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerId: buyer.id }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to send invite');

      toast.success(`Invite email verstuurd naar ${buyer.email}`);
    } catch (error: any) {
      console.error('Error sending invite:', error);
      toast.error(error.message || 'Fout bij versturen invite');
    } finally {
      setSendingInvite(null);
    }
  };

  const toggleCity = (slug: string) => {
    if (formData.selectedCities.includes(slug)) {
      setFormData({
        ...formData,
        selectedCities: formData.selectedCities.filter((s) => s !== slug),
      });
    } else {
      setFormData({
        ...formData,
        selectedCities: [...formData.selectedCities, slug],
      });
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Buyers Beheer</h1>
          <p className="text-gray-600 mt-1">Beheer inkoper accounts en verstuur invites</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nieuwe Buyer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nieuwe Buyer Aanmaken</DialogTitle>
              <DialogDescription>
                Maak een nieuwe inkoper aan en selecteer hun regio's
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@bedrijf.nl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Bedrijfsnaam *</Label>
                  <Input
                    id="company"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Bedrijf BV"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contactpersoon</Label>
                  <Input
                    id="contact"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    placeholder="Jan Jansen"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits_balance}
                    onChange={(e) =>
                      setFormData({ ...formData, credits_balance: parseInt(e.target.value) || 0 })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="active">Account actief</Label>
              </div>

              <div className="space-y-2">
                <Label>Steden Selecteren</Label>
                <Input
                  placeholder="Zoek een stad..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <div
                      key={city.id}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => toggleCity(city.slug)}
                    >
                      <Checkbox checked={formData.selectedCities.includes(city.slug)} />
                      <label className="flex-1 cursor-pointer">{city.name}</label>
                    </div>
                  ))}
                </div>
                {formData.selectedCities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.selectedCities.map((slug) => {
                      const city = cities.find((c) => c.slug === slug);
                      return (
                        <Badge key={slug} variant="outline">
                          {city?.name}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuleren
              </Button>
              <Button onClick={handleCreateBuyer} className="bg-blue-600 hover:bg-blue-700">
                Buyer Aanmaken
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Alle Buyers ({buyers.length})
          </CardTitle>
          <CardDescription>Overzicht van alle inkoper accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buyers.map((buyer) => (
              <div
                key={buyer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">{buyer.company_name || 'Geen naam'}</div>
                      <div className="text-sm text-gray-600">{buyer.email}</div>
                      {buyer.contact_name && (
                        <div className="text-sm text-gray-500">Contact: {buyer.contact_name}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {buyer.is_active ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Actief
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inactief
                        </Badge>
                      )}
                      {buyer.auth_user_id ? (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Geactiveerd
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          Niet geactiveerd
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Credits: {buyer.credits_balance}</span>
                    <span>Steden: {buyer.regions_cities?.length || 0}</span>
                    <span className="text-xs">
                      Aangemaakt: {new Date(buyer.created_at).toLocaleDateString('nl-NL')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendInvite(buyer)}
                    disabled={sendingInvite === buyer.id}
                  >
                    {sendingInvite === buyer.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Versturen...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Stuur Invite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
            {buyers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Nog geen buyers</h3>
                <p className="text-sm">Klik op "Nieuwe Buyer" om een inkoper toe te voegen</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
