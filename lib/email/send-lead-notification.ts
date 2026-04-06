import nodemailer from 'nodemailer';

interface LeadData {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  property_type: string;
  city: string;
  province: string;
  postal_code: string;
  condition: string;
  timeline: string;
  living_area_m2?: number;
  description?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  };
}

export async function sendLeadNotificationEmail(leadData: LeadData) {
  try {
    const smtpConfig = getSmtpConfig();

    if (!smtpConfig) {
      console.log('SMTP config ontbreekt, mailnotificatie overgeslagen');
      return { success: true, skipped: true };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'deblock.bart@gmail.com';
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || adminEmail;
    const fromName = process.env.SMTP_FROM_NAME || 'Huizenopkoper.be';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huizenopkoper.be';
    const submittedAt = new Date().toLocaleString('nl-BE');

    const transporter = nodemailer.createTransport(smtpConfig);

    const text = [
      'Nieuwe lead via huizenopkoper.be',
      '',
      `Lead ID: ${leadData.id}`,
      `Naam: ${leadData.contact_name}`,
      `Email: ${leadData.contact_email}`,
      `Telefoon: ${leadData.contact_phone}`,
      `Pandtype: ${leadData.property_type}`,
      `Locatie: ${leadData.city}, ${leadData.province} (${leadData.postal_code})`,
      `Staat: ${leadData.condition}`,
      `Timing: ${leadData.timeline}`,
      leadData.living_area_m2 ? `Bewoonbare opp.: ${leadData.living_area_m2} m²` : null,
      leadData.description ? `Beschrijving: ${leadData.description}` : null,
      `Admin link: ${baseUrl}/admin?leadId=${leadData.id}`,
      `Ingediend op: ${submittedAt}`,
    ].filter(Boolean).join('\n');

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:640px;margin:0 auto;">
        <h1 style="margin-bottom:8px;">Nieuwe lead via huizenopkoper.be</h1>
        <p style="margin-top:0;color:#4b5563;">Lead ID: ${escapeHtml(leadData.id)}</p>

        <h2 style="margin-top:24px;">Contactgegevens</h2>
        <ul>
          <li><strong>Naam:</strong> ${escapeHtml(leadData.contact_name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(leadData.contact_email)}</li>
          <li><strong>Telefoon:</strong> ${escapeHtml(leadData.contact_phone)}</li>
        </ul>

        <h2 style="margin-top:24px;">Pandinformatie</h2>
        <ul>
          <li><strong>Type:</strong> ${escapeHtml(leadData.property_type)}</li>
          <li><strong>Locatie:</strong> ${escapeHtml(`${leadData.city}, ${leadData.province} (${leadData.postal_code})`)}</li>
          <li><strong>Staat:</strong> ${escapeHtml(leadData.condition)}</li>
          <li><strong>Timing:</strong> ${escapeHtml(leadData.timeline)}</li>
          ${leadData.living_area_m2 ? `<li><strong>Bewoonbare opp.:</strong> ${leadData.living_area_m2} m²</li>` : ''}
        </ul>

        ${leadData.description ? `
          <h2 style="margin-top:24px;">Beschrijving</h2>
          <p>${escapeHtml(leadData.description)}</p>
        ` : ''}

        <p style="margin-top:24px;">
          <a href="${baseUrl}/admin?leadId=${encodeURIComponent(leadData.id)}" style="display:inline-block;padding:12px 18px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;">
            Bekijk lead in admin
          </a>
        </p>

        <p style="margin-top:24px;color:#6b7280;font-size:14px;">Ingediend op: ${escapeHtml(submittedAt)}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: leadData.contact_email,
      subject: `Nieuwe Lead: ${leadData.property_type} in ${leadData.city}`,
      text,
      html,
    });

    return { success: true, data: { messageId: info.messageId } };
  } catch (error) {
    console.error('Error in sendLeadNotificationEmail:', error);
    return { success: false, error };
  }
}
