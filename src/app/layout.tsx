import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE } from '@/lib/site';
import { PRODUCTOS } from '@/content/productos';
import './globals.css';

// Family type system, shared with FacServis and DocusAI.
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-bricolage', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-face', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Implementamos IA en tu empresa`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/blog/feed.xml' } },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'es_ES', alternateLocale: ['es_EC'], images: [{ url: '/og.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#08191c' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  email: SITE.email,
  areaServed: ['ES', 'EC'],
  description: SITE.description,
  brand: PRODUCTOS.map((p) => ({ '@type': 'Brand', name: p.nombre, url: p.url })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${figtree.variable} ${bricolage.variable} ${mono.variable}`}>
      <body>
        {/*
          THESIS: an AI-implementation company proves itself by redrawing a real process; refuses the glowing-orb "AI agency" hero and the stock-photo consultancy.
          OWN-WORLD: petrol bands with a measuring grid only under process drawings, pale paper bands, amber as the single action color, white linework; Bricolage 800 + Figtree, mono only for drawing annotations; FacServis teal/amber and DocusAI violet appear only inside their own product panels.
          STORY: the visitor sees one of their own processes go from manual to AI-assisted, understands we map before we build, sees our own products in production, and books a meeting.
          FIRST VIEWPORT: navy band; left headline "Ponemos la IA a trabajar dentro de tu empresa" with cobalt-light emphasis, one paragraph, primary "Agenda una reunión" + secondary; right a live process blueprint toggling Hoy / Con IA.
          FORM: grounded candidate 1 (process blueprint / "plano de procesos"); concept seed unavailable (script printed nothing), direction chosen in-thread.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-tinta">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && SITE.cfAnalyticsToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={JSON.stringify({ token: SITE.cfAnalyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
