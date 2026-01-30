import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generateCityContent } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  try {
    const { cityId } = await request.json();

    if (!cityId) {
      return NextResponse.json(
        { error: 'City ID is required' },
        { status: 400 }
      );
    }

    const { data: cityData, error: fetchError } = await supabase
      .from('cities')
      .select('id, name, slug, province_id')
      .eq('id', cityId)
      .maybeSingle();

    if (fetchError || !cityData) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    const city = cityData as { id: string; name: string; slug: string; province_id: string };

    const { data: provinceData } = await supabase
      .from('provinces')
      .select('name')
      .eq('id', city.province_id)
      .maybeSingle();

    const province = provinceData as { name: string } | null;
    const provinceName = province?.name || 'België';

    const content = await generateCityContent({
      name: city.name,
      province: provinceName,
    });

    // @ts-expect-error - Supabase type inference issue with JSONB columns
    const { error: updateError } = await supabase.from('cities').update({
      sales_content: content.sales_content,
      neighborhoods: content.neighborhoods,
      amenities: content.amenities,
      market_appeal: content.market_appeal,
      content_generated_at: new Date().toISOString(),
    }).eq('id', cityId);

    if (updateError) {
      console.error('Error updating city:', updateError);
      return NextResponse.json(
        { error: 'Failed to save content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error: any) {
    console.error('Error generating city content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
