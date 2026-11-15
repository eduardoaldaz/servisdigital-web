import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { CtaBand } from '@/components/bloques';
import { ButtonLink, Container, H2, Section } from '@/components/ui';
import { SERVICIOS, servicio } from '@/content/servicios';

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = servicio((await params).slug);
  if (!s) return {};
  return { title: s.nombre, description: s.resumen, alternates: { canonical: `/servicios/${s.slug}` } };
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = servicio((await params).slug);
  if (!s) notFound();
  const otros = SERVICIOS.filter((o) => o.slug !== s.slug);

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.preguntas.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <PageHero
        migas={[
          { href: '/servicios', label: 'Servicios' },
          { href: `/servicios/${s.slug}`, label: s.nombre },
        ]}
        titulo={s.titular}
        texto={s.intro}
      >
        <div className="mt-9">
          <ButtonLink href="/contacto" size="lg">
            Agenda una reunión
          </ButtonLink>
        </div>
      </PageHero>

      <Section tono="blanco" aria-labelledby="incluye">
        <Container>
          <H2 id="incluye">Qué incluye.</H2>
          <dl className="mt-12 grid gap-x-16 border-t border-linea md:grid-cols-2">
            {s.incluye.map((i) => (
              <div key={i.titulo} className="border-b border-linea py-7">
                <dt className="font-display text-[22px] font-bold tracking-[-0.02em] text-primer">{i.titulo}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-secundario">{i.texto}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="entregables">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <H2 id="entregables" className="text-[clamp(28px,3.4vw,42px)]">
              Lo que te llevas.
            </H2>
            <ul className="mt-8 flex flex-col gap-4">
              {s.entregables.map((e) => (
                <li key={e} className="flex gap-3 text-[17px] text-primer">
                  <Check className="mt-1 size-5 shrink-0 text-plano" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.02] tracking-[-0.032em] text-primer">Ejemplos de proyectos.</h2>
            <ul className="mt-8 border-t border-linea">
              {s.ejemplos.map((e) => (
                <li key={e} className="border-b border-linea py-4 text-[17px] text-secundario">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tono="blanco" aria-labelledby="preguntas">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <H2 id="preguntas" className="text-[clamp(28px,3.4vw,42px)]">
            Preguntas frecuentes.
          </H2>
          <div className="border-t border-linea">
            {s.preguntas.map((q) => (
              <details key={q.p} className="group border-b border-linea py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-semibold text-primer">
                  {q.p}
                  <span aria-hidden className="mt-1.5 grid size-5 shrink-0 place-items-center text-plano transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[64ch] text-[16px] leading-relaxed text-secundario">{q.r}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tono="oscuro" className="py-16 sm:py-20" aria-labelledby="otros">
        <Container>
          <h2 id="otros" className="font-display text-[26px] font-bold tracking-[-0.02em] text-primer">
            Otros servicios
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {otros.map((o) => (
              <li key={o.slug}>
                <Link href={`/servicios/${o.slug}`} className="group flex h-full flex-col rounded-2xl border border-linea p-6 transition-colors hover:border-plano-claro">
                  <span className="font-display text-[20px] font-bold tracking-[-0.02em] text-primer">{o.nombre}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-secundario">{o.resumen}</span>
                  <span className="mt-auto pt-5">
                    <ArrowRight className="size-5 text-plano-claro transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
