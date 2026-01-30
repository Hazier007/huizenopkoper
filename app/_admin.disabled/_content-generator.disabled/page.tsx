'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, RefreshCw, ArrowLeft, CheckCircle2, AlertCircle, Play, Square } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

interface Province {
  id: string;
  name: string;
  slug: string;
  sales_content: string | null;
  content_generated_at: string | null;
}

interface City {
  id: string;
  name: string;
  slug: string;
  province_id: string;
  sales_content: string | null;
  content_generated_at: string | null;
}

interface BulkProgress {
  completed: number;
  failed: number;
  total: number;
  currentItem: string;
  errors: Array<{ id: string; name: string; error: string }>;
}

export default function ContentGeneratorPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // Bulk generation state
  const [selectedProvinceIds, setSelectedProvinceIds] = useState<Set<string>>(new Set());
  const [selectedCityIds, setSelectedCityIds] = useState<Set<string>>(new Set());
  const [filterProvince, setFilterProvince] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('without');
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<BulkProgress | null>(null);
  const [bulkLogs, setBulkLogs] = useState<string[]>([]);

  useEffect(() => {
    setIsAuthenticated(true);
    setIsLoading(false);
    loadProvinces();
    loadCities();
  }, []);

  const loadProvinces = async () => {
    const { data, error } = await supabase
      .from('provinces')
      .select('id, name, slug, sales_content, content_generated_at')
      .order('name');

    if (!error && data) {
      setProvinces(data);
    }
  };

  const loadCities = async () => {
    const { data, error } = await supabase
      .from('cities')
      .select('id, name, slug, province_id, sales_content, content_generated_at')
      .order('name');

    if (!error && data) {
      setCities(data);
    }
  };

  const generateProvinceContent = async () => {
    if (!selectedProvince) {
      toast.error('Selecteer een provincie');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const response = await fetch('/api/admin/generate-content/province', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provinceId: selectedProvince }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data.content);
        toast.success('Content succesvol gegenereerd!');
        loadProvinces();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Fout bij genereren');
      }
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Fout bij genereren');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCityContent = async () => {
    if (!selectedCity) {
      toast.error('Selecteer een stad');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const response = await fetch('/api/admin/generate-content/city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId: selectedCity }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data.content);
        toast.success('Content succesvol gegenereerd!');
        loadCities();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Fout bij genereren');
      }
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Fout bij genereren');
    } finally {
      setIsGenerating(false);
    }
  };

  const bulkGenerateProvinces = async () => {
    if (selectedProvinceIds.size === 0) {
      toast.error('Selecteer minstens één provincie');
      return;
    }

    setIsBulkGenerating(true);
    setBulkProgress({ completed: 0, failed: 0, total: selectedProvinceIds.size, currentItem: '', errors: [] });
    setBulkLogs([]);

    try {
      const response = await fetch('/api/admin/generate-content/bulk-provinces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provinceIds: Array.from(selectedProvinceIds) }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            try {
              const event = JSON.parse(line);

              if (event.type === 'start') {
                setBulkLogs(prev => [...prev, event.message]);
              } else if (event.type === 'progress') {
                setBulkProgress(prev => ({
                  ...prev!,
                  currentItem: event.provinceName,
                }));
                setBulkLogs(prev => [...prev, event.message]);
              } else if (event.type === 'success') {
                setBulkProgress(prev => ({
                  ...prev!,
                  completed: event.completed,
                  currentItem: event.provinceName,
                }));
                setBulkLogs(prev => [...prev, `✓ ${event.message}`]);
              } else if (event.type === 'error') {
                setBulkProgress(prev => ({
                  ...prev!,
                  failed: (prev?.failed || 0) + 1,
                  errors: [...(prev?.errors || []), { id: event.provinceId, name: event.provinceName || 'Unknown', error: event.message }],
                }));
                setBulkLogs(prev => [...prev, `✗ ${event.message}`]);
              } else if (event.type === 'complete') {
                toast.success(event.message);
                setBulkLogs(prev => [...prev, `\n${event.message}`]);
                loadProvinces();
              }
            } catch (e) {
              console.error('Failed to parse event:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Bulk generate error:', error);
      toast.error('Fout bij bulk genereren');
    } finally {
      setIsBulkGenerating(false);
    }
  };

  const bulkGenerateCities = async () => {
    if (selectedCityIds.size === 0) {
      toast.error('Selecteer minstens één stad');
      return;
    }

    setIsBulkGenerating(true);
    setBulkProgress({ completed: 0, failed: 0, total: selectedCityIds.size, currentItem: '', errors: [] });
    setBulkLogs([]);

    try {
      const response = await fetch('/api/admin/generate-content/bulk-cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityIds: Array.from(selectedCityIds) }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            try {
              const event = JSON.parse(line);

              if (event.type === 'start') {
                setBulkLogs(prev => [...prev, event.message]);
              } else if (event.type === 'progress') {
                setBulkProgress(prev => ({
                  ...prev!,
                  currentItem: event.cityName,
                }));
                setBulkLogs(prev => [...prev, event.message]);
              } else if (event.type === 'success') {
                setBulkProgress(prev => ({
                  ...prev!,
                  completed: event.completed,
                  currentItem: event.cityName,
                }));
                setBulkLogs(prev => [...prev, `✓ ${event.message}`]);
              } else if (event.type === 'error') {
                setBulkProgress(prev => ({
                  ...prev!,
                  failed: (prev?.failed || 0) + 1,
                  errors: [...(prev?.errors || []), { id: event.cityId, name: event.cityName || 'Unknown', error: event.message }],
                }));
                setBulkLogs(prev => [...prev, `✗ ${event.message}`]);
              } else if (event.type === 'complete') {
                toast.success(event.message);
                setBulkLogs(prev => [...prev, `\n${event.message}`]);
                loadCities();
              }
            } catch (e) {
              console.error('Failed to parse event:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Bulk generate error:', error);
      toast.error('Fout bij bulk genereren');
    } finally {
      setIsBulkGenerating(false);
    }
  };

  const toggleSelectAllProvinces = () => {
    if (selectedProvinceIds.size === provinces.length) {
      setSelectedProvinceIds(new Set());
    } else {
      setSelectedProvinceIds(new Set(provinces.map(p => p.id)));
    }
  };

  const toggleSelectAllCities = () => {
    const filteredCities = getFilteredCities();
    if (selectedCityIds.size === filteredCities.length) {
      setSelectedCityIds(new Set());
    } else {
      setSelectedCityIds(new Set(filteredCities.map(c => c.id)));
    }
  };

  const toggleProvinceSelection = (id: string) => {
    const newSet = new Set(selectedProvinceIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedProvinceIds(newSet);
  };

  const toggleCitySelection = (id: string) => {
    const newSet = new Set(selectedCityIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedCityIds(newSet);
  };

  const getFilteredCities = () => {
    return cities.filter(city => {
      if (filterProvince !== 'all' && city.province_id !== filterProvince) return false;
      if (filterStatus === 'without' && city.sales_content) return false;
      if (filterStatus === 'with' && !city.sales_content) return false;
      return true;
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nooit';
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredCities = getFilteredCities();
  const progressPercentage = bulkProgress ? Math.round(((bulkProgress.completed + bulkProgress.failed) / bulkProgress.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug naar leads
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">AI Content Generator</h1>
            <p className="text-gray-600 mt-2">Genereer unieke sales content voor provincies en steden</p>
          </div>
        </div>

        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="single">Enkel</TabsTrigger>
            <TabsTrigger value="bulk-provinces">Bulk Provincies</TabsTrigger>
            <TabsTrigger value="bulk-cities">Bulk Steden</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    Provincie Content
                  </CardTitle>
                  <CardDescription>
                    Genereer content voor één provincie
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer provincie..." />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={generateProvinceContent}
                    disabled={isGenerating || !selectedProvince}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Genereren...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Genereren
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    Stad Content
                  </CardTitle>
                  <CardDescription>
                    Genereer content voor één stad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer stad..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={generateCityContent}
                    disabled={isGenerating || !selectedCity}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Genereren...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Genereren
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bulk-provinces" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Bulk Provincies Genereren
                </CardTitle>
                <CardDescription>
                  Selecteer meerdere provincies om in bulk te genereren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-provinces"
                      checked={selectedProvinceIds.size === provinces.length}
                      onCheckedChange={toggleSelectAllProvinces}
                    />
                    <label htmlFor="select-all-provinces" className="text-sm font-medium">
                      Selecteer alle provincies ({provinces.length})
                    </label>
                  </div>
                  <Button
                    onClick={bulkGenerateProvinces}
                    disabled={isBulkGenerating || selectedProvinceIds.size === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isBulkGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Genereren...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Genereer {selectedProvinceIds.size} provincies
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto space-y-2">
                  {provinces.map((province) => (
                    <div key={province.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedProvinceIds.has(province.id)}
                          onCheckedChange={() => toggleProvinceSelection(province.id)}
                        />
                        <div>
                          <div className="font-medium">{province.name}</div>
                          <div className="text-xs text-gray-500">
                            {formatDate(province.content_generated_at)}
                          </div>
                        </div>
                      </div>
                      {province.sales_content ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Gegenereerd
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Niet gegenereerd
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                {bulkProgress && (
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Voortgang</span>
                      <span className="text-gray-600">
                        {bulkProgress.completed + bulkProgress.failed} / {bulkProgress.total}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    {bulkProgress.currentItem && (
                      <p className="text-sm text-gray-600">
                        Bezig met: {bulkProgress.currentItem}
                      </p>
                    )}
                    {bulkProgress.errors.length > 0 && (
                      <div className="text-sm text-red-600">
                        Fouten: {bulkProgress.errors.length}
                      </div>
                    )}
                  </div>
                )}

                {bulkLogs.length > 0 && (
                  <div className="border rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-900 text-gray-100 text-xs font-mono">
                    {bulkLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-cities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Bulk Steden Genereren
                </CardTitle>
                <CardDescription>
                  Selecteer meerdere steden om in bulk te genereren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Filter op provincie</label>
                    <Select value={filterProvince} onValueChange={setFilterProvince}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle provincies</SelectItem>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Filter op status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle steden</SelectItem>
                        <SelectItem value="without">Zonder content</SelectItem>
                        <SelectItem value="with">Met content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-cities"
                      checked={selectedCityIds.size === filteredCities.length && filteredCities.length > 0}
                      onCheckedChange={toggleSelectAllCities}
                    />
                    <label htmlFor="select-all-cities" className="text-sm font-medium">
                      Selecteer alle gefilterde steden ({filteredCities.length})
                    </label>
                  </div>
                  <Button
                    onClick={bulkGenerateCities}
                    disabled={isBulkGenerating || selectedCityIds.size === 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isBulkGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Genereren...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Genereer {selectedCityIds.size} steden
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto space-y-2">
                  {filteredCities.map((city) => {
                    const province = provinces.find(p => p.id === city.province_id);
                    return (
                      <div key={city.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedCityIds.has(city.id)}
                            onCheckedChange={() => toggleCitySelection(city.id)}
                          />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-xs text-gray-500">
                              {province?.name} - {formatDate(city.content_generated_at)}
                            </div>
                          </div>
                        </div>
                        {city.sales_content ? (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Gegenereerd
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Niet gegenereerd
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>

                {bulkProgress && (
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Voortgang</span>
                      <span className="text-gray-600">
                        {bulkProgress.completed + bulkProgress.failed} / {bulkProgress.total}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    {bulkProgress.currentItem && (
                      <p className="text-sm text-gray-600">
                        Bezig met: {bulkProgress.currentItem}
                      </p>
                    )}
                    {bulkProgress.errors.length > 0 && (
                      <div className="text-sm text-red-600">
                        Fouten: {bulkProgress.errors.length}
                      </div>
                    )}
                  </div>
                )}

                {bulkLogs.length > 0 && (
                  <div className="border rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-900 text-gray-100 text-xs font-mono">
                    {bulkLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {generatedContent && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Content Succesvol Gegenereerd
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800">
                  De content is succesvol gegenereerd en opgeslagen in de database. De wijzigingen zijn direct zichtbaar op de website.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
