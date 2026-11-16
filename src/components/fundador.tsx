import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { SITE } from '@/lib/site';

/** The person behind the company: one line and a link to the founder's own site. */
export function Fundador() {
  return (
    <Section tono="blanco" aria-labelledby="fundador">
      <Container className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
        <Image
          src="/eduardo-aldaz.webp"
          alt={`Retrato de ${SITE.founder.name}`}
          width={629}
          height={785}
          className="size-36 rounded-full object-cover object-[50%_20%] sm:size-44"
        />
        <div>
          <h2 id="fundador" className="font-display text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-primer [text-wrap:balance]">
            Detrás de Servis Digital hay alguien que mantiene sistemas en producción cada día.
          </h2>
          <p className="mt-4 text-[17px] text-secundario">
            {SITE.founder.name}, fundador. Ingeniero de sistemas con más de ocho años en ERP, integraciones y automatización.
          </p>
          <a
            href={SITE.founder.url}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primer underline decoration-plano-claro decoration-2 underline-offset-4 hover:text-acento"
          >
            Conoce su trayectoria
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </Container>
    </Section>
  );
}
