export type Servicio = {
  slug: string;
  nombre: string;
  /** A few words for the home list. */
  corto: string;
  /** One line for lists and cards. */
  resumen: string;
  /** Headline of the service page. */
  titular: string;
  intro: string;
  incluye: { titulo: string; texto: string }[];
  entregables: string[];
  ejemplos: string[];
  preguntas: { p: string; r: string }[];
};

export const SERVICIOS: Servicio[] = [
  {
    slug: 'inteligencia-artificial',
    nombre: 'IA para empresas',
    corto: 'Documentos, atención, datos y automatización.',
    resumen: 'Ponemos la IA a hacer el trabajo repetitivo: leer documentos, responder, clasificar, consultar tus datos.',
    titular: 'IA que trabaja dentro de tus procesos, no en una pestaña aparte.',
    intro:
      'La IA rinde cuando está conectada a tu correo, tu ERP y tus documentos, y cuando alguien de tu equipo sigue teniendo la última palabra. Elegimos dónde aporta, la integramos en el flujo real y medimos el resultado.',
    incluye: [
      { titulo: 'Lectura de documentos', texto: 'Facturas, albaranes, contratos, pedidos o fichas: la IA extrae los datos, los valida con tus reglas y los deja listos en tu sistema.' },
      { titulo: 'Asistentes y agentes', texto: 'Atención por WhatsApp, web o correo con tu información; derivan a una persona con el caso resumido cuando hace falta.' },
      { titulo: 'Pregúntale a tus datos', texto: 'Consultas en lenguaje natural sobre ventas, stock o cartera, con respuestas que citan de dónde sale cada número.' },
      { titulo: 'Clasificar y enrutar', texto: 'Correos, tickets y solicitudes ordenados por tipo y urgencia, y asignados a quien corresponde.' },
      { titulo: 'Automatización con criterio', texto: 'Tareas que antes exigían leer y decidir: la IA propone, las reglas validan y una persona aprueba las excepciones.' },
      { titulo: 'Gobierno y privacidad', texto: 'Proveedores de IA que no entrenan con tus datos, registro de lo que hace cada automatización y cumplimiento RGPD y LOPDP.' },
    ],
    entregables: ['Mapa de casos de uso priorizados por impacto y esfuerzo', 'Piloto en un proceso real con métricas de antes y después', 'Integración con tus sistemas y documentación', 'Formación del equipo que lo va a usar'],
    ejemplos: ['Registrar facturas de proveedor sin teclearlas', 'Responder pedidos de WhatsApp consultando el stock real', 'Resumir y clasificar el correo de atención al cliente', 'Un asistente interno que responde con tus procedimientos'],
    preguntas: [
      { p: '¿Necesito tener los datos ordenados antes de empezar?', r: 'No. Parte del trabajo es ver qué datos existen y en qué estado. Muchos casos, como leer documentos, funcionan con lo que ya llega hoy por correo.' },
      { p: '¿La IA toma decisiones sola?', r: 'Solo cuando el riesgo es bajo y la regla está clara. En lo demás, la IA propone y una persona decide. Esto se define proceso a proceso contigo.' },
      { p: '¿Qué pasa con la confidencialidad?', r: 'Usamos proveedores de IA que no entrenan con los datos de tus clientes, con alojamiento en la región que necesites, y dejamos registro de cada operación.' },
    ],
  },
  {
    slug: 'procesos',
    nombre: 'Levantamiento y digitalización de procesos',
    corto: 'Mapa del proceso y hoja de ruta.',
    resumen: 'Entendemos cómo se trabaja hoy, medimos dónde se pierde el tiempo y diseñamos el proceso digital.',
    titular: 'Antes de comprar software, entiende cómo trabaja tu empresa de verdad.',
    intro:
      'La mayoría de proyectos digitales fallan por automatizar un proceso que nadie había mirado. Nos sentamos con quien hace el trabajo, dibujamos el proceso real con sus atajos y sus excepciones, y decidimos juntos qué digitalizar primero.',
    incluye: [
      { titulo: 'Entrevistas y observación', texto: 'Con las personas que ejecutan el proceso, no solo con quien lo dirige. Ahí aparecen el Excel paralelo y el WhatsApp de aprobaciones.' },
      { titulo: 'Mapa del proceso actual', texto: 'Cada paso, quién lo hace, con qué herramienta, cuánto tarda y dónde se repite o se espera.' },
      { titulo: 'Rediseño con IA', texto: 'Qué se elimina, qué se automatiza, qué hace la IA y qué sigue haciendo una persona.' },
      { titulo: 'Hoja de ruta', texto: 'Proyectos ordenados por impacto y esfuerzo, con presupuesto y una primera fase que se puede empezar ya.' },
    ],
    entregables: ['Mapa del proceso actual y del proceso propuesto', 'Lista de puntos de dolor con su coste estimado en horas', 'Hoja de ruta priorizada con presupuesto por fase', 'Recomendación de herramientas: comprar, adaptar o construir'],
    ejemplos: ['Del pedido a la factura en una distribuidora', 'Alta y seguimiento de clientes en una gestoría', 'Compras y aprobaciones en una constructora', 'Atención y citas en una clínica'],
    preguntas: [
      { p: '¿Cuánto dura un levantamiento?', r: 'Depende de cuántos procesos y áreas entren. Lo acordamos en la primera reunión con un alcance cerrado.' },
      { p: '¿Estoy obligado a construir el software con ustedes?', r: 'No. La hoja de ruta es tuya. Si lo mejor es un producto que ya existe, te lo diremos.' },
    ],
  },
  {
    slug: 'software-a-medida',
    nombre: 'Software a medida',
    corto: 'Web, móvil y sistemas internos.',
    resumen: 'Aplicaciones web y móviles, portales y sistemas internos construidos para tu forma de trabajar.',
    titular: 'Software hecho para tu proceso, no tu proceso adaptado al software.',
    intro:
      'Cuando ningún producto encaja, lo construimos. El mismo equipo y la misma forma de trabajar con la que hacemos FacServis y DocusAI: diseño cuidado, entregas frecuentes y código que se puede mantener.',
    incluye: [
      { titulo: 'Aplicaciones web', texto: 'Paneles de gestión, portales de clientes y proveedores, flujos de aprobación, reportes.' },
      { titulo: 'Apps móviles', texto: 'Para el equipo en la calle: vendedores, técnicos, repartidores, inspecciones con fotos y firma.' },
      { titulo: 'Producto SaaS', texto: 'Si tu idea es venderlo a otras empresas: multiempresa, planes, facturación y seguridad desde el principio.' },
      { titulo: 'Diseño de producto', texto: 'Pantallas pensadas para quien las usa ocho horas al día: rápidas, claras y con atajos.' },
    ],
    entregables: ['Prototipo navegable antes de programar', 'Entregas cada pocas semanas en un entorno de pruebas', 'Código, documentación y accesos a tu nombre', 'Soporte y evolución después del lanzamiento'],
    ejemplos: ['Portal de pedidos para clientes de una distribuidora', 'App de partes de trabajo con firma del cliente', 'Sistema de expedientes para un despacho', 'Panel de indicadores conectado al ERP'],
    preguntas: [
      { p: '¿Con qué tecnologías trabajan?', r: 'TypeScript (Next.js, NestJS), PHP (Laravel), bases de datos PostgreSQL y nube en Azure o AWS. Elegimos según lo que tu equipo pueda mantener.' },
      { p: '¿De quién es el código?', r: 'Lo dejamos por escrito en la propuesta de cada proyecto, junto con los accesos y la documentación.' },
    ],
  },
  {
    slug: 'integraciones',
    nombre: 'Integraciones, ERP y facturación electrónica',
    corto: 'ERP, SRI, Facturae, bancos y APIs.',
    resumen: 'Conectamos tus sistemas entre sí: ERP, facturación electrónica, bancos, tiendas online y hojas de cálculo.',
    titular: 'Que los datos pasen solos de un sistema a otro.',
    intro:
      'Cada vez que alguien copia datos de una pantalla a otra se pierde tiempo y aparecen errores. Integramos tus sistemas para que la información se escriba una sola vez.',
    incluye: [
      { titulo: 'ERP', texto: 'Extensiones e integraciones para Microsoft Dynamics 365 Business Central y conexión con otros ERP mediante API o ficheros.' },
      { titulo: 'Facturación electrónica', texto: 'Comprobantes del SRI en Ecuador (lo hacemos cada día en FacServis) y formatos españoles Facturae y UBL.' },
      { titulo: 'APIs y automatizaciones', texto: 'Tiendas online, pasarelas de pago, bancos, CRM, correo y WhatsApp conectados con tu sistema central.' },
      { titulo: 'Migración de datos', texto: 'Del sistema antiguo al nuevo sin perder histórico: limpieza, validación y cuadre antes del cambio.' },
    ],
    entregables: ['Diagrama de integraciones y flujo de datos', 'Conectores con registro de errores y reintentos', 'Pruebas con datos reales antes del paso a producción', 'Monitorización y soporte'],
    ejemplos: ['Pedidos de la tienda online directos al ERP', 'Facturas de proveedor leídas con IA y registradas en Business Central', 'Conciliación de cobros bancarios', 'Emisión de comprobantes del SRI desde tu sistema actual'],
    preguntas: [
      { p: '¿Pueden integrarse con un sistema antiguo sin API?', r: 'Casi siempre hay una vía: base de datos, ficheros de intercambio o exportaciones programadas. Lo evaluamos en el diagnóstico.' },
    ],
  },
];

export const servicio = (slug: string) => SERVICIOS.find((s) => s.slug === slug);
