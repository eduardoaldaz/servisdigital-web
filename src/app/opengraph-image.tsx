import { ImageResponse } from 'next/og';

export const alt = 'Servis Digital: implementamos IA en tu empresa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#fff',
          background: '#0b1430',
          backgroundImage:
            'linear-gradient(rgba(174,191,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(174,191,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#2347e8', display: 'flex' }} />
          <span>Servis</span>
          <span style={{ color: '#aebfff', marginLeft: -12 }}>Digital</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, maxWidth: 950 }}>Ponemos la IA a trabajar dentro de tu empresa.</div>
          <div style={{ fontSize: 30, color: '#c3cbe4' }}>Procesos · IA aplicada · Software a medida · Ecuador y España</div>
        </div>
      </div>
    ),
    size,
  );
}
