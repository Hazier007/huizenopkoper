import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendLeadNotificationEmail(leadData: LeadData) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.log('Resend API key not configured, skipping email notification');
      return { success: true, skipped: true };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@huizenopkoper.be';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .section { background: white; padding: 15px; margin-bottom: 15px; border-radius: 6px; border-left: 4px solid #2563eb; }
            .label { font-weight: bold; color: #2563eb; }
            .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nieuwe Lead Ingediend</h1>
              <p style="margin: 10px 0 0 0;">Een nieuwe eigenaar heeft interesse om te verkopen</p>
            </div>
            <div class="content">
              <div class="section">
                <h2 style="margin-top: 0;">Contactgegevens</h2>
                <p><span class="label">Naam:</span> ${leadData.contact_name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${leadData.contact_email}">${leadData.contact_email}</a></p>
                <p><span class="label">Telefoon:</span> <a href="tel:${leadData.contact_phone}">${leadData.contact_phone}</a></p>
              </div>

              <div class="section">
                <h2 style="margin-top: 0;">Pand Informatie</h2>
                <p><span class="label">Type:</span> ${leadData.property_type}</p>
                <p><span class="label">Locatie:</span> ${leadData.city}, ${leadData.province} (${leadData.postal_code})</p>
                <p><span class="label">Staat:</span> ${leadData.condition}</p>
                <p><span class="label">Timing:</span> ${leadData.timeline}</p>
                ${leadData.living_area_m2 ? `<p><span class="label">Bewoonbare opp.:</span> ${leadData.living_area_m2} m²</p>` : ''}
              </div>

              ${leadData.description ? `
              <div class="section">
                <h2 style="margin-top: 0;">Beschrijving</h2>
                <p>${leadData.description}</p>
              </div>
              ` : ''}

              <div style="text-align: center;">
                <a href="${baseUrl}/admin?leadId=${leadData.id}" class="button">
                  Bekijk volledige details
                </a>
              </div>

              <div class="footer">
                <p>Lead ID: ${leadData.id}</p>
                <p>Ingediend op: ${new Date().toLocaleString('nl-BE')}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Huizenopkoper.be <noreply@huizenopkoper.be>',
      to: adminEmail,
      subject: `Nieuwe Lead: ${leadData.property_type} in ${leadData.city}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendLeadNotificationEmail:', error);
    return { success: false, error };
  }
}
