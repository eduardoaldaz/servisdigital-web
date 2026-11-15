import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { CtaBand } from '@/components/bloques';
import { ProcessBlueprint } from '@/components/process-blueprint';
import { Container, H2, Lead, Section } from '@/components/ui';
import { METODO } from '@/content/metodo';

export const metadata: Metadata = {
  title: 'Cómo trabajamos',
  description: 'Diagnóstico, levantamiento del proceso, piloto medido y despliegue. Así llevamos la IA a una empresa.',
  alternates: { canonical: '/metodo' },
};

export default function MetodoPage() {
  return (
    <>
      <PageHero
        migas={[{ href: '/metodo', label: 'Cómo trabajamos' }]}
        titulo="Primero el proceso. Después la IA. Luego el software."
        texto="Cuatro etapas, siempre en el mismo orden. Puedes parar después de cualquiera de ellas y quedarte con lo que te hemos entregado."
      />
      <Section tono="blanco">
        <Container>
          <ol className="relative">
            <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-plano/30 lg:left-[calc(33.333%-16px)]" />
            {METODO.map((m, i) => (
              <li key={m.nombre} className="relative grid gap-6 pb-16 pl-14 last:pb-0 lg:grid-cols-[calc(33.333%-48px)_1fr] lg:gap-16 lg:pl-0">
                <div className="lg:pr-12 lg:text-right">
                  <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-primer">{m.nombre}</h2>
                </div>
                <span
                  aria-hidden
                  className={
                    'absolute left-0 top-1.5 flex size-[31px] items-center justify-center rounded-full border-2 border-plano lg:left-[calc(33.333%-31px)] ' +
                    (i === METODO.length - 1 ? 'bg-plano' : 'bg-superficie')
                  }
                >
                  <span className={'size-[9px] rounded-full ' + (i === METODO.length - 1 ? 'bg-white' : 'bg-plano')} />
                </span>
                <div className="lg:pl-4">
                  <p className="max-w-[56ch] text-[18px] leading-relaxed text-primer">{m.texto}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {m.detalle.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[16px] text-secundario">
                        <Check className="mt-1 size-4 shrink-0 text-plano" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 inline-block rounded-xl bg-plano-suave px-4 py-3 text-[15px] text-primer">
                    <span className="font-semibold">Te llevas: </span>
                    {m.entregable}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tono="oscuro" aria-labelledby="ejemplo">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <H2 id="ejemplo">Así se ve un proceso antes y después.</H2>
            <Lead className="mt-6">
              Este es el tipo de mapa que dibujamos en el levantamiento: cada paso, quién lo hace y qué cambia con IA. Cambia de proceso y compara.
            </Lead>
          </div>
          <ProcessBlueprint />
        </Container>
      </Section>
      <CtaBand titulo="Empieza por el diagnóstico." texto="Treinta minutos para contarnos tu proceso. Si vemos un caso claro, te enviamos una propuesta de levantamiento con su alcance y su precio." />
    </>
  );
}
