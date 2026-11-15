import { PageHero } from '@/components/page-hero';
import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <PageHero titulo="Este paso no está en el plano." texto="La página que buscas no existe o ha cambiado de dirección.">
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/contacto" variant="secundario">
          Agenda una reunión
        </ButtonLink>
      </div>
    </PageHero>
  );
}
