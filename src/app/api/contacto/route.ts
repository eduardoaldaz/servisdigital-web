import nodemailer from 'nodemailer';

type Body = Partial<Record<'nombre' | 'email' | 'empresa' | 'pais' | 'mensaje' | 'web', string>>;

// Small in-memory limiter: enough for a brochure site on a single instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (limited(ip)) return Response.json({ error: 'Demasiados envíos seguidos. Espera unos minutos.' }, { status: 429 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: 'Solicitud no válida.' }, { status: 400 });
  }
  if (body.web) return Response.json({ ok: true }); // honeypot: pretend success

  const d = {
    nombre: clean(body.nombre, 120),
    email: clean(body.email, 200),
    empresa: clean(body.empresa, 160),
    pais: clean(body.pais, 40),
    mensaje: clean(body.mensaje, 4000),
  };
  if (!d.nombre || !d.empresa || !d.mensaje || !d.pais) return Response.json({ error: 'Completa todos los campos.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return Response.json({ error: 'Revisa el email: no parece válido.' }, { status: 400 });

  const text = `Nombre: ${d.nombre}\nEmail: ${d.email}\nEmpresa: ${d.empresa}\nPaís: ${d.pais}\n\n${d.mensaje}`;

  if (!process.env.SMTP_URL) {
    console.info('[contacto] SMTP_URL no configurado; solicitud recibida:\n' + text);
    return Response.json({ ok: true });
  }
  try {
    await nodemailer.createTransport(process.env.SMTP_URL).sendMail({
      from: process.env.CONTACT_FROM ?? 'Servis Digital <no-reply@servisdigital.com>',
      to: process.env.CONTACT_TO ?? 'hola@servisdigital.com',
      replyTo: `${d.nombre} <${d.email}>`,
      subject: `Nueva solicitud de reunión: ${d.empresa} (${d.pais})`,
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contacto] error enviando email', err);
    return Response.json({ error: 'No se ha podido enviar. Escríbenos a hola@servisdigital.com.' }, { status: 502 });
  }
}
