import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProcessBlueprint } from '@/components/process-blueprint';
import { AiDemo } from '@/components/ai-demo';
import { Ruta } from '@/components/ruta';
import { ProductPanels } from '@/components/productos';
import { CtaBand, Pruebas } from '@/components/bloques';
import { Fundador } from '@/components/fundador';
import { ButtonLink, Container, H2, Section } from '@/components/ui';
import { SERVICIOS } from '@/content/servicios';
import { SECTORES } from '@/content/sectores';
import { METODO } from '@/content/metodo';
import { getPosts } from '@/lib/blog';

const PRINCIPIOS = ['La IA propone, una persona decide.', 'Tus datos siguen siendo tuyos.', 'Medimos antes y después.', 'Hablas con quien lo construye.'];

export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      {/* Hero: the blueprint carries the message */}
      <section className="oscuro relative overflow-hidden bg-tinta text-primer">
        <div aria-hidden className="plano-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_75%_40%,#000,transparent)]" />
        <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <h1 className="font-display text-[clamp(42px,6.2vw,80px)] font-extrabold leading-[0.98] tracking-[-0.038em]">
              Ponemos la IA <span className="text-plano-claro">a trabajar</span> dentro de tu empresa.
            </h1>
            <p className="mt-7 max-w-[40ch] text-[20px] leading-relaxed text-secundario">Mapeamos tus procesos, los rediseñamos con IA y construimos el software. Para pymes en España.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contacto" size="lg">
                Agenda una reunión
              </ButtonLink>
              <ButtonLink href="/metodo" variant="secundario" size="lg">
                Cómo trabajamos
              </ButtonLink>
            </div>
          </div>
          <ProcessBlueprint />
        </Container>
      </section>

      {/* AI at work: input → AI → result */}
      <Section tono="blanco" aria-labelledby="demo">
        <Container>
          <H2 id="demo">Así trabaja la IA en tu empresa.</H2>
          <AiDemo className="mt-10" />
          <Link
            href="/calculadora"
            className="group mt-10 flex flex-col gap-4 rounded-2xl bg-plano-suave p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <span>
              <span className="block font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-tinta">¿Cuántas horas pierde tu equipo copiando datos?</span>
              <span className="mt-1.5 block text-[15px] text-texto-2">Calcúlalo en dos minutos, con tus propias tareas. Gratis y sin registrarte.</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-[16px] font-semibold text-plano group-hover:text-plano-hover">
              Abrir la calculadora <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </Container>
      </Section>

      {/* Method */}
      <Section aria-labelledby="metodo">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <H2 id="metodo" className="max-w-[16ch]">
              Primero el proceso. Después la IA.
            </H2>
            <ButtonLink href="/metodo" variant="secundario">
              Ver el método
            </ButtonLink>
          </div>
          <div className="mt-14">
            <Ruta pasos={METODO} />
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section tono="oscuro" aria-labelledby="servicios">
        <Container>
          <H2 id="servicios">Qué hacemos.</H2>
          <ul className="mt-12 border-t border-linea">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="group flex items-center gap-6 border-b border-linea py-7">
                  <span className="flex-1">
                    <span className="block font-display text-[clamp(24px,2.8vw,36px)] font-bold leading-tight tracking-[-0.025em] text-primer transition-colors group-hover:text-plano-claro">
                      {s.nombre}
                    </span>
                    <span className="mt-1 block text-[16px] text-terciario">{s.corto}</span>
                  </span>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-linea text-primer transition-[background-color,color,border-color] group-hover:border-plano-claro group-hover:bg-plano-claro group-hover:text-tinta">
                    <ArrowRight className="size-5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Our own products */}
      <Section aria-labelledby="productos">
        <Container>
          <H2 id="productos" className="max-w-[18ch]">
            No solo lo recomendamos. Lo construimos.
          </H2>
          <ProductPanels className="mt-12" />
        </Container>
      </Section>

      {/* Sectors */}
      <Section tono="blanco" aria-labelledby="sectores">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <H2 id="sectores">Para cualquier sector.</H2>
            <ButtonLink href="/sectores" variant="secundario">
              Ver ejemplos por sector
            </ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-3">
            {SECTORES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sectores#${s.slug}`}
                  className="inline-flex h-14 items-center rounded-full border border-linea px-6 font-display text-[19px] font-bold tracking-[-0.015em] text-primer transition-colors hover:border-tinta hover:bg-tinta hover:text-white"
                >
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Principles: four lines, no paragraphs */}
      <Section tono="oscuro" aria-label="Principios">
        <Container>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {PRINCIPIOS.map((p) => (
              <li key={p} className="border-t border-linea py-7 font-display text-[clamp(24px,2.6vw,32px)] font-bold leading-tight tracking-[-0.025em] text-primer">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Fundador />

      <Pruebas />

      {posts.length > 0 && (
        <Section aria-labelledby="blog">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <H2 id="blog">Del blog.</H2>
              <ButtonLink href="/blog" variant="secundario">
                Ir al blog
              </ButtonLink>
            </div>
            <ul className="mt-10 border-t border-linea">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-6 border-b border-linea py-6">
                    <span className="font-display text-[clamp(20px,2.2vw,26px)] font-bold leading-snug tracking-[-0.02em] text-primer group-hover:underline">{p.titulo}</span>
                    <span className="hidden shrink-0 text-[14px] text-terciario sm:block">{p.minutos} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
