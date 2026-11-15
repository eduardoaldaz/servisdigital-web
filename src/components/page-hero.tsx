import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from './ui';

/** Navy opening band of every inner page, with a breadcrumb. */
export function PageHero({
  titulo,
  texto,
  migas,
  children,
}: {
  titulo: React.ReactNode;
  texto?: React.ReactNode;
  migas?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="oscuro relative overflow-hidden bg-tinta text-primer">
      <Container className="relative pb-16 pt-12 sm:pb-20 sm:pt-16">
        {migas && (
          <nav aria-label="Ruta" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-[14px] text-terciario">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              {migas.map((m, i) => (
                <li key={m.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3.5" aria-hidden />
                  {i === migas.length - 1 ? (
                    <span aria-current="page" className="text-secundario">
                      {m.label}
                    </span>
                  ) : (
                    <Link href={m.href} className="hover:text-white">
                      {m.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-[20ch] font-display text-[clamp(38px,5.4vw,68px)] font-extrabold leading-[1.0] tracking-[-0.036em]">{titulo}</h1>
        {texto && <p className="mt-6 max-w-[58ch] text-[19px] leading-relaxed text-secundario">{texto}</p>}
        {children}
      </Container>
    </section>
  );
}
