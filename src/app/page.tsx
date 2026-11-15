import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProcessBlueprint } from '@/components/process-blueprint';
import { ProductPanels } from '@/components/productos';
import { CtaBand, PostList, Pruebas } from '@/components/bloques';
import { ButtonLink, Container, H2, Lead, Section } from '@/components/ui';
import { SERVICIOS } from '@/content/servicios';
import { SECTORES } from '@/content/sectores';
import { getPosts } from '@/lib/blog';
import { METODO } from '@/content/metodo';

const CAPACIDADES = [
  { nombre: 'Leer documentos', ejemplo: 'Facturas, albaranes, pedidos y contratos convertidos en datos validados, sin teclear.' },
  { nombre: 'Atender y responder', ejemplo: 'Consultas por WhatsApp, web o correo respondidas con tu información, y derivadas a una persona cuando toca.' },
  { nombre: 'Clasificar y enrutar', ejemplo: 'Cada correo, ticket o solicitud a la persona correcta, con su prioridad y un resumen.' },
  { nombre: 'Responder sobre tus datos', ejemplo: '«¿Qué clientes compran menos que el año pasado?» Preguntas en español, respuestas con la fuente.' },
  { nombre: 'Redactar y resumir', ejemplo: 'Borradores de presupuestos, informes y respuestas a partir de tus plantillas y tu histórico.' },
  { nombre: 'Avisar a tiempo', ejemplo: 'Facturas duplicadas, precios fuera de lo normal, stock que se acaba o clientes que dejan de pagar.' },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      {/* Hero: the thesis is the blueprint on the right */}
      <section className="oscuro relative overflow-hidden bg-tinta text-primer">
        <div aria-hidden className="plano-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_75%_40%,#000,transparent)]" />
        <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <h1 className="font-display text-[clamp(42px,6.2vw,80px)] font-extrabold leading-[0.98] tracking-[-0.038em]">
              Ponemos la IA <span className="text-plano-claro">a trabajar</span> dentro de tu empresa.
            </h1>
            <p className="mt-7 max-w-[50ch] text-[19px] leading-relaxed text-secundario">
              Entendemos cómo trabaja tu equipo hoy, rediseñamos el proceso con IA donde de verdad ahorra horas y construimos el software que lo hace funcionar. Para empresas de cualquier sector en Ecuador y España.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contacto" size="lg">
                Agenda una reunión
              </ButtonLink>
              <ButtonLink href="/metodo" variant="secundario" size="lg">
                Cómo trabajamos
              </ButtonLink>
            </div>
            <p className="mt-6 text-[14px] text-terciario">30 minutos · Sin compromiso · Hablas con quien lo construye</p>
          </div>
          <ProcessBlueprint />
        </Container>
      </section>

      {/* What AI already does well */}
      <Section tono="blanco" aria-labelledby="capacidades">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <H2 id="capacidades">Lo que la IA ya hace bien en una empresa.</H2>
            <Lead className="lg:pt-3">
              Sin ciencia ficción: son tareas que hoy hace una persona leyendo, copiando o buscando, y que la IA ya resuelve con fiabilidad cuando está bien conectada y alguien supervisa.
            </Lead>
          </div>
          <dl className="mt-14 grid border-t border-linea md:grid-cols-2 md:gap-x-16">
            {CAPACIDADES.map((c) => (
              <div key={c.nombre} className="grid gap-2 border-b border-linea py-7 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="font-display text-[21px] font-bold leading-tight tracking-[-0.02em] text-primer">{c.nombre}</dt>
                <dd className="text-[16px] leading-relaxed text-secundario">{c.ejemplo}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Method: a route on the blueprint */}
      <Section aria-labelledby="metodo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <H2 id="metodo" className="max-w-[16ch]">
              Primero el proceso. Después la IA.
            </H2>
            <Lead className="lg:max-w-[46ch]">Automatizar un proceso que nadie ha mirado solo hace más rápido el desorden. Por eso empezamos siempre igual.</Lead>
          </div>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-plano/30 md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
            {METODO.map((m, i) => (
              <li key={m.nombre} className="relative pl-10 md:pl-0 md:pt-12">
                <span
                  aria-hidden
                  className={
                    'absolute left-0 top-0 flex size-[23px] items-center justify-center rounded-full border-2 ' +
                    (i === METODO.length - 1 ? 'border-plano bg-plano' : 'border-plano bg-papel')
                  }
                >
                  <span className={'size-[7px] rounded-full ' + (i === METODO.length - 1 ? 'bg-white' : 'bg-plano')} />
                </span>
                <h3 className="font-display text-[23px] font-bold tracking-[-0.02em] text-primer">{m.nombre}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-secundario">{m.texto}</p>
                <p className="mt-4 text-[14px] text-primer">
                  <span className="text-terciario">Te llevas: </span>
                  {m.entregable}
                </p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/metodo" variant="texto" className="mt-12">
            Ver el método completo
          </ButtonLink>
        </Container>
      </Section>

      {/* Services */}
      <Section tono="oscuro" aria-labelledby="servicios">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <H2 id="servicios">Todo lo que hace falta para llevar la IA a tu operación.</H2>
            <Lead className="lg:pt-3">Un solo equipo desde el primer mapa del proceso hasta el software en producción, con las integraciones y el soporte después.</Lead>
          </div>
          <ul className="mt-14 border-t border-linea">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="group grid items-center gap-3 border-b border-linea py-8 transition-colors md:grid-cols-[1fr_1.1fr_auto] md:gap-10">
                  <h3 className="font-display text-[clamp(24px,2.6vw,32px)] font-bold leading-tight tracking-[-0.025em] text-primer transition-colors group-hover:text-plano-claro">
                    {s.nombre}
                  </h3>
                  <p className="text-[16px] leading-relaxed text-secundario">{s.resumen}</p>
                  <span className="hidden size-11 items-center justify-center rounded-full border border-linea text-primer transition-[background-color,color,border-color] group-hover:border-plano-claro group-hover:bg-plano-claro group-hover:text-tinta md:flex">
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
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <H2 id="productos">No solo lo recomendamos. Lo construimos y lo operamos.</H2>
            <Lead className="lg:pt-3">
              FacServis ya lo usan empresas en Ecuador y DocusAI abre su acceso anticipado en España. Lo que aprendemos con ellos es lo que aplicamos en cada proyecto a medida.
            </Lead>
          </div>
          <ProductPanels className="mt-14" />
        </Container>
      </Section>

      {/* Sectors */}
      <Section tono="blanco" aria-labelledby="sectores">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <H2 id="sectores" className="max-w-[18ch]">
              Cada sector tiene un proceso que pesa más que los demás.
            </H2>
            <ButtonLink href="/sectores" variant="secundario">
              Ver todos los sectores
            </ButtonLink>
          </div>
          <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
            {SECTORES.slice(0, 6).map((s) => (
              <li key={s.slug} className="border-t border-linea py-6">
                <Link href={`/sectores#${s.slug}`} className="group block">
                  <h3 className="font-display text-[21px] font-bold tracking-[-0.02em] text-primer group-hover:text-plano">{s.nombre}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-secundario">{s.dolor}</p>
                  <p className="mt-3 text-[14.5px] text-primer">
                    <span className="font-semibold text-plano">Con IA: </span>
                    {s.casos[0]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Principles */}
      <Section tono="oscuro" aria-labelledby="principios">
        <Container>
          <H2 id="principios" className="max-w-[20ch]">
            IA con los pies en la tierra.
          </H2>
          <dl className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {[
              ['La IA propone, una persona decide.', 'Automatizamos lo que es seguro automatizar. Para lo demás, la IA prepara el trabajo y tu equipo aprueba con un clic.'],
              ['Tus datos siguen siendo tuyos.', 'Proveedores de IA que no entrenan con tu información, datos alojados donde corresponde y cumplimiento del RGPD en España y la LOPDP en Ecuador.'],
              ['Medimos antes y después.', 'Cada piloto empieza midiendo el proceso actual. Así sabes qué has ganado, en horas y en errores, y no solo lo que te prometimos.'],
              ['Hablas con quien lo construye.', 'Sin cadenas de intermediarios: el equipo que levanta tu proceso es el mismo que diseña y programa la solución.'],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-linea pt-6">
                <dt className="font-display text-[23px] font-bold tracking-[-0.02em] text-primer">{t}</dt>
                <dd className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-secundario">{d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Pruebas />

      {posts.length > 0 && (
        <Section aria-labelledby="blog">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <H2 id="blog">Ideas para empezar con IA.</H2>
              <ButtonLink href="/blog" variant="secundario">
                Ir al blog
              </ButtonLink>
            </div>
            <PostList posts={posts} className="mt-12" />
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
