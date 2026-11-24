import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculadora } from '@/components/calculadora';
import { CtaBand } from '@/components/bloques';
import { PageHero } from '@/components/page-hero';
import { Container, Section } from '@/components/ui';
import { SITE } from '@/lib/site';
import { getPosts } from '@/lib/blog';

const ARTICULO = 'calcular-tiempo-perdido-en-tareas-manuales';

const titulo = 'Calculadora: cuánto le cuestan a tu empresa las tareas manuales';
const descripcion =
  'Calcula gratis las horas y el dinero que tu equipo dedica cada mes a copiar, teclear y buscar datos. Tres números por tarea y ves dónde empezar a automatizar.';

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: '/calculadora' },
  openGraph: { title: titulo, description: descripcion, url: '/calculadora', type: 'website', images: ['/og.png'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de tareas manuales',
  url: `${SITE.url}/calculadora/`,
  description: descripcion,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'es-ES',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
};

export default function CalculadoraPage() {
  // The companion article is scheduled; link to it only once it is published.
  const articulo = getPosts().some((p) => p.slug === ARTICULO);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        migas={[{ href: '/calculadora', label: 'Calculadora' }]}
        titulo="¿Cuánto te cuestan las tareas manuales?"
        texto="Apunta lo que tu equipo copia, teclea o busca cada semana. Con tres números por tarea verás las horas y el dinero que se van al mes, y por dónde empezar."
      />
      <Section>
        <Container>
          <Calculadora />
        </Container>
      </Section>
      <Section tono="blanco" aria-labelledby="como-usarla">
        <Container className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div>
            <h2 id="como-usarla" className="font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-primer">
              Cómo sacarle partido
            </h2>
          </div>
          <ol className="flex flex-col gap-6 text-[16px] leading-relaxed text-secundario lg:col-span-2">
            <li>
              <strong className="text-primer">Pregunta a quien hace el trabajo.</strong> «¿Qué haces cada semana que consiste en leer, copiar, teclear, buscar o responder lo mismo?»
              Anota las respuestas tal cual.
            </li>
            <li>
              <strong className="text-primer">No busques precisión.</strong> Una estimación honesta basta para decidir. Repite el cálculo tres meses después de cualquier cambio: si
              no baja, algo no ha funcionado.
            </li>
            <li>
              <strong className="text-primer">Mira más allá de la cifra.</strong> Errores, esperas y tareas que solo sabe hacer una persona también cuestan, aunque no salgan en la
              suma.
              {articulo && (
                <>
                  {' '}Lo explicamos en{' '}
                  <Link href={`/blog/${ARTICULO}`} className="text-plano underline underline-offset-2 hover:text-plano-hover">
                    cómo calcular el tiempo perdido en tareas manuales
                  </Link>
                  .
                </>
              )}
            </li>
          </ol>
        </Container>
      </Section>
      <CtaBand titulo="¿Ya tienes tu cifra?" texto="En 30 minutos revisamos tu lista y te decimos qué tareas tienen solución hoy y cuáles no." />
    </>
  );
}
