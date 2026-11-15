import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${esc(p.titulo)}</title><link>${SITE.url}/blog/${p.slug}</link><guid>${SITE.url}/blog/${p.slug}</guid><pubDate>${new Date(p.fecha).toUTCString()}</pubDate><category>${esc(p.categoria)}</category><description>${esc(p.resumen)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name} · Blog</title><link>${SITE.url}/blog</link><description>${esc(SITE.description)}</description><language>es</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
