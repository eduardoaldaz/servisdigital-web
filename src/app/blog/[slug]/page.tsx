import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { CtaBand, PostList } from '@/components/bloques';
import { Container, Section } from '@/components/ui';
import { formatFecha, getPost, getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumen,
    alternates: { canonical: `/blog/${p.slug}` },
    authors: [{ name: p.autor, url: p.autor === SITE.founder.name ? SITE.founder.url : SITE.url }],
    // Next replaces (does not merge) the layout's openGraph, so the image has to be repeated here.
    openGraph: {
      type: 'article',
      url: `/blog/${p.slug}/`,
      siteName: SITE.name,
      locale: 'es_ES',
      title: p.titulo,
      description: p.resumen,
      publishedTime: p.fecha,
      authors: [p.autor],
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: p.titulo, description: p.resumen, images: ['/og.png'] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const relacionados = getPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    description: post.resumen,
    datePublished: post.fecha,
    dateModified: post.fecha,
    inLanguage: 'es',
    image: `${SITE.url}/og.png`,
    author:
      post.autor === SITE.founder.name
        ? { '@type': 'Person', name: post.autor, url: SITE.founder.url, jobTitle: 'Fundador de Servis Digital' }
        : { '@type': 'Organization', name: post.autor, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.svg` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className="oscuro bg-tinta text-primer">
          <Container className="max-w-[860px] pb-16 pt-12 sm:pb-20 sm:pt-16">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[14px] text-terciario hover:text-white">
              <ArrowLeft className="size-4" aria-hidden /> Blog
            </Link>
            <p className="mt-8 text-[14px] text-acento">{post.categoria}</p>
            <h1 className="mt-3 font-display text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.03] tracking-[-0.034em]">{post.titulo}</h1>
            <p className="mt-6 text-[19px] leading-relaxed text-secundario">{post.resumen}</p>
            <p className="mt-8 text-[14px] text-terciario">
              {post.autor} · <time dateTime={post.fecha}>{formatFecha(post.fecha)}</time> · {post.minutos} min de lectura
            </p>
          </Container>
        </header>
        <div className="bg-superficie">
          <Container className="max-w-[760px] py-16 sm:py-20">
            <div className="prosa">
              <MDXRemote source={post.contenido} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>
          </Container>
        </div>
      </article>
      {relacionados.length > 0 && (
        <Section aria-labelledby="mas">
          <Container>
            <h2 id="mas" className="font-display text-[30px] font-extrabold tracking-[-0.03em] text-primer">
              Sigue leyendo
            </h2>
            <PostList posts={relacionados} className="mt-8" />
          </Container>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
