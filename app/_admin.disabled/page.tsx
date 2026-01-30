'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, LogOut, Download, Eye, Filter, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  created_at: string;
  status: string;
  property_type: string;
  postal_code: string;
  city: string;
  province: string;
  condition: string;
  timeline: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}

const PROVINCES = [
  'Antwerpen',
  'Vlaams-Brabant',
  'Limburg',
  'Oost-Vlaanderen',
  'West-Vlaanderen',
  'Waals-Brabant',
  'Henegouwen',
  'Luik',
  'Luxemburg',
  'Namen',
];

const STATUSES = [
  { value: 'new', label: 'Nieuw' },
  { value: 'qualified', label: 'Gekwalificeerd' },
  { value: 'sent', label: 'Verstuurd' },
  { value: 'closed', label: 'Gesloten' },
];

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Skip auth for now
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated, statusFilter, provinceFilter]);

  const checkAuth = async () => {
    // Auth disabled for now
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast.success('Ingelogd');
      } else {
        toast.error('Ongeldige inloggegevens');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login mislukt');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      setLeads([]);
      toast.success('Uitgelogd');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (provinceFilter !== 'all') params.append('province', provinceFilter);

      const response = await fetch(`/api/admin/leads?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        toast.error('Fout bij laden van leads');
      }
    } catch (error) {
      console.error('Load leads error:', error);
      toast.error('Fout bij laden van leads');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (provinceFilter !== 'all') params.append('province', provinceFilter);
      params.append('format', 'csv');

      const response = await fetch(`/api/admin/leads?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('CSV geëxporteerd');
      } else {
        toast.error('Fout bij exporteren');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Fout bij exporteren');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500 hover:bg-blue-600',
      qualified: 'bg-yellow-500 hover:bg-yellow-600',
      sent: 'bg-purple-500 hover:bg-purple-600',
      closed: 'bg-green-500 hover:bg-green-600',
    };
    return colors[status] || 'bg-gray-500 hover:bg-gray-600';
  };

  const getStatusLabel = (status: string) => {
    const label = STATUSES.find((s) => s.value === status);
    return label ? label.label : status;
  };

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.city.toLowerCase().includes(query) ||
      lead.property_type.toLowerCase().includes(query) ||
      lead.contact_name.toLowerCase().includes(query) ||
      lead.contact_email.toLowerCase().includes(query) ||
      lead.postal_code.includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Gebruikersnaam</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="password">Wachtwoord</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inloggen...
                  </>
                ) : (
                  'Inloggen'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin/content-generator">
                <Sparkles className="mr-2 h-4 w-4" />
                Content Generator
              </Link>
            </Button>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle statussen</SelectItem>
                    {STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="province-filter">Provincie</Label>
                <Select value={provinceFilter} onValueChange={setProvinceFilter}>
                  <SelectTrigger id="province-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle provincies</SelectItem>
                    {PROVINCES.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="search">Zoeken</Label>
                <Input
                  id="search"
                  placeholder="Zoek op gemeente, type, naam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoadingLeads ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Geen leads gevonden
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Datum</TableHead>
                      <TableHead>Gemeente</TableHead>
                      <TableHead>Provincie</TableHead>
                      <TableHead>Type pand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {formatDate(lead.created_at)}
                        </TableCell>
                        <TableCell>{lead.city}</TableCell>
                        <TableCell>{lead.province}</TableCell>
                        <TableCell>{lead.property_type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/leads/${lead.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-4 border-t">
                <p className="text-sm text-gray-500">
                  {filteredLeads.length} van {leads.length} leads
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
