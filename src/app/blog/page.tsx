import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog-index';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guías prácticas sobre IA en empresas, digitalización de procesos, software a medida y facturación electrónica.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogIndex />;
}
