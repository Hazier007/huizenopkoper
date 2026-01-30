'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Building, MapPin, Home, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Province {
  id: string;
  name: string;
  slug: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
  province_id: string;
}

interface Buyer {
  id: string;
  email: string;
  company_name: string | null;
  regions_provinces: string[];
  regions_cities: string[];
  property_types: string[];
  credits_balance: number;
}

export default function BuyerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [searchCity, setSearchCity] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);

  const propertyTypes = [
    'Woning',
    'Appartement',
    'Handelspand',
    'Verhuurde woning',
    'Renovatiewoning',
    'Erfeniswoning',
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/inkoper/login');
        return;
      }

      const { data: buyerData } = await supabase
        .from('buyers')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (buyerData) {
        const buyer = buyerData as any;
        setBuyer(buyer);
        setCompanyName(buyer.company_name || '');
        setSelectedProvinces(buyer.regions_provinces || []);
        setSelectedCities(buyer.regions_cities || []);
        setSelectedPropertyTypes(buyer.property_types || []);
      }

      const { data: provincesData } = await supabase
        .from('provinces')
        .select('id, name, slug')
        .order('name');

      if (provincesData) {
        setProvinces(provincesData);
      }

      const { data: citiesData } = await supabase
        .from('cities')
        .select('id, name, slug, province_id')
        .order('name');

      if (citiesData) {
        setCities(citiesData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Fout bij laden van gegevens');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!buyer) return;

    setSaving(true);
    try {
      const { error } = await (supabase
        .from('buyers') as any)
        .update({
          company_name: companyName,
          regions_provinces: selectedProvinces,
          regions_cities: selectedCities,
          property_types: selectedPropertyTypes,
        })
        .eq('id', buyer.id);

      if (error) throw error;

      toast.success('Profiel succesvol opgeslagen');
      router.refresh();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Fout bij opslaan van profiel');
    } finally {
      setSaving(false);
    }
  };

  const toggleProvince = (slug: string) => {
    if (selectedProvinces.includes(slug)) {
      setSelectedProvinces(selectedProvinces.filter((s) => s !== slug));
    } else {
      setSelectedProvinces([...selectedProvinces, slug]);
    }
  };

  const toggleCity = (slug: string) => {
    if (selectedCities.includes(slug)) {
      setSelectedCities(selectedCities.filter((s) => s !== slug));
    } else {
      setSelectedCities([...selectedCities, slug]);
    }
  };

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mijn Profiel</h1>
        <p className="text-gray-600 mt-1">
          Beheer je bedrijfsinformatie en voorkeuren
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Bedrijfsinformatie
            </CardTitle>
            <CardDescription>
              Je basis bedrijfsgegevens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email adres</Label>
              <Input
                id="email"
                type="email"
                value={buyer?.email || ''}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Bedrijfsnaam</Label>
              <Input
                id="company"
                type="text"
                placeholder="Je bedrijfsnaam"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Je hebt momenteel <strong>{buyer?.credits_balance} credits</strong> beschikbaar.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Pand Types
            </CardTitle>
            <CardDescription>
              Selecteer de types panden waarin je geïnteresseerd bent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => togglePropertyType(type)}
                >
                  <Checkbox
                    checked={selectedPropertyTypes.includes(type)}
                    onCheckedChange={() => togglePropertyType(type)}
                  />
                  <label className="flex-1 cursor-pointer">{type}</label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Provincies
            </CardTitle>
            <CardDescription>
              Selecteer hele provincies om alle leads in die provincie te zien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {provinces.map((province) => (
                <div
                  key={province.id}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleProvince(province.slug)}
                >
                  <Checkbox
                    checked={selectedProvinces.includes(province.slug)}
                    onCheckedChange={() => toggleProvince(province.slug)}
                  />
                  <label className="flex-1 cursor-pointer">{province.name}</label>
                </div>
              ))}
            </div>
            {selectedProvinces.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {selectedProvinces.map((slug) => {
                    const province = provinces.find((p) => p.slug === slug);
                    return (
                      <Badge key={slug} className="bg-blue-500">
                        {province?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Specifieke Steden
            </CardTitle>
            <CardDescription>
              Zoek en selecteer specifieke steden
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-city">Zoek een stad</Label>
              <Input
                id="search-city"
                type="text"
                placeholder="Typ een stadsnaam..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-y-auto border rounded-lg">
              {filteredCities.length > 0 ? (
                <div className="divide-y">
                  {filteredCities.map((city) => {
                    const province = provinces.find((p) => p.id === city.province_id);
                    return (
                      <div
                        key={city.id}
                        className="flex items-center space-x-2 p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleCity(city.slug)}
                      >
                        <Checkbox
                          checked={selectedCities.includes(city.slug)}
                          onCheckedChange={() => toggleCity(city.slug)}
                        />
                        <label className="flex-1 cursor-pointer">
                          {city.name}
                          <span className="text-sm text-gray-500 ml-2">
                            ({province?.name})
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Geen steden gevonden
                </div>
              )}
            </div>
            {selectedCities.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {selectedCities.map((slug) => {
                    const city = cities.find((c) => c.slug === slug);
                    return (
                      <Badge key={slug} variant="outline">
                        {city?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Profiel opslaan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
