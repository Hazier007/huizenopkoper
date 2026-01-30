import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generateProvinceContent } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { provinceIds } = await request.json();

        if (!provinceIds || !Array.isArray(provinceIds) || provinceIds.length === 0) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'error',
                message: 'Province IDs array is required'
              }) + '\n'
            )
          );
          controller.close();
          return;
        }

        const total = provinceIds.length;
        let completed = 0;
        let failed = 0;
        const errors: Array<{ id: string; name: string; error: string }> = [];

        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: 'start',
              total,
              message: `Starting bulk generation for ${total} provinces...`
            }) + '\n'
          )
        );

        for (const provinceId of provinceIds) {
          try {
            // Fetch province data
            const { data: provinceData, error: fetchError } = await supabase
              .from('provinces')
              .select('id, name, slug')
              .eq('id', provinceId)
              .maybeSingle();

            if (fetchError || !provinceData) {
              failed++;
              errors.push({
                id: provinceId,
                name: 'Unknown',
                error: 'Province not found'
              });

              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: 'error',
                    provinceId,
                    message: 'Province not found'
                  }) + '\n'
                )
              );
              continue;
            }

            const province = provinceData as { id: string; name: string; slug: string };

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'progress',
                  provinceId: province.id,
                  provinceName: province.name,
                  completed,
                  total,
                  message: `Generating content for ${province.name}...`
                }) + '\n'
              )
            );

            // Get cities for this province
            const { data: citiesData } = await supabase
              .from('cities')
              .select('name')
              .eq('province_id', provinceId);

            const cities = (citiesData || []) as Array<{ name: string }>;
            const cityNames = cities.map(c => c.name);

            // Generate content
            const content = await generateProvinceContent({
              name: province.name,
              cities: cityNames,
            });

            // Save to database
            // @ts-expect-error - Supabase type inference issue with JSONB columns
            const { error: updateError } = await supabase.from('provinces').update({
              sales_content: content.sales_content,
              market_highlights: content.market_highlights,
              area_features: content.area_features,
              content_generated_at: new Date().toISOString(),
            }).eq('id', provinceId);

            if (updateError) {
              failed++;
              errors.push({
                id: province.id,
                name: province.name,
                error: updateError.message
              });

              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: 'error',
                    provinceId: province.id,
                    provinceName: province.name,
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
                    provinceId: province.id,
                    provinceName: province.name,
                    completed,
                    total,
                    message: `Completed ${province.name}`
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
              id: provinceId,
              name: 'Unknown',
              error: error.message || 'Unknown error'
            });

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'error',
                  provinceId,
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
