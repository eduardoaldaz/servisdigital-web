import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatFecha, type PostMeta } from '@/lib/blog';
import { CASOS, CIFRAS } from '@/content/pruebas';
import { cn } from '@/lib/cn';
import { ButtonLink, Container, H2, Pendiente, Section } from './ui';

/** Closing band of every page: the one action. Amber field, the strongest color moment of the site. */
export function CtaBand({ titulo = '¿Qué proceso le quita más horas a tu equipo?', texto }: { titulo?: string; texto?: string }) {
  return (
    <section className="relative overflow-hidden bg-plano-claro text-tinta" aria-labelledby="cta-titulo">
      <Container className="relative flex flex-col items-start gap-8 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="cta-titulo" className="max-w-[18ch] font-display text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.0] tracking-[-0.035em]">
            {titulo}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-tinta/80">{texto ?? 'Cuéntanoslo en 30 minutos. Sin compromiso.'}</p>
        </div>
        <Link
          href="/contacto"
          className="group inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-tinta px-8 text-[17px] font-semibold text-white transition-colors hover:bg-tinta-3"
        >
          Agenda una reunión
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}

export function PostList({ posts, className }: { posts: PostMeta[]; className?: string }) {
  return (
    <ul className={cn('grid gap-x-8 gap-y-2 md:grid-cols-3', className)}>
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col border-t border-linea pt-6 pb-4">
            <p className="text-[13px] text-terciario">
              {p.categoria} · {p.minutos} min
            </p>
            <h3 className="mt-3 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-primer decoration-[1.5px] underline-offset-4 group-hover:underline">
              {p.titulo}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-secundario">{p.resumen}</p>
            <p className="mt-auto pt-5 text-[13px] text-terciario">
              <time dateTime={p.fecha}>{formatFecha(p.fecha)}</time>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Real cases and figures. Renders nothing in production until src/content/pruebas.ts has entries. */
export function Pruebas() {
  if (!CASOS.length && !CIFRAS.length) {
    if (process.env.NODE_ENV === 'production') return null;
    return (
      <Container className="pt-16">
        <Pendiente>
          Añade casos reales, cifras y testimonios en <code>src/content/pruebas.ts</code>. Mientras esté vacío, esta sección no aparece en producción.
        </Pendiente>
      </Container>
    );
  }
  return (
    <Section aria-labelledby="resultados">
    <Container>
      <H2 id="resultados" className="mb-12">Resultados de clientes reales.</H2>
      {CIFRAS.length > 0 && (
        <dl className="grid grid-cols-2 gap-6 border-y border-linea py-10 md:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.etiqueta} className="flex flex-col">
              <dt className="text-[14px] text-secundario">{c.etiqueta}</dt>
              <dd className="tnum order-first font-display text-[44px] font-extrabold tracking-[-0.03em] text-primer">{c.valor}</dd>
            </div>
          ))}
        </dl>
      )}
      {CASOS.length > 0 && (
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {CASOS.map((c) => (
            <li key={c.cliente} className="rounded-2xl bg-superficie p-7">
              <p className="text-[13px] text-terciario">
                {c.sector} · {c.pais}
              </p>
              <h3 className="mt-2 font-display text-[22px] font-bold tracking-[-0.02em]">{c.cliente}</h3>
              <p className="mt-4 text-[15px] text-secundario">
                <span className="font-semibold text-primer">Antes: </span>
                {c.antes}
              </p>
              <p className="mt-2 text-[15px] text-secundario">
                <span className="font-semibold text-primer">Qué hicimos: </span>
                {c.solucion}
              </p>
              {c.resultado && <p className="mt-4 font-display text-[18px] font-bold text-plano">{c.resultado}</p>}
            </li>
          ))}
        </ul>
      )}
    </Container>
    </Section>
  );
}

export { ButtonLink };
