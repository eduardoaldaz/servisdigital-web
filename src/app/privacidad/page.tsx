import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Política de privacidad', alternates: { canonical: '/privacidad' } };

export default function Privacidad() {
  return (
    <LegalPage titulo="Política de privacidad" slug="privacidad">
      <h2>Quién trata tus datos</h2>
      <p>
        {SITE.name} es responsable de los datos que nos envías a través de este sitio. Puedes escribirnos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> para cualquier
        cuestión sobre privacidad.
      </p>
      <h2>Qué datos recogemos y para qué</h2>
      <ul>
        <li>
          <strong>Formulario de contacto y agenda:</strong> nombre, email, empresa, país y el mensaje que escribes. Los usamos solo para responderte y preparar la reunión.
        </li>
        <li>
          <strong>Navegación:</strong> este sitio no usa cookies de publicidad ni de seguimiento.
        </li>
      </ul>
      <h2>Base legal y conservación</h2>
      <p>
        Tratamos los datos con tu consentimiento al enviar el formulario, conforme al Reglamento General de Protección de Datos (RGPD) en España y a la Ley Orgánica de
        Protección de Datos Personales (LOPDP) en Ecuador. Los conservamos mientras dure la relación comercial o hasta que pidas su eliminación.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, eliminación, oposición o portabilidad de tus datos escribiendo a {SITE.email}. Si consideras que no hemos atendido tu solicitud,
        puedes reclamar ante la Agencia Española de Protección de Datos o la Superintendencia de Protección de Datos Personales de Ecuador.
      </p>
    </LegalPage>
  );
}
