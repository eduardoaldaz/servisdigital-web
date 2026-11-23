import type { Metadata } from 'next';
import { Mail, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ButtonLink, Container, Section } from '@/components/ui';
import { SITE, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Agenda una reunión',
  description: 'Treinta minutos para contarnos tu proceso. Te diremos si la IA puede ayudar, cómo lo haríamos y por dónde empezar.',
  alternates: { canonical: '/contacto' },
};

const AGENDA = ['Nos cuentas qué hace tu empresa y qué proceso te preocupa.', 'Te preguntamos cómo se hace hoy: quién, con qué herramientas y cuánto tarda.', 'Te decimos con franqueza si la IA ayuda ahí y qué haríamos primero.', 'Si tiene sentido, te enviamos una propuesta por escrito.'];

export default function ContactoPage() {
  const whatsapps = (
    [
      ['España', SITE.whatsapp.ES],
      ['Ecuador', SITE.whatsapp.EC],
    ] as const
  ).filter(([, n]) => n);

  return (
    <>
      <PageHero
        migas={[{ href: '/contacto', label: 'Contacto' }]}
        titulo="Agenda una reunión de 30 minutos."
        texto="Sin presentaciones comerciales: hablamos de tu proceso y te decimos qué haríamos. Si no vemos un caso claro para la IA, también te lo diremos."
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[28px] font-extrabold tracking-[-0.03em] text-primer">Qué pasa en la reunión</h2>
            <ol className="mt-6 flex flex-col gap-5">
              {AGENDA.map((a, i) => (
                <li key={a} className="flex gap-4 text-[16px] leading-relaxed text-secundario">
                  <span className="tnum flex size-7 shrink-0 items-center justify-center rounded-full border border-plano/40 text-[13px] font-semibold text-plano">{i + 1}</span>
                  {a}
                </li>
              ))}
            </ol>
            <div className="mt-12 border-t border-linea pt-8">
              <h2 className="text-[15px] font-semibold text-primer">¿Prefieres escribirnos?</h2>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 text-[16px] text-primer hover:text-plano">
                    <Mail className="size-4 text-plano" aria-hidden /> {SITE.email}
                  </a>
                </li>
                {whatsapps.map(([pais, n]) => (
                  <li key={pais}>
                    <a href={whatsappLink(n!, 'Hola Servis Digital, quiero agendar una reunión')} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 text-[16px] text-primer hover:text-plano">
                      <MessageCircle className="size-4 text-plano" aria-hidden /> WhatsApp {pais}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {SITE.bookingUrl ? (
              <div className="overflow-hidden rounded-2xl bg-superficie">
                <iframe src={`${SITE.bookingUrl}${SITE.bookingUrl.includes('?') ? '&' : '?'}embed=true&theme=light`} title="Elige día y hora para la reunión" className="h-[720px] w-full" loading="lazy" />
              </div>
            ) : (
              <div className="rounded-2xl bg-superficie p-8">
                <h2 className="font-display text-[26px] font-bold tracking-[-0.02em] text-texto">Escríbenos y te proponemos horario.</h2>
                <p className="mt-3 text-[16px] text-texto-2">Cuéntanos en dos líneas qué hace tu empresa y qué proceso quieres mejorar.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {whatsapps.map(([pais, n]) => (
                    <ButtonLink key={pais} href={whatsappLink(n!, 'Hola Servis Digital, quiero agendar una reunión')} external>
                      WhatsApp {pais}
                    </ButtonLink>
                  ))}
                  <ButtonLink href={`mailto:${SITE.email}?subject=${encodeURIComponent('Quiero agendar una reunión')}`} variant="secundario" external>
                    {SITE.email}
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
