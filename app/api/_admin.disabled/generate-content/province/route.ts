import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generateProvinceContent } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  try {
    const { provinceId } = await request.json();

    if (!provinceId) {
      return NextResponse.json(
        { error: 'Province ID is required' },
        { status: 400 }
      );
    }

    const { data: provinceData, error: fetchError } = await supabase
      .from('provinces')
      .select('id, name, slug')
      .eq('id', provinceId)
      .maybeSingle();

    if (fetchError || !provinceData) {
      return NextResponse.json(
        { error: 'Province not found' },
        { status: 404 }
      );
    }

    const province = provinceData as { id: string; name: string; slug: string };

    const { data: citiesData } = await supabase
      .from('cities')
      .select('name')
      .eq('province_id', provinceId);

    const cities = (citiesData || []) as Array<{ name: string }>;
    const cityNames = cities.map(c => c.name);

    const content = await generateProvinceContent({
      name: province.name,
      cities: cityNames,
    });

    // @ts-expect-error - Supabase type inference issue with JSONB columns
    const { error: updateError } = await supabase.from('provinces').update({
      sales_content: content.sales_content,
      market_highlights: content.market_highlights,
      area_features: content.area_features,
      content_generated_at: new Date().toISOString(),
    }).eq('id', provinceId);

    if (updateError) {
      console.error('Error updating province:', updateError);
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
    console.error('Error generating province content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
