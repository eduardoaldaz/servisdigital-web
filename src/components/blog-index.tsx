import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { CtaBand, PostList } from '@/components/bloques';
import { Container, Section } from '@/components/ui';
import { formatFecha, getCategorias, getPosts, slugCategoria } from '@/lib/blog';

/** Blog listing; with a category it shows only that category (static page per category). */
export function BlogIndex({ categoria }: { categoria?: string }) {
  const all = getPosts();
  const categorias = getCategorias();
  const posts = categoria ? all.filter((p) => p.categoria === categoria) : all;
  const [destacado, ...resto] = posts;

  return (
    <>
      <PageHero
        migas={[{ href: '/blog', label: 'Blog' }]}
        titulo="Ideas prácticas para llevar la IA a tu empresa."
        texto="Lo que aprendemos levantando procesos y construyendo software, explicado sin jerga."
      >
        <nav aria-label="Categorías" className="mt-10 flex flex-wrap gap-2">
          {[undefined, ...categorias].map((c) => {
            const active = c === categoria;
            return (
              <Link
                key={c ?? 'todas'}
                href={c ? `/blog/categoria/${slugCategoria(c)}` : '/blog'}
                aria-current={active ? 'page' : undefined}
                className={
                  'rounded-full border px-4 py-2 text-[14px] transition-colors ' +
                  (active ? 'border-plano-claro bg-plano-claro text-tinta' : 'border-linea text-secundario hover:border-plano-claro hover:text-white')
                }
              >
                {c ?? 'Todas'}
              </Link>
            );
          })}
        </nav>
      </PageHero>
      <Section tono="blanco">
        <Container>
          {destacado ? (
            <>
              <Link href={`/blog/${destacado.slug}`} className="group grid gap-6 border-b border-linea pb-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                <h2 className="font-display text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.04] tracking-[-0.032em] text-primer decoration-2 underline-offset-[6px] group-hover:underline">
                  {destacado.titulo}
                </h2>
                <div className="lg:pt-2">
                  <p className="text-[17px] leading-relaxed text-secundario">{destacado.resumen}</p>
                  <p className="mt-5 text-[14px] text-terciario">
                    {destacado.categoria} · {destacado.minutos} min de lectura · <time dateTime={destacado.fecha}>{formatFecha(destacado.fecha)}</time>
                  </p>
                </div>
              </Link>
              {resto.length > 0 && <PostList posts={resto} className="mt-6" />}
            </>
          ) : (
            <p className="text-[17px] text-secundario">Todavía no hay artículos en esta categoría.</p>
          )}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
