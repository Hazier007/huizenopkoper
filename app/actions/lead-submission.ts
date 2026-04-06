'use server';

import { sendLeadNotificationEmail } from '@/lib/email/send-lead-notification';

interface LeadFormData {
  property_type: string;
  postal_code: string;
  city: string;
  province: string;
  living_area_m2?: number;
  condition: string;
  timeline: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  description?: string;
  gdpr_consent: boolean;
  honeypot?: string;
}

const submissionTimestamps = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = submissionTimestamps.get(identifier) || [];
  const recentTimestamps = timestamps.filter((ts) => now - ts < 3600000);

  if (recentTimestamps.length >= 3) {
    return false;
  }

  recentTimestamps.push(now);
  submissionTimestamps.set(identifier, recentTimestamps);
  return true;
}

export async function submitLead(
  formData: LeadFormData,
  photoFiles: { name: string; data: string; type: string; size: number }[]
) {
  try {
    if (formData.honeypot) {
      return { success: false, error: 'Invalid submission' };
    }

    if (!checkRateLimit(formData.contact_email)) {
      return { success: false, error: 'Te veel aanvragen. Probeer het later opnieuw.' };
    }

    if (!formData.gdpr_consent) {
      return { success: false, error: 'GDPR toestemming is verplicht' };
    }

    if (photoFiles.length > 12) {
      return { success: false, error: 'Maximaal 12 foto\'s toegestaan' };
    }

    for (const file of photoFiles) {
      if (file.size > 10 * 1024 * 1024) {
        return { success: false, error: 'Bestandsgrootte mag niet groter zijn dan 10MB' };
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Alleen JPG, PNG en WEBP bestanden zijn toegestaan' };
      }
    }

    const leadId = `temp-${Date.now()}`;
    const leadDescription = [
      formData.description?.trim() || null,
      photoFiles.length
        ? `Aantal foto's meegegeven: ${photoFiles.length}`
        : 'Geen foto\'s meegestuurd in light mode',
    ]
      .filter(Boolean)
      .join('\n\n');

    const mailResult = await sendLeadNotificationEmail({
      id: leadId,
      contact_name: formData.contact_name,
      contact_email: formData.contact_email,
      contact_phone: formData.contact_phone,
      property_type: formData.property_type,
      city: formData.city,
      province: formData.province,
      postal_code: formData.postal_code,
      condition: formData.condition,
      timeline: formData.timeline,
      living_area_m2: formData.living_area_m2,
      description: leadDescription,
    });

    if (!mailResult.success) {
      return { success: false, error: 'Er is iets misgegaan bij het verzenden van uw aanvraag' };
    }

    return {
      success: true,
      leadId,
      message: 'Uw pand is succesvol ingediend!',
    };
  } catch (error) {
    console.error('Error in submitLead:', error);
    return { success: false, error: 'Er is een onverwachte fout opgetreden' };
  }
}
