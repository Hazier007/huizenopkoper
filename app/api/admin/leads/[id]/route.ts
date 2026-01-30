import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/server';

const SESSION_COOKIE_NAME = 'admin_session';

async function isAuthenticated(): Promise<boolean> {
  // Auth disabled for now
  return true;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching lead:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lead' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const lead: any = data;

    if (lead.photos && Array.isArray(lead.photos) && lead.photos.length > 0) {
      const photosWithUrls = await Promise.all(
        lead.photos.map(async (photo: any) => {
          const { data: signedUrlData } = await supabaseAdmin.storage
            .from('lead-photos')
            .createSignedUrl(photo.path, 3600);

          return {
            ...photo,
            signedUrl: signedUrlData?.signedUrl || null,
          };
        })
      );

      lead.photos = photosWithUrls;
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error in lead detail API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
