export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/servicios', '/sectores', '/productos', '/metodo', '/calculadora', '/blog', '/contacto', '/privacidad', '/aviso-legal'];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}/`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...SERVICIOS.map((s) => ({ url: `${SITE.url}/servicios/${s.slug}/`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...getPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}/`, lastModified: p.fecha, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
