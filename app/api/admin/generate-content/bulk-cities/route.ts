import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generateCityContent } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { cityIds } = await request.json();

        if (!cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'error',
                message: 'City IDs array is required'
              }) + '\n'
            )
          );
          controller.close();
          return;
        }

        const total = cityIds.length;
        let completed = 0;
        let failed = 0;
        const errors: Array<{ id: string; name: string; error: string }> = [];

        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: 'start',
              total,
              message: `Starting bulk generation for ${total} cities...`
            }) + '\n'
          )
        );

        for (const cityId of cityIds) {
          try {
            // Fetch city data
            const { data: cityData, error: fetchError } = await supabase
              .from('cities')
              .select('id, name, slug, province_id')
              .eq('id', cityId)
              .maybeSingle();

            if (fetchError || !cityData) {
              failed++;
              errors.push({
                id: cityId,
                name: 'Unknown',
                error: 'City not found'
              });

              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: 'error',
                    cityId,
                    message: 'City not found'
                  }) + '\n'
                )
              );
              continue;
            }

            const city = cityData as { id: string; name: string; slug: string; province_id: string };

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'progress',
                  cityId: city.id,
                  cityName: city.name,
                  completed,
                  total,
                  message: `Generating content for ${city.name}...`
                }) + '\n'
              )
            );

            // Get province name
            const { data: provinceData } = await supabase
              .from('provinces')
              .select('name')
              .eq('id', city.province_id)
              .maybeSingle();

            const province = provinceData as { name: string } | null;
            const provinceName = province?.name || 'België';

            // Generate content
            const content = await generateCityContent({
              name: city.name,
              province: provinceName,
            });

            // Save to database
            // @ts-expect-error - Supabase type inference issue with JSONB columns
            const { error: updateError } = await supabase.from('cities').update({
              sales_content: content.sales_content,
              neighborhoods: content.neighborhoods,
              amenities: content.amenities,
              market_appeal: content.market_appeal,
              content_generated_at: new Date().toISOString(),
            }).eq('id', cityId);

            if (updateError) {
              failed++;
              errors.push({
                id: city.id,
                name: city.name,
                error: updateError.message
              });

              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: 'error',
                    cityId: city.id,
                    cityName: city.name,
                    message: `Failed to save: ${updateError.message}`
                  }) + '\n'
                )
              );
            } else {
              completed++;
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: 'success',
                    cityId: city.id,
                    cityName: city.name,
                    completed,
                    total,
                    message: `Completed ${city.name}`
                  }) + '\n'
                )
              );
            }

            // Rate limiting: wait 2 seconds between requests
            if (completed + failed < total) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }

          } catch (error: any) {
            failed++;
            errors.push({
              id: cityId,
              name: 'Unknown',
              error: error.message || 'Unknown error'
            });

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'error',
                  cityId,
                  message: error.message || 'Failed to generate content'
                }) + '\n'
              )
            );
          }
        }

        // Send completion message
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: 'complete',
              completed,
              failed,
              total,
              errors,
              message: `Bulk generation complete: ${completed} succeeded, ${failed} failed`
            }) + '\n'
          )
        );

        controller.close();
      } catch (error: any) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: 'error',
              message: error.message || 'Failed to process request'
            }) + '\n'
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
