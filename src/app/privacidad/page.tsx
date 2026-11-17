import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Política de privacidad', alternates: { canonical: '/privacidad' } };

export default function Privacidad() {
  return (
    <LegalPage titulo="Política de privacidad" slug="privacidad">
      <h2>Quién trata tus datos</h2>
      <p>
        {SITE.titular} ({SITE.name}) es responsable de los datos que nos envías a través de este sitio. Puedes escribirnos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> para cualquier
        cuestión sobre privacidad.
      </p>
      <h2>Qué datos recogemos y para qué</h2>
      <ul>
        <li>
          <strong>Agenda de reuniones:</strong> al reservar, nombre, email y lo que escribas en la reserva. La agenda funciona con Cal.com (Cal.com, Inc.), que trata
          esos datos por cuenta nuestra y puede hacerlo fuera de la Unión Europea. Los usamos solo para preparar y celebrar la reunión.
        </li>
        <li>
          <strong>Correo y WhatsApp:</strong> los datos que incluyas en tu mensaje, solo para responderte.
        </li>
        <li>
          <strong>Navegación:</strong> este sitio no usa cookies de publicidad ni de seguimiento. Se aloja en GitHub Pages (GitHub, Inc.), que registra la dirección IP
          de las visitas por motivos de seguridad.
        </li>
      </ul>
      <h2>Base legal y conservación</h2>
      <p>
        Tratamos los datos con tu consentimiento al reservar o escribirnos, conforme al Reglamento General de Protección de Datos (RGPD) en España y a la Ley Orgánica de
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
