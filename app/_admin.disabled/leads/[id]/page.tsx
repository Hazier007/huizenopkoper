'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Loader2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Home,
  Calendar,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  created_at: string;
  status: string;
  property_type: string;
  address_street: string | null;
  address_number: string | null;
  postal_code: string;
  city: string;
  province: string;
  living_area_m2: number | null;
  plot_area_m2: number | null;
  bedrooms: number | null;
  condition: string;
  occupancy: string;
  timeline: string;
  asking_price_hint: number | null;
  description: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  gdpr_consent: boolean;
  source_page: string | null;
  photos: Array<{
    path: string;
    filename: string;
    signedUrl: string | null;
  }>;
}

const STATUSES = [
  { value: 'new', label: 'Nieuw' },
  { value: 'qualified', label: 'Gekwalificeerd' },
  { value: 'sent', label: 'Verstuurd' },
  { value: 'closed', label: 'Gesloten' },
];

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params?.id as string;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lead, setLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLead();
    }
  }, [isAuthenticated, leadId]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  const loadLead = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data);
      } else {
        toast.error('Fout bij laden van lead');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Load lead error:', error);
      toast.error('Fout bij laden van lead');
      router.push('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;

    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, status: newStatus }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedLead = await response.json();
        setLead({ ...lead, status: updatedLead.status });
        toast.success('Status bijgewerkt');
      } else {
        toast.error('Fout bij bijwerken status');
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('Fout bij bijwerken status');
    } finally {
      setIsUpdating(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Gekopieerd naar klembord');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('Fout bij kopiëren');
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

  const formatPrice = (price: number | null) => {
    if (!price) return 'Niet opgegeven';
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500',
      qualified: 'bg-yellow-500',
      sent: 'bg-purple-500',
      closed: 'bg-green-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const label = STATUSES.find((s) => s.value === status);
    return label ? label.label : status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar overzicht
            </Link>
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {lead.property_type} - {lead.city}
              </h1>
              <p className="text-gray-500">
                Ingediend op {formatDate(lead.created_at)}
              </p>
            </div>
            <Badge className={getStatusColor(lead.status)}>
              {getStatusLabel(lead.status)}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status wijzigen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((status) => (
                  <Button
                    key={status.value}
                    variant={lead.status === status.value ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(status.value)}
                    disabled={isUpdating || lead.status === status.value}
                  >
                    {isUpdating && lead.status === status.value ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {status.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contactgegevens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Naam</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">{lead.contact_name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(lead.contact_name, 'name')}
                  >
                    {copiedField === 'name' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">E-mail</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${lead.contact_email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {lead.contact_email}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(lead.contact_email, 'email')}
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Telefoon</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${lead.contact_phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {lead.contact_phone}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(lead.contact_phone, 'phone')}
                  >
                    {copiedField === 'phone' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Pand informatie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="text-gray-900">{lead.property_type}</p>
                </div>
                {lead.address_street && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Adres</p>
                    <p className="text-gray-900">
                      {lead.address_street} {lead.address_number}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Postcode</p>
                  <p className="text-gray-900">{lead.postal_code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gemeente</p>
                  <p className="text-gray-900">{lead.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provincie</p>
                  <p className="text-gray-900">{lead.province}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Staat</p>
                  <p className="text-gray-900">{lead.condition}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Bezetting</p>
                  <p className="text-gray-900">{lead.occupancy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Timing</p>
                  <p className="text-gray-900">{lead.timeline}</p>
                </div>
                {lead.living_area_m2 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bewoonbare opp.</p>
                    <p className="text-gray-900">{lead.living_area_m2} m²</p>
                  </div>
                )}
                {lead.plot_area_m2 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Perceel opp.</p>
                    <p className="text-gray-900">{lead.plot_area_m2} m²</p>
                  </div>
                )}
                {lead.bedrooms && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Slaapkamers</p>
                    <p className="text-gray-900">{lead.bedrooms}</p>
                  </div>
                )}
                {lead.asking_price_hint && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gewenste prijs</p>
                    <p className="text-gray-900">{formatPrice(lead.asking_price_hint)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {lead.description && (
            <Card>
              <CardHeader>
                <CardTitle>Beschrijving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 whitespace-pre-wrap">{lead.description}</p>
              </CardContent>
            </Card>
          )}

          {lead.photos && lead.photos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Foto's ({lead.photos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lead.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer aspect-video bg-gray-100 rounded-lg overflow-hidden"
                      onClick={() => setSelectedImage(photo.signedUrl)}
                    >
                      {photo.signedUrl ? (
                        <img
                          src={photo.signedUrl}
                          alt={photo.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <p className="text-sm">Niet beschikbaar</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Extra informatie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lead ID</p>
                  <p className="text-gray-900 font-mono text-sm">{lead.id}</p>
                </div>
                {lead.source_page && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bron pagina</p>
                    <p className="text-gray-900">{lead.source_page}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">GDPR toestemming</p>
                  <p className="text-gray-900">{lead.gdpr_consent ? 'Ja' : 'Nee'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-full">
              <img
                src={selectedImage}
                alt="Vergroot"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <Button
                variant="secondary"
                className="absolute top-4 right-4"
                onClick={() => setSelectedImage(null)}
              >
                Sluiten
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
