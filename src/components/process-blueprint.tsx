'use client';

import { useEffect, useRef, useState } from 'react';
import { Cog, Sparkles, User } from 'lucide-react';
import { PROCESOS, type Actor, type Paso } from '@/content/procesos';
import { cn } from '@/lib/cn';

type Vista = 'hoy' | 'conIa';

const ACTOR: Record<Actor, { label: string; Icon: typeof User }> = {
  persona: { label: 'Persona', Icon: User },
  ia: { label: 'IA', Icon: Sparkles },
  sistema: { label: 'Sistema', Icon: Cog },
};

/**
 * Signature of the home page: a process drawn as a blueprint, today versus redesigned with AI.
 * Plays on its own (today → with AI → next process) until the visitor touches it.
 */
export function ProcessBlueprint({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [vista, setVista] = useState<Vista>('hoy');
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0); // bumps on every change to replay the step animation
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  const proceso = PROCESOS[index];
  const pasos = vista === 'hoy' ? proceso.hoy : proceso.conIa;
  const manualHoy = proceso.hoy.filter((p) => p.actor === 'persona').length;
  const manualIa = proceso.conIa.filter((p) => p.actor === 'persona').length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(
      () => {
        if (!visible.current) return setRun((r) => r + 1);
        if (vista === 'hoy') setVista('conIa');
        else {
          setVista('hoy');
          setIndex((i) => (i + 1) % PROCESOS.length);
        }
        setRun((r) => r + 1);
      },
      vista === 'hoy' ? 3800 : 5600,
    );
    return () => clearTimeout(t);
  }, [auto, vista, run]);

  const choose = (i: number) => {
    setAuto(false);
    setIndex(i);
    setVista('hoy');
    setRun((r) => r + 1);
  };
  const toggle = (v: Vista) => {
    setAuto(false);
    setVista(v);
    setRun((r) => r + 1);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'plano-grid relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0e1a3d] text-white shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]',
        className,
      )}
      onPointerEnter={() => setAuto(false)}
    >
      {/* Title block of the drawing */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8f9abd]">
          <span>Proceso</span>
          <span className="text-white/35">/</span>
          <span className="text-white">{proceso.nombre}</span>
        </div>
        <div role="group" aria-label="Vista del proceso" className="flex rounded-full bg-white/[0.07] p-1 text-[13px] font-semibold">
          {(
            [
              ['hoy', 'Hoy'],
              ['conIa', 'Con IA'],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={vista === v}
              onClick={() => toggle(v)}
              className={cn(
                'flex h-8 items-center gap-1.5 rounded-full px-3.5 transition-colors duration-300',
                vista === v ? (v === 'conIa' ? 'bg-plano-claro text-tinta' : 'bg-white text-tinta') : 'text-[#c3cbe4] hover:text-white',
              )}
            >
              {v === 'conIa' && <Sparkles className="size-3.5" aria-hidden />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* The flow */}
      <div className="relative px-5 pb-4 pt-5 sm:px-6">
        <div key={`scan-${run}`} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {vista === 'conIa' && (
            <div className="absolute inset-x-0 h-1/2 animate-[sd-scan_1.1s_cubic-bezier(0.16,1,0.3,1)_1] bg-gradient-to-b from-transparent via-[rgb(174_191_255/0.10)] to-transparent" />
          )}
        </div>
        <ol key={`${proceso.id}-${vista}-${run}`} className="relative min-h-[318px]" aria-live="polite">
          {pasos.map((paso, i) => (
            <Step key={i} paso={paso} i={i} last={i === pasos.length - 1} vista={vista} />
          ))}
        </ol>
      </div>

      {/* Legend + measurement */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 px-5 py-3.5 text-[13px]">
        <p className="tnum text-[#c3cbe4]">
          Pasos que hace una persona:{' '}
          <span className="font-semibold text-white">{manualHoy}</span>
          <span className="mx-1.5 text-white/40">→</span>
          <span className={cn('font-semibold', vista === 'conIa' ? 'text-plano-claro' : 'text-white')}>{manualIa}</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8f9abd]">Ejemplo ilustrativo</p>
      </div>

      {/* Process picker */}
      <div role="tablist" aria-label="Elige un proceso" className="flex gap-1 overflow-x-auto border-t border-white/10 px-3 py-2.5 [scrollbar-width:none]">
        {PROCESOS.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            type="button"
            aria-selected={i === index}
            onClick={() => choose(i)}
            className={cn(
              'relative h-9 shrink-0 rounded-full px-3.5 text-[13px] font-medium transition-colors',
              i === index ? 'bg-white/10 text-white' : 'text-[#8f9abd] hover:text-white',
            )}
          >
            {p.nombre}
            {i === index && auto && (
              <span
                key={`bar-${index}`}
                aria-hidden
                className="absolute inset-x-3.5 bottom-1 h-px origin-left animate-[sd-grow_9.4s_linear_1] bg-plano-claro/70"
              />
            )}
          </button>
        ))}
      </div>
      <style>{`@keyframes sd-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes sd-step{from{opacity:0;transform:translateY(8px);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}`}</style>
    </div>
  );
}

function Step({ paso, i, last, vista }: { paso: Paso; i: number; last: boolean; vista: Vista }) {
  const { label, Icon } = ACTOR[paso.actor];
  const ia = paso.actor === 'ia';
  const persona = paso.actor === 'persona';
  return (
    <li className="relative flex gap-4 pb-[18px] opacity-0" style={{ animation: `sd-step 520ms cubic-bezier(0.16,1,0.3,1) ${90 + i * 110}ms forwards` }}>
      {/* connector */}
      {!last && (
        <span
          aria-hidden
          className={cn('absolute left-[17px] top-[38px] bottom-0 w-px', vista === 'hoy' ? 'border-l border-dashed border-white/25' : 'bg-plano-claro/40')}
        />
      )}
      <span
        className={cn(
          'relative z-10 flex size-[35px] shrink-0 items-center justify-center rounded-full border',
          ia && 'border-plano-claro bg-plano-claro text-tinta shadow-[0_0_0_6px_rgb(174_191_255/0.12)]',
          paso.actor === 'sistema' && 'border-plano-claro/50 bg-[#16255a] text-plano-claro',
          persona && (vista === 'hoy' ? 'border-white/30 border-dashed bg-[#0e1a3d] text-white/80' : 'border-white bg-white text-tinta'),
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-medium leading-snug text-white">{paso.texto}</p>
          <span
            className={cn(
              'mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em]',
              ia ? 'bg-plano-claro/15 text-plano-claro' : 'text-[#8f9abd]',
            )}
          >
            {label}
          </span>
        </div>
        {paso.nota && <p className="mt-0.5 text-[13px] text-[#8f9abd]">{paso.nota}</p>}
      </div>
    </li>
  );
}
