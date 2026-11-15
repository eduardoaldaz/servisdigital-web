import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { CtaBand } from '@/components/bloques';
import { Container, Section } from '@/components/ui';
import { SERVICIOS } from '@/content/servicios';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'IA para empresas, levantamiento y digitalización de procesos, software a medida e integraciones con ERP y facturación electrónica.',
  alternates: { canonical: '/servicios' },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        migas={[{ href: '/servicios', label: 'Servicios' }]}
        titulo="De entender el proceso a tener la IA funcionando."
        texto="Cuatro servicios que se pueden contratar por separado, pero que rinden más juntos: el mismo equipo mira tu proceso, decide dónde entra la IA y construye lo que hace falta."
      />
      <Section tono="blanco">
        <Container className="flex flex-col gap-20">
          {SERVICIOS.map((s) => (
            <article key={s.slug} id={s.slug} className="grid gap-8 border-t border-linea pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-primer">{s.nombre}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-secundario">{s.resumen}</p>
                <Link href={`/servicios/${s.slug}`} className="group mt-6 inline-flex items-center gap-2 font-semibold text-plano hover:underline">
                  Ver el servicio
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {s.incluye.map((i) => (
                  <div key={i.titulo}>
                    <dt className="text-[16px] font-semibold text-primer">{i.titulo}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-secundario">{i.texto}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
