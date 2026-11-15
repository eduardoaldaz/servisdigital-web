/** Illustrative before/after process maps for the home blueprint. Examples, not client data. */
export type Actor = 'persona' | 'ia' | 'sistema';

export type Paso = { texto: string; actor: Actor; nota?: string };

export type Proceso = { id: string; nombre: string; hoy: Paso[]; conIa: Paso[] };

export const PROCESOS: Proceso[] = [
  {
    id: 'facturas',
    nombre: 'Facturas de proveedor',
    hoy: [
      { texto: 'Llega la factura por correo o WhatsApp', actor: 'persona', nota: 'Se descarga y se archiva a mano' },
      { texto: 'Alguien la teclea en el sistema', actor: 'persona', nota: 'Proveedor, importes, impuestos' },
      { texto: 'Se pide la aprobación por mensaje', actor: 'persona', nota: 'Y se espera la respuesta' },
      { texto: 'Contabilidad la vuelve a revisar', actor: 'persona', nota: 'Errores de cuadre al cierre' },
    ],
    conIa: [
      { texto: 'Un buzón recibe todas las facturas', actor: 'sistema' },
      { texto: 'La IA lee proveedor, importes e impuestos', actor: 'ia', nota: 'Y señala de dónde sale cada dato' },
      { texto: 'Las reglas fiscales avisan de lo que no cuadra', actor: 'sistema' },
      { texto: 'Una persona aprueba solo las excepciones', actor: 'persona' },
      { texto: 'Queda registrada en el ERP', actor: 'sistema' },
    ],
  },
  {
    id: 'pedidos',
    nombre: 'Pedidos por WhatsApp',
    hoy: [
      { texto: 'El cliente escribe el pedido por WhatsApp', actor: 'persona', nota: 'Con nombres de producto a su manera' },
      { texto: 'El vendedor pregunta a bodega si hay stock', actor: 'persona', nota: 'Llamada o mensaje, y a esperar' },
      { texto: 'Copia el pedido a una hoja o al sistema', actor: 'persona' },
      { texto: 'Confirma al cliente horas después', actor: 'persona' },
    ],
    conIa: [
      { texto: 'La IA entiende el pedido y lo cruza con tu catálogo', actor: 'ia' },
      { texto: 'Consulta stock y precio en tiempo real', actor: 'sistema' },
      { texto: 'Prepara la nota de pedido', actor: 'ia' },
      { texto: 'El vendedor confirma lo que la IA no tiene claro', actor: 'persona' },
    ],
  },
  {
    id: 'atencion',
    nombre: 'Atención al cliente',
    hoy: [
      { texto: 'Las mismas preguntas llegan por correo y teléfono', actor: 'persona' },
      { texto: 'Se busca la respuesta en carpetas y correos viejos', actor: 'persona' },
      { texto: 'Los casos urgentes se pierden entre los demás', actor: 'persona' },
    ],
    conIa: [
      { texto: 'Un asistente responde con tu documentación', actor: 'ia', nota: 'Citando la fuente' },
      { texto: 'Clasifica cada consulta por tema y urgencia', actor: 'ia' },
      { texto: 'Deriva a una persona con el caso resumido', actor: 'persona' },
    ],
  },
  {
    id: 'cobros',
    nombre: 'Cobranza',
    hoy: [
      { texto: 'Se revisa la cartera en Excel a fin de mes', actor: 'persona' },
      { texto: 'Se llama a cada cliente, uno por uno', actor: 'persona' },
      { texto: 'Los compromisos de pago se anotan donde se puede', actor: 'persona' },
    ],
    conIa: [
      { texto: 'El sistema ordena la cartera por riesgo', actor: 'sistema' },
      { texto: 'Recordatorios personalizados por WhatsApp y correo', actor: 'ia' },
      { texto: 'La IA registra las respuestas y promesas de pago', actor: 'ia' },
      { texto: 'Una persona gestiona solo los casos difíciles', actor: 'persona' },
    ],
  },
];
