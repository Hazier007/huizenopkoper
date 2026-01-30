import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/server';

const SESSION_COOKIE_NAME = 'admin_session';

async function isAuthenticated(): Promise<boolean> {
  // Auth disabled for now
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const province = searchParams.get('province');
    const format = searchParams.get('format');

    let query = supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (province && province !== 'all') {
      query = query.eq('province', province);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    if (format === 'csv') {
      const csvHeaders = [
        'ID',
        'Datum',
        'Status',
        'Type',
        'Postcode',
        'Gemeente',
        'Provincie',
        'Staat',
        'Timing',
        'Oppervlakte (m²)',
        'Naam',
        'Email',
        'Telefoon',
        'Beschrijving',
      ];

      const csvRows = leads.map((lead: any) => [
        lead.id,
        new Date(lead.created_at).toLocaleDateString('nl-BE'),
        lead.status,
        lead.property_type,
        lead.postal_code,
        lead.city,
        lead.province,
        lead.condition,
        lead.timeline,
        lead.living_area_m2 || '',
        lead.contact_name,
        lead.contact_email,
        lead.contact_phone,
        (lead.description || '').replace(/"/g, '""'),
      ]);

      const csv = [
        csvHeaders.join(','),
        ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error }: any = await (supabaseAdmin as any)
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
