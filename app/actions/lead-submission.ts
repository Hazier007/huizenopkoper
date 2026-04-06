'use server';

import { createClient } from '@supabase/supabase-js';
import { sendLeadNotificationEmail } from '@/lib/email/send-lead-notification';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

  const recentTimestamps = timestamps.filter(ts => now - ts < 3600000);

  if (recentTimestamps.length >= 3) {
    return false;
  }

  recentTimestamps.push(now);
  submissionTimestamps.set(identifier, recentTimestamps);

  return true;
}

export async function submitLead(formData: LeadFormData, photoFiles: { name: string; data: string; type: string; size: number }[]) {
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

    if (photoFiles.length < 1) {
      return { success: false, error: 'Minimaal 1 foto is verplicht' };
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

    const leadData = {
      property_type: formData.property_type,
      postal_code: formData.postal_code,
      city: formData.city,
      province: formData.province,
      living_area_m2: formData.living_area_m2 || null,
      condition: formData.condition,
      occupancy: 'te bespreken',
      timeline: formData.timeline,
      description: formData.description || null,
      contact_name: formData.contact_name,
      contact_email: formData.contact_email,
      contact_phone: formData.contact_phone,
      gdpr_consent: formData.gdpr_consent,
      source_page: '/verkopen',
      photos: [],
    };

    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting lead:', insertError);

      const debugMessage = insertError.message || 'Onbekende databasefout';
      const safeHint = process.env.NODE_ENV !== 'production'
        ? `Opslaan mislukt: ${debugMessage}`
        : 'Er is iets misgegaan bij het opslaan van uw gegevens';

      return { success: false, error: safeHint };
    }

    const uploadedPhotos: any[] = [];

    for (let i = 0; i < photoFiles.length; i++) {
      const file = photoFiles[i];
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}_${randomStr}.${fileExt}`;
      const filePath = `${lead.id}/${fileName}`;

      const base64Data = file.data.split(',')[1];
      const fileBuffer = Buffer.from(base64Data, 'base64');

      const { error: uploadError } = await supabase.storage
        .from('lead-photos')
        .upload(filePath, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Error uploading photo:', uploadError);
        continue;
      }

      uploadedPhotos.push({
        path: filePath,
        filename: file.name,
        size: file.size,
        type: file.type,
        uploaded_at: new Date().toISOString(),
      });
    }

    if (uploadedPhotos.length > 0) {
      const { error: updateError } = await supabase
        .from('leads')
        .update({ photos: uploadedPhotos })
        .eq('id', lead.id);

      if (updateError) {
        console.error('Error updating photos:', updateError);
      }
    }

    await sendLeadNotificationEmail({
      id: lead.id,
      contact_name: lead.contact_name,
      contact_email: lead.contact_email,
      contact_phone: lead.contact_phone,
      property_type: lead.property_type,
      city: lead.city,
      province: lead.province,
      postal_code: lead.postal_code,
      condition: lead.condition,
      timeline: lead.timeline,
      living_area_m2: lead.living_area_m2,
      description: lead.description,
    });

    return {
      success: true,
      leadId: lead.id,
      message: 'Uw pand is succesvol ingediend!'
    };
  } catch (error) {
    console.error('Error in submitLead:', error);
    return { success: false, error: 'Er is een onverwachte fout opgetreden' };
  }
}
