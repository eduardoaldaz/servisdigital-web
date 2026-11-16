import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog-index';
import { getCategorias, slugCategoria } from '@/lib/blog';

type Props = { params: Promise<{ categoria: string }> };

const bySlug = (slug: string) => getCategorias().find((c) => slugCategoria(c) === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategorias().map((c) => ({ categoria: slugCategoria(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = bySlug((await params).categoria);
  return c ? { title: `${c} · Blog`, alternates: { canonical: `/blog/categoria/${slugCategoria(c)}` } } : {};
}

export default async function CategoriaPage({ params }: Props) {
  const c = bySlug((await params).categoria);
  if (!c) notFound();
  return <BlogIndex categoria={c} />;
}
