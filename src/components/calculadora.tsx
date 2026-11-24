'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy, Mail, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

type Fila = { id: number; tarea: string; veces: string; minutos: string; coste: string };

/** Illustrative starting rows (same example as the blog article). Visitors replace them with their own numbers. */
const EJEMPLO: Fila[] = [
  { id: 1, tarea: 'Cargar pedidos de WhatsApp al sistema', veces: '400', minutos: '6', coste: '' },
  { id: 2, tarea: 'Registrar facturas de proveedor', veces: '150', minutos: '4', coste: '' },
  { id: 3, tarea: 'Responder consultas repetidas de clientes', veces: '300', minutos: '3', coste: '' },
];
const VACIA = (id: number): Fila => ({ id, tarea: '', veces: '', minutos: '', coste: '' });
const CLAVE = 'sd-calculadora-v1';

const num = (s: string) => {
  const n = parseFloat(s.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const fmt = (n: number, dec = 0) => n.toLocaleString('es-ES', { maximumFractionDigits: dec, minimumFractionDigits: dec, useGrouping: 'always' });
const eur = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' });

export function Calculadora() {
  const [filas, setFilas] = useState<Fila[]>(EJEMPLO);
  const [esEjemplo, setEsEjemplo] = useState(true);
  const [copiado, setCopiado] = useState(false);

  // Per-visitor convenience: remember the list in this browser only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CLAVE);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.filas) && d.filas.length) {
          setFilas(d.filas);
          setEsEjemplo(!!d.esEjemplo);
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ filas, esEjemplo }));
    } catch {}
  }, [filas, esEjemplo]);

  const calc = useMemo(() => {
    const items = filas
      .map((f) => {
        const horas = (num(f.veces) * num(f.minutos)) / 60;
        const coste = num(f.coste);
        return { ...f, horas, costeMes: coste ? horas * coste : null };
      })
      .filter((f) => f.horas > 0);
    const horas = items.reduce((a, f) => a + f.horas, 0);
    const conCoste = items.filter((f) => f.costeMes !== null);
    const costeMes = conCoste.reduce((a, f) => a + (f.costeMes ?? 0), 0);
    const orden = [...items].sort((a, b) => b.horas - a.horas);
    return { items: orden, horas, costeMes, faltanCostes: items.length - conCoste.length, top: orden[0] };
  }, [filas]);

  const editar = (id: number, campo: keyof Fila, valor: string) => {
    setEsEjemplo(false);
    setFilas((fs) => fs.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)));
  };
  const nuevoId = () => Math.max(0, ...filas.map((f) => f.id)) + 1;
  const anadir = () => setFilas((fs) => [...fs, VACIA(nuevoId())]);
  const quitar = (id: number) => setFilas((fs) => (fs.length > 1 ? fs.filter((f) => f.id !== id) : [VACIA(1)]));
  const enBlanco = () => {
    setEsEjemplo(false);
    setFilas([VACIA(1), VACIA(2), VACIA(3)]);
  };
  const verEjemplo = () => {
    setEsEjemplo(true);
    setFilas(EJEMPLO);
  };

  const resumen = useMemo(() => {
    const lineas = calc.items.map(
      (f) => `- ${f.tarea || 'Tarea sin nombre'}: ${fmt(num(f.veces))} veces/mes × ${fmt(num(f.minutos), 1)} min = ${fmt(f.horas, 1)} h/mes${f.costeMes !== null ? ` (${eur(f.costeMes)}/mes)` : ''}`,
    );
    return [
      'Mi cálculo de tareas manuales (calculadora de Servis Digital):',
      '',
      ...lineas,
      '',
      `Total: ${fmt(calc.horas, 1)} horas al mes (${fmt(calc.horas * 12)} horas al año).`,
      calc.costeMes > 0 ? `Coste estimado: ${eur(calc.costeMes)} al mes (${eur(calc.costeMes * 12)} al año).` : '',
    ]
      .filter((l, i, a) => l || a[i - 1])
      .join('\n');
  }, [calc]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumen);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  };
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Mi cálculo de tareas manuales')}&body=${encodeURIComponent(
    resumen + '\n\nMe gustaría revisar con vosotros por dónde empezar.',
  )}`;

  const max = calc.top?.horas || 1;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      {/* Inputs */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[26px] font-extrabold tracking-[-0.03em] text-primer">Tus tareas repetitivas</h2>
          <div className="flex gap-2">
            {esEjemplo ? (
              <button type="button" onClick={enBlanco} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-linea bg-superficie px-4 text-[14px] font-medium text-primer hover:border-primer">
                Empezar en blanco
              </button>
            ) : (
              <button type="button" onClick={verEjemplo} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[14px] text-secundario hover:text-primer">
                <RotateCcw className="size-3.5" aria-hidden /> Ver el ejemplo
              </button>
            )}
          </div>
        </div>
        {esEjemplo && (
          <p className="mt-3 rounded-xl bg-plano-suave px-4 py-3 text-[14px] text-primer">
            Estos números son <strong>un ejemplo</strong>. Cámbialos por los de tu empresa: pregunta a quien hace cada tarea.
          </p>
        )}

        <ul className="mt-6 flex flex-col gap-4">
          {filas.map((f, i) => (
            <li key={f.id} className="rounded-2xl border border-linea bg-superficie p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="tnum mt-2.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-papel text-[12px] font-semibold text-secundario">{i + 1}</span>
                <label className="flex-1">
                  <span className="sr-only">Tarea {i + 1}</span>
                  <input
                    value={f.tarea}
                    onChange={(e) => editar(f.id, 'tarea', e.target.value)}
                    placeholder="¿Qué tarea? Ej.: pasar pedidos al sistema"
                    className="h-11 w-full rounded-lg border border-transparent bg-transparent px-2 text-[16px] font-semibold text-primer placeholder:font-normal placeholder:text-terciario hover:border-linea focus:border-plano focus:outline-none"
                  />
                </label>
                <button type="button" onClick={() => quitar(f.id)} aria-label={`Quitar tarea ${i + 1}`} className="mt-1 rounded-lg p-2 text-terciario hover:bg-papel hover:text-primer">
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:pl-9">
                <Campo label="Veces al mes" value={f.veces} onChange={(v) => editar(f.id, 'veces', v)} />
                <Campo label="Minutos/vez" value={f.minutos} onChange={(v) => editar(f.id, 'minutos', v)} />
                <Campo label="Coste €/hora" value={f.coste} onChange={(v) => editar(f.id, 'coste', v)} placeholder="opcional" />
              </div>
            </li>
          ))}
        </ul>
        <button type="button" onClick={anadir} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-[color-mix(in_oklab,var(--primer)_30%,transparent)] px-5 text-[15px] font-medium text-primer hover:border-primer">
          <Plus className="size-4" aria-hidden /> Añadir tarea
        </button>

        <details className="mt-8 rounded-xl border border-linea bg-superficie p-5 text-[15px] text-secundario">
          <summary className="cursor-pointer font-semibold text-primer">¿Cómo calculo el coste por hora?</summary>
          <p className="mt-3 leading-relaxed">
            Coste total de la persona para la empresa (sueldo bruto más cargas sociales) dividido entre sus horas trabajadas al mes. Usa el de cada perfil, no una media. Si no lo
            tienes a mano, déjalo vacío: verás igualmente las horas.
          </p>
          <p className="mt-3 leading-relaxed">
            En «minutos cada vez» incluye también buscar, esperar y corregir. Una estimación honesta de quien hace el trabajo vale más que una medición perfecta que nunca se hace.
          </p>
        </details>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-24">
        <div className="oscuro rounded-3xl bg-tinta p-6 text-primer sm:p-8" aria-live="polite">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-terciario">Resultado</p>
          <div className="mt-4">
            <p className="tnum font-display text-[clamp(52px,7vw,72px)] font-extrabold leading-none tracking-[-0.04em]">
              {fmt(calc.horas, calc.horas < 10 ? 1 : 0)} <span className="text-[0.45em] text-plano-claro">h/mes</span>
            </p>
            <p className="mt-2 text-[16px] text-secundario">
              {calc.horas > 0 ? (
                <>
                  Unas <strong className="text-primer">{fmt(calc.horas / 8, 1)} jornadas</strong> de trabajo cada mes. {fmt(calc.horas * 12)} horas al año.
                </>
              ) : (
                'Rellena veces y minutos para ver el resultado.'
              )}
            </p>
          </div>

          {calc.costeMes > 0 && (
            <div className="mt-6 border-t border-linea pt-6">
              <p className="tnum font-display text-[40px] font-extrabold leading-none tracking-[-0.03em]">
                {eur(calc.costeMes)} <span className="text-[0.5em] text-secundario">/mes</span>
              </p>
              <p className="mt-2 text-[15px] text-secundario">
                {eur(calc.costeMes * 12)} al año
                {calc.faltanCostes > 0 && ` (sin contar ${calc.faltanCostes === 1 ? '1 tarea' : `${calc.faltanCostes} tareas`} sin coste/hora)`}.
              </p>
            </div>
          )}

          {calc.items.length > 0 && (
            <div className="mt-6 border-t border-linea pt-6">
              <p className="text-[14px] font-semibold text-primer">Dónde se van las horas</p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {calc.items.map((f) => (
                  <li key={f.id}>
                    <div className="flex justify-between gap-3 text-[14px]">
                      <span className="truncate text-secundario">{f.tarea || 'Tarea sin nombre'}</span>
                      <span className="tnum shrink-0 font-semibold">{fmt(f.horas, 1)} h</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-plano-claro transition-[width] duration-500 ease-out-expo" style={{ width: `${(f.horas / max) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              {calc.top && calc.items.length > 1 && (
                <p className="mt-5 rounded-xl bg-white/5 px-4 py-3 text-[14px] leading-relaxed text-secundario">
                  <span className="font-semibold text-plano-claro">Candidata a empezar: </span>
                  {calc.top.tarea || 'tu primera tarea'}. Si además llega desordenada (documentos, mensajes, correos) y el resultado se puede comprobar, la IA encaja bien.
                </p>
              )}
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/contacto"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-plano-claro px-6 text-[16px] font-semibold text-tinta transition-colors hover:bg-[#ffc94b]"
            >
              Revisemos tu lista en 30 minutos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={mailto} className={cn(btnSec, calc.horas === 0 && 'pointer-events-none opacity-40')} aria-disabled={calc.horas === 0}>
                <Mail className="size-4" aria-hidden /> Enviárnoslo
              </a>
              <button type="button" onClick={copiar} disabled={calc.horas === 0} className={cn(btnSec, 'disabled:opacity-40')}>
                {copiado ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copiado ? 'Copiado' : 'Copiar resumen'}
              </button>
            </div>
          </div>
        </div>
        <p className="mt-4 px-2 text-[13px] leading-relaxed text-terciario">
          El cálculo se hace en tu navegador. No guardamos ni enviamos tus datos, salvo que tú decidas mandárnoslos por correo.
        </p>
      </div>
    </div>
  );
}

const btnSec =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-[14px] font-medium text-primer transition-colors hover:border-white/60';

function Campo({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="truncate text-[12px] leading-tight text-terciario">{label}</span>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ''))}
        placeholder={placeholder ?? '0'}
        className="tnum h-11 w-full min-w-0 rounded-lg border border-linea bg-papel px-3 text-[16px] font-semibold text-primer placeholder:font-normal placeholder:text-terciario focus:border-plano focus:bg-superficie focus:outline-none"
      />
    </label>
  );
}
