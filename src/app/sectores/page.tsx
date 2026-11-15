import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { CtaBand } from '@/components/bloques';
import { Container, Section } from '@/components/ui';
import { SECTORES } from '@/content/sectores';

export const metadata: Metadata = {
  title: 'Sectores',
  description: 'IA y software a medida para comercio, gestorías, agroexportación, salud, construcción, logística, industria, despachos, educación y turismo.',
  alternates: { canonical: '/sectores' },
};

export default function SectoresPage() {
  return (
    <>
      <PageHero
        migas={[{ href: '/sectores', label: 'Sectores' }]}
        titulo="Cambia el sector, el método es el mismo."
        texto="Cada empresa tiene uno o dos procesos que se comen las horas del equipo. Estos son los que más vemos por sector y cómo la IA ayuda en cada uno. ¿El tuyo no está? Trabajamos con cualquier nicho: empezamos por entender tu proceso."
      >
        <nav aria-label="Sectores" className="mt-10 flex flex-wrap gap-2">
          {SECTORES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="rounded-full border border-linea px-4 py-2 text-[14px] text-secundario transition-colors hover:border-plano-claro hover:text-white">
              {s.nombre}
            </a>
          ))}
        </nav>
      </PageHero>
      <Section tono="blanco">
        <Container>
          <ul className="border-t border-linea">
            {SECTORES.map((s) => (
              <li key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-6 border-b border-linea py-12 lg:grid-cols-[1fr_1.1fr_1.2fr] lg:gap-12">
                <h2 className="font-display text-[clamp(26px,2.8vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-primer">{s.nombre}</h2>
                <div>
                  <p className="text-[14px] font-semibold text-terciario">Lo que duele</p>
                  <p className="mt-2 text-[17px] leading-relaxed text-primer">{s.dolor}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[14px] font-semibold text-plano">
                    <Sparkles className="size-4" aria-hidden /> Dónde entra la IA
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {s.casos.map((c) => (
                      <li key={c} className="text-[16px] leading-relaxed text-secundario">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand titulo="¿Tu sector no aparece aquí?" texto="Mejor: los procesos se parecen más de lo que parece. Cuéntanos el tuyo en 30 minutos y te diremos qué haríamos." />
    </>
  );
}
