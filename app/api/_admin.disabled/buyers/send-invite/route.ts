import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/server';
import BuyerInviteEmail from '@/lib/email/buyer-invite-email';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { buyerId } = await request.json();

    if (!buyerId) {
      return NextResponse.json({ error: 'buyerId is required' }, { status: 400 });
    }

    const { data: buyerData, error: buyerError } = await supabaseAdmin
      .from('buyers')
      .select('*')
      .eq('id', buyerId)
      .single();

    if (buyerError || !buyerData) {
      return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });
    }

    const buyer = buyerData as any;

    const { data: latestLeadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!latestLeadData) {
      return NextResponse.json({ error: 'No available leads found' }, { status: 404 });
    }

    const latestLead = latestLeadData as any;

    const { data: tokenResult, error: tokenError } = await supabaseAdmin.rpc(
      'generate_buyer_invite_token',
      {
        p_buyer_id: buyerId,
        p_lead_id: latestLead.id,
        p_days_valid: 7,
      } as any
    );

    if (tokenError || !tokenResult || !(tokenResult as any).success) {
      console.error('Token generation error:', tokenError);
      return NextResponse.json(
        { error: 'Failed to generate invite token' },
        { status: 500 }
      );
    }

    const token = (tokenResult as any).token;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const tokenLink = `${baseUrl}/inkoper/leads/${latestLead.id}?token=${token}`;
    const creditsLink = `${baseUrl}/inkoper/credits?token=${token}`;

    const leadCharacteristics = [];
    if (latestLead.living_area_m2) {
      leadCharacteristics.push(`${latestLead.living_area_m2}m² woonoppervlak`);
    }
    if (latestLead.bedrooms) {
      leadCharacteristics.push(`${latestLead.bedrooms} slaapkamers`);
    }
    if (latestLead.condition) {
      leadCharacteristics.push(`Staat: ${latestLead.condition}`);
    }
    if (latestLead.timeline) {
      leadCharacteristics.push(`Timing: ${latestLead.timeline}`);
    }

    const emailHtml = await render(
      BuyerInviteEmail({
        companyName: buyer.company_name || 'Geachte inkoper',
        contactName: buyer.contact_name,
        leadCity: latestLead.city,
        leadProvince: latestLead.province,
        propertyType: latestLead.property_type,
        teaserSummary: latestLead.teaser_summary || '',
        leadCharacteristics,
        tokenLink,
        creditsLink,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'Leads Platform <onboarding@resend.dev>',
      to: [buyer.email],
      subject: `Nieuwe exclusieve lead in ${latestLead.city} – claim met credits`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Invite email sent successfully',
      emailId: data?.id,
    });
  } catch (error: any) {
    console.error('Error in send-invite:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
