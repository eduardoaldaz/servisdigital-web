export const SITE = {
  name: 'Servis Digital',
  wordmark: ['Servis', 'Digital'] as const,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://servisdigital.com').replace(/\/$/, ''),
  tagline: 'IA aplicada a tu empresa',
  description:
    'Implementamos inteligencia artificial en empresas: levantamos tus procesos, los rediseñamos con IA y construimos el software a medida que los hace funcionar. Ecuador y España.',
  email: 'hola@servisdigital.com',
  founder: { name: 'Eduardo Aldaz', url: 'https://eduardoaldaz.servisdigital.com' },
  countries: ['Ecuador', 'España'],
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  whatsapp: {
    EC: process.env.NEXT_PUBLIC_WHATSAPP_EC || null,
    ES: process.env.NEXT_PUBLIC_WHATSAPP_ES || null,
  },
};

export const NAV = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/sectores', label: 'Sectores' },
  { href: '/productos', label: 'Productos' },
  { href: '/metodo', label: 'Cómo trabajamos' },
  { href: '/blog', label: 'Blog' },
];

export function whatsappLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
