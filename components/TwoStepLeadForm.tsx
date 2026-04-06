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
import { Upload, X, Loader2, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitLead } from '@/app/actions/lead-submission';

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
  'Limburg',
  'Oost-Vlaanderen',
  'Vlaams-Brabant',
  'West-Vlaanderen',
];

const CONDITIONS = [
  { value: 'nieuw', label: 'Nieuw' },
  { value: 'goed', label: 'Goed' },
  { value: 'op te frissen', label: 'Op te frissen' },
  { value: 'te renoveren', label: 'Te renoveren' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'Zo snel mogelijk' },
  { value: '1-3 maanden', label: '1-3 maanden' },
  { value: '3-6 maanden', label: '3-6 maanden' },
  { value: 'flexibel', label: 'Flexibel' },
];

const MAX_PHOTOS = 12;
const MIN_PHOTOS = 0;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface FormData {
  property_type: string;
  postal_code: string;
  city: string;
  province: string;
  living_area_m2: string;
  condition: string;
  timeline: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  description: string;
  gdpr_consent: boolean;
  honeypot: string;
}

export function TwoStepLeadForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    property_type: '',
    postal_code: '',
    city: '',
    province: '',
    living_area_m2: '',
    condition: '',
    timeline: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    description: '',
    gdpr_consent: false,
    honeypot: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      if (files.length + newFiles.length > MAX_PHOTOS) {
        toast.error(`Maximum ${MAX_PHOTOS} foto's toegestaan`);
        return;
      }

      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} is te groot. Maximaal 10MB per bestand.`);
          return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          toast.error(`${file.name} heeft een ongeldig formaat. Alleen JPG, PNG en WEBP zijn toegestaan.`);
          return;
        }
      }

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    if (!formData.property_type) {
      toast.error('Selecteer een type pand');
      return false;
    }
    if (!formData.postal_code) {
      toast.error('Vul een postcode in');
      return false;
    }
    if (!formData.city) {
      toast.error('Vul een gemeente in');
      return false;
    }
    if (!formData.province) {
      toast.error('Selecteer een provincie');
      return false;
    }
    if (!formData.condition) {
      toast.error('Selecteer de staat van het pand');
      return false;
    }
    if (!formData.timeline) {
      toast.error('Selecteer een timing');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_step1_completed', {
          event_category: 'Lead Form',
          event_label: 'Step 1 Completed',
        });
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contact_name || !formData.contact_email || !formData.contact_phone) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    if (!formData.gdpr_consent) {
      toast.error('U moet akkoord gaan met de voorwaarden');
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.contact_email)) {
      toast.error('Vul een geldig e-mailadres in');
      return;
    }

    setIsSubmitting(true);

    try {
      const photoData = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
          type: file.type,
          size: file.size,
        }))
      );

      const leadData = {
        property_type: formData.property_type,
        postal_code: formData.postal_code,
        city: formData.city,
        province: formData.province,
        living_area_m2: formData.living_area_m2 ? parseInt(formData.living_area_m2) : undefined,
        condition: formData.condition,
        timeline: formData.timeline,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        description: formData.description || undefined,
        gdpr_consent: formData.gdpr_consent,
        honeypot: formData.honeypot,
      };

      const result = await submitLead(leadData, photoData);

      if (result.success) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submitted', {
            event_category: 'Lead Form',
            event_label: 'Form Submitted Successfully',
          });
        }

        toast.success(result.message);
        router.push(`/verkopen/bedankt?leadId=${result.leadId}`);
      } else {
        toast.error(result.error || 'Er is iets misgegaan');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er is een onverwachte fout opgetreden');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
            </div>
            <div className={`h-1 w-24 transition-all ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-24">
          <p className={`text-sm font-medium transition-colors ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'}`}>
            Pand info
          </p>
          <p className={`text-sm font-medium transition-colors ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'}`}>
            Contactgegevens
          </p>
        </div>
      </div>

      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => handleInputChange('honeypot', e.target.value)}
        style={{ position: 'absolute', left: '-9999px' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {currentStep === 1 && (
        <>
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

                <div>
                  <Label htmlFor="living_area_m2">
                    Bewoonbare oppervlakte (m²)
                  </Label>
                  <Input
                    id="living_area_m2"
                    type="number"
                    value={formData.living_area_m2}
                    onChange={(e) => handleInputChange('living_area_m2', e.target.value)}
                    placeholder="150"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Foto's <span className="text-red-500">*</span> (min {MIN_PHOTOS}, max {MAX_PHOTOS})
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik om te uploaden</span>
                      </p>
                      <p className="text-xs text-gray-500">JPG, PNG, WEBP (max 10MB per bestand)</p>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleFileChange}
                      disabled={files.length >= MAX_PHOTOS}
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
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {(file.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  {files.length} / {MAX_PHOTOS} foto's geüpload
                  {files.length < MIN_PHOTOS && (
                    <span className="text-red-500 ml-2">
                      (minimaal {MIN_PHOTOS} foto vereist)
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleNextStep}
              size="lg"
              className="min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
            >
              Volgende
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
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
                <div>
                  <Label htmlFor="description">
                    Beschrijving / Opmerkingen
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
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="gdpr_consent"
                  checked={formData.gdpr_consent}
                  onCheckedChange={(checked) => handleInputChange('gdpr_consent', checked as boolean)}
                  required
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="gdpr_consent"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Ik ga akkoord dat mijn gegevens en foto's gedeeld worden met geselecteerde
                    vastgoedinkopers om offertes te ontvangen.{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={handlePreviousStep}
              variant="outline"
              size="lg"
              className="min-w-[150px]"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Vorige
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
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
        </>
      )}
    </form>
  );
}
