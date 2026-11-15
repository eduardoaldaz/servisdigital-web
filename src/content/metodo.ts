export type Etapa = { nombre: string; corto: string; texto: string; entregable: string; detalle: string[] };

export const METODO: Etapa[] = [
  {
    nombre: 'Diagnóstico',
    corto: '30 minutos para ver si la IA encaja.',
    texto: 'Una reunión para entender tu empresa, qué proceso duele más y si la IA tiene sentido ahí.',
    entregable: 'una opinión honesta y una propuesta de alcance.',
    detalle: ['Reunión de 30 minutos, en línea', 'Hablamos de procesos, no de tecnología', 'Si no vemos un caso claro, te lo decimos'],
  },
  {
    nombre: 'Levantamiento',
    corto: 'Dibujamos tu proceso real.',
    texto: 'Nos sentamos con quien hace el trabajo y dibujamos el proceso real, con tiempos y excepciones.',
    entregable: 'el mapa del proceso actual y del propuesto con IA.',
    detalle: ['Entrevistas con las personas que ejecutan el proceso', 'Medición de tiempos, volúmenes y errores', 'Rediseño: qué se elimina, qué hace la IA y qué decide una persona', 'Hoja de ruta con presupuesto por fase'],
  },
  {
    nombre: 'Piloto',
    corto: 'Lo probamos con datos reales.',
    texto: 'Ponemos en marcha la solución en un proceso acotado, con datos reales y usuarios reales.',
    entregable: 'resultados medidos frente al punto de partida.',
    detalle: ['Prototipo navegable antes de programar', 'Integración con tus sistemas', 'Métricas de antes y después', 'Ajustes con el equipo que lo usa'],
  },
  {
    nombre: 'Despliegue y mejora',
    corto: 'En producción, medido y con soporte.',
    texto: 'Lo extendemos al resto de la operación, formamos al equipo y seguimos mejorándolo.',
    entregable: 'software en producción, documentado y con soporte.',
    detalle: ['Despliegue por fases', 'Formación y documentación', 'Monitorización de la IA y de las integraciones', 'Soporte y evolución continua'],
  },
];
