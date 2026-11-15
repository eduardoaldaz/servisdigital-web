import { PageHero } from './page-hero';
import { Container, Pendiente } from './ui';

export function LegalPage({ titulo, slug, children }: { titulo: string; slug: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero migas={[{ href: `/${slug}`, label: titulo }]} titulo={titulo} />
      <div className="bg-superficie">
        <Container className="max-w-[760px] py-16">
          <Pendiente className="mb-10">
            Completa los datos de la sociedad (razón social, NIF/RUC, domicilio) y haz revisar este texto por un profesional antes de publicar.
          </Pendiente>
          <div className="prosa">{children}</div>
        </Container>
      </div>
    </>
  );
}
