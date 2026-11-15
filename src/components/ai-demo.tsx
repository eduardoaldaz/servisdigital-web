'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, FileText, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

type Caso = {
  id: string;
  tab: string;
  Icon: typeof Mail;
  entrada: { titulo: string; de: string; cuerpo: React.ReactNode };
  salida: { titulo: string; filas: [string, string][]; ok: string };
};

/** Synthetic examples: what goes in, what the AI hands back. */
const CASOS: Caso[] = [
  {
    id: 'pedido',
    tab: 'Pedido por WhatsApp',
    Icon: MessageCircle,
    entrada: {
      titulo: 'WhatsApp',
      de: 'Ferretería Los Andes',
      cuerpo: 'Buenas, para el jueves mándeme 12 sacos de cemento y 40 varillas de 12. Gracias',
    },
    salida: {
      titulo: 'Nota de pedido',
      filas: [
        ['Cliente', 'Ferretería Los Andes'],
        ['Cemento 50 kg', '12 u'],
        ['Varilla 12 mm', '40 u'],
        ['Entrega', 'Jueves'],
      ],
      ok: 'Stock disponible',
    },
  },
  {
    id: 'factura',
    tab: 'Factura en PDF',
    Icon: FileText,
    entrada: {
      titulo: 'factura-0457.pdf',
      de: 'Suministros Levante SL',
      cuerpo: (
        <span className="flex flex-col gap-1.5" aria-hidden>
          <span className="h-1.5 w-3/4 rounded bg-current opacity-20" />
          <span className="h-1.5 w-full rounded bg-current opacity-20" />
          <span className="h-1.5 w-5/6 rounded bg-current opacity-20" />
          <span className="mt-1 self-end rounded bg-plano-claro/25 px-1.5 text-[12px] font-semibold opacity-100">1.500,40 €</span>
        </span>
      ),
    },
    salida: {
      titulo: 'Datos extraídos',
      filas: [
        ['Proveedor', 'Suministros Levante SL'],
        ['NIF', 'B12345674'],
        ['Base imponible', '1.240,00 €'],
        ['IVA 21 %', '260,40 €'],
      ],
      ok: 'Cuadre de IVA correcto',
    },
  },
  {
    id: 'correo',
    tab: 'Correo de cliente',
    Icon: Mail,
    entrada: {
      titulo: 'Correo',
      de: 'compras@clinicasur.com',
      cuerpo: 'Hola, este mes nos han cobrado dos veces la factura 1043. ¿Pueden revisarlo? Necesitamos el abono antes del cierre.',
    },
    salida: {
      titulo: 'Clasificado',
      filas: [
        ['Tema', 'Facturación'],
        ['Urgencia', 'Alta'],
        ['Asignado a', 'Contabilidad'],
        ['Resumen', 'Cobro duplicado, factura 1043'],
      ],
      ok: 'Borrador de respuesta listo',
    },
  },
];

export function AiDemo({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const caso = CASOS[i];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => {
      setI((x) => (x + 1) % CASOS.length);
      setRun((r) => r + 1);
    }, 6200);
    return () => clearTimeout(t);
  }, [auto, inView, run]);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
    setRun((r) => r + 1);
  };

  return (
    <div ref={ref} className={cn('', className)}>
      <div role="tablist" aria-label="Ejemplos" className="flex flex-wrap gap-2">
        {CASOS.map((c, n) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={n === i}
            onClick={() => pick(n)}
            className={cn(
              'flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors',
              n === i ? 'border-tinta bg-tinta text-white' : 'border-linea text-secundario hover:border-primer hover:text-primer',
            )}
          >
            <c.Icon className="size-4" aria-hidden />
            {c.tab}
          </button>
        ))}
      </div>

      <div key={`${caso.id}-${run}-${inView}`} className="mt-8 grid items-center gap-4 lg:grid-cols-[1fr_auto_1.1fr] lg:gap-6">
        {/* Input */}
        <div className="relative overflow-hidden rounded-2xl border border-linea bg-superficie p-6 text-primer sd-in" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center gap-2 text-[13px] text-terciario">
            <caso.Icon className="size-4" aria-hidden />
            <span className="font-medium text-secundario">{caso.entrada.titulo}</span>
            <span>· {caso.entrada.de}</span>
          </div>
          <div className="mt-4 text-[17px] leading-relaxed">{caso.entrada.cuerpo}</div>
          {inView && <span aria-hidden className="sd-lectura pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-plano-claro/25 to-transparent" />}
        </div>

        {/* The AI step */}
        <div className="flex items-center justify-center lg:flex-col" aria-hidden>
          <span className="h-6 w-px bg-linea lg:h-px lg:w-8" />
          <span className="sd-pulso flex items-center gap-1.5 rounded-full bg-tinta px-3.5 py-2 text-[13px] font-semibold text-plano-claro">
            <Sparkles className="size-4" /> IA
          </span>
          <span className="h-6 w-px bg-linea lg:h-px lg:w-8" />
        </div>

        {/* Output */}
        <div className="rounded-2xl bg-tinta p-6 text-white">
          <p className="text-[13px] font-medium text-[#8fa39e]">{caso.salida.titulo}</p>
          <dl className="mt-3">
            {caso.salida.filas.map(([k, v], n) => (
              <div key={k} className="sd-in flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 text-[15px]" style={{ animationDelay: `${1300 + n * 260}ms` }}>
                <dt className="text-[#c3d0cc]">{k}</dt>
                <dd className="tnum text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="sd-in mt-4 flex items-center gap-2 text-[14px] font-semibold text-plano-claro" style={{ animationDelay: `${1300 + caso.salida.filas.length * 260 + 120}ms` }}>
            <Check className="size-4" aria-hidden /> {caso.salida.ok}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-terciario">Ejemplos con datos ficticios.</p>
    </div>
  );
}
