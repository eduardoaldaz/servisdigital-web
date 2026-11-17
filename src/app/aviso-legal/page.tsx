import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Aviso legal', alternates: { canonical: '/aviso-legal' } };

export default function AvisoLegal() {
  return (
    <LegalPage titulo="Aviso legal" slug="aviso-legal">
      <h2>Titular del sitio</h2>
      <p>
        Este sitio web es de {SITE.titular}, que ofrece sus servicios con el nombre comercial {SITE.name}. Contacto:{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
      <h2>Contenido</h2>
      <p>
        Los textos, diseños y marcas de este sitio, incluidas FacServis y DocusAI, pertenecen a {SITE.name}. Los ejemplos de procesos y las capturas de producto muestran
        datos ficticios con fines ilustrativos.
      </p>
      <h2>Enlaces</h2>
      <p>Los enlaces a sitios de terceros se ofrecen por comodidad; no nos hacemos responsables de su contenido.</p>
    </LegalPage>
  );
}
