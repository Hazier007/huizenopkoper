'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

const PROPERTY_TYPES = [
  'Eengezinswoning',
  'Appartement',
  'Bungalow',
  'Villa',
  'Studio',
  'Duplex',
  'Bouwgrond',
  'Commercieel pand',
  'Andere',
];

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

const CONDITIONS = [
  { value: 'nieuw', label: 'Nieuw' },
  { value: 'goed', label: 'Goed' },
  { value: 'op te frissen', label: 'Op te frissen' },
  { value: 'te renoveren', label: 'Te renoveren' },
];

const OCCUPANCY_OPTIONS = [
  { value: 'vrij', label: 'Vrij' },
  { value: 'verhuurd', label: 'Verhuurd' },
  { value: 'te bespreken', label: 'Te bespreken' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'Zo snel mogelijk' },
  { value: '1-3 maanden', label: '1-3 maanden' },
  { value: '3-6 maanden', label: '3-6 maanden' },
  { value: 'flexibel', label: 'Flexibel' },
];

export function PropertySubmissionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    address_street: '',
    address_number: '',
    city: '',
    province: '',
    postal_code: '',
    property_type: '',
    living_area_m2: '',
    plot_area_m2: '',
    bedrooms: '',
    condition: '',
    occupancy: '',
    timeline: '',
    asking_price_hint: '',
    description: '',
    gdpr_consent: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 10) {
        toast.error('Maximum 10 foto\'s toegestaan');
        return;
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (leadId: string): Promise<any[]> => {
    const uploadedPhotos: any[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}_${randomStr}.${fileExt}`;
      const filePath = `${leadId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('lead-photos')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      uploadedPhotos.push({
        path: filePath,
        filename: file.name,
        size: file.size,
        type: file.type,
        uploaded_at: new Date().toISOString(),
      });
    }

    return uploadedPhotos;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contact_name || !formData.contact_email || !formData.contact_phone ||
        !formData.city || !formData.province || !formData.postal_code || !formData.property_type ||
        !formData.condition || !formData.occupancy || !formData.timeline) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    if (!formData.gdpr_consent) {
      toast.error('U moet akkoord gaan met de privacyvoorwaarden');
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        address_street: formData.address_street || null,
        address_number: formData.address_number || null,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postal_code,
        property_type: formData.property_type,
        living_area_m2: formData.living_area_m2 ? parseInt(formData.living_area_m2) : null,
        plot_area_m2: formData.plot_area_m2 ? parseInt(formData.plot_area_m2) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        condition: formData.condition,
        occupancy: formData.occupancy,
        timeline: formData.timeline,
        asking_price_hint: formData.asking_price_hint ? parseInt(formData.asking_price_hint.replace(/[^0-9]/g, '')) : null,
        description: formData.description || null,
        gdpr_consent: formData.gdpr_consent,
        source_page: typeof window !== 'undefined' ? window.location.pathname : null,
        photos: [],
      };

      const { data: lead, error: insertError } = await supabase
        .from('leads')
        .insert(leadData as any)
        .select()
        .single();

      if (insertError) throw insertError;

      if (files.length > 0 && lead) {
        const uploadedPhotos = await uploadPhotos((lead as any).id);

        const { error: updateError } = await (supabase
          .from('leads')
          .update as any)({ photos: uploadedPhotos })
          .eq('id', (lead as any).id);

        if (updateError) throw updateError;
      }

      toast.success('Uw pand is succesvol ingediend! Wij nemen binnen 48 uur contact op.');

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Contactgegevens
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact_name">
                Naam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact_name"
                value={formData.contact_name}
                onChange={(e) => handleInputChange('contact_name', e.target.value)}
                placeholder="Uw volledige naam"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact_email">
                E-mailadres <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="uw.email@voorbeeld.be"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">
                Telefoonnummer <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact_phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="+32 123 45 67 89"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Pand gegevens
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="property_type">
                Type pand <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.property_type}
                onValueChange={(value) => handleInputChange('property_type', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer type pand" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Label htmlFor="address_street">
                  Straat
                </Label>
                <Input
                  id="address_street"
                  value={formData.address_street}
                  onChange={(e) => handleInputChange('address_street', e.target.value)}
                  placeholder="Straatnaam"
                />
              </div>
              <div>
                <Label htmlFor="address_number">
                  Nummer
                </Label>
                <Input
                  id="address_number"
                  value={formData.address_number}
                  onChange={(e) => handleInputChange('address_number', e.target.value)}
                  placeholder="Nr"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="postal_code">
                  Postcode <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postal_code"
                  value={formData.postal_code}
                  onChange={(e) => handleInputChange('postal_code', e.target.value)}
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">
                  Gemeente <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Brussel"
                  required
                />
              </div>
              <div>
                <Label htmlFor="province">
                  Provincie <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.province}
                  onValueChange={(value) => handleInputChange('province', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="living_area_m2">
                  Bewoonbare opp. (m²)
                </Label>
                <Input
                  id="living_area_m2"
                  type="number"
                  value={formData.living_area_m2}
                  onChange={(e) => handleInputChange('living_area_m2', e.target.value)}
                  placeholder="150"
                />
              </div>
              <div>
                <Label htmlFor="plot_area_m2">
                  Perceeloppervlakte (m²)
                </Label>
                <Input
                  id="plot_area_m2"
                  type="number"
                  value={formData.plot_area_m2}
                  onChange={(e) => handleInputChange('plot_area_m2', e.target.value)}
                  placeholder="300"
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">
                  Aantal slaapkamers
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  placeholder="3"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="condition">
                  Staat <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => handleInputChange('condition', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer staat" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="occupancy">
                  Bezetting <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.occupancy}
                  onValueChange={(value) => handleInputChange('occupancy', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer bezetting" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCUPANCY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeline">
                  Timing <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => handleInputChange('timeline', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer timing" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMELINE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="asking_price_hint">
                Gewenste prijs (optioneel)
              </Label>
              <Input
                id="asking_price_hint"
                value={formData.asking_price_hint}
                onChange={(e) => handleInputChange('asking_price_hint', e.target.value)}
                placeholder="€ 250.000"
              />
              <p className="mt-1 text-sm text-gray-500">
                Heeft u een prijs in gedachten? Deel het gerust, maar dit is niet verplicht.
              </p>
            </div>
            <div>
              <Label htmlFor="description">
                Beschrijving / Opmerkingen (optioneel)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Vertel ons meer over uw pand..."
                rows={5}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Foto's (optioneel, max 10)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik om te uploaden</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (max 10 foto's)</p>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={files.length >= 10}
                />
              </label>
            </div>

            {files.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-lg hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="gdpr_consent"
              checked={formData.gdpr_consent}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, gdpr_consent: checked as boolean }))
              }
              required
            />
            <div className="space-y-1 leading-none">
              <Label
                htmlFor="gdpr_consent"
                className="text-sm font-normal cursor-pointer"
              >
                Ik ga akkoord met de{' '}
                <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                  privacyvoorwaarden
                </a>{' '}
                en geef toestemming om mijn gegevens te verwerken voor een aankoopvoorstel.{' '}
                <span className="text-red-500">*</span>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[200px] bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verzenden...
            </>
          ) : (
            'Pand indienen'
          )}
        </Button>
      </div>
    </form>
  );
}
