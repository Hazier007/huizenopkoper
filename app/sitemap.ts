import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://huizenopkoper.be';

  const staticRoutes = [
    '',
    '/werking',
    '/contact',
    '/verkopen',
    '/privacy',
    '/cookies',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const { data: provinces } = await supabase
    .from('provinces')
    .select('slug');

  const provinceRoutes = (provinces || []).map((province: { slug: string }) => ({
    url: `${baseUrl}/provincie/${province.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const { data: cities } = await supabase
    .from('cities')
    .select('slug, provinces!inner(slug)');

  const cityRoutes = (cities || []).map((city: any) => ({
    url: `${baseUrl}/provincie/${city.provinces.slug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...provinceRoutes, ...cityRoutes];
}
