export type Producto = {
  id: 'facservis' | 'docusai';
  nombre: string;
  wordmark: [string, string];
  pais: string;
  url: string;
  urlLabel: string;
  estado: string;
  titular: string;
  texto: string;
  puntos: string[];
  ia: string;
};

export const PRODUCTOS: Producto[] = [
  {
    id: 'facservis',
    nombre: 'FacServis',
    wordmark: ['Fac', 'Servis'],
    pais: 'Ecuador',
    url: 'https://facservis.com',
    urlLabel: 'facservis.com',
    estado: 'En producción',
    titular: 'Facturación electrónica del SRI y control del negocio.',
    texto: 'Los seis comprobantes electrónicos del SRI, inventario, compras y cuentas por cobrar en un solo panel, desde el celular.',
    puntos: ['Firma XAdES-BES y reenvío automático si el SRI se cae', 'Compras cargando el XML del proveedor, sin digitar', 'Reportes de IVA, retenciones y ATS para el contador'],
    ia: 'Asistente que responde en español cuánto vendiste, qué se está acabando y quién está atrasado.',
  },
  {
    id: 'docusai',
    nombre: 'DocusAI',
    wordmark: ['Docus', 'AI'],
    pais: 'España',
    url: 'https://docusai.servisdigital.com',
    urlLabel: 'docusai.servisdigital.com',
    estado: 'Acceso anticipado',
    titular: 'Captura de facturas de proveedor con IA.',
    texto: 'Lee facturas en PDF, foto o correo, las valida con las reglas fiscales españolas y las exporta al programa contable o a Business Central.',
    puntos: ['NIF, bases, IVA, recargo e IRPF comprobados al instante', 'Revisión con el documento al lado y el dato resaltado', 'Aprobaciones de clientes por enlace, sin cuentas'],
    ia: 'La IA extrae cada dato y señala de qué parte del documento lo ha sacado.',
  },
];
