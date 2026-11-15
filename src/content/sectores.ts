export type Sector = {
  slug: string;
  nombre: string;
  /** The process that hurts most in this sector, in the client's words. */
  dolor: string;
  casos: string[];
};

/** Examples of where AI and custom software help in each sector. Illustrative use cases, not client claims. */
export const SECTORES: Sector[] = [
  {
    slug: 'comercio-distribucion',
    nombre: 'Comercio y distribución',
    dolor: 'Los pedidos llegan por WhatsApp, correo y teléfono, y alguien los pasa a mano al sistema.',
    casos: ['Pedidos por WhatsApp interpretados por IA y cargados al sistema', 'Stock y precios consultables por el equipo comercial desde el móvil', 'Facturación electrónica conectada al inventario'],
  },
  {
    slug: 'contabilidad-gestorias',
    nombre: 'Contabilidad y gestorías',
    dolor: 'Cada mes, cientos de facturas de clientes que hay que teclear, revisar y cuadrar.',
    casos: ['Captura de facturas con IA y validación fiscal (DocusAI)', 'Portal para que los clientes suban documentos', 'Avisos automáticos de documentación pendiente'],
  },
  {
    slug: 'agroexportacion',
    nombre: 'Agroexportación',
    dolor: 'Certificados, packing lists y documentos de embarque que se rehacen para cada cliente y cada destino.',
    casos: ['Generación y revisión de documentos de exportación con IA', 'Trazabilidad de lotes desde finca hasta contenedor', 'Panel de embarques y cobros por cliente'],
  },
  {
    slug: 'salud',
    nombre: 'Clínicas y salud',
    dolor: 'Recepción saturada de llamadas para citas, resultados y preguntas que se repiten.',
    casos: ['Asistente de citas y recordatorios por WhatsApp', 'Resumen de historias y documentos para el profesional', 'Facturación a aseguradoras sin reprocesos'],
  },
  {
    slug: 'construccion-inmobiliaria',
    nombre: 'Construcción e inmobiliaria',
    dolor: 'Compras, partes de obra y certificaciones repartidos entre papel, fotos y hojas de cálculo.',
    casos: ['Partes de obra desde el móvil con fotos y firma', 'Comparación de presupuestos de proveedores con IA', 'Control de costes por obra conectado a contabilidad'],
  },
  {
    slug: 'logistica-transporte',
    nombre: 'Logística y transporte',
    dolor: 'Albaranes, guías y entregas que se confirman por llamada y se archivan en papel.',
    casos: ['Lectura automática de albaranes y guías de remisión', 'Prueba de entrega digital con geolocalización', 'Avisos de incidencias al cliente'],
  },
  {
    slug: 'industria',
    nombre: 'Industria y manufactura',
    dolor: 'Órdenes de producción, calidad y mantenimiento que viven en papel junto a la máquina.',
    casos: ['Registros de calidad y mantenimiento digitales', 'Asistente que responde con manuales y procedimientos internos', 'Previsión de compras de materia prima'],
  },
  {
    slug: 'servicios-profesionales',
    nombre: 'Despachos y servicios profesionales',
    dolor: 'Horas facturables perdidas en buscar documentos, redactar borradores y perseguir firmas.',
    casos: ['Búsqueda y resumen de expedientes con IA', 'Borradores de documentos a partir de plantillas propias', 'Firma electrónica y seguimiento de plazos'],
  },
  {
    slug: 'educacion',
    nombre: 'Educación y formación',
    dolor: 'Matrículas, pagos y consultas de familias que se gestionan uno por uno.',
    casos: ['Matrícula y cobros en línea', 'Asistente que responde dudas de familias y alumnos', 'Comunicaciones segmentadas por curso'],
  },
  {
    slug: 'turismo-hosteleria',
    nombre: 'Turismo y hostelería',
    dolor: 'Reservas en varios canales, proveedores y facturas que nadie concilia a tiempo.',
    casos: ['Atención de reservas multicanal con IA', 'Compras a proveedores leídas y registradas automáticamente', 'Indicadores de ocupación y costes en un panel'],
  },
];
