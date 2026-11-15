import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';
import { PRODUCTOS } from '@/content/productos';
import { Container } from './ui';
import { DocusAIWordmark, FacServisWordmark, Logo } from './logo';

export function Footer() {
  return (
    <footer className="oscuro bg-tinta text-primer">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[34ch] text-[15px] text-secundario">Implementamos IA en empresas y construimos el software que la hace funcionar.</p>
          <p className="mt-5 text-[14px] text-terciario">{SITE.countries.join(' · ')}</p>
          <a href={`mailto:${SITE.email}`} className="mt-1 inline-block text-[14px] text-secundario hover:text-white">
            {SITE.email}
          </a>
        </div>
        <FooterCol title="Servicios">
          {SERVICIOS.map((s) => (
            <FooterLink key={s.slug} href={`/servicios/${s.slug}`}>
              {s.nombre}
            </FooterLink>
          ))}
        </FooterCol>
        <FooterCol title="Empresa">
          {NAV.filter((n) => n.href !== '/servicios').map((n) => (
            <FooterLink key={n.href} href={n.href}>
              {n.label}
            </FooterLink>
          ))}
          <FooterLink href="/contacto">Contacto</FooterLink>
        </FooterCol>
        <FooterCol title="Productos">
          {PRODUCTOS.map((p) => (
            <li key={p.id}>
              <a href={p.url} target="_blank" rel="noopener" className="inline-flex flex-col gap-1 py-1">
                {p.id === 'facservis' ? <FacServisWordmark className="text-[18px]" /> : <DocusAIWordmark className="text-[18px]" />}
                <span className="text-[13px] text-terciario">
                  {p.pais} · {p.urlLabel}
                </span>
              </a>
            </li>
          ))}
        </FooterCol>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-terciario sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex gap-5">
          <Link href="/privacidad" className="hover:text-white">
            Privacidad
          </Link>
          <Link href="/aviso-legal" className="hover:text-white">
            Aviso legal
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] font-semibold text-white">{title}</h2>
      <ul className="mt-4 flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-block py-1 text-[15px] text-secundario transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
